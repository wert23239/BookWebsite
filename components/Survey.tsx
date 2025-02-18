import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Page, pageDatabase } from "@/lib/data";

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    type: "philosophical" | "actionOriented" | "emotional";
  }[];
}

const questions: Question[] = [
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
      { id: "1c", text: "Consider how it affects everyone", type: "emotional" },
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
];

interface SurveyProps {
  onComplete: (surveyPage: Page, bonusPage: Page) => void;
}

const Survey: React.FC<SurveyProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmit, setShowSubmit] = useState(false);

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

  const determinePageType = () => {
    const types = Object.values(answers);
    const counts = {
      philosophical: 0,
      actionOriented: 0,
      emotional: 0,
    };

    types.forEach((type) => {
      if (type in counts) {
        counts[type as keyof typeof counts]++;
      }
    });

    // Find the most common type
    const maxCount = Math.max(...Object.values(counts));
    const dominantTypes = Object.entries(counts).filter(
      ([_, count]) => count === maxCount
    );

    // If there's a tie, randomly select one of the dominant types
    const randomIndex = Math.floor(Math.random() * dominantTypes.length);
    return dominantTypes[randomIndex][0];
  };

  const getBonusPage = () => {
    const random = Math.random();
    if (random < 0.6) return pageDatabase.boosterPages[0];
    if (random < 0.9) return pageDatabase.boosterPages[1];
    return pageDatabase.boosterPages[3];
  };

  const handleSubmit = () => {
    const dominantType = determinePageType(answers);
    const surveyPage =
      pageDatabase[dominantType as keyof typeof pageDatabase][0];
    const bonusPage = getBonusPage();

    console.log("Survey completed:", {
      answers,
      dominantType,
      surveyPage,
      bonusPage,
    });

    onComplete(surveyPage, bonusPage);
  };

  return (
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
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Get Your Pages
            </Button>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </CardContent>
    </Card>
  );
};

export default Survey;
