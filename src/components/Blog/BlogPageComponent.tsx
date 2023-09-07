import React, { useState, useEffect } from "react";
import type { Post } from "@prisma/client";

export type BlogProps = {
  post: Post;
  date: Date | null;
};

export default function BlogPageComponent({ post, date }: BlogProps) {
  const [imageTop, setImageTop] = useState<number>(35);
  const [imageRight, setImageRight] = useState<number>(-20);
  const postArray = post.body.split("\n");

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

  // const paragraphDisplay = postArray.map((text, index) =>
  //   text.includes("####") ? (
  //     <div
  //       key={index}
  //       className="my-10 rounded border-t-4 border-cyan-700"
  //     ></div>
  //   ) : text.startsWith("#H2#") ? (
  //     <h2 key={index} className="my-8 pl-3 text-xl font-bold">
  //       {text.slice(4)}
  //     </h2>
  //   ) : text.startsWith("#H3#") ? (
  //     <h3 key={index} className="text-md my-8 text-center font-bold">
  //       {text.slice(4)}
  //     </h3>
  //   ) : text.startsWith("#UL#") ? (
  //     const listArray = text.split("#LI#")
  //     <ul>{text}</ul>
  //   ) : (
  //     <div key={index} className="my-3">
  //       {text}
  //     </div>
  //   )
  // );

  const paragraphDisplay = postArray.map((text, index) => {
    if (text.includes("####")) {
      return (
        <div
          key={index}
          className="my-10 rounded border-t-4 border-cyan-700"
        ></div>
      );
    } else if (text.startsWith("#H2#")) {
      return (
        <h2 key={index} className="my-8 pl-3 text-xl font-bold">
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
    } else {
      return (
        <div key={index} className="my-3">
          {text}
        </div>
      );
    }
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
      <div className="m-2 w-11/12 text-center text-3xl font-bold mobileMenu:w-9/12">
        {post.title}
      </div>
      <div className="italic">~{post.author}</div>
      <div>{date ? date.toDateString() : ""}</div>

      <div className="mt-5 overflow-y-hidden text-cyan-950 mobileMenu:w-10/12">
        <div className=" relative flex justify-center">
          <div
            dangerouslySetInnerHTML={{ __html: post.image }}
            className="absolute opacity-0 mobileMenu:opacity-20"
            style={{
              top: `${imageTop}rem`,
              right: `${imageRight}rem`,
            }}
          />
        </div>
        {paragraphDisplay}
      </div>
    </div>
  );
}
