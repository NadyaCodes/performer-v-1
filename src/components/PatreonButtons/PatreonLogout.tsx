import React from "react";
import { usePatreon } from "@component/contexts/PatreonContext";

export default function PatreonLogout() {
  const { setPatreonInfo } = usePatreon();
  const patreonLogOut = async () => {
    try {
      const response = await fetch("/api/patreon-logout");

      if (response.ok) {
        setPatreonInfo(null);
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <button
      className="rounded-full border-2 border-indigo-800 bg-indigo-50 p-4 text-lg text-indigo-600 transition-all hover:scale-110 hover:bg-indigo-600 hover:text-indigo-50"
      onClick={() => patreonLogOut()}
    >
      Disconnect Patreon
    </button>
  );
}
