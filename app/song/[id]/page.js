"use client"
import { songs } from "@/data/songs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/app/context/PlayerContext";

export default function SongPage() {
    const params = useParams();
    const router = useRouter();


    const song = songs.find(
        (s) => s.id === Number(params.id)
    );

    const currentIndex = songs.findIndex(
        (s) => s.id === Number(params.id)
    );

    const handlePrevious = () => {
        if (currentIndex > 0) {
            router.push(
                `/song/${songs[currentIndex - 1].id}`
            );
        }
    };

    const handleNext = () => {
        if (currentIndex < songs.length - 1) {
            router.push(
                `/song/${songs[currentIndex + 1].id}`
            );
        }
    };

    const {
  playSong,
  togglePlayPause,
  isPlaying,
  currentTime,
  duration,
} = usePlayer();

    
    



    useEffect(() => {

        localStorage.setItem(
            "currentSong",
            JSON.stringify(song)
        );
    }, [song]);

    useEffect(() => {
        if (!song) return;

        playSong(song);

        localStorage.setItem(
            "currentSong",
            JSON.stringify(song)
        );
    }, [song]);

    useEffect(() => {
        const oldSongs =
            JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

        const filtered = oldSongs.filter(
            (item) => item.id !== song.id
        );

        const updated = [song, ...filtered].slice(0, 3);

        localStorage.setItem(
            "recentlyPlayed",
            JSON.stringify(updated)
        );
    }, [song]);

    if (!song) {
        return <h1>Song Not Found</h1>;
    }

    

    const progress =
        duration > 0
            ? (currentTime / duration) * 100
            : 0;

    const formatTime = (time) => {
        if (!time) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-blue-950 flex items-center justify-center px-6">

            {/* Hidden Audio */}
           

            {/* Back Button */}
            <Link
                href="/"
                className="
          absolute
          top-6
          left-6
          w-12
          h-12
          rounded-full
          bg-white/10
          backdrop-blur-md
          border
          border-white/10
          flex
          items-center
          justify-center
          text-white
          text-2xl
        "
            >
                ←
            </Link>

            <div className="w-full max-w-md flex flex-col items-center">

                <img
                    src={song.cover}
                    alt={song.title}
                    className="w-72 h-72 object-cover rounded-3xl shadow-2xl"
                />

                <h1 className="text-white text-3xl font-bold mt-8">
                    {song.title}
                </h1>

                <p className="text-blue-200 text-lg mt-2">
                    {song.artist}
                </p>

                {/* Progress Bar (still static for now) */}
                <div className="w-full mt-10">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-400 rounded-full transition-all"
                            style={{
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-10 mt-10">

                    <button
                        onClick={handlePrevious}
                        className="text-white text-3xl hover:scale-110 transition"
                    >
                        ⏮
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="
              w-18
              h-18
              rounded-full
              bg-cyan-400
              flex
              items-center
              justify-center
              text-3xl
              shadow-lg
              hover:scale-105
              transition
            "
                    >
                        {isPlaying ? "⏸" : "▶"}
                    </button>

                    <button
                        onClick={handleNext}
                        className="text-white text-3xl hover:scale-110 transition"
                    >
                        ⏭
                    </button>
                </div>



            </div>
        </div>
    );
}