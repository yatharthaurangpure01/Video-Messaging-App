import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (jsonError) {
      console.log("No JSON body provided, using empty object");
      body = {};
    }
    const { id } = await params;

    const completeProcessing = await client.video.updateMany({
      where: {
        userId: id,
        ...(body.filename && { source: body.filename }),
      },
      data: {
        processing: false,
      },
    });

    if (completeProcessing) {
      return NextResponse.json({ status: 200 });
    }

    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log("Error in completing video processing ", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
