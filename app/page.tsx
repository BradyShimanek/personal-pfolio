import { SiteHeader } from "@/components/site-header";
import { ProjectList } from "@/components/project-list";
import { About } from "@/components/about";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <SiteHeader />
      <ProjectList />
      <About />
      <SiteFooter />
    </main>
  );
}
