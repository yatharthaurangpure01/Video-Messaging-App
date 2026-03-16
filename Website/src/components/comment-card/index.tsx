"use client";
import { CommentRepliesProps } from "@/types/index.type";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import CommentForm from "../forms/comment-form";

type Props = {
  comment: string;
  author: { image: string; firstname: string; lastname: string };
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};

const CommentCard = ({
  author,
  comment,
  videoId,
  commentId,
  reply,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState<boolean>(false);

  return (
    <Card
      className={cn(
        isReply
          ? "bg-[#1D1D1D] pl-10 border-none"
          : "border-[1px] bg-[#1D1D1D] p-5"
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Avatar className="w-6 h-6">
          <AvatarImage src={author.image} alt="author" />
        </Avatar>
        <p className="capitalize text-sm text-[#BDBDBD]">
          {author.firstname} {author.lastname}
        </p>
      </div>
      <div>
        <p className="text-[#BDBDBD] ml-[5%]">{comment}</p>
      </div>
      {!isReply && (
        <div className="flex justify-end mt-1">
          {!onReply ? (
            <Button
              onClick={() => setOnReply(true)}
              className="text-sm rounded-full bg-[#252525] text-white hover:bg-gray-950"
            >
              Reply
            </Button>
          ) : (
            <CommentForm
              close={() => setOnReply(false)}
              videoId={videoId}
              commentId={commentId}
              author={author.firstname + " " + author.lastname}
            />
          )}
        </div>
      )}
      {reply.length > 0 && (
        <div className="flex flex-col  mt-1">
          {reply.map((r) => (
            <CommentCard
              isReply
              reply={[]}
              comment={r.comment}
              commentId={r.commentId ?? ""}
              videoId={videoId}
              key={r.id}
              author={{
                image: r.User?.image ?? "",
                firstname: r.User?.firstname ?? "",
                lastname: r.User?.lastname ?? "",
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default CommentCard;
