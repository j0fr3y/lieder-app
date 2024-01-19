"use client";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { pdfjs } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Console } from "console";

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
    <div className="max-w-full mx-auto p-4 sm:p-8 md:p-12 lg:p-16">
      <div className="mb-4 flex justify-between items-center sticky top-0 z-10 align-middle ">
        <button
          className="text-gray-600 px-4 py-2 rounded"
          onClick={goToPreviousPage}
          disabled={pageNumber <= 1}
        >
          <div className="invisible sm:visible text-center">
            <FontAwesomeIcon icon={faArrowLeft} /> Nächste Seite
          </div>
          <FontAwesomeIcon icon={faArrowLeft} className="sm:invisible" />
        </button>
        <span className="text-gray-600">
          <div className="invisible sm:visible text-center">
            Seite {pageNumber} von {numPages}
          </div>
          <div className="sm:invisible text-center">
            {pageNumber} / {numPages}
          </div>
        </span>
        <button
          className="text-gray-600 px-4 py-2 rounded"
          onClick={goToNextPage}
          disabled={pageNumber >= (numPages ?? 0)}
        >
          <div className="invisible sm:visible text-center">
            Nächste Seite <FontAwesomeIcon icon={faArrowRight} />
          </div>
          <FontAwesomeIcon icon={faArrowRight} className="sm:invisible" />
        </button>
      </div>
      <div className="relative items-center align-middle">
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
