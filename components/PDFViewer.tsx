"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState(true);

  console.log("PDF URL received:", pdfUrl); // Debug log to see what URL we're getting

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setIsLoading(false);
  }

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (pageNumber < numPages) setPageNumber(pageNumber + 1);
    },
    onSwipedRight: () => {
      if (pageNumber > 1) setPageNumber(pageNumber - 1);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Adjust scale based on screen width
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScale(width / 800);
      } else {
        setScale(1.0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <div {...handlers} className="relative">
        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        )}

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
          loading={
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
          }
          className="flex flex-col items-center"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="max-w-full h-auto"
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
              </div>
            }
          />
        </Document>

        {!isLoading && (
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber <= 1}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Previous
            </Button>

            <p className="text-center">
              Page {pageNumber} of {numPages}
            </p>

            <Button
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber >= numPages}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Next
            </Button>
          </div>
        )}

        {!isLoading && (
          <div className="absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none text-gray-400">
            {pageNumber > 1 && <span className="text-2xl">←</span>}
            {pageNumber < numPages && (
              <span className="text-2xl ml-auto">→</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PDFViewer;
