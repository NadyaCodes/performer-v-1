import { Post } from "@prisma/client";
import React from "react";
import Link from "next/link";

export default function BlogPreview({ postArray }: { postArray: Post[] }) {
  const previewDisplay = postArray.map((element) => {
    return (
      <Link href={`/blog/${element.slug}`}>
        <div className="m-5 flex max-w-md flex-col items-center rounded-lg border border-indigo-200 p-3 shadow-lg shadow-cyan-800 transition-all hover:scale-105">
          <div className="m-3 h-52 w-52 overflow-hidden rounded-lg border-cyan-600 bg-cyan-800 shadow-md shadow-cyan-900">
            <div
              dangerouslySetInnerHTML={{ __html: element.image }}
              className="flex h-full w-full items-center justify-center"
            />
          </div>
          <div className="font-bold">{element.title}</div>
        </div>
      </Link>
    );
  });
  return <div>{previewDisplay}</div>;
}
