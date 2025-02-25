// app/api/pages/route.ts
import { prisma } from "@/lib/database/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const variant = searchParams.get("variant");
  const chapter = searchParams.get("chapter");

  console.log("API call:", { type, variant, chapter });

  try {
    // Build query with proper typing
    const whereConditions: Prisma.PageWhereInput = {};

    if (type) whereConditions.type = type;
    if (variant) whereConditions.variant = variant;
    if (chapter) whereConditions.chapterNumber = Number(chapter);

    console.log("Query conditions:", whereConditions);

    // Fetch pages
    const pages = await prisma.page.findMany({
      where: whereConditions,
    });

    console.log(`Found ${pages.length} pages`);
    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
