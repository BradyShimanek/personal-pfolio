import { projects } from "@/lib/projects";
import { ProjectEntry } from "@/components/project-entry";

export function ProjectList() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="mt-16 border-t border-border pt-8"
    >
      <h2
        id="projects-heading"
        className="text-xs uppercase tracking-widest text-muted-foreground"
      >
        Projects
      </h2>
      <ul className="list-none p-0">
        {projects.map((project) => (
          <li
            key={project.name}
            className="mt-6 border-t border-border pt-6 first:mt-4 first:border-t-0 first:pt-0"
          >
            <ProjectEntry project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
