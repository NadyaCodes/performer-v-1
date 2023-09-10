import React from "react";
import ConnectAccounts from "./ConnectAccounts";
import MembershipOptions from "./MembershipOptions";
import { usePatreon } from "@component/contexts/PatreonContext";
import ThankYou from "./ThankYou";
import FlyingIndigoDiv from "../MyPrograms/FlyingIndigoDiv";
import WhatIsPatreon from "./WhatIsPatreon";

export default function PatreonComponent({ url }: { url: string }) {
  const { patreonInfo } = usePatreon();

  return (
    <div className="flex w-full flex-col place-items-center">
      {patreonInfo && patreonInfo.id && patreonInfo.id !== "patreonBypass" ? (
        <ThankYou />
      ) : (
        <ConnectAccounts url={url} />
      )}
      <FlyingIndigoDiv />
      <WhatIsPatreon />
    </div>
  );
}
