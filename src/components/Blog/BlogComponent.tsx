import React from "react";
import BlogPreview from "./BlogPreview";
import type { Post } from "@prisma/client";
import { useState } from "react";

export default function BlogComponent({
  initialPostArray,
}: {
  initialPostArray: Post[];
}) {
  const [postsToDisplay, setPostsToDisplay] =
    useState<Post[]>(initialPostArray);
  //when "back" button is clicked, update posts to display to go back 6 posts

  return (
    <div className="flex flex-col items-center">
      <div
        className="absolute left-0 right-0 hidden h-10 bg-cyan-950 mobileMenu:block"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div
        className="text-bold mt-10 flex w-full flex-col content-center items-center p-3 text-center text-lg mobileMenu:mt-20"
        style={{ animation: "fadeIn .7s linear" }}
      >
        <h2 className="mx-5 flex items-center justify-center text-center text-2xl font-extrabold capitalize tracking-tight text-cyan-900 md:text-4xl">
          Act. Sing. Dance. Blog.
        </h2>
        <BlogPreview postArray={postsToDisplay} />
      </div>
    </div>
  );
}
