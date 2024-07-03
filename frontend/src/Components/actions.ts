"use server";

import { SongApiResponse, SongsApiResponse, File } from "@/types/ApiTypes";
import { Song } from "@/types/MeiliTypes";
import MeiliSearch from "meilisearch";

let meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST || "",
  apiKey: process.env.NEXT_PUBLIC_MEILI_PUBLIC_KEY || "",
});

export async function searchInSongs(query: string): Promise<Song[]> {
  if (query == "") {
    return meiliClient.getIndex("song").then((index) => {
      return index.getDocuments({ limit: 9000 }).then((documents) => {
        return documents.results.map(
          (doc) => (doc as Song) || { id: 0, title: "No title" }
        );
      });
    });
  }

  return meiliClient.getIndex("song").then((index) => {
    return index.search(query).then((searchResult) => {
      return searchResult.hits.map((hit) => hit as Song);
    });
  });
}

export async function getSongData(songId: number) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/songs/" + songId + "?populate=*",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data" + response.url);
  }

  return response.json() as Promise<SongApiResponse>;
}
