import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await req.json();
    const { id } = await params;

    console.log("Processing video for userId:", id);
    console.log("Filename:", body.filename);

    const personalworkspaceId = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        workspace: {
          where: {
            type: "PERSONAL",
          },
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });


    if (!personalworkspaceId || !personalworkspaceId.workspace[0]) {
      console.log("No personal workspace found for user:", id);
      return NextResponse.json({ status: 404, error: "User or workspace not found" });
    }

    const existingVideo = await client.video.findFirst({
      where: {
        source: body.filename,
        userId: id,
      },
    });

    if (existingVideo) {
      console.log("Video already exists, updating processing status");
      await client.video.update({
        where: {
          id: existingVideo.id,
        },
        data: {
          processing: true,
          workSpaceId: personalworkspaceId.workspace[0].id,
        },
      });
    } else {
      console.log("Creating new video record");
      await client.video.create({
        data: {
          source: body.filename,
          userId: id,
          processing: true,
          workSpaceId: personalworkspaceId.workspace[0].id,
        },
      });
    }

    const userInfo = await client.user.findUnique({
      where: { id },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (userInfo) {
      return NextResponse.json({
        status: 200,
        plan: userInfo.subscription?.plan,
      })
    }


    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log("Error in processing video ", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
