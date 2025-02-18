"use client";
import { useState } from "react";
import Logo from "@/components/Logo";
import Survey from "@/components/Survey";
import Collection from "@/components/Collection";
import { Page } from "@/lib/data";

export default function Home() {
  const [userPages, setUserPages] = useState<Page[]>([]);
  const [hasCompletedSurvey, setHasCompletedSurvey] = useState(false);

  const handleSurveyComplete = (surveyPage: Page, bonusPage: Page) => {
    setUserPages([surveyPage, bonusPage]);
    setHasCompletedSurvey(true);
  };

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
