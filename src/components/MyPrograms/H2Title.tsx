import React from "react";
import { sparkles, outlineStar } from "@component/data/svgs";
import type { ObjectList } from "@component/data/types";

interface H2TitleProps {
  text: string;
  icon: string;
  style?: ObjectList;
  id?: string;
  color?: string;
}

const H2Title = React.forwardRef<HTMLDivElement, H2TitleProps>(
  ({ text, icon, style, id, color }, ref) => {
    return (
      <>
        <h2
          className={`mx-5 flex w-7/12 scale-125 items-center justify-center bg-transparent text-center   text-2xl font-extrabold capitalize tracking-tight md:text-4xl text-${
            color || "cyan"
          }-900`}
          style={style}
          id={id}
          ref={ref}
        >
          <div style={{ animation: "wiggle .4s linear 5" }}>
            <div style={{ animation: "fadeInGrow 3s linear" }}>
              <div className="m-2">
                {icon === "sparkle" ? sparkles : outlineStar}
              </div>
            </div>
          </div>
          <div className="m-2">{text}</div>
          <div style={{ animation: "wiggle .4s linear 5" }}>
            <div style={{ animation: "fadeInGrow 3s linear" }}>
              <div className="m-2 -scale-x-100">
                {icon === "sparkle" ? sparkles : outlineStar}
              </div>
            </div>
          </div>
        </h2>
        <div className="h-10"></div>
      </>
    );
  }
);

H2Title.displayName = "H2Title";

export default H2Title;
