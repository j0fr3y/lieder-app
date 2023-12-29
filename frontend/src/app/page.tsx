"use client";
import Image from "next/image";
import SongCard from "@/Components/SongCard";
import { use, useEffect, useState } from "react";

import MeiliSearch from "meilisearch";
import { Song } from "@/types/MeiliTypes";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  let meiliClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_HOST || "",
    apiKey: "5c7d43f30c2e888a250b06751f9fb52482d620f02baf04e5cdf2ad3c003317b7",
  });

  useEffect(() => {}, []);

  function searchSongs() {
    meiliClient.getIndex("song").then((index) => {
      index.search(searchQuery).then((searchResult) => {
        setSongs(searchResult.hits.map((hit) => hit as Song));
      });
    });
  }

  async function fetchData() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_URL + "/api/songs?populate=*",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setSongs(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <main>
      <div className="p-6">
        <h1 className="text-3xl font-semibold">AHF Songs</h1>

        <div className="mt-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Suche nach einem Lied ..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => searchSongs()}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {songs.map((song) => (
            <SongCard
              key={song.id} // Add a unique key for each song
              title={song.title}
              artist={song.artists[0].name}
              imageUrl={song.cover.url} // Assuming each song has an imageId
            />
          ))}
        </div>
      </div>
    </main>
  );
}
