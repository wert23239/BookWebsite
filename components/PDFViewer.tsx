"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GlobalWorkerOptions } from "pdfjs-dist";

interface PDFViewerProps {
  pdfUrl: string;
}

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState(true);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      pageNumber < numPages && setPageNumber((prev) => prev + 1),
    onSwipedRight: () => pageNumber > 1 && setPageNumber((prev) => prev - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg">
      <div {...handlers} className="relative">
        {/* Loading spinner */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 z-10"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF Document */}
        <div className="relative overflow-hidden rounded-lg shadow-inner bg-gray-50">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setIsLoading(false);
            }}
            onLoadError={(error) => {
              console.error("Error loading PDF:", error);
              setIsLoading(false);
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              key={pageNumber}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="max-w-full h-auto"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </motion.div>
          </Document>
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
              className="w-8 h-8"
            >
              -
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setScale((prev) => Math.min(2, prev + 0.1))}
              className="w-8 h-8"
            >
              +
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setPageNumber((prev) => prev - 1)}
              disabled={pageNumber <= 1}
              variant="outline"
            >
              Previous
            </Button>

            <span className="text-sm text-gray-600">
              Page {pageNumber} of {numPages}
            </span>

            <Button
              onClick={() => setPageNumber((prev) => prev + 1)}
              disabled={pageNumber >= numPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>

        {/* Swipe indicators */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none text-gray-400">
          {pageNumber > 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl"
            >
              ←
            </motion.span>
          )}
          {pageNumber < numPages && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl ml-auto"
            >
              →
            </motion.span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PDFViewer;
