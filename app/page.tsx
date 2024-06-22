import resumeData from "./resume-data";

export default function Home() {
  return (
    <main>
      <h1>{resumeData.personal.name}</h1>
    </main>
  );
}
