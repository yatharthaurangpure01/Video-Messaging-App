"use client";

import { getAllUserVideos } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import { VideoIcon } from "lucide-react";
import React from "react";
import VideoCard from "./video-card";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );

  const { status: videosStatus, data: videos } = videoData as VideosProps;
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-2">
        <VideoIcon className="h-7" />
        <h2 className="text-[#8d8d8d] text-xl">Videos</h2>
      </div>
      <section
        className={cn(
          videosStatus !== 200
            ? "p-5"
            : "grid grid-cols-l gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {videosStatus === 200 ? (
          videos.map((video) => (
            <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
          ))
        ) : (
          <p className="text-[#BDBDBD]">No videos in workspace</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
