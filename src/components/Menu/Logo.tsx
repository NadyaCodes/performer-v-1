import React from "react";

export default function Logo({ color }: { color: string }) {
  const classString = `my-4 text-lg font-extrabold text-${color} 2xl:text-2xl`;

  return (
    <div className={classString}>
      <div className="-my-3">ACT.</div>
      <div className="-my-3">SING.</div>
      <div className="-my-3">DANCE.</div>
      <div className="-my-3">REPEAT.</div>
    </div>
  );
}
