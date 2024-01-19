import { notFound } from "next/navigation";
import { SongApiResponse } from "@/types/ApiTypes";
import LyricsVisualizer from "@/Components/LyricsVisualizer";

async function getSongData(songId: number) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_URL + "/api/songs/" + songId + "?populate=*",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function PageSong({
  params,
}: {
  params: { segment: string[] };
}) {
  // check if the first segment is a number
  if (isNaN(Number(params.segment[0]))) {
    return notFound();
  }
  let songData: SongApiResponse = await getSongData(Number(params.segment[0]));

  return (
    <div>
      <LyricsVisualizer lyrics={songData.data.attributes.lyrics ?? ""} />
    </div>
  );
}
