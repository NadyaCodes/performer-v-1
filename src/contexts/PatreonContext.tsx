import type { ObjectList } from "@component/data/types";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { NextPage, GetServerSideProps } from "next";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import url from "url";
import Link from "next/link";
// import patreon from "patreon";
// var patreon = require("patreon");
import PatreonComponent from "@component/components/Patreon/PatreonComponent";
import {
  handleTokenAndInfoRefresh,
  fetchPatreonUserInfo,
  makeTokenCookies,
} from "@component/pages/patreon-si";
import { patreon, oauth as patreonOAuth } from "patreon";
import { getSession } from "next-auth/react";
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

export function PatreonProvider({
  children,
  userInfo,
}: {
  children: ReactNode;
  userInfo: ObjectList;
}) {
  const [patreonInfo, setPatreonInfo] = useState<ObjectList | null>(userInfo);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  // const patreonUser = "Joe";
  // const patreonAPI = patreon.patreon;
  // const patreonOAuth = patreon.oauth;

  const CLIENT_ID = process.env.PATREON_CLIENT_ID;
  const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET;
  // const PATREON_CREATOR_ACCESS_TOKEN = process.env.PATREON_CREATOR_ACCESS_TOKEN;

  // const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);

  const OAUTH_REDIRECT_URL = encodeURIComponent(
    `${process.env.BASE_URL}/patreon-si`
  ); // Replace with your actual redirect URL

  // const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}`;
  const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;

  // const OAUTH_REDIRECT_URL = encodeURIComponent(oauthUrl); // Replace with your actual redirect URL
  const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);

  // let authToken = cookie.parse(
  //   req.headers.patreonAccessToken || ""
  // ).patreonAccessToken;
  // let refreshToken = cookie.parse(
  //   req.headers.patreonRefreshToken || ""
  // ).patreonRefreshToken;
  let authToken = cookie.parse(req.headers.cookie || "").patreonAccessToken;
  let refreshToken = cookie.parse(req.headers.cookie || "").patreonRefreshToken;

  console.log("authToken: ", authToken);
  console.log("refreshToken: ", refreshToken);
  let fetchedUserInfo;

  if (authToken && refreshToken) {
    fetchedUserInfo = await handleTokenAndInfoRefresh(
      authToken,
      refreshToken,
      res,
      CLIENT_ID,
      CLIENT_SECRET,
      fetchPatreonUserInfo
    );
  }

  return {
    props: {
      // url: oauthUrl,
      userInfo: !fetchedUserInfo ? null : fetchedUserInfo,
    },
  };
};
