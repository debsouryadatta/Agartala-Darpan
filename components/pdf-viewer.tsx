"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-pdf to avoid SSR issues
const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import("react-pdf").then((mod) => mod.Page),
  { ssr: false }
);

// Import styles dynamically
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PdfViewerProps {
  pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>(800);

  // Set up PDF.js worker and handle responsive width
  useEffect(() => {
    setMounted(true);

    import("react-pdf").then((pdfjs) => {
      const version = pdfjs.pdfjs.version;
      // Use .mjs for modern versions of pdf.js (v3+)
      // Use unpkg as fallback if jsdelivr is blocked
      pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
    }).catch((error) => {
      console.error("Failed to load PDF.js:", error);
    });

    // Calculate responsive width
    const updateWidth = () => {
      const containerWidth = window.innerWidth;
      if (containerWidth < 640) {
        // Mobile: fit to screen with generous padding
        setPageWidth(containerWidth - 80);
      } else if (containerWidth < 1024) {
        // Tablet
        setPageWidth(Math.min(containerWidth - 120, 700));
      } else {
        // Desktop
        setPageWidth(800);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[500px] md:h-[600px] bg-gray-100 rounded-lg my-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mx-auto mb-4"></div>
          <p className="bengali-text text-charcoal">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error);
    setLoading(false);
  }

  return (
    <div className="w-full px-2 sm:px-0">
      {loading && (
        <div className="flex items-center justify-center h-[500px] md:h-[600px] bg-gray-100 rounded-lg my-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy mx-auto mb-4"></div>
            <p className="bengali-text text-charcoal">লোড হচ্ছে...</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg my-4 p-2 sm:p-4">
        <div className="flex justify-center items-center min-h-[500px] md:min-h-[600px]">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading=""
            className="flex justify-center items-center"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="max-w-full h-auto"
              width={pageWidth}
              scale={1}
            />
          </Document>
        </div>
      </div>

      {!loading && numPages > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 px-2 sm:px-0">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="w-full sm:w-auto px-6 py-3 bg-burgundy text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-burgundy/90 transition-colors duration-300 font-inter text-sm sm:text-base"
          >
            Previous
          </button>

          <span className="font-inter text-charcoal text-sm sm:text-base font-medium">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className="w-full sm:w-auto px-6 py-3 bg-burgundy text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-burgundy/90 transition-colors duration-300 font-inter text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}