"use client";

import SongCard from "@/Components/SongCard";
import AgePicker from "@/Components/AgePicker";
import { use, useEffect, useState } from "react";
import Link from "next/link";

import MeiliSearch from "meilisearch";
import { Song } from "@/types/MeiliTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMagnifyingGlass,
  faXmark,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import { Organization } from "@/types/Essentials";
import { filter, set } from "lodash";

type SearchPageProps = {
  organization: Organization;
};

export default function Home({ organization }: SearchPageProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [initialSongs, setInitialSongs] = useState<Song[]>([]);

  const [agePopOver, setAgePopOver] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [initialSearch, setInitialSearch] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(100);

  let meiliClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_HOST || "",
    apiKey: process.env.NEXT_PUBLIC_MEILI_PUBLIC_KEY || "",
  });

  function searchSongs(query: string = searchQuery) {
    meiliClient.getIndex("song").then((index) => {
      index.search(query).then((searchResult) => {
        let newSongs = searchResult.hits.map((hit) => hit as Song);
        setSongs(newSongs);
        setInitialSongs(newSongs);
        createTags(newSongs);
      });
    });
  }

  useEffect(() => {
    if (!initialSearch) {
      searchSongs();
      setInitialSearch(true);
    }
    filterSongs(activeTags, minAge, maxAge, agePopOver);
  }, [searchQuery, activeTags, minAge, maxAge, agePopOver]);

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
      let songTags = song.tags?.split("\n") ?? [];
      if (songTags) {
        songTags.forEach((tag) => {
          if (!protoTags.includes(tag)) {
            protoTags.push(tag);
          }
        });
      }
    });
    setTags(protoTags);
  }

  function appendTag(tag: string) {
    setActiveTags([...activeTags, tag]);
    setTags(tags.filter((t) => t !== tag));
    filterSongs([...activeTags, tag]);
  }

  function removeTag(tag: string) {
    setActiveTags(activeTags.filter((t) => t !== tag));
    setTags([...tags, tag]);

    filterSongs(activeTags.filter((t) => t !== tag));
  }

  function toggleAgePopOver() {
    setAgePopOver(!agePopOver);
    filterSongs(activeTags, 0, 100, !agePopOver);
  }

  function filterSongs(
    filterTags: string[],
    ageMin: number = 0,
    ageMax: number = 100,
    filterAge: boolean | null = null
  ) {
    let filteredSongs: Song[] = initialSongs;
    if (filterTags.length == 0) {
      filteredSongs = initialSongs;
    } else {
      filteredSongs = filteredSongs.filter((song) => {
        let songTags = song.tags?.split("\n") ?? [];
        if (songTags) {
          return filterTags.some((tag) => songTags.includes(tag));
        }
        return false;
      });
    }

    if (filterAge !== null && filterAge) {
      filteredSongs = filteredSongs.filter((song) => {
        if (song.minAge !== null && song.maxAge !== null) {
          return song.minAge >= ageMin && song.maxAge <= ageMax;
        }
        if (song.minAge !== null) {
          return song.minAge >= ageMin;
        }
        if (song.maxAge !== null) {
          return song.maxAge <= ageMax;
        }
        return false;
      });
    }

    setSongs(filteredSongs);
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

      <div className="flex flex-wrap justify-center mt-6 mx-8 ">
        {activeTags.map((tag, index) => (
          <button
            onClick={() => removeTag(tag)}
            key={index}
            className="flex justify-center align-middle items-center w-min text-sm bg-gray-300 rounded-full whitespace-nowrap m-1.5 "
          >
            <span className="text-gray-900 px-2 py-1 text-center text-nowrap">
              {tag}
              <FontAwesomeIcon
                icon={faXmark}
                className=" ml-2 text-gray-900 "
              />
            </span>
          </button>
        ))}
        {tags.map((tag, index) => (
          <button
            onClick={() => appendTag(tag)}
            key={index}
            className="flex justify-center align-middle items-center w-min text-sm bg-gray-200 rounded-full whitespace-nowrap m-1.5 "
          >
            <span className="text-gray-800 px-2 py-1 text-center text-nowrap">
              {tag}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center mx-8 mt-4">
        <button
          onClick={() => {
            toggleAgePopOver();
          }}
          className={`${
            agePopOver
              ? "bg-gray-300 text-gray-900"
              : "bg-gray-200 text-gray-800"
          } px-3 py-1.5 rounded-lg text-sm `}
        >
          Nach Alter filtern{" "}
          {agePopOver && <FontAwesomeIcon icon={faXmark} className="ml-1" />}
        </button>
      </div>
      {agePopOver && (
        <div className="flex flex-wrap justify-center mx-8 mt-6">
          <AgePicker
            onAgeChange={(ageMin, ageMax) => {
              filterSongs(activeTags, ageMin, ageMax, true);
              setMinAge(ageMin);
              setMaxAge(ageMax);
            }}
          />
        </div>
      )}

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
            href={
              (organization != null ? "/" + organization : "") +
              "/song/" +
              song.id +
              "/" +
              createSeoFriendlyUrl(song.title)
            }
            key={index}
          >
            <SongCard
              key={song.id} // Add a unique key for each song
              title={song.title}
              artist={
                song.artists && song.artists.length > 0
                  ? song.artists[0].name
                  : "Unbekannter Künstler"
              }
              tagsText={song.tags || ""}
            />
          </Link>
        ))}
      </div>
      {songs.length == 0 && (
        <div className="flex flex-col justify-center text-center text-gray-500">
          <p className="text-xl sm:text-2xl">Keine Lieder gefunden</p>
          <p className="text-base sm:text-lg">
            Versuche es mit einem anderen Suchbegriff
          </p>
        </div>
      )}
    </main>
  );
}
