export type ProjectStatus = "shipped" | "in-development";

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  videoUrl?: string;
  href?: string;
  highlights?: string[];
  note?: string;
}

export const projects: Project[] = [
  {
    name: "Capture Studio",
    description: "Sleek screen recording and editing for macOS.",
    status: "shipped",
    note: "Every demo on this page was recorded and edited with Capture Studio.",
    videoUrl:
      "https://qfwfxeljazfhiywlywny.supabase.co/storage/v1/object/public/demos/60fpscapturestudioDEMO.mp4",
    highlights: [
      "Captures beautiful, performant recordings of your screen. Perfect for demos, tutorials, and more.",
      "Automatic, premium edits. Smooth zooms and cuts, no timeline fiddling.",
      "AI-powered captions with accurate timestamps, generated locally & straight from your voice.",
      "Native macOS app built with Swift, SwiftUI, and ScreenCaptureKit.",
    ],
  },
  {
    name: "LC Finance",
    description: "Brand-deal tracking for creators.",
    status: "shipped",
    videoUrl:
      "https://qfwfxeljazfhiywlywny.supabase.co/storage/v1/object/public/demos/NEW-pfolio-lc-finance.mp4",
    href: "https://lc-finance.vercel.app/login",
    highlights: [
      "Tracks brand deals from first pitch to final payment.",
      "Year-to-date revenue at a glance — earned, paid, and outstanding.",
      "Flags upcoming due dates so no invoice slips through.",
      "Full-stack web app built with Next.js, TypeScript, and Supabase.",
    ],
  },
  {
    name: "WebSketch2",
    description: "Sketch and annotate on any website.",
    status: "in-development",
    videoUrl:
      "https://qfwfxeljazfhiywlywny.supabase.co/storage/v1/object/public/demos/portfolio-websketch.mp4",
    highlights: [
      "Draw, highlight, and annotate directly on any live webpage.",
      "Made for design feedback, walkthroughs, and quick demos.",
      "Chrome extension — one click to start sketching, one to clear.",
    ],
  },
];
