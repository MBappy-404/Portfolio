"use client";
import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const MUSIC_SRC = "/themeSong.mp3";

export default function MusicPlayerButton() {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [modalOpen, setModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userInteractedRef = useRef(false);

  // Handle initial play after any user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteractedRef.current && audioRef.current) {
        userInteractedRef.current = true;
        audioRef.current.volume = volume;
        audioRef.current
          .play()
          .then(() => setPlaying(true))
          .catch((e) => console.error("Autoplay failed:", e));
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [volume]);

  // Set initial volume on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          alert("Unable to play music. Please interact with the page first.");
        });
    }
  };

  const changeVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Enhanced animated music icon
  const MusicIcon = () => (
    <span className="relative flex items-center  justify-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-lg"
      >
        <circle cx="12" cy="12" r="12" fill="#6c2bd9"/>
        <path
          d="M9 17V7l8-2v10"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="17" r="2" fill="#fff" />
        <circle cx="17" cy="15" r="2" fill="#fff" />
        <defs>
          <radialGradient id="grad" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </radialGradient>
        </defs>
      </svg>
    </span>
  );

  return (
    <div className="px-2">
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {/* Floating music button */}
      <div className="fixed bottom-5 right-5 z-[100] pointer-events-auto">
        <button
          onClick={() => setModalOpen(true)}
          aria-label="Open music player"
          className="bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer backdrop-blur-lg rounded-full p-2 shadow-lg border border-gray-400 dark:border-gray-700 flex items-center justify-center"
        >
          <MusicIcon />
        </button>
      </div>

      {/* Music controls modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[101] flex items-center px-1 justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-2xl p-12 min-w-[360px] max-w-[95vw] flex flex-col items-center gap-8 border border-gray-300 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4">
             
              {playing ? (
                <div className=" flex items-end justify-center bg-[#6c2bd9] rounded-full w-[40px] h-[40px] space-x-0.5">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-1 bg-white rounded-t -translate-y-3 opacity-70"
                      style={{
                        height: `${Math.floor(Math.random() * 10) + 5}px`,
                        animation: `pulse 0.${i + 3}s infinite alternate`,
                      }}
                    />
                  ))}
                </div>
              ) :  <MusicIcon   />}
              <span
                className={`px-4 py-2 rounded-full text-base font-semibold ${
                  playing
                    ? "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900"
                    : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                } shadow-lg`}
              >
                {playing ? "Music On" : "Music Off"}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={toggleMusic}
                className="bg-gray-200 cursor-pointer dark:bg-gray-800 backdrop-blur-lg rounded-full p-5 shadow border border-gray-400 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition"
                aria-label={playing ? "Pause music" : "Play music"}
              >
                {playing ? (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#6b7280" />
                  </svg>
                ) : (
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7L8 5z" fill="#6b7280" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 bg-gray-200 dark:bg-gray-800 backdrop-blur-lg rounded-full px-6 py-3 shadow border border-gray-400 dark:border-gray-700">
              <button
                onClick={() => changeVolume(-0.1)}
                className="text-2xl px-1 py-1 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label="Decrease volume"
              >
                <MinusCircle/>
              </button>
              <span className="text-base font-medium w-12 text-center">
                {Math.round(volume * 100)}
              </span>
              <button
                onClick={() => changeVolume(0.1)}
                className="text-2xl px-1 py-1 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label="Increase volume"
              >
                <PlusCircle/>
              </button>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 cursor-pointer text-2xl bg-gray-200 dark:bg-gray-800 rounded-full px-3 py-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            height: 5px;
            opacity: 0.4;
          }
          100% {
            height: 15px;
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
