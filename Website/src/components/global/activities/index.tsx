import { getVideoComments } from "@/actions/user";
import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/forms/comment-form";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoCommentProps } from "@/types/index.type";
import React from "react";

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  const { data } = useQueryData(["video-comments"], () =>
    getVideoComments(videoId)
  );

  const { data: comments } = data as VideoCommentProps;

  return (
    <div className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-5">
      <h2 className="text-white text-2xl font-bold">Comments</h2>
      <CommentForm
        author={author}
        videoId={videoId}
      />
      {comments.map((comment) => (
        <CommentCard
          comment={comment.comment}
          key={comment.id}
          author={{
            image: comment.User?.image ?? '',
            firstname: comment.User?.firstname ?? '',
            lastname: comment.User?.lastname ?? '',
          }}
          videoId={videoId}
          reply={comment.reply}
          commentId={comment.id}
        />
      ))}
    </div>
  );
};

export default Activities;
