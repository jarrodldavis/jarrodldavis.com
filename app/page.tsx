import Education from "@/app/education";
import Heading from "@/app/heading";
import Projects from "@/app/projects";
import Skills from "@/app/skills";
import Work from "@/app/work";

export default async function Home() {
  const { default: resumeData } = await import("@/app/resume-data");
  return (
    <main className="mx-auto max-w-5xl p-12 font-serif">
      <Heading {...resumeData.personal} />
      {resumeData.work && <Work work={resumeData.work} />}
      <Education education={resumeData.education} />
      <Affiliations />
      {resumeData.projects && <Projects projects={resumeData.projects} />}
      <Awards />
      <Publications />
      <Skills
        skills={resumeData.skills}
        languages={resumeData.languages}
        interests={resumeData.interests}
      />
      <References />
      <EndNote />
    </main>
  );
}

function Affiliations() {
  return <></>;
}

function Awards() {
  return <></>;
}

function Publications() {
  return <></>;
}

function References() {
  return <></>;
}

function EndNote() {
  return <></>;
}
