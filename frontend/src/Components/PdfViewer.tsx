"use client";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    if (typeof window !== "undefined") {
      resizeListener();
      window.addEventListener("resize", resizeListener);
      window.addEventListener("orientationchange", resizeListener);
      window.addEventListener("keydown", keyPressListener);
    }
  }

  function keyPressListener(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      console.log("right");
      goToNextPage();
    } else if (event.key === "ArrowLeft") {
      console.log("left");
      goToPreviousPage();
    }
  }

  function resizeListener() {
    if (typeof window !== "undefined") {
      setPageWidth(window.innerWidth * 0.7);
    }
  }

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < (numPages ?? 0)) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className=" p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="">
        <div className="collapse sm:visible mb-4 flex justify-between items-center sticky top-0 z-10 align-middle ">
          <button
            className="text-gray-600 pr-4 text-center"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="" /> Vorherige Seite
          </button>
          <span className="text-gray-600 text-center">
            Seite {pageNumber} von {numPages}
          </span>
          <button
            className="text-gray-600 pl-4 text-center"
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages ?? 0)}
          >
            Nächste Seite <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className="sm:collapse mb-4 flex justify-between items-center sticky top-0 z-10 align-middle ">
          <button
            className="text-gray-600 pr-4 text-center"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="" />
          </button>
          <span className="text-gray-600 text-center">
            {pageNumber} / {numPages}
          </span>
          <button
            className="text-gray-600 pl-4 text-center"
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages ?? 0)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center align-middle">
        <Document
          file={process.env.NEXT_PUBLIC_STRAPI_URL + pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            renderTextLayer={false}
            pageNumber={pageNumber}
            width={pageWidth}
          />
        </Document>
      </div>
    </div>
  );
}
