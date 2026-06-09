"use client";

import Link from "next/link";
import { usePlayer } from "@/app/context/PlayerContext";

export default function FooterPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <footer
      className="
      fixed
      bottom-3
      left-1/2
      -translate-x-1/2
      w-[95%]
      h-20
      rounded-2xl
      bg-black/40
      backdrop-blur-xl
      border
      border-cyan-500/20
      z-50
    "
    >
      <div className="h-full px-4 flex items-center gap-3">

        <Link
          href={`/song/${currentSong.id}`}
          className="flex items-center gap-3 flex-1"
        >
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-12 h-12 rounded-xl object-cover"
          />

          <div>
            <h3 className="text-white text-sm font-semibold">
              {currentSong.title}
            </h3>

            <p className="text-gray-400 text-xs">
              {currentSong.artist}
            </p>
          </div>
        </Link>

        <button
          onClick={togglePlayPause}
          className="
          w-11
          h-11
          rounded-full
          bg-gradient-to-r
          from-cyan-400
          to-blue-500
          flex
          items-center
          justify-center
          text-black
          font-bold
          text-lg
        "
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

      </div>
    </footer>
  );
}