// components/PackOpening.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Page } from "@/lib/data";

interface PackOpeningProps {
  surveyPage: Page;
  bonusPage: Page;
  onOpeningComplete: (pages: Page[]) => void;
}

const PackOpening: React.FC<PackOpeningProps> = ({
  surveyPage,
  bonusPage,
  onOpeningComplete,
}) => {
  const [isOpening, setIsOpening] = useState(true);
  const [showCards, setShowCards] = useState(false);

  // Start animation sequence when component mounts
  useState(() => {
    setTimeout(() => {
      setIsOpening(false);
      setTimeout(() => {
        setShowCards(true);
        setTimeout(() => {
          onOpeningComplete([surveyPage, bonusPage]);
        }, 2000);
      }, 500);
    }, 1500);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 1.5, rotate: 15, opacity: 0 }}
            className="w-64 h-96 bg-blue-600 rounded-lg shadow-xl"
          >
            {/* Pack design */}
            <div className="h-full w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
              <motion.div
                animate={{ scale: [1, 1.2, 0] }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold"
              >
                Chapter Unlocked!
              </motion.div>
            </div>
          </motion.div>
        )}

        {showCards && (
          <div className="flex gap-8">
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: 180 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 1.0 }}
            >
              <Card className="w-64 h-96 flex items-center justify-center p-4">
                <h3 className="text-lg font-bold">{surveyPage.title}</h3>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 180 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 1.0 }}
            >
              <Card className="w-64 h-96 flex items-center justify-center p-4">
                <h3 className="text-lg font-bold">{bonusPage.title}</h3>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackOpening;
