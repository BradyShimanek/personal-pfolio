import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header>
      <h1 className="text-2xl font-semibold">{site.name}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {site.tagline}
      </p>
      <nav className="mt-2 text-sm text-muted-foreground">
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
        href={site.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-foreground"
        >
        X.com
        </a>
        {" · "}
        <a
          href={`mailto:${site.email}`}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Email
        </a>
      </nav>
    </header>
  );
}
