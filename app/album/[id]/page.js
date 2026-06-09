"use client";
import Link from "next/link";
import { albums } from "@/data/album2";
import { songs } from "@/data/songs";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default   function AlbumPage() {
     const params = useParams();
    const router = useRouter();

    const id = params.id;

    const album = albums.find(
        (a) => a.id === Number(id)
    );

    if (!album) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <h1 className="text-4xl text-white">
                    Album Not Found
                </h1>
            </div>
        );
    }

    const albumSongs = songs.filter(
        (song) => song.albumId === album.id
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-slate-950">

            {/* Back Button */}
            <Link
                href="/"
                className="
          fixed
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
          hover:bg-white/20
          transition
          z-50
        "
            >
                ←
            </Link>

            {/* Album Section */}
            <div className="max-w-6xl mx-auto px-6 pt-24">

                <div className="flex flex-col md:flex-row items-center gap-10">

                    <img
                        src={album.cover}
                        alt={album.title}
                        className="
              w-72
              h-72
              rounded-3xl
              object-cover
              shadow-2xl
            "
                    />

                    <div>

                        <p className="text-cyan-400 font-medium">
                            Album
                        </p>

                        <h1 className="text-5xl font-bold text-white mt-2">
                            {album.title}
                        </h1>

                        <h2 className="text-2xl text-gray-300 mt-3">
                            {album.artist}
                        </h2>

                        <p className="text-gray-500 mt-3">
                            {album.year} • {album.totalSongs} Songs
                        </p>

                        <button
                            className="
                mt-8
                bg-cyan-400
                text-black
                px-8
                py-3
                rounded-full
                font-bold
                hover:scale-105
                transition
              "
                        >
                            Listen Now
                        </button>

                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 mt-12"></div>

                {/* Song List Header */}
                <div className="mt-10 flex justify-between px-4 text-gray-400 text-sm uppercase tracking-wider">
                    <span>Title</span>
                    <span>Duration</span>
                </div>

                {/* Song List */}
                <div className="mt-4 flex flex-col gap-3">

                    {albumSongs.map((song, index) => (
                        <div
                            key={song.id}
                            onClick={(e) => {
                                e.preventDefault();
                                localStorage.setItem("currentSong", JSON.stringify(song));
                                router.push(`/song/${song.id}`);
                            }}
                            className="
                flex
                items-center
                justify-between
                bg-white/5
                hover:bg-white/10
                rounded-2xl
                p-4
                transition-all
                duration-300
              "
                        >
                            <div className="flex items-center gap-5">

                                <span className="text-gray-500 w-6">
                                    {index + 1}
                                </span>

                                <img
                                    src={song.cover}
                                    alt={song.title}
                                    className="
                    w-16
                    h-16
                    rounded-xl
                    object-cover
                  "
                                />

                                <div>

                                    <h3 className="text-white text-lg font-medium">
                                        {song.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm">
                                        {song.artist}
                                    </p>

                                </div>
                            </div>

                            <div className="flex items-center gap-6">

                                <span className="text-gray-400">
                                    {song.duration}
                                </span>

                                <span className="text-gray-500 text-xl">
                                    ⋮
                                </span>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>

    );
}

