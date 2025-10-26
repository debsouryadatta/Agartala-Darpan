import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/user";

// GET - Fetch paper by date or get available dates or all papers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const datesOnly = searchParams.get("dates");
    const all = searchParams.get("all");

    // If requesting all papers (for admin dashboard)
    if (all === "true") {
      const papers = await prisma.epaper.findMany({
        orderBy: {
          date: 'desc',
        },
      });
      return NextResponse.json(papers);
    }

    // If requesting only available dates
    if (datesOnly === "true") {
      const papers = await prisma.epaper.findMany({
        select: {
          date: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
      const dates = papers.map(paper => paper.date);
      return NextResponse.json({ dates });
    }

    // If requesting a specific date
    if (date) {
      const paper = await prisma.epaper.findFirst({
        where: {
          date: date,
        },
      });

      if (!paper) {
        return NextResponse.json(
          { error: "No paper found for this date" },
          { status: 404 }
        );
      }

      return NextResponse.json(paper);
    }

    // If no date specified, return today's paper or the latest one
    const today = new Date().toISOString().split('T')[0];
    let paper = await prisma.epaper.findFirst({
      where: {
        date: today,
      },
    });

    // If no paper for today, get the latest paper
    if (!paper) {
      paper = await prisma.epaper.findFirst({
        orderBy: {
          date: 'desc',
        },
      });
    }

    if (!paper) {
      return NextResponse.json(
        { error: "No papers available" },
        { status: 404 }
      );
    }

    return NextResponse.json(paper);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}

// POST - Add new paper to database (called after ImageKit upload)
export async function POST(request: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { date, pdfUrl, fileId, fileName, fileSize, uploadedBy } = body;

    if (!date || !pdfUrl || !fileId || !fileName || !uploadedBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPaper = await prisma.epaper.create({
      data: {
        date,
        pdfUrl,
        fileId,
        fileName,
        fileSize,
        uploadedBy,
      },
    });

    return NextResponse.json({
      success: true,
      paper: newPaper,
    });
  } catch (error) {
    console.error("Add paper error:", error);
    return NextResponse.json(
      { error: "Failed to add paper" },
      { status: 500 }
    );
  }
}

// DELETE - Remove paper from database
export async function DELETE(request: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Paper ID is required" },
        { status: 400 }
      );
    }

    await prisma.epaper.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete paper" },
      { status: 500 }
    );
  }
}
