import { act, render, screen, waitFor } from "@testing-library/react";
import { DemoVideo } from "@/components/demo-video";

let observerCallback: IntersectionObserverCallback;
const observe = vi.fn();
const disconnect = vi.fn();

let mediaQueryList: {
  matches: boolean;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
};
let mediaChangeCallback: (() => void) | undefined;

function mockMatchMedia(matches: boolean) {
  mediaChangeCallback = undefined;
  mediaQueryList = {
    matches,
    addEventListener: vi.fn((_event: string, cb: () => void) => {
      mediaChangeCallback = cb;
    }),
    removeEventListener: vi.fn(),
  };
  window.matchMedia = vi.fn().mockReturnValue(mediaQueryList);
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
  expect(video).not.toHaveAttribute("controls");
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

it("switches to controls when the reduced-motion preference changes", async () => {
  render(<DemoVideo src="/demo.mp4" title="Capture Studio" />);
  const video = screen.getByLabelText("Capture Studio demo");
  expect(video).not.toHaveAttribute("controls");
  expect(mediaChangeCallback).toBeDefined();

  mediaQueryList.matches = true;
  act(() => {
    mediaChangeCallback?.();
  });
  await waitFor(() => expect(video).toHaveAttribute("controls"));
});

it("disconnects the observer on unmount", async () => {
  const { unmount } = render(
    <DemoVideo src="/demo.mp4" title="Capture Studio" />
  );
  await waitFor(() => expect(observe).toHaveBeenCalled());
  unmount();
  expect(disconnect).toHaveBeenCalled();
});
