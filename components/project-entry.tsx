import { Badge } from "@/components/ui/badge";
import { DemoVideo } from "@/components/demo-video";
import type { Project } from "@/lib/projects";

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold underline underline-offset-4 hover:text-muted-foreground"
          >
            {project.name}
          </a>
        ) : (
          <span className="text-base font-semibold">{project.name}</span>
        )}
        <span className="text-sm text-muted-foreground">
          <span aria-hidden="true">— </span>
          {project.description}
        </span>
        {project.status === "in-development" && (
          <Badge variant="outline" className="text-[10px] text-muted-foreground">
            In development
          </Badge>
        )}
      </div>
      {project.videoUrl && (
        <div className="mt-4 gap-6 md:flex md:items-start">
          <div className="md:w-3/5 md:shrink-0">
            <DemoVideo src={project.videoUrl} title={project.name} />
          </div>
          {project.highlights && (
            <ul className="mt-4 list-none space-y-2.5 p-0 text-sm leading-relaxed text-muted-foreground md:mt-1">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {project.note && (
        <p className="mt-3 text-xs italic text-muted-foreground">
          {project.note}
        </p>
      )}
    </article>
  );
}
