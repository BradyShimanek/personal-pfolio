import { SiteHeader } from "@/components/site-header";
import { ProjectList } from "@/components/project-list";
import { About } from "@/components/about";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <SiteHeader />
      <ProjectList />
      <About />
    </main>
  );
}
