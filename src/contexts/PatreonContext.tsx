import type { ObjectList } from "@component/data/types";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import { patreonBypassIds } from "@component/data/constants";
import { api } from "@component/utils/api";

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
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;

  useEffect(() => {
    if (patreonInfo === null || !patreonInfo.id) {
      if (userId && patreonBypassIds.includes(userId)) {
        setPatreonInfo({ id: "patreonBypass" });
      }
    }
  }, [patreonInfo, userId]);

  const { mutate: updateUserPatreonId } = api.user.updatePatreonId.useMutation({
    async onSuccess() {},
    onError(error) {
      console.log("createExample error: ", error);
    },
  });

  useEffect(() => {
    if (userId && patreonInfo?.id) {
      updateUserPatreonId({ id: userId, patreonId: patreonInfo?.id });
    }
  }, [userId, patreonInfo, updateUserPatreonId]);

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
