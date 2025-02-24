export interface Page {
  id: number;
  chapterNumber: number;
  variant: string;
  title: string;
  description: string | null;
  type: string;
  filePath: string;
  rarity: string;
}

export type PageDatabase = {
  [category: string]: Page[]; // Dictionary where each category has an array of pages
};

export const pageDatabase: PageDatabase = {
  philosophical: [
    {
      id: 1,
      chapterNumber: 1,
      variant: "P",
      title: "Chapter 1: F.r.a.m.e.w.o.r.k.s",
      description: "The philosophical path through Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter1A.pdf",
      rarity: "common",
    },
  ],
  actionOriented: [
    {
      id: 2,
      chapterNumber: 1,
      variant: "A",
      title: "Chapter 1: Tutorial",
      description: "The action-oriented version of Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter2A.pdf",
      rarity: "common",
    },
  ],
  emotional: [
    {
      id: 3,
      chapterNumber: 1,
      variant: "E",
      title: "Chapter 1: Box Theory",
      description: "The emotional journey through Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter3A.pdf",
      rarity: "common",
    },
  ],
  boosterPages: [
    {
      id: 4,
      chapterNumber: 1,
      variant: "B1",
      title: "Booster: Hidden Passages",
      description: "A common extra page from Chapter 1",
      type: "bonus",
      filePath: "/pdfs/boosters/common1.pdf",
      rarity: "rare",
    },
    {
      id: 5,
      chapterNumber: 1,
      variant: "B1",
      title: "Booster: Hidden Passages",
      description: "A medium extra page from Chapter 1",
      type: "bonus",
      filePath: "/pdfs/boosters/uncommon1.pdf",
      rarity: "rare",
    },
    {
      id: 6,
      chapterNumber: 1,
      variant: "B1",
      title: "Booster: Hidden Passages",
      description: "A rare extra page from Chapter 1",
      type: "bonus",
      filePath: "/pdfs/boosters/rare1.pdf",
      rarity: "rare",
    },
    // Add more booster pages as needed
  ],
};
