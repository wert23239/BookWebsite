import { Page } from "@prisma/client"; // Ensure this import is correct

interface StoredUserData {
  pages: Page[];
  currentChapter: number | null;
}

export function saveUserData(pages: Page[], chapter: number) {
  const userData: StoredUserData = {
    pages,
    currentChapter: chapter,
  };
  localStorage.setItem("user_data", JSON.stringify(userData));
}

export function getUserData(): StoredUserData | null {
  const stored = localStorage.getItem("user_data");
  if (!stored) return null;
  return JSON.parse(stored);
}
