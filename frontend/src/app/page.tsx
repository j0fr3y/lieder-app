"use client";
import Image from "next/image";
import SongCard from "@/Components/SongCard";
import { use, useEffect, useState } from "react";
import Link from "next/link";

import MeiliSearch from "meilisearch";
import { Song } from "@/types/MeiliTypes";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  let meiliClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_HOST || "",
    apiKey: "5c7d43f30c2e888a250b06751f9fb52482d620f02baf04e5cdf2ad3c003317b7",
  });

  useEffect(() => {
    searchSongs();
  }, []);

  function searchSongs() {
    meiliClient.getIndex("song").then((index) => {
      index.search(searchQuery).then((searchResult) => {
        setSongs(searchResult.hits.map((hit) => hit as Song));
      });
    });
  }

  function createSeoFriendlyUrl(title: string) {
    // Convert to lowercase
    let url = title.toLowerCase();

    // Replace spaces with dashes
    url = url.replace(/\s+/g, "-");

    // Remove special characters
    url = url.replace(/[^\w-]+/g, "");

    return url;
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-8">
        <h1 className="text-4xl font-semibold">AHF Songs</h1>

        <input
          type="text"
          className=" px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Suche nach einem Lied ..."
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => searchSongs()}
        />
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {songs.map((song) => (
          <Link
            href={"/song/" + song.id + "/" + createSeoFriendlyUrl(song.title)}
          >
            <SongCard
              key={song.id} // Add a unique key for each song
              title={song.title}
              artist={song.artists[0].name}
              imageUrl={song.cover.url} // Assuming each song has an imageId
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
