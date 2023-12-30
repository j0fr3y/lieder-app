"use client";

import React from "react";
import { useSpring, animated } from "react-spring";

interface LyricsVisualizerProps {
  lyrics: string;
}

const LyricsVisualizer: React.FC<LyricsVisualizerProps> = ({ lyrics }) => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      className="fullscreen-lyrics flex items-center justify-center"
      style={fadeIn}
    >
      <pre className="text-white text-center whitespace-pre-wrap opacity-80 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
        {lyrics}
      </pre>
    </animated.div>
  );
};

export default LyricsVisualizer;
