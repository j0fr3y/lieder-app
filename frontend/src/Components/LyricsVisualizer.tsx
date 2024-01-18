"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";

interface LyricsVisualizerProps {
  lyrics: string;
}

const LyricsVisualizer: React.FC<LyricsVisualizerProps> = ({ lyrics }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number | string>("6xl");
  const handleResize = () => {
    if (window !== undefined) {
      const availableWidth = window.innerWidth;
      const lyricsArray = lyrics.split("\n");

      // Calculate the maximum font size for each line
      var maxFontSize = Math.floor(availableWidth / lyricsArray[0].length);

      // Set the font size dynamically
      setFontSize(`${Math.max(10, maxFontSize)}px`);
    }
  };
  useLayoutEffect(() => {
    // Call the handleResize function on initial load
    handleResize();

    // Add event listener for resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [lyrics]);

  return (
    <div ref={containerRef}>
      <animated.h1 className={`font-bold `} style={{ fontSize }}>
        {lyrics.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </animated.h1>
    </div>
  );
};

export default LyricsVisualizer;
