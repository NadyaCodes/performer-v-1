import React from "react";

export default function Logo({ color }: { color: string }) {
  const classString = `text-5xl font-extrabold tracking-tight sm:text-[0.8rem] text-${color}`;

  return (
    <div className={classString}>
      <div>ACT.</div>
      <div>SING.</div>
      <div>DANCE.</div>
      <div>REPEAT.</div>
    </div>
  );
}
