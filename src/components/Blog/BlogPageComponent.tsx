import React, { useState, useEffect } from "react";
import type { Post } from "@prisma/client";
import type { ObjectList } from "@component/data/types";
import Link from "next/link";
import { arrowLeft, arrowRight, backChevron } from "@component/data/svgs";

export type BlogProps = {
  post: Post;
  date: Date | null;
  nextPost: ObjectList | null;
  prevPost: ObjectList | null;
  bio: string | null;
};

export default function BlogPageComponent({
  post,
  date,
  nextPost,
  prevPost,
  bio,
}: BlogProps) {
  const [imageTop, setImageTop] = useState<number>(35);
  const [imageRight, setImageRight] = useState<number>(-20);
  const postArray = post.body.split("\n");
  const bioArray = (typeof bio === "string" && bio.split("\n")) || [];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newImageTop = -scrollY * 0.03 + 35;
      setImageTop(newImageTop);

      const newImageRight = scrollY * 0.06 - 20;
      setImageRight(newImageRight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const paragraphDisplay = postArray.map((text, index) => {
    if (text.includes("####")) {
      return (
        <div
          key={index}
          className="my-10 rounded border-t-4 border-cyan-700"
        ></div>
      );
    } else if (text.startsWith("#H1#")) {
      return (
        <h2
          key={index}
          className="my-8 text-center text-3xl font-bold text-cyan-800"
        >
          {text.slice(4)}
        </h2>
      );
    } else if (text.startsWith("#H2#")) {
      return (
        <h2 key={index} className="my-8 text-xl font-bold">
          {text.slice(4)}
        </h2>
      );
    } else if (text.startsWith("#H3#")) {
      return (
        <h3 key={index} className="text-md my-8 text-center font-bold">
          {text.slice(4)}
        </h3>
      );
    } else if (text.startsWith("#UL#")) {
      const listArray = text.split("#LI#");
      return (
        <div key={index} className="my-5 font-bold">
          {listArray[0]?.slice(4)}
          <ul className="list-disc pl-7 font-normal italic">
            {listArray.map((item, listItemIndex) =>
              listItemIndex !== 0 ? <li key={listItemIndex}>{item}</li> : null
            )}
          </ul>
        </div>
      );
    } else if (text.startsWith("#IT#")) {
      return (
        <div key={index} className="my-7 px-5 italic">
          {text.slice(4)}
        </div>
      );
    } else if (text.startsWith("#H2LINK#")) {
      const splitLink = text.split("#HREF#");
      return (
        <div
          key={index}
          className="my-8 text-xl font-bold italic text-indigo-600 hover:underline"
        >
          <a
            href={splitLink[1]?.slice(6) || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {splitLink[0]?.slice(8) || ""}{" "}
          </a>
        </div>
      );
    } else {
      return (
        <div key={index} className="my-3">
          {text}
        </div>
      );
    }
  });

  const bioDisplay = bioArray?.map((text, index) => {
    return (
      <div key={index} className="my-3">
        {text}
      </div>
    );
  });

  return (
    <div className="m-2 flex flex-col items-center pb-10 text-cyan-900 mobileMenu:m-0">
      <div
        className="absolute left-0 right-0 hidden h-10 bg-cyan-900 mobileMenu:block"
        style={{
          boxShadow:
            "inset 0px -1px 2px rgba(0,255,255,0.5), inset 0px -2px 4px rgba(0,255,255,0.5), inset 0px -4px 8px rgba(0,255,255,0.5)",
        }}
      ></div>
      <div
        className="text-bold flex w-full flex-col content-center items-center p-3 text-center text-lg mobileMenu:mt-10"
        style={{ animation: "fadeIn .7s linear" }}
      ></div>
      <Link href="/blog" className="ml-2 flex place-self-start mobileMenu:ml-5">
        <span>{backChevron}</span>
        <span>Back to Blog</span>
      </Link>
      <div className="m-2 w-11/12 text-center text-3xl font-bold mobileMenu:w-9/12">
        {post.title}
      </div>
      <div className="italic">~{post.author}</div>
      <div>{date ? date.toDateString() : ""}</div>

      <div className="mt-5 overflow-y-hidden text-cyan-950 mobileMenu:w-10/12">
        <div className="relative flex justify-center">
          <div
            dangerouslySetInnerHTML={{ __html: post.image }}
            className="absolute opacity-0 mobileMenu:opacity-20"
            style={{
              top: `${imageTop}rem`,
              right: `${imageRight}rem`,
              pointerEvents: "none",
            }}
          />
        </div>
        {paragraphDisplay}
      </div>
      <div className="my-10 w-11/12 rounded border-t-4 border-cyan-700 mobileMenu:w-10/12"></div>
      {post.author && (
        <>
          <div className="text-cyan-950 mobileMenu:w-10/12">
            <h2 className="text-center text-xl font-bold">
              About the Author ~ {post.author}
            </h2>
            <div className="m-auto mt-5 flex flex-col italic text-cyan-950 mobileMenu:w-10/12">
              {bioDisplay}
            </div>
          </div>
          <div className="my-10 w-11/12 rounded border-t-4 border-cyan-700 mobileMenu:w-10/12"></div>
        </>
      )}

      <div className="mb-5 flex mobileMenu:w-10/12">
        {nextPost && nextPost.slug && (
          <Link href={nextPost.slug} className="flex max-w-sm items-center">
            <button className="flex items-center text-left text-sm italic">
              <span className="pr-5">{arrowLeft}</span>
              <span className="">{nextPost.title}</span>
            </button>
          </Link>
        )}
        <div className="flex-grow"></div>
        {prevPost && prevPost.slug && (
          <Link href={prevPost.slug} className="flex max-w-sm items-center">
            <button className="flex items-center text-right text-sm italic">
              <span>{prevPost.title}</span>
              <span className="pl-5">{arrowRight}</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
