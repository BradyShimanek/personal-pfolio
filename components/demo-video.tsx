"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DemoVideoModal } from "@/components/demo-video-modal";

interface DemoVideoProps {
  src: string;
  title: string;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function DemoVideo({ src, title }: DemoVideoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isOpen) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, isOpen]);

  function handleOpen() {
    setIsOpen(true);
    videoRef.current?.pause();
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="block w-full cursor-pointer p-0 text-left"
        aria-label={`Expand ${title} demo`}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          controls={reducedMotion}
          aria-label={`${title} demo`}
          className="w-full rounded-md border border-border"
        />
      </button>
      
      {isOpen && (
        <DemoVideoModal 
          src={src} 
          title={title} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}
