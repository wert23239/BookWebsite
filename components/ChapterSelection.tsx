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
  console.log(completedChapters);
  return (
    <div className="chapter-grid">
      {[1, 2].map((chapterNum) => (
        <Card key={chapterNum} className="chapter-card">
          <CardHeader>
            <CardTitle>
              Chapter {chapterNum}
              {completedChapters.includes(chapterNum) && (
                <span className="chapter-completed">(Completed)</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="chapter-description">
              {chapterNum === 1
                ? "Start your journey here..."
                : "Continue your adventure..."}
            </p>
            <Button
              onClick={() => onChapterSelect(chapterNum)}
              className={`chapter-button ${
                completedChapters.includes(chapterNum) ? "completed" : ""
              }`}
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
