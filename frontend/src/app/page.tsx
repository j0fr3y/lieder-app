"use client";
import Image from "next/image";
import SongCard from "@/Components/SongCard";
import { use, useEffect, useState } from "react";
import { Song } from "@/types/ApiTypes";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  useEffect(() => {
    const fetchData = async () => {
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
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="p-6">
        <h1 className="text-3xl font-semibold">AHF Songs</h1>

        <div className="mt-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Suche nach einem Lied ..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {songs.map((song) => (
            <SongCard
              key={song.id} // Add a unique key for each song
              title={song.attributes.title}
              artist={song.attributes.artists.data[0].attributes.name}
              imageUrl={song.attributes.cover?.data.attributes.url} // Assuming each song has an imageId
            />
          ))}
        </div>
      </div>
    </main>
  );
}
