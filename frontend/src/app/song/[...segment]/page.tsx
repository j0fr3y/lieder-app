import { notFound } from "next/navigation";
import { SongApiResponse } from "@/types/ApiTypes";
import Image from "next/image";
import PdfViewer from "@/Components/PdfViewer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
    <div className="">
      <main className="flex flex-col h-screen bg-gray-50">
        <header className="px-8 py-6 bg-white border-b shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src={
                process.env.NEXT_PUBLIC_STRAPI_URL +
                songData.data.attributes.cover.data.attributes.url
              }
              alt="Album Cover"
              width={100}
              height={100}
              className="rounded-lg object-cover w-20 h-20"
            />
            <div>
              <h1 className="text-2xl font-bold">
                {songData.data.attributes.title}
              </h1>
              <p className="text-sm text-gray-600">
                {songData.data.attributes.artists.data[0].attributes.name}
              </p>
            </div>
          </div>
        </header>
        <section className="flex-grow p-8 overflow-auto">
          <div className="bg-card text-card-foreground border border-gray-200 shadow-sm rounded-lg">
            <div className="flex justify-between items-center p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Notenblätter
              </h3>
              <Link
                href={"/lyrics/" + songData.data.id}
                className="p-2.5 text-gray-600 rounded-lg font-medium text-sm"
              >
                Lyrics anzeigen
                <FontAwesomeIcon icon={faArrowRight} className="pl-1.5" />
              </Link>
            </div>
            <div className="p-6">
              <PdfViewer
                pdfUrl={songData.data.attributes.file.data.attributes.url}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
