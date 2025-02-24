// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import ChapterSelection from "@/components/ChapterSelection";
import Survey from "@/components/Survey";
import Collection from "@/components/Collection";
import { Page } from "@prisma/client";

interface StoredUserData {
  pages: Page[];
  completedChapters: number[];
}

function getUserData(): StoredUserData | null {
  const stored = localStorage.getItem("user_data");
  if (!stored) return null;
  return JSON.parse(stored);
}

function saveUserData(pages: Page[], chapterNumber: number) {
  const existingData = getUserData() || { pages: [], completedChapters: [] };
  const updatedData = {
    pages: [...existingData.pages, ...pages],
    completedChapters: [...existingData.completedChapters, chapterNumber],
  };
  localStorage.setItem("user_data", JSON.stringify(updatedData));
}

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userPages, setUserPages] = useState<Page[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]); // Initialize with empty array
  const [isLoading, setIsLoading] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const storedData = getUserData();
    if (storedData) {
      setUserPages(storedData.pages);
      setCompletedChapters(storedData.completedChapters || []); // Provide fallback empty array
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleChapterSelect = (chapterNumber: number) => {
    setIsLoading(chapterNumber);
    setTimeout(() => {
      setSelectedChapter(chapterNumber);
      setIsLoading(null);
    }, 1000);
  };

  const handleSurveyComplete = (surveyPage: Page, bonusPage: Page) => {
    console.log("Survey completed with pages:", { surveyPage, bonusPage });
    if (selectedChapter) {
      const newPages = [surveyPage, bonusPage];
      const updatedPages = [...userPages, ...newPages];
      setUserPages(updatedPages);
      const updatedCompletedChapters = [...completedChapters, selectedChapter];
      setCompletedChapters(updatedCompletedChapters);
      saveUserData(updatedPages, selectedChapter);
    }
  };

  // Add a check for completedChapters
  const isChapterCompleted =
    selectedChapter !== null && completedChapters?.includes(selectedChapter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Logo />
      <main className="container mx-auto px-4 py-8">
        {!selectedChapter ? (
          <ChapterSelection
            onChapterSelect={handleChapterSelect}
            completedChapters={completedChapters}
            isLoading={isLoading}
          />
        ) : isChapterCompleted ? (
          <Collection
            userCards={userPages
              .filter((page) => page && page.chapterNumber === selectedChapter)
              .filter(Boolean)} // Add extra filter to remove any undefined
            onBack={() => setSelectedChapter(null)}
          />
        ) : (
          <Survey
            onComplete={handleSurveyComplete}
            chapterNumber={selectedChapter}
          />
        )}
      </main>
    </div>
  );
}
