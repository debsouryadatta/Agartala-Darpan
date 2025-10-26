import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST - Increment view count for a paper
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paperId } = body;

    if (!paperId) {
      return NextResponse.json(
        { error: "Paper ID is required" },
        { status: 400 }
      );
    }

    // Increment the view count
    const updatedPaper = await prisma.epaper.update({
      where: {
        id: paperId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        id: true,
        views: true,
      },
    });

    return NextResponse.json({ views: updatedPaper.views });
  } catch (error) {
    console.error("View tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}
