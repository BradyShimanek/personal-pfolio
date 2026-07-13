export type ProjectStatus = "shipped" | "in-development";

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  videoUrl?: string;
  href?: string;
}

// Placeholder until real demos are uploaded to Supabase Storage (see README).
const PLACEHOLDER_VIDEO =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const projects: Project[] = [
  {
    name: "Capture Studio",
    description: "Screen recording and editing for macOS.",
    status: "shipped",
    videoUrl: PLACEHOLDER_VIDEO,
  },
  {
    name: "LC Finance",
    description: "Brand-deal tracking for creators.",
    status: "shipped",
    videoUrl: PLACEHOLDER_VIDEO,
    href: "https://lc-finance.vercel.app/login",
  },
  {
    name: "WebSketch2",
    description: "Sketch and annotate on any website.",
    status: "in-development",
  },
];
