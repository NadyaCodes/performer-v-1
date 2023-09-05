import React, { useEffect } from "react";
import ConnectAccounts from "./ConnectAccounts";
import MembershipOptions from "./MembershipOptions";
import { usePatreon } from "@component/contexts/PatreonContext";
import ThankYou from "./ThankYou";
import FlyingIndigoDiv from "../MyPrograms/FlyingIndigoDiv";
import { ObjectList } from "@component/data/types";

export default function PatreonComponent({ url }: { url: string }) {
  const { patreonInfo, setPatreonInfo } = usePatreon();

  return (
    <div className="flex w-full flex-col place-items-center">
      {patreonInfo && patreonInfo.id ? (
        <ThankYou />
      ) : (
        <ConnectAccounts url={url} />
      )}
      <FlyingIndigoDiv />
      <MembershipOptions />
    </div>
  );
}
