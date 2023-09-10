import type { Post } from "@prisma/client";
import React from "react";
import Link from "next/link";

export default function BlogPreview({ postArray }: { postArray: Post[] }) {
  const previewDisplay = postArray.map((element) => {
    return (
      <Link href={`/blog/${element.slug}`} key={element.id}>
        <div className="m-5 flex h-86 flex-col items-center justify-around rounded-lg border border-indigo-200 p-3 shadow-lg shadow-cyan-800 transition-all hover:scale-105 md:w-86">
          <div className="m-3 h-52 overflow-hidden rounded-lg border-cyan-600 bg-slate-800 shadow-md shadow-cyan-900 md:w-72">
            <div
              dangerouslySetInnerHTML={{ __html: element.image }}
              className="flex h-full w-full items-center justify-center"
            />
          </div>
          <div className="overflow-ellipsis font-bold">{element.title}</div>
        </div>
      </Link>
    );
  });
  return <div className="flex flex-wrap justify-center">{previewDisplay}</div>;
}
