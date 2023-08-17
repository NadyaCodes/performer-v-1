import React, { Dispatch, SetStateAction, useState } from "react";

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

  const [input, setInput] = useState(emptyInput);

  const submitForm = () => {
    if (input.address.length > 0) {
      setSubmitted("submitFail");
      return;
    }
  };

  return (
    <div
      className="mx-auto my-16 flex w-2/3 flex-col rounded-lg bg-cyan-100 bg-opacity-30 p-5 opacity-0 shadow-md shadow-cyan-600"
      style={{ animation: "fadeInGrow 1s linear 0.2s forwards" }}
    >
      {" "}
      <h1 className="p-2 text-center text-6xl font-bold text-cyan-900">
        Contact Us
      </h1>
      <div className="flex justify-between">
        <div className="m-6 w-5/12">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide "
            htmlFor="name_input"
          >
            Name
          </label>
          <input
            className="block w-full appearance-none rounded border border-cyan-400 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-800 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
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
            Email
          </label>
          <input
            className="block w-full appearance-none rounded border border-cyan-400 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-800 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
            value={input.email}
            type="text"
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            id="email_input"
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
          className="block w-full appearance-none rounded border border-cyan-400 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-800 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
          value={input.subject}
          type="text"
          onChange={(e) => setInput({ ...input, subject: e.target.value })}
          id="subject_input"
        />
      </div>
      <div className="m-6">
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wide"
          htmlFor="body_input"
        >
          Message
        </label>
        <textarea
          className="block w-full appearance-none rounded border border-cyan-400 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-800 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
          value={input.body}
          onChange={(e) => setInput({ ...input, body: e.target.value })}
          id="body_input"
          rows={8}
        />
      </div>
      <div className="m-6">
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wide"
          htmlFor="address_input"
        >
          Address
        </label>
        <input
          className="block w-full appearance-none rounded border border-cyan-400 bg-cyan-50 bg-opacity-100 px-4 py-3 leading-tight text-cyan-950 shadow-sm shadow-cyan-800 focus:border-cyan-500 focus:bg-cyan-50 focus:bg-opacity-40 focus:outline-indigo-500"
          value={input.address}
          type="text"
          onChange={(e) => setInput({ ...input, address: e.target.value })}
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
        onClick={() => submitForm()}
        className="font-2xl mx-20 my-5 rounded-lg border-2  border-cyan-700 py-4 font-bold text-cyan-800 transition-all hover:scale-110"
      >
        Submit
      </button>
    </div>
  );
}
