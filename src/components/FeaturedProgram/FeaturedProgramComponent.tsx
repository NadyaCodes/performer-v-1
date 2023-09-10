import React, { useEffect, useState } from "react";
import { api } from "@component/utils/api";

export default function FeaturedProgramComponent({
  programId,
}: {
  programId: string;
}) {
  const [blogData, setBlogData] = useState<string[]>([]);
  const { data: ptProgramData } = api.ptProgram.getOneById.useQuery({
    id: programId,
  });
  const { data: ftProgramData } = api.ftProgram.getOneById.useQuery({
    id: programId,
  });

  useEffect(() => {
    if (ptProgramData) {
      ptProgramData.articlePitch &&
        setBlogData(ptProgramData.articlePitch.split("\\n"));
    } else if (ftProgramData) {
      ftProgramData.articlePitch &&
        setBlogData(ftProgramData.articlePitch.split("\\n"));
    }
  }, [ptProgramData, ftProgramData]);
  useEffect(() => {
    console.log(blogData);
  }, [blogData]);

  const paragraphDisplay = blogData.map((text, index) => {
    if (text.includes("####")) {
      return (
        <div
          key={index}
          className="my-10 rounded border-t-4 border-cyan-700"
        ></div>
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
    } else if (text.startsWith("#H1#")) {
      return (
        <h3 key={index} className="my-8 text-center text-2xl font-bold">
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
      <div className="w-11/12 mobileMenu:w-9/12">{paragraphDisplay}</div>
    </div>
  );
}
