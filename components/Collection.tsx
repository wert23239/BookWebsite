// src/components/Collection.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Page } from "@/lib/data";
import PDFViewer from "./PDFViewer";

interface CollectionProps {
  userCards: Page[];
}

const Collection: React.FC<CollectionProps> = ({ userCards }) => {
  const handleClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Button
        onClick={handleClear}
        className="mb-4 bg-red-500 hover:bg-red-600"
      >
        Clear Pages
      </Button>

      {userCards.map((page) => (
        <div key={page.id} className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{page.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Chapter {page.chapterNumber} - Variant {page.variant}
              </p>
              <PDFViewer pdfUrl={page.filePath} />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Collection;
