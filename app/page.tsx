"use client";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import Survey from "@/components/Survey";
import Collection from "@/components/Collection";
import { Page } from "@prisma/client";
import { saveUserPages, getUserPages } from "@/lib/localStorage";

export default function Home() {
  const [userPages, setUserPages] = useState<Page[]>([]);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing pages on load
  useEffect(() => {
    const storedPages = getUserPages();
    if (storedPages && storedPages.length > 0) {
      setUserPages(storedPages);
      setHasCompletedSurvey(true);
    }
    setIsLoading(false);
  }, []);

  const handleSurveyComplete = (surveyPage: Page, bonusPage: Page) => {
    const newPages = [surveyPage, bonusPage];
    setUserPages(newPages);
    setHasCompletedSurvey(true);
    saveUserPages(newPages);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Logo />
      <main className="container mx-auto px-4 py-8">
        {!hasCompletedSurvey ? (
          <Survey onComplete={handleSurveyComplete} />
        ) : (
          <Collection userCards={userPages} />
        )}
      </main>
    </div>
  );
}
