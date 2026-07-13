import { site } from "@/lib/site";

export function About() {
  return (
    <section aria-labelledby="about-heading">
      <h2
        id="about-heading"
        className="mt-16 text-xs uppercase tracking-widest text-muted-foreground"
      >
        About
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {site.bio}
      </p>
    </section>
  );
}
