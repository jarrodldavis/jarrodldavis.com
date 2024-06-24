import Education from "@/app/education";
import Heading from "@/app/heading";
import Work from "@/app/work";

export default async function Home() {
  const { default: resumeData } = await import("@/app/resume-data");
  return (
    <main className="mx-auto max-w-5xl p-12 font-serif">
      <Heading {...resumeData.personal} />
      {resumeData.work && <Work work={resumeData.work} />}
      <Education education={resumeData.education} />
      <Affiliations />
      <Projects />
      <Awards />
      <Publications />
      <Skills />
      <References />
      <EndNote />
    </main>
  );
}

function Affiliations() {
  return <></>;
}

function Projects() {
  return <></>;
}

function Awards() {
  return <></>;
}

function Publications() {
  return <></>;
}

function Skills() {
  return <></>;
}

function References() {
  return <></>;
}

function EndNote() {
  return <></>;
}
