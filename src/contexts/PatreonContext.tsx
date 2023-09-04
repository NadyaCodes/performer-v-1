import type { ObjectList } from "@component/data/types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { GetServerSideProps } from "next";
import {
  handleTokenAndInfoRefresh,
  fetchPatreonUserInfo,
} from "@component/pages/patreon-si";
import { oauth as patreonOAuth } from "patreon";
import * as cookie from "cookie";

const PatreonContext = createContext<PatreonContextType | null>(null);

export function usePatreon() {
  const context = useContext(PatreonContext);
  if (context === null) {
    throw new Error("usePatreon must be used within a PatreonProvider");
  }
  return context;
}

export type PatreonContextType = {
  patreonInfo: ObjectList | null;
  setPatreonInfo: React.Dispatch<React.SetStateAction<ObjectList | null>>;
};

export function PatreonProvider({ children }: { children: ReactNode }) {
  const [patreonInfo, setPatreonInfo] = useState<ObjectList | null>(null);

  return (
    <PatreonContext.Provider
      value={{
        patreonInfo,
        setPatreonInfo,
      }}
    >
      {children}
    </PatreonContext.Provider>
  );
}
