"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { recentlyPlayed } from "@/data/album";
import { albums } from "@/data/album2";
import { songs } from "@/data/songs";


export default function Home() {

  const [recentSongs, setRecentSongs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadRecentSongs = () => {
      const songs =
        JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

      setRecentSongs(songs);
    };

    loadRecentSongs();

    window.addEventListener("focus", loadRecentSongs);

    return () =>
      window.removeEventListener("focus", loadRecentSongs);
  }, []);

  const filteredAlbums = albums.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.artist.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <div className="navbar">
        <div className="flex gap-10 items-center justify-center">
          <img src="logo.png" alt="logo" width="200" height="200" />
        </div>

        <div className="flex gap-10 items-center justify-center relative w-full">
          <img
            src="/search1.gif"
            alt="Search"
            className="absolute left-10 top-1/2 h-6 w-6 -translate-y-1/2"
          />
          <input
            className="border-blue-300 text-white border p-3 pl-10 w-[40vh] rounded-4xl bg-slate-950"
            type="text"
            placeholder="Search albums, artists, songs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {search && (
        <div className="mt-6 bg-slate-900 rounded-2xl p-4">

          <h2 className="text-white text-lg font-bold mb-3">
            Songs
          </h2>

          {filteredSongs.map((song) => (
            <Link
              key={song.id}
              href={`/song/${song.id}`}
              className="flex items-center gap-3 py-2"
            >
              <img
                src={song.cover}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div>
                <p className="text-white">{song.title}</p>
                <p className="text-gray-400 text-sm">
                  {song.artist}
                </p>
              </div>
            </Link>
          ))}

          <h2 className="text-white text-lg font-bold mt-5 mb-3">
            Albums
          </h2>

          {filteredAlbums.map((album) => (
            <Link
              key={album.id}
              href={`/album/${album.id}`}
              className="flex items-center gap-3 py-2"
            >
              <img
                src={album.cover}
                alt={album.title}
                className="w-12 h-12 rounded-lg object-cover"
              />

              <div>
                <p className="text-white">{album.title}</p>
                <p className="text-gray-400 text-sm">
                  {album.artist}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1 mt-10 m-8">
        <h1 className="text-2xl font-bold text-white">Welcome Ria,</h1>
        <h1 className="text-xl font-bold text-white">Your Recently Played,</h1>
        <div className="grid grid-cols-3 gap-8">
          {recentSongs.map((song) => (
            <Link
              key={song.id}
              href={`/song/${song.id}`}
              className="
        flex flex-col
        overflow-hidden
        hover:scale-105
        transition-transform
        duration-300
      "
            >
              <img
                src={song.cover}
                alt={song.title}
                className="w-40 h-20 object-cover rounded-lg"
              />

              <span className="text-sm text-white mt-2">
                {song.title}
              </span>

              <span className="text-[15px] text-gray-400">
                {song.artist}
              </span>
            </Link>
          ))}
        </div>
        <div className="grid mb-[10vh] grid-cols-1 gap-4 mt-6">
          {albums.map((item) => (
            <Link
              key={item.id}
              href={`/album/${item.id}`}
              className="w-full min-h-[220px] flex items-center gap-6 rounded-3xl bg-slate-900/80 p-6 hover:bg-slate-800 transition-all duration-300 hover:scale-[1.01]"
            >
              <img
                src={item.cover}
                alt={item.title}
                className="w-40 h-40 object-cover rounded-2xl shadow-lg"
              />

              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <h4 className="text-lg text-gray-400 mt-1">
                  {item.artist}
                </h4>

                <div className="flex gap-3 mt-2 text-sm text-gray-500">
                  <span>{item.year}</span>
                  <span>•</span>
                  <span>{item.totalSongs} Songs</span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <img
                    src="/play.gif"
                    alt="play"
                    className="h-10 w-10"
                  />

                  <img
                    src="/arrow.gif"
                    alt="next"
                    className="h-8 w-8"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>


      </div>
    </div>
  );
}
