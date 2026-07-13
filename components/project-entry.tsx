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
            className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"
          >
            {project.name}
          </a>
        ) : (
          <span className="text-sm font-medium">{project.name}</span>
        )}
        <span className="text-xs text-muted-foreground">
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
        <div className="mt-3">
          <DemoVideo src={project.videoUrl} title={project.name} />
        </div>
      )}
    </article>
  );
}
