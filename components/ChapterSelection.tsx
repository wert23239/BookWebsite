import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChapterSelectionProps {
  onChapterSelect: (chapterNumber: number) => void;
  completedChapters?: number[];
}

const ChapterSelection: React.FC<ChapterSelectionProps> = ({
  onChapterSelect,
  completedChapters = [],
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
      {[1, 2].map((chapterNum) => (
        <Card key={chapterNum}>
          <CardHeader>
            <CardTitle>
              Chapter {chapterNum}
              {completedChapters.includes(chapterNum) && (
                <span className="ml-2 text-sm text-green-500">(Completed)</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              {chapterNum === 1
                ? "Start your journey here..."
                : "Continue your adventure..."}
            </p>
            <Button
              onClick={() => onChapterSelect(chapterNum)}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {completedChapters.includes(chapterNum)
                ? "Review Chapter"
                : "Open Chapter"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChapterSelection;
