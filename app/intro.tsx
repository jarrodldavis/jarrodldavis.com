import assert from "node:assert/strict";

export const description = (
  <>
    Hey! I’m Jarrod Davis, a full stack developer and software engineer who enjoys building
    delightful experiences and helpful tools. I’ve worked with numerous languages, frameworks, and
    libraries, with a significant focus on command-line utilities and web applications (both the
    frontend and backend).
  </>
).props.children as string;

assert.ok(typeof description === "string", "expected plain string description");

export default function Intro() {
  return (
    <section className="mt-6 space-y-2">
      <p>{description}</p>
      <p>
        Below you can see more details of my professional and educational experience. You can also
        <> </>
        <a
          className="underline hover:text-blue-700 dark:hover:text-blue-300"
          href="/jarrod-davis-resume.pdf"
          download="jarrod-davis-resume.pdf"
        >
          download my resume
        </a>
        <> </>
        as a PDF.
      </p>
    </section>
  );
}
