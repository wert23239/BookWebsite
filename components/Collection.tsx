import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Page } from "@/lib/data";
import PDFViewer from "./PDFViewer";

interface CollectionProps {
  userCards: Page[];
}

const Collection: React.FC<CollectionProps> = ({ userCards }) => {
  // Add error checking
  if (!userCards || userCards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Card>
          <CardContent>
            <p>No pages available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {userCards.map((page) => {
        if (!page) return null; // Skip if page is undefined

        return (
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
        );
      })}
    </div>
  );
};

export default Collection;
