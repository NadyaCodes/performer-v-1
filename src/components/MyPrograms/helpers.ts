import { sanitize } from "isomorphic-dompurify";

export const validateInput = (text: string, errorMessageSetter: Function): string | null => {
  if (!text) {
    setTimeout(() => errorMessageSetter(""), 3000);
    errorMessageSetter("Notes must have text");
    return null;
  }
  if (text.length > 300) {
    setTimeout(() => errorMessageSetter(""), 3000);
    errorMessageSetter("Notes must be 300 characters or less");
    return null;
  }

  if (text.includes("</" || "/>")) {
    setTimeout(() => errorMessageSetter(""), 3000);
    errorMessageSetter("Notes cannot contain HTML");
    return null;
  }

  if (/[^\w\s().@,!?/:\-]/.test(text)) {
    setTimeout(() => errorMessageSetter(""), 4000);
    errorMessageSetter(
      "Notes can only contain letters, numbers and the following special characters: ().,!?/:@"
    );
    return null;
  }
  const sanitizedText = sanitize(text);
  return sanitizedText;
};