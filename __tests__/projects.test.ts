import { projects } from "@/lib/projects";

describe("project data", () => {
  it("has at least three projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it("every project has a name and a punctuated description", () => {
    for (const p of projects) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.description.endsWith(".")).toBe(true);
    }
  });

  it("every shipped project has a demo video", () => {
    for (const p of projects.filter((p) => p.status === "shipped")) {
      expect(p.videoUrl, `${p.name} should have a videoUrl`).toBeTruthy();
    }
  });
});
