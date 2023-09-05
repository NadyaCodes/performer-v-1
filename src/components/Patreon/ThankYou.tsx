import React, { useEffect } from "react";
import PatreonLogout from "../PatreonButtons/PatreonLogout";
import confetti from "canvas-confetti";
import { usePatreon } from "@component/contexts/PatreonContext";

export default function ThankYou() {
  const { patreonInfo } = usePatreon();
  const patreonName =
    patreonInfo?.firstName || patreonInfo?.fullName || patreonInfo?.email || "";
  useEffect(() => {
    confetti({
      colors: [
        "#22d3ee",
        "#a5f3fc",
        "#0891b2",
        "#a5b4fc",
        "#6366f1",
        "#4338ca",
        "#fde047",
      ],
      particleCount: 30,
      startVelocity: 40,
      spread: 90,
    });
  }, []);

  return (
    <div className="w-fill mb-10 flex flex-col place-items-center">
      <h2 className="mt-7 flex flex-col p-4 text-4xl font-semibold">
        Thank You For Subscribing!
      </h2>
      <div className="m-2 pb-10">
        Your support will go towards continuing to build and grow this resource.
      </div>
      <div className="flex w-full flex-col items-center justify-around mobileMenu:flex-row">
        {patreonName ? (
          <div>Currently logged in as: {patreonName}</div>
        ) : (
          <div>Patreon Account Connected</div>
        )}
        <div className="m-3 mobileMenu:m-0 mobileMenu:place-self-end">
          <PatreonLogout />
        </div>
      </div>
    </div>
  );
}
