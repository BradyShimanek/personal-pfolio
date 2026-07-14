export type ProjectStatus = "shipped" | "in-development";

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  videoUrl?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    name: "Capture Studio",
    description: "Screen recording and editing for macOS.",
    status: "shipped",
    videoUrl:
      "https://qfwfxeljazfhiywlywny.supabase.co/storage/v1/object/public/demos/pfolio-capture-studio.mp4",
  },
  {
    name: "LC Finance",
    description: "Brand-deal tracking for creators.",
    status: "shipped",
    videoUrl:
      "https://qfwfxeljazfhiywlywny.supabase.co/storage/v1/object/public/demos/pfolio-lc-finance.mp4",
    href: "https://lc-finance.vercel.app/login",
  },
  {
    name: "WebSketch2",
    description: "Sketch and annotate on any website.",
    status: "in-development",
  },
];
