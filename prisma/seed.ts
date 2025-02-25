// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // First, clear existing data
  await prisma.page.deleteMany({});

  // Chapter 1 and 2 variants (for survey results)
  const chapterPages = [
    // Chapter 1
    {
      chapterNumber: 1,
      variant: "A", // This matches your data.ts
      title: "Chapter 1: F.r.a.m.e.w.o.r.k.s",
      description: "The philosophical path through Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter1A.pdf",
      rarity: "common",
    },
    // Action-oriented
    {
      chapterNumber: 1,
      variant: "B", // This matches your data.ts
      title: "Chapter 1: Tutorial",
      description: "The action-oriented version of Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter2A.pdf",
      rarity: "common",
    },
    // Emotional
    {
      chapterNumber: 1,
      variant: "C", // This matches your data.ts
      title: "Chapter 1: Box Theory",
      description: "The emotional journey through Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter3A.pdf",
      rarity: "common",
    },
    // Chapter 2 - using same PDFs for now
    {
      chapterNumber: 2,
      variant: "A", // This matches your data.ts
      title: "Chapter 1: F.r.a.m.e.w.o.r.k.s",
      description: "The philosophical path through Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter1A.pdf",
      rarity: "common",
    },
    // Action-oriented
    {
      chapterNumber: 2,
      variant: "B", // This matches your data.ts
      title: "Chapter 1: Tutorial",
      description: "The action-oriented version of Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter2A.pdf",
      rarity: "common",
    },
    // Emotional
    {
      chapterNumber: 2,
      variant: "C", // This matches your data.ts
      title: "Chapter 1: Box Theory",
      description: "The emotional journey through Chapter 1",
      type: "survey",
      filePath: "/pdfs/chapter1/Chapter3A.pdf",
      rarity: "common",
    },
  ];

  // Booster pages for both chapters
  const createBoosterPages = (chapterNumber: number) => [
    // Common pages
    ...Array(5)
      .fill(null)
      .map((_, i) => ({
        chapterNumber,
        variant: `common${i + 1}`,
        title: `Chapter ${chapterNumber} Bonus - Common ${i + 1}`,
        description: `A common bonus page ${i + 1}`,
        filePath: `/pdfs/boosters/common${i + 1}.pdf`,
        rarity: "common",
        type: "bonus",
      })),
    // Uncommon pages
    ...Array(4)
      .fill(null)
      .map((_, i) => ({
        chapterNumber,
        variant: `uncommon${i + 1}`,
        title: `Chapter ${chapterNumber} Bonus - Uncommon ${i + 1}`,
        description: `An uncommon bonus page ${i + 1}`,
        filePath: `/pdfs/boosters/uncommon${i + 1}.pdf`,
        rarity: "uncommon",
        type: "bonus",
      })),
    // Rare page
    {
      chapterNumber,
      variant: "rare1",
      title: `Chapter ${chapterNumber} Bonus - Rare 1`,
      description: "A rare bonus page",
      filePath: "/pdfs/boosters/rare1.pdf",
      rarity: "rare",
      type: "bonus",
    },
  ];

  const boosterPages = [...createBoosterPages(1), ...createBoosterPages(2)];

  // Create all pages
  for (const page of [...chapterPages, ...boosterPages]) {
    const createdPage = await prisma.page.create({
      data: page,
    });
    console.log(`Created page: ${createdPage.title}`);
  }

  console.log("Database has been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
