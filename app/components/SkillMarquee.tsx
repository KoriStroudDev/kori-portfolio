const skills = ["Python", "Browser automation", "Data pipelines", "Internal tools", "Practical AI", "Human approval"];

export function SkillMarquee() {
  return (
    <section className="skill-rail" aria-label="Focus areas">
      <ul className="skill-rail-track">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
