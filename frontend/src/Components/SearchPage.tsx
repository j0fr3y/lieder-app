"use client";

import SongCard from "@/Components/SongCard";
import { use, useEffect, useState } from "react";
import Link from "next/link";

import MeiliSearch from "meilisearch";
import { Song } from "@/types/MeiliTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import PlausibleProvider, { usePlausible } from "next-plausible";
import { get } from "http";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialSearch, setInitialSearch] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  let meiliClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_HOST || "",
    apiKey: process.env.NEXT_PUBLIC_MEILI_PUBLIC_KEY || "",
  });

  function searchSongs(query: string = searchQuery) {
    meiliClient.getIndex("song").then((index) => {
      index.search(query).then((searchResult) => {
        let newSongs = searchResult.hits.map((hit) => hit as Song);
        setSongs(newSongs);
        createTags(newSongs);
      });
    });
  }

  useEffect(() => {
    if (!initialSearch) {
      searchSongs();
      setInitialSearch(true);
    }
  });

  function createSeoFriendlyUrl(title: string) {
    // Convert to lowercase
    let url = title.toLowerCase();

    // Replace spaces with dashes
    url = url.replace(/\s+/g, "-");

    // Remove special characters
    url = url.replace(/[^\w-]+/g, "");

    return url;
  }

  function createTags(psongs: Song[] = songs) {
    let protoTags: string[] = [];
    psongs.forEach((song) => {
      let songTags = song.tags?.split("\n");
      if (songTags) {
        protoTags.push(...songTags);
      }
    });
    setTags(protoTags);
  }

  function appendTag(tag: string) {
    setSearchQuery(searchQuery + " " + tag);
    searchSongs(searchQuery + " " + tag);
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-6 sm:p-8">
        <h1 className="text-4xl font-semibold">AHF Songs</h1>

        <div className="flex items-center sm:visible collapse">
          <input
            type="text"
            className=" px-4 py-2 border border-gray-300 rounded-md w-40 sm:w-60"
            placeholder="Suche nach einem Lied ..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => searchSongs()}
            value={searchQuery}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" pl-4 text-gray-400 "
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center pt-8 mx-8">
        {tags.map((tag, index) => (
          <div
            onClick={() => appendTag(tag)}
            key={index}
            className="flex justify-center align-middle items-center w-min text-sm bg-gray-200 rounded-full whitespace-nowrap m-1.5 "
          >
            <span className="text-gray-800 px-2 py-1 text-center text-nowrap">
              {tag}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 sm:hidden mx-8">
        <input
          type="text"
          className=" px-4 py-2 border border-gray-300 rounded-md w-full"
          placeholder="Suche nach einem Lied ..."
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyUp={(e) => searchSongs()}
          value={searchQuery}
        />
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {songs.map((song, index) => (
          <Link
            href={"/song/" + song.id + "/" + createSeoFriendlyUrl(song.title)}
            key={index}
          >
            <SongCard
              key={song.id} // Add a unique key for each song
              title={song.title}
              artist={song.artists[0].name}
              tagsText={song.tags || ""}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
