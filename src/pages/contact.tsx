import ContactComponent from "@component/components/Contact/ContactComponent";
import Menu from "@component/components/Menu/Menu";
import React from "react";
import SenderScript from "@component/components/Contact/SenderScript";

export default function Contact() {
  return (
    <>
      <div className="bg-slate-900">
        <Menu />
        <SenderScript />
        <ContactComponent />
      </div>
    </>
  );
}
