// components/Survey.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Page } from "@prisma/client";
import PackOpening from "./PackOpening";

const chapterQuestions = {
  1: [
    {
      id: 1,
      text: "How do you prefer to solve problems?",
      options: [
        {
          id: "1a",
          text: "Think deeply about all possibilities",
          type: "philosophical",
        },
        { id: "1b", text: "Take immediate action", type: "actionOriented" },
        {
          id: "1c",
          text: "Consider how it affects everyone",
          type: "emotional",
        },
      ],
    },
    {
      id: 2,
      text: "What interests you most in a story?",
      options: [
        { id: "2a", text: "Complex moral dilemmas", type: "philosophical" },
        {
          id: "2b",
          text: "Exciting sequences of events",
          type: "actionOriented",
        },
        { id: "2c", text: "Character relationships", type: "emotional" },
      ],
    },
    {
      id: 3,
      text: "What's your ideal way to spend free time?",
      options: [
        {
          id: "3a",
          text: "Contemplating life's mysteries",
          type: "philosophical",
        },
        {
          id: "3b",
          text: "Engaging in physical activities",
          type: "actionOriented",
        },
        { id: "3c", text: "Connecting with others", type: "emotional" },
      ],
    },
  ],
  2: [
    {
      id: 1,
      text: "What drives your decisions?",
      options: [
        { id: "1a", text: "Logic and reasoning", type: "philosophical" },
        { id: "1b", text: "Instinct and experience", type: "actionOriented" },
        { id: "1c", text: "Feelings and intuition", type: "emotional" },
      ],
    },
    {
      id: 2,
      text: "When facing a challenge, you typically:",
      options: [
        { id: "2a", text: "Analyze all angles", type: "philosophical" },
        { id: "2b", text: "Trust your gut and act", type: "actionOriented" },
        { id: "2c", text: "Consider the human impact", type: "emotional" },
      ],
    },
    {
      id: 3,
      text: "What interests you most about stories?",
      options: [
        { id: "3a", text: "The underlying themes", type: "philosophical" },
        { id: "3b", text: "The plot twists", type: "actionOriented" },
        { id: "3c", text: "The character growth", type: "emotional" },
      ],
    },
  ],
};

const determinePageVariant = (answers: Record<number, string>) => {
  const counts = {
    philosophical: 0,
    actionOriented: 0,
    emotional: 0,
  };

  Object.values(answers).forEach((type) => {
    if (type in counts) {
      counts[type as keyof typeof counts]++;
    }
  });

  // Find the most common type
  const maxCount = Math.max(...Object.values(counts));
  const dominantTypes = Object.entries(counts).filter(
    ([_, count]) => count === maxCount
  );

  const randomIndex = Math.floor(Math.random() * dominantTypes.length);
  const personality = dominantTypes[randomIndex][0];

  // Convert personality type to variant letter
  if (personality === "philosophical") return "A";
  if (personality === "actionOriented") return "B";
  return "C"; // emotional
};

const getRandomPage = (pages: Page[]) => {
  const randomIndex = Math.floor(Math.random() * pages.length);
  return pages[randomIndex];
};

interface SurveyProps {
  onComplete: (surveyPage: Page, bonusPage: Page) => void;
  chapterNumber: number;
}

const Survey: React.FC<SurveyProps> = ({ onComplete, chapterNumber }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPackOpening, setShowPackOpening] = useState(false);
  const [pages, setPages] = useState<{
    surveyPage: Page | null;
    bonusPage: Page | null;
  }>({
    surveyPage: null,
    bonusPage: null,
  });

  const questions =
    chapterQuestions[chapterNumber as keyof typeof chapterQuestions];

  const handleAnswer = (questionId: number, optionId: string) => {
    const selectedOption = questions[currentQuestion].options.find(
      (opt) => opt.id === optionId
    );
    if (selectedOption) {
      const newAnswers = { ...answers, [questionId]: selectedOption.type };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowSubmit(true);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Get survey-based page
      const variant = determinePageVariant(answers);

      const surveyPagesResponse = await fetch(
        `/api/pages?type=survey&variant=${variant}&chapter=${chapterNumber}`
      );
      const surveyPages = await surveyPagesResponse.json();
      const surveyPage = getRandomPage(surveyPages);

      // Get random bonus page based on rarity
      const random = Math.random();
      let rarity = "common";
      if (random > 0.9) rarity = "rare";
      else if (random > 0.6) rarity = "uncommon";

      const bonusPagesResponse = await fetch(
        `/api/pages?type=bonus&rarity=${rarity}&chapter=${chapterNumber}`
      );
      const bonusPages = await bonusPagesResponse.json();
      const bonusPage = getRandomPage(bonusPages);
      console.log("Are we close?");
      setPages({
        surveyPage,
        bonusPage,
      });
      setShowPackOpening(true);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePackOpeningComplete = (pages: Page[]) => {
    onComplete(pages[0], pages[1]);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Quick Survey</CardTitle>
        </CardHeader>
        <CardContent>
          {!showSubmit ? (
            <div>
              <h3 className="text-lg font-medium mb-4">
                {questions[currentQuestion].text}
              </h3>
              <RadioGroup
                onValueChange={(value) =>
                  handleAnswer(questions[currentQuestion].id, value)
                }
              >
                {questions[currentQuestion].options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 mb-2"
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id}>{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : (
            <div>
              <p className="mb-4">Thank you for completing the survey!</p>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isSubmitting ? "Getting Your Pages..." : "Get Your Pages"}
              </Button>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </CardContent>
      </Card>
      {console.log(
        "Rendering PackOpening with:",
        showPackOpening,
        pages.surveyPage,
        pages.bonusPage
      )}
      {showPackOpening && pages.surveyPage && pages.bonusPage && (
        <PackOpening
          surveyPage={pages.surveyPage}
          bonusPage={pages.bonusPage}
          onOpeningComplete={handlePackOpeningComplete}
        />
      )}
    </>
  );
};

export default Survey;
