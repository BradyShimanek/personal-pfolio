import { act, render, screen, waitFor } from "@testing-library/react";
import { DemoVideo } from "@/components/demo-video";

let observerCallback: IntersectionObserverCallback;
const observe = vi.fn();
const disconnect = vi.fn();

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe = observe;
      disconnect = disconnect;
      unobserve = vi.fn();
    }
  );
  mockMatchMedia(false);
});

const play = vi
  .spyOn(HTMLMediaElement.prototype, "play")
  .mockResolvedValue(undefined);
const pause = vi
  .spyOn(HTMLMediaElement.prototype, "pause")
  .mockImplementation(() => {});

it("renders a muted looping video with an aria-label", () => {
  render(<DemoVideo src="/demo.mp4" title="Capture Studio" />);
  const video = screen.getByLabelText("Capture Studio demo");
  expect(video).toHaveAttribute("loop");
  expect(video).toHaveAttribute("playsinline");
  expect(video).toHaveAttribute("preload", "none");
  expect((video as HTMLVideoElement).muted).toBe(true);
});

it("plays when in view and pauses when out of view", async () => {
  render(<DemoVideo src="/demo.mp4" title="Capture Studio" />);
  await waitFor(() => expect(observe).toHaveBeenCalled());

  act(() => {
    observerCallback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
  expect(play).toHaveBeenCalled();

  act(() => {
    observerCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
  expect(pause).toHaveBeenCalled();
});

it("shows controls and skips autoplay under prefers-reduced-motion", async () => {
  mockMatchMedia(true);
  render(<DemoVideo src="/demo.mp4" title="Capture Studio" />);
  await waitFor(() =>
    expect(screen.getByLabelText("Capture Studio demo")).toHaveAttribute(
      "controls"
    )
  );
  expect(observe).not.toHaveBeenCalled();
});

it("disconnects the observer on unmount", async () => {
  const { unmount } = render(
    <DemoVideo src="/demo.mp4" title="Capture Studio" />
  );
  await waitFor(() => expect(observe).toHaveBeenCalled());
  unmount();
  expect(disconnect).toHaveBeenCalled();
});
