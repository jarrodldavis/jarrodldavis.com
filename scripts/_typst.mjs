// @ts-check

import { execFile, spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { chmod, mkdir } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { Duplex } from "node:stream";
import { text } from "node:stream/consumers";
import { pipeline } from "node:stream/promises";
import { promisify } from "node:util";

/**
 * @import { ChildProcess, ChildProcessWithoutNullStreams } from 'node:child_process'
 * @import { PipelineDestination, PipelineSource } from "node:stream";
 * @import { ReadableStream } from "node:stream/web";
 */

const TYPST_VERSION = "0.11.1";

const run = promisify(execFile);

function getTypstBasename() {
  switch (process.arch) {
    case "arm64":
      return "typst-aarch64-unknown-linux-musl";
    case "x64":
      return "typst-x86_64-unknown-linux-musl";
    default:
      throw new Error(`unsupported architecture: ${process.arch}`);
  }
}

/**
 * @param {string} command
 */
async function isInstalled(command) {
  /** @type {ChildProcess} */
  let child;

  try {
    const promise = run(command, ["--version"]);
    child = promise.child;
    await promise;
  } catch {
    return false;
  }

  return child.exitCode === 0;
}

async function ensureSystemDependencies() {
  if ((await isInstalled("tar")) && (await isInstalled("xz"))) {
    return;
  }

  console.log("-> installing system dependencies...");

  if (!(await isInstalled("dnf"))) {
    throw new Error("unsupported package manager");
  }

  const dnf = spawn("dnf", ["--assumeyes", "install", "tar", "xz"], { stdio: "inherit" });

  await new Promise((resolve, reject) => {
    dnf.on("error", reject);
    dnf.on("close", resolve);
  });

  if (dnf.exitCode !== 0) {
    throw new Error("failed to install system dependencies");
  }
}

/**
 * @param {string} basename
 */
async function fetchTarball(basename) {
  const url = new URL(
    `${basename}.tar.xz`,
    new URL(`v${TYPST_VERSION}/`, "https://github.com/typst/typst/releases/download/"),
  );

  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`failed to download tarball: ${response.status} ${response.statusText}`);
  }

  return /** @type {ReadableStream<Uint8Array>} */ (response.body);
}

/**
 * @template A
 * @template B
 * @param {PipelineSource<A>} input
 * @param {ChildProcessWithoutNullStreams} childProcess
 * @param {PipelineDestination<Duplex, B>} output
 */
async function pipeProcess(input, childProcess, output) {
  const [spawnResult, stdErrResult, pipelineResult] = await Promise.allSettled([
    new Promise((resolve, reject) => {
      childProcess.on("error", reject);
      childProcess.on("close", resolve);
    }),
    text(childProcess.stderr),
    pipeline(
      input,
      Duplex.from({ writable: childProcess.stdin, readable: childProcess.stdout }),
      output,
    ),
  ]);

  if (childProcess.exitCode !== 0) {
    if (stdErrResult.status === "fulfilled" && stdErrResult.value) {
      throw new Error(stdErrResult.value);
    } else if (childProcess.exitCode) {
      throw new Error(`process exited with status code ${childProcess.exitCode}`);
    } else {
      throw new Error(`process ended unexpectedly`);
    }
  }

  if (spawnResult.status === "rejected") {
    throw spawnResult.reason;
  }

  if (pipelineResult.status === "rejected") {
    throw pipelineResult.reason;
  }
}

async function validateInstallation() {
  const typst = spawn("typst", ["--version"], { stdio: "inherit" });

  await new Promise((resolve, reject) => {
    typst.on("error", reject);
    typst.on("close", resolve);
  });

  if (typst.exitCode !== 0) {
    throw new Error("failed to validate installation");
  }
}

export default async function installTypst() {
  if ((await isInstalled("typst")) && !process.argv.includes("--force")) {
    console.log("-> binary is already installed");
    return;
  }

  console.log("-> collecting system info...");
  const binDir = process.getuid?.() === 0 ? "/usr/local/bin" : path.join(homedir(), ".local/bin");
  const basename = getTypstBasename();

  await ensureSystemDependencies();

  console.log("-> preparing output directory...");
  await mkdir(binDir, { recursive: true, mode: 0o755 });
  const binPath = path.join(binDir, "typst");
  const fileOutput = createWriteStream(binPath);

  console.log("-> fetching tarball...");
  const responseBody = await fetchTarball(basename);

  console.log("-> extracting binary from tarball...");
  try {
    const tar = spawn("tar", ["--file=-", "--xz", "--extract", "--to-stdout", `${basename}/typst`]);
    await pipeProcess(responseBody, tar, fileOutput);
  } catch (cause) {
    throw new Error("extraction failed", { cause });
  }

  console.log("-> finalizing binary...");
  await chmod(binPath, 0o744);
  await validateInstallation();

  console.log("-> installation successful");
}
