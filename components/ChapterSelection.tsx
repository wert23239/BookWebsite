// components/ChapterSelection.tsx
import React from "react";
import ChapterCard from "./ChapterCard";

interface ChapterSelectionProps {
  onChapterSelect: (chapterNumber: number) => void;
  completedChapters?: number[];
  isLoading?: number;
}

const ChapterSelection: React.FC<ChapterSelectionProps> = ({
  onChapterSelect,
  completedChapters = [],
  isLoading = false,
}) => {
  return (
    <div className="chapter-grid">
      {[1, 2].map((chapterNum) => (
        <ChapterCard
          key={chapterNum}
          chapterNum={chapterNum}
          isCompleted={completedChapters.includes(chapterNum)}
          isLoading={isLoading}
          onSelect={onChapterSelect}
        />
      ))}
    </div>
  );
};

export default ChapterSelection;
