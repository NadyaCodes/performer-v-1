import React from "react";
import type { Post } from "@prisma/client";

export type BlogProps = {
  post: Post;
  date: Date | null;
};

export default function BlogPageComponent({ post, date }: BlogProps) {
  const postArray = post.body.split("\n");

  const paragraphDisplay = postArray.map((element) => <div>{element}</div>);

  return (
    <div>
      <div className="text-xl font-bold">{post.title}</div>
      <div className="italic">~{post.author}</div>
      <div>{date ? date.toLocaleString() : ""}</div>
      <div>{paragraphDisplay}</div>
    </div>
  );
}
