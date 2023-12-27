"use client";

import React from "react";
import Image from "next/image";

interface SongCardProps {
  title: string;
  artist: string;
  imageUrl: string;
}

const SongCard: React.FC<SongCardProps> = ({ title, artist, imageUrl }) => {
  // Assuming your image URL follows a pattern like "/images/{imageId}.jpg"
  imageUrl = process.env.NEXT_PUBLIC_STRAPI_URL + imageUrl;

  return (
    <div className="rounded-lg border shadow-md">
      <div className=" m-6 flex flex-col items-center ">
        <Image
          src={imageUrl}
          alt="Album artwork"
          width={150} // Set the desired width
          height={150} // Set the desired height
          className="object-cover rounded-lg"
        />
        <h3 className="text-lg font-medium text-gray-800 mt-2">{title}</h3>
        <p className="text-sm text-gray-600">{artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
