import { render, screen } from "@testing-library/react";
import { ProjectEntry } from "@/components/project-entry";
import { ProjectList } from "@/components/project-list";
import { projects, type Project } from "@/lib/projects";

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
  );
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
});

const shipped: Project = {
  name: "Capture Studio",
  description: "Screen recording and editing for macOS.",
  status: "shipped",
  videoUrl: "/demo.mp4",
  href: "https://example.com",
  highlights: ["Records your screen.", "Edits itself."],
  note: "Recorded with itself.",
};

const inDev: Project = {
  name: "WebSketch2",
  description: "Sketch and annotate on any website.",
  status: "in-development",
};

it("renders the name as a link when href exists", () => {
  render(<ProjectEntry project={shipped} />);
  const link = screen.getByRole("link", { name: "Capture Studio" });
  expect(link).toHaveAttribute("href", "https://example.com");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

it("renders plain text name when no href", () => {
  render(<ProjectEntry project={inDev} />);
  expect(screen.queryByRole("link", { name: "WebSketch2" })).toBeNull();
  expect(screen.getByText("WebSketch2")).toBeInTheDocument();
});

it("shows the in-development badge only for in-development projects", () => {
  const { rerender } = render(<ProjectEntry project={inDev} />);
  expect(screen.getByText("In development")).toBeInTheDocument();
  rerender(<ProjectEntry project={shipped} />);
  expect(screen.queryByText("In development")).toBeNull();
});

it("renders a video only when videoUrl exists", () => {
  const { rerender } = render(<ProjectEntry project={shipped} />);
  expect(screen.getByLabelText("Capture Studio demo")).toBeInTheDocument();
  rerender(<ProjectEntry project={inDev} />);
  expect(screen.queryByLabelText(/demo/)).toBeNull();
});

it("renders each highlight when highlights exist", () => {
  render(<ProjectEntry project={shipped} />);
  expect(screen.getByText("Records your screen.")).toBeInTheDocument();
  expect(screen.getByText("Edits itself.")).toBeInTheDocument();
});

it("renders no highlight list when highlights are absent", () => {
  render(<ProjectEntry project={inDev} />);
  expect(screen.queryByRole("list")).toBeNull();
});

it("renders the note only when one exists", () => {
  const { rerender } = render(<ProjectEntry project={shipped} />);
  expect(screen.getByText("Recorded with itself.")).toBeInTheDocument();
  rerender(<ProjectEntry project={inDev} />);
  expect(screen.queryByText("Recorded with itself.")).toBeNull();
});

it("ProjectList renders every project under a Projects heading", () => {
  render(<ProjectList />);
  expect(
    screen.getByRole("heading", { name: /projects/i })
  ).toBeInTheDocument();
  for (const p of projects) {
    expect(screen.getByText(p.name)).toBeInTheDocument();
  }
});
