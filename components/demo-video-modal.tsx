"use client"

import { useEffect, useRef, useState } from "react";

interface DemoVideoModalProps {
    src: string;
    title: string;
    onClose: () => void;
}

export function DemoVideoModal({ src, title, onClose }: DemoVideoModalProps) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const playPauseRef = useRef<HTMLButtonElement>(null); 
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const hideControlsTimeoutRef = useRef<number | null>(null);


    useEffect(() => {
        playPauseRef.current?.focus(); 
        videoRef.current?.play().catch(() => {});

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
            if (hideControlsTimeoutRef.current !== null) {
                window.clearTimeout(hideControlsTimeoutRef.current);
            }
        };
    }, [onClose]);

    function togglePlayback() {
        const video = videoRef.current;
        if (!video) return;
        
        if (video.paused) {
            video.play().catch(() => {});
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }

        setShowControls(true);

        if (hideControlsTimeoutRef.current !== null) {
            window.clearTimeout(hideControlsTimeoutRef.current);
        }

        hideControlsTimeoutRef.current = window.setTimeout(() => {
            setShowControls(false);
        }, 1000);

    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} demo`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-7xl" // modified: was max-w-5xl — larger modal video
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    loop
                    playsInline
                    className="max-h-[85vh] w-full rounded-md object-contain" // modified: cap height, keep aspect
                    aria-label={`${title} demo`}
                />

                <button
                    ref={playPauseRef} 
                    type="button"
                    onClick={togglePlayback}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className={`absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-black/50 text-white transition-opacity hover:bg-black/70 ${showControls ? "opacity-100" : "opacity-0"}`}
                >
                    {isPlaying ? (
                    // pause icon
                    <span className="flex gap-1" aria-hidden="true">
                        <span className="h-5 w-1.5 rounded-sm bg-white" />
                        <span className="h-5 w-1.5 rounded-sm bg-white" />
                    </span>
                    ) : (
                    // play icon
                    <span
                        aria-hidden="true"
                        className="ml-1 size-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white"
                    />
                    )}                    
                </button>

                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
