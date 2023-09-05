import React from "react";
import { usePatreon } from "@component/contexts/PatreonContext";
import PatreonPageLink from "./PatreonPageLink";

export default function PatreonLinkOrLogout() {
  const { patreonInfo } = usePatreon();

  return (
    <div>
      {patreonInfo && patreonInfo.id ? (
        <PatreonPageLink text="Patreon Dashboard" />
      ) : (
        <PatreonPageLink text="Connect Patreon" />
      )}
    </div>
  );
}
