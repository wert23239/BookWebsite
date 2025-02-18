import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pageDatabase, Page } from "@/lib/data";

interface PackOpenerProps {
  onPackOpened: (page: Page) => void;
}

const PackOpener: React.FC<PackOpenerProps> = ({ onPackOpened }) => {
  const openPack = () => {
    // Determine rarity with probabilities
    const random = Math.random();
    let selectedPage: Page;

    if (random < 0.6) {
      // 60% chance for common
      selectedPage = pageDatabase.common[0];
    } else if (random < 0.9) {
      // 30% chance for uncommon
      selectedPage = pageDatabase.uncommon[0];
    } else {
      // 10% chance for rare
      selectedPage = pageDatabase.rare[0];
    }

    onPackOpened(selectedPage);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Open Pack 1</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-600">
          This pack contains one version of Chapter 1
        </p>
        <Button
          onClick={openPack}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Open Pack 1
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackOpener;
