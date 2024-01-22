"use client";
import { set } from "lodash";
import React, { useLayoutEffect, useState } from "react";
import "./LyricsVisualizer.css";

interface LyricsVisualizerProps {
  lyrics: string;
}

const LyricsVisualizer: React.FC<LyricsVisualizerProps> = ({ lyrics }) => {
  let [currentLine, setCurrentLine] = useState(0);

  let [userIsScrolling, setUserIsScrolling] = useState(false);
  let lastScrollPosition = 0;

  let lyricsArray = lyrics.split("\n");

  function onScroll() {
    if (userIsScrolling) {
      let visibleLineIndex = getFirstVisibleLineIndex();

      if (visibleLineIndex < lyricsArray.length - 1) {
        setCurrentLine(visibleLineIndex);
      }
      return;
    }

    focusOnLine(currentLine);
  }

  function focusOnLine(line: number) {
    let element = document.getElementById("line" + line);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }

  function moveForward() {
    if (currentLine + 1 < lyricsArray.length) {
      setCurrentLine(currentLine + 1);
      focusOnLine(currentLine);
    }
  }

  function moveBackward() {
    if (currentLine - 1 >= 0) {
      setCurrentLine(currentLine - 1);
      focusOnLine(currentLine);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown") {
      moveForward();
    } else if (event.key === "ArrowUp") {
      moveBackward();
    } else if (event.key === "ArrowRight") {
      moveForward();
    } else if (event.key === "ArrowLeft") {
      moveBackward();
    }
    setUserIsScrolling(false);
  }

  function handleWheel(event: WheelEvent) {
    setUserIsScrolling(true);
  }

  function getLastVisibleLineIndex() {
    let lastVisibleLineIndex = 0;
    for (let i = 0; i < lyricsArray.length; i++) {
      let element = document.getElementById("line" + i);
      if (element) {
        let rect = element.getBoundingClientRect();
        if (rect.top > 0 && rect.bottom < window.innerHeight) {
          lastVisibleLineIndex = i;
        }
      }
    }
    return lastVisibleLineIndex;
  }

  function getFirstVisibleLineIndex() {
    let firstVisibleLineIndex = 0;
    for (let i = 0; i < lyricsArray.length; i++) {
      let element = document.getElementById("line" + i);
      if (element) {
        let rect = element.getBoundingClientRect();
        if (rect.top > 0 && rect.bottom < window.innerHeight) {
          firstVisibleLineIndex = i;
          break;
        }
      }
    }
    return firstVisibleLineIndex;
  }

  function handleTouch(event: TouchEvent) {
    setUserIsScrolling(true);
  }

  useLayoutEffect(() => {
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchmove", handleTouch);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouch);
    };
  });

  if (!lyrics) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-gray-600 text-center">
          Songtexte sind leider aktuell für diesen Song nicht verfügbar.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-20 lyrics-container-margin">
      <div>
        {lyricsArray.map((line, index) => {
          return (
            <p
              key={index}
              id={"line" + index}
              className={`${
                currentLine === index ? "text-gray-800" : "text-gray-300"
              } text-left font-bold text-3xl py-5 sm:text-5xl sm:py-9 md:text-6xl md:py-14 xl:text-7xl xl:py-18 2xl:text-8xl 2xl:py-24 `}
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default LyricsVisualizer;
