// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // First, clear existing data
  await prisma.page.deleteMany({});

  // Chapter 1 variants (for survey results)
  const chapterPages = [
    {
      chapterNumber: 1,
      variant: "A",
      title: "Chapter 1 - Path A",
      description: "The first path through Chapter 1",
      filePath: "/pdfs/chapter1/Chapter1A.pdf",
      rarity: "common",
      type: "survey",
    },
    {
      chapterNumber: 1,
      variant: "B",
      title: "Chapter 1 - Path B",
      description: "The second path through Chapter 1",
      filePath: "/pdfs/chapter1/Chapter1B.pdf",
      rarity: "common",
      type: "survey",
    },
    {
      chapterNumber: 1,
      variant: "C",
      title: "Chapter 1 - Path C",
      description: "The third path through Chapter 1",
      filePath: "/pdfs/chapter1/Chapter1C.pdf",
      rarity: "common",
      type: "survey",
    },
  ];

  // Booster pack pages
  const boosterPages = [
    // Common pages
    ...Array(5)
      .fill(null)
      .map((_, i) => ({
        chapterNumber: 1,
        variant: `common${i + 1}`,
        title: `Bonus Page - Common ${i + 1}`,
        description: `A common bonus page ${i + 1}`,
        filePath: `/pdfs/boosters/common${i + 1}.pdf`,
        rarity: "common",
        type: "bonus",
      })),
    // Uncommon pages
    ...Array(4)
      .fill(null)
      .map((_, i) => ({
        chapterNumber: 1,
        variant: `uncommon${i + 1}`,
        title: `Bonus Page - Uncommon ${i + 1}`,
        description: `An uncommon bonus page ${i + 1}`,
        filePath: `/pdfs/boosters/uncommon${i + 1}.pdf`,
        rarity: "uncommon",
        type: "bonus",
      })),
    // Rare page
    {
      chapterNumber: 1,
      variant: "rare1",
      title: "Bonus Page - Rare 1",
      description: "A rare bonus page",
      filePath: "/pdfs/boosters/rare1.pdf",
      rarity: "rare",
      type: "bonus",
    },
  ];

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
