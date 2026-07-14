import { site } from "@/lib/site";

export function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mt-16 border-t border-border pt-8"
    >
      <h2
        id="about-heading"
        className="text-xs uppercase tracking-widest text-muted-foreground"
      >
        About
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {site.bio}
      </p>
    </section>
  );
}
