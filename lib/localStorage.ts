import { Page } from "@prisma/client";

const STORAGE_KEY = "user_pages";

export function saveUserPages(pages: Page[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

export function getUserPages(): Page[] | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  return JSON.parse(stored);
}
