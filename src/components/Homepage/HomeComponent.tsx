import React from "react";
import CircleSwell from "./CircleSwell";
import Hero from "./Hero";

export default function HomeComponent() {
  return (
    <div className="m-10 w-full text-xl text-white">
      <div className="">
        Course Selector: Find schools by following a rabbit hole of links
      </div>
      <div className="">
        Course Finder: Find schools by selecting filters and searching for the
        things you want!
      </div>
      <Hero />
      {/* <CircleSwell /> */}
    </div>
  );
}
