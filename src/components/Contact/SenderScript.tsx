import { useEffect } from "react";

declare global {
  interface Window {
    sender: SenderType;
  }
}

type SenderType = {
  (...args: string[]): void;
  q?: object[];
};

const SenderScript = () => {
  useEffect(() => {
    const loadSenderScript = async () => {
      if (typeof window !== "undefined") {
        window.sender = function (...args: string[]) {
          (window.sender.q = window.sender.q || []).push(args);
        };

        const senderScript = document.createElement("script");
        senderScript.src =
          "https://cdn.sender.net/accounts_resources/universal.js";
        senderScript.async = true;

        await new Promise((resolve, reject) => {
          senderScript.onload = resolve;
          senderScript.onerror = reject;
          document.head.appendChild(senderScript);
        });

        window.sender("2fab698c039070");
      }
    };

    loadSenderScript().catch((error) =>
      console.error("Error loading sender script: ", error)
    );
  }, []);

  return null;
};

export default SenderScript;
