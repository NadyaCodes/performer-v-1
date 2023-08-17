import React, { useState } from "react";
import LogoTicker from "../About/LogoTicker";
import ContactForm from "./ContactForm";
import FormSubmitted from "./FormSubmitted";
import FormFail from "./FormFail";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  body: string;
  subscribe: boolean;
  address: string;
};

export default function ContactComponent() {
  const [submitted, setSubmitted] = useState<boolean | string>(false);

  return (
    <div className="min-h-screen pb-20">
      <LogoTicker />
      {submitted === false && <ContactForm setSubmitted={setSubmitted} />}
      {submitted === "submitSuccess" && (
        <FormSubmitted setSubmitted={setSubmitted} />
      )}
      {submitted === "submitFail" && <FormFail setSubmitted={setSubmitted} />}
    </div>
  );
}
