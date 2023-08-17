import React, { Dispatch, SetStateAction } from "react";

export default function FormFail({
  setSubmitted,
}: {
  setSubmitted: Dispatch<SetStateAction<boolean | string>>;
}) {
  return (
    <div>
      FormFail
      <button
        className="m-5 rounded p-3 outline"
        onClick={() => setSubmitted(false)}
      >
        Close
      </button>
    </div>
  );
}
