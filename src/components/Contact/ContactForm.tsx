import React, { Dispatch, SetStateAction, useState } from "react";
import { ContactInput } from "./ContactComponent";
import { sanitize } from "isomorphic-dompurify";

export type ObjectTextBooleanList = {
  [key: string]: string | boolean;
};

export default function ContactForm({
  setSubmitted,
}: {
  setSubmitted: Dispatch<SetStateAction<boolean | string>>;
}) {
  const emptyInput = {
    name: "",
    email: "",
    subject: "",
    body: "",
    subscribe: false,
    address: "",
  };

  const [input, setInput] = useState<ContactInput>(emptyInput);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateInput = (text: string, field: string): string | null => {
    if (text.includes("</" || "/>")) {
      setTimeout(() => setErrorMessage(""), 3000);
      setErrorMessage("Entries cannot contain HTML");
      return null;
    }

    if (/[^\w\s().@,!?/:]/.test(text)) {
      setTimeout(() => setErrorMessage(""), 4000);
      setErrorMessage(
        "Entries can only contain letters, numbers and the following special characters: ().,!?-/:@"
      );
      return null;
    }

    if (field === "email") {
      if (!text) {
        setTimeout(() => setErrorMessage(""), 3000);
        setErrorMessage("Email address is required");
        return null;
      }
      if (!text.includes("@") || !text.includes(".")) {
        setTimeout(() => setErrorMessage(""), 3000);
        setErrorMessage("Please enter a valid email address");
        return null;
      }
    }

    if (field === "message") {
      setTimeout(() => setErrorMessage(""), 3000);
      setErrorMessage("Please enter a message");
      return null;
    }
    const sanitizedText = sanitize(text);
    return sanitizedText;
  };

  const createFormData = () => {
    if (input.address.length > 0) {
      setSubmitted("submitFail");
      return;
    }
    let submit = true;

    const inputCopy = { ...input };

    const entries = Object.entries(inputCopy);
    const formData: ObjectTextBooleanList = {};

    entries.forEach((entry) => {
      const field = entry[0]?.toLowerCase();
      if (field) {
        const text = entry[1];
        if (typeof text === "string") {
          if (text.length > 0) {
            const validatedResult = validateInput(text, field);
            if (validatedResult) {
              formData[field] = validatedResult;
            } else {
              submit = false;
            }
          } else {
            if (field === "email" || field === "message") {
              setTimeout(() => setErrorMessage(""), 3000);
              setErrorMessage(
                `${field.toLocaleUpperCase()} is a required field.`
              );
              submit = false;
            }
          }
        }

        if (typeof text === "boolean") {
          if (text) {
            formData[field] = text;
          }
        }
      }
    });
    console.log(formData);
    if (submit) {
      return formData;
    }
    // const emailResult = await emailApi.sendEmail(formData);

    //if submit is true, I want this to send an email using nodemailer
  };

  // ... Your other component code ...

  const submitForm = async (formData: ObjectTextBooleanList) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email:", response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error
    }
  };

  const handleSubmit = async () => {
    const formData = createFormData();
    if (formData) {
      submitForm(formData);
    }
  };

  return (
    <div
      className="mx-auto mt-16 flex w-9/12 flex-col content-center justify-center rounded-lg bg-cyan-800 p-4 opacity-0 shadow-md shadow-cyan-600"
      style={{ animation: "pullDownTop .6s linear forwards" }}
    >
      {errorMessage && <div>{errorMessage}</div>}
      <div style={{ animation: "flyIn .5s linear .7s forwards" }}>
        <div
          className="flex flex-col items-center rounded bg-cyan-50 p-5 text-cyan-900 opacity-0"
          style={{ animation: "spinIn .5s linear .7s forwards" }}
        >
          <h1 className="p-2 text-center text-6xl font-bold ">Contact Us</h1>
          <div className="flex w-full flex-col">
            <div className="flex justify-between">
              <div className="m-6 w-5/12">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide "
                  htmlFor="name_input"
                >
                  Name
                </label>
                <input
                  className="block w-full appearance-none rounded border border-cyan-500 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-700 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
                  value={input.name}
                  type="text"
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                  id="name_input"
                />
              </div>
              <div className="m-6 w-5/12">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-wide "
                  htmlFor="email_input"
                >
                  Email <span>*</span>
                </label>
                <input
                  className="block w-full appearance-none rounded border border-cyan-500 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-700 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
                  value={input.email}
                  type="text"
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                  id="email_input"
                  required
                />
              </div>
            </div>
            <div className="m-6">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide"
                htmlFor="subject_input"
              >
                Subject
              </label>
              <input
                className="block w-full appearance-none rounded border border-cyan-500 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-700 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
                value={input.subject}
                type="text"
                onChange={(e) =>
                  setInput({ ...input, subject: e.target.value })
                }
                id="subject_input"
              />
            </div>
            <div className="m-6">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide"
                htmlFor="body_input"
              >
                Message <span>*</span>
              </label>
              <textarea
                className="block w-full appearance-none rounded border border-cyan-500 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-700 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
                value={input.body}
                onChange={(e) => setInput({ ...input, body: e.target.value })}
                id="body_input"
                rows={8}
                required
              />
            </div>
            <div className="m-6 hidden">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide"
                htmlFor="address_input"
              >
                Address
              </label>
              <input
                className="block w-full appearance-none rounded border border-cyan-500 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-700 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
                value={input.address}
                type="text"
                onChange={(e) =>
                  setInput({ ...input, address: e.target.value })
                }
                id="address_input"
              />
            </div>
            <div className="text-bold my-2 place-self-center text-lg italic text-cyan-900">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={input.subscribe || false}
                onChange={(e) =>
                  setInput({
                    ...input,
                    subscribe: e.target.checked,
                  })
                }
              />
              <span>Yes, I would like to subscribe to email updates</span>
            </div>
            <button
              onClick={(e) => handleSubmit()}
              className="font-2xl mx-20 my-5 rounded-lg border-2  border-cyan-700 py-4 font-bold text-cyan-800 transition-all hover:scale-110"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
