import { prisma } from "@/lib/database/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageType = searchParams.get("type");
  const rarity = searchParams.get("rarity");

  try {
    const pages = await prisma.page.findMany({
      where: {
        ...(pageType && { type: pageType }),
        ...(rarity && { rarity: rarity }),
      },
    });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}
