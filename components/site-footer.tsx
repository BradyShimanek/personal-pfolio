import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-16 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-8 text-sm text-muted-foreground">
      <p>{site.name}</p>
      <nav>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          GitHub
        </a>
        {" · "}
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          LinkedIn
        </a>
        {" · "}
        <a
          href={`mailto:${site.email}`}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Email
        </a>
      </nav>
    </footer>
  );
}
