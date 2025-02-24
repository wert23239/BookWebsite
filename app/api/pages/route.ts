import { prisma } from "@/lib/database/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("type");
  const rarity = searchParams.get("rarity");
  const chapterNumber = parseInt(searchParams.get("chapter") || "1"); // Add this

  try {
    const pages = await prisma.page.findMany({
      where: {
        chapterNumber: chapterNumber, // Add this
        ...(pageType && { type: pageType }),
        ...(rarity && { rarity: rarity }),
      },
    });
    return NextResponse.json(pages);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
