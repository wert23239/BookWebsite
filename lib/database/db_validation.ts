// src/lib/database/test.ts
import { prisma } from "./db";

async function testDatabase() {
  try {
    // Create a test page
    const testPage = await prisma.page.create({
      data: {
        chapterNumber: 1,
        variant: "TEST",
        title: "Test Page",
        description: "This is a test page",
        filePath: "/pdfs/test.pdf",
        rarity: "common",
        type: "test",
      },
    });

    console.log("Created test page:", testPage);

    // Read the page back
    const retrievedPage = await prisma.page.findUnique({
      where: {
        id: testPage.id,
      },
    });

    console.log("Retrieved page:", retrievedPage);

    // Clean up the test data
    await prisma.page.delete({
      where: {
        id: testPage.id,
      },
    });

    console.log("Test page deleted");
    console.log("Database test completed successfully!");
  } catch (error) {
    console.error("Database test failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabase();
