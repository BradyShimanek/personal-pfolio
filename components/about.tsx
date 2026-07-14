import { site } from "@/lib/site";

export function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="mt-16 border-t border-border pt-8"
    >
      <h2
        id="about-heading"
        className="text-xs font-medium uppercase tracking-widest text-foreground/70"
      >
        About
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {site.bio}
      </p>
    </section>
  );
}
