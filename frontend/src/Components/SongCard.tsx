"use client";

import React from "react";
import Image from "next/image";

interface SongCardProps {
  title: string;
  artist: string;
  tagsText: string;
}

const SongCard: React.FC<SongCardProps> = ({ title, artist, tagsText }) => {
  let songTags: string[] = [];

  if (tagsText) {
    songTags = tagsText.split("\n");
  }

  return (
    <div className="rounded-lg border shadow-md bg-white">
      <div className=" p-6 flex flex-col">
        <div className="flex">
          <h3 className="text-lg font-medium pr-3">{title}</h3>
          <div className="flex flex-wrap">
            {songTags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 text-gray-800  rounded-full px-2 py-1 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-0.5">{artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
