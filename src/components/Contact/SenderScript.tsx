import { useEffect } from "react";

declare global {
  interface Window {
    sender: any;
  }
}

const SenderScript = () => {
  useEffect(() => {
    const loadSenderScript = async () => {
      if (typeof window !== "undefined") {
        window.sender = function () {
          (window.sender.q = window.sender.q || []).push(arguments);
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

    loadSenderScript();
  }, []);

  return null;
};

export default SenderScript;
