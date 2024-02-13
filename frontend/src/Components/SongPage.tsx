"use client";
import { notFound } from "next/navigation";
import { SongApiResponse } from "@/types/ApiTypes";

import PdfViewer from "@/Components/PdfViewer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

async function getSongData(songId: number) {
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
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function PageSong({
  params,
}: {
  params: { segment: string[] };
}) {
  const router = useRouter();

  // check if the first segment is a number
  if (isNaN(Number(params.segment[0]))) {
    return notFound();
  }
  let songData: SongApiResponse = await getSongData(Number(params.segment[0]));

  return (
    <div className="">
      <main className=" min-h-screen bg-gray-50">
        <header className="px-8 py-6 bg-white border-b shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold">
                {songData.data.attributes.title}
              </h1>
              <p className="text-sm text-gray-600">
                {songData?.data?.attributes?.artists?.data[0]?.attributes
                  ?.name ?? "No artist available"}
              </p>
            </div>
          </div>
        </header>
        <button onClick={() => router.back()} className="text-gray-600 p-8">
          <FontAwesomeIcon icon={faChevronLeft} scale={1} /> Zurück
        </button>
        <section className="flex-grow p-8 pt-0 ">
          <div className="border border-gray-200 shadow-sm rounded-lg">
            <div className="flex justify-between items-center p-4 pb-0 sm:p-6">
              <h3 className="text-2xl font-semibold">Notenblätter</h3>
              <Link
                href={"/lyrics/" + songData.data.id}
                className={` ${
                  songData.data.attributes.lyrics !== null
                    ? "visible"
                    : "invisible"
                }
                  p-2.5 text-gray-600 rounded-lg font-medium text-sm `}
              >
                <p>Lyrics</p> anzeigen
                <FontAwesomeIcon icon={faArrowRight} className="pl-1.5" />
              </Link>
            </div>
            <div className="p-6 pt-0">
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
