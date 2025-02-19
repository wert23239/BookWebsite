"use client";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import ChapterSelection from "@/components/ChapterSelection";
import Survey from "@/components/Survey";
import Collection from "@/components/Collection";
import { Page } from "@prisma/client";
import { saveUserData, getUserData } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [userPages, setUserPages] = useState<Page[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);

  useEffect(() => {
    const storedData = getUserData();
    if (storedData) {
      setUserPages(storedData.pages);
      setSelectedChapter(storedData.currentChapter);
      setHasCompletedSurvey(storedData.pages.length > 0);
    }
  }, []);

  const handleChapterSelect = (chapterNumber: number) => {
    setSelectedChapter(chapterNumber);
  };

  const handleSurveyComplete = (surveyPage: Page, bonusPage: Page) => {
    const newPages = [surveyPage, bonusPage];
    setUserPages(newPages);
    setHasCompletedSurvey(true);
    saveUserData(newPages, selectedChapter || 1);
  };

  const handleBack = () => {
    if (hasCompletedSurvey) {
      setHasCompletedSurvey(false);
      setUserPages([]);
    }
    setSelectedChapter(null);
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Logo />
      <main className="container mx-auto px-4 py-8">
        {!selectedChapter ? (
          <ChapterSelection onChapterSelect={handleChapterSelect} />
        ) : !hasCompletedSurvey ? (
          <Survey
            onComplete={handleSurveyComplete}
            chapterNumber={selectedChapter}
          />
        ) : (
          <Collection
            userCards={userPages.filter(
              (page) => page.chapterNumber === selectedChapter
            )}
            onBack={() => setSelectedChapter(null)}
          />
        )}
      </main>
    </div>
  );
}
