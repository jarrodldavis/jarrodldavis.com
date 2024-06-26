import Education from "@/app/education";
import Heading from "@/app/heading";
import Projects from "@/app/projects";
import resumeData from "@/app/resume-data";
import Skills from "@/app/skills";
import Work from "@/app/work";

export default async function Home() {
  return (
    <main className="mx-auto min-w-80 max-w-4xl p-4 font-serif sm:p-8 md:p-12">
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
