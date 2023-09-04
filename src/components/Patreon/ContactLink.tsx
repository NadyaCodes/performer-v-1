import React from "react";
import Link from "next/link";

export default function ContactLink() {
  return (
    <Link href={"/contact"} className="font-bold text-cyan-400 underline">
      Contact Us
    </Link>
  );
}
