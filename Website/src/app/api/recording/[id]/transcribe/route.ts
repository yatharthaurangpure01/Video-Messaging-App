import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { id } = await params;

    let content;
    try {
      // Clean the content by removing markdown code blocks
      const cleanContent = body.content.replace(/```json\n?|\n?```/g, '').trim();
      content = JSON.parse(cleanContent);
    } catch (parseError) {
      console.log("Failed to parse AI content, using fallback:", body.content);
      // Fallback content if JSON parsing fails
      content = {
        title: "Video Recording",
        summary: "AI-generated content could not be parsed"
      };
    }

    const video = await client.video.findFirst({
      where: {
        userId: id,
        source: body.filename,
      },
    });

    if (!video) {
      console.log("Video not found for userId:", id, "filename:", body.filename);
      return NextResponse.json({ status: 404, error: "Video not found" });
    }

    const transcribed = await client.video.update({
      where: {
        id: video.id,
      },
      data: {
        title: content.title,
        description: content.summary,
        summary: body.transcript,
      },
    });

    if (transcribed) {
      console.log("🟢 Transcribed");
      return NextResponse.json({ status: 200 });
    }

    console.log('Transcription went wrong')
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log("Error in transcribing video ", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
