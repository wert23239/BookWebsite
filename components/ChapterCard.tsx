// components/ChapterCard.tsx
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ChapterCardProps {
  chapterNum: number;
  isCompleted: boolean;
  isLoading: number | undefined;
  onSelect: (chapterNum: number) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapterNum,
  isCompleted,
  isLoading,
  onSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: chapterNum * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="chapter-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Chapter {chapterNum}
            {isCompleted && (
              <motion.span
                className="chapter-completed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                ✓ Completed
              </motion.span>
            )}
            {isLoading == chapterNum && (
              <motion.span
                className="chapter-loading"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="flex items-center gap-2">
                  Loading...
                  <Loader2 className="animate-spin" />
                </span>
              </motion.span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            {chapterNum === 1
              ? "Begin your journey with the first chapter..."
              : "Continue your story with chapter two..."}
          </p>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => onSelect(chapterNum)}
              disabled={isLoading !== null}
              className={`chapter-button ${
                isCompleted ? "chapter-button-completed" : "chapter-button-new"
              }`}
            >
              {isCompleted ? "Review Chapter" : "Start Chapter"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChapterCard;
