"use client";

import React from "react";
import Image from "next/image";

interface SongCardProps {
  title: string;
  artist: string;
}

const SongCard: React.FC<SongCardProps> = ({ title, artist }) => {
  return (
    <div className="rounded-lg border shadow-md bg-white">
      <div className=" p-6 flex flex-col ">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-600 mt-0.5">{artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
