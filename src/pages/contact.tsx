import ContactComponent from "@component/components/Contact/ContactComponent";
import Menu from "@component/components/Menu/Menu";
import React from "react";

export default function Contact() {
  return (
    <div className="bg-cyan-50 bg-opacity-80">
      <Menu />
      <ContactComponent />
    </div>
  );
}
