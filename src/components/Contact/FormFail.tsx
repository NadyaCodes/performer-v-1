import React, { Dispatch, SetStateAction } from "react";

export default function FormFail({
  setSubmitted,
}: {
  setSubmitted: Dispatch<SetStateAction<boolean | string>>;
}) {
  return (
    <div>
      An error occurred while submitting your form. Please try again.
      <button
        className="m-5 rounded p-3 outline"
        onClick={() => setSubmitted(false)}
      >
        Close
      </button>
    </div>
  );
}
