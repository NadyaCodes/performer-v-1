import { Post } from "@prisma/client";
import React from "react";
import Link from "next/link";

export default function BlogPreview({ postArray }: { postArray: Post[] }) {
  const previewDisplay = postArray.map((element) => {
    return (
      <Link href={`/blog/${element.slug}`}>
        <div className="flex flex-col">
          <div className="h-52 w-52">
            <div dangerouslySetInnerHTML={{ __html: element.image }} />
          </div>
          <div className="font-bold">{element.title}</div>
        </div>
      </Link>
    );
  });
  return <div>{previewDisplay}</div>;
}
