import React, { Dispatch, SetStateAction } from "react";

export default function FormSubmitted({
  setSubmitted,
}: {
  setSubmitted: Dispatch<SetStateAction<boolean | string>>;
}) {
  return <div>Form Submitted</div>;
}
