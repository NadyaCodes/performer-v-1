import Menu from "@component/components/Menu/Menu";
import MyProgramsComponent from "@component/components/MyPrograms/MyProgramsComponent";
import React, { useEffect } from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { handleTokenAndInfoRefresh, fetchPatreonUserInfo } from "./patreon-si";
import cookie from "cookie";
import type { ObjectList } from "@component/data/types";
import { usePatreon } from "@component/contexts/PatreonContext";

export default function MyPrograms({ userInfo }: { userInfo: ObjectList }) {
  const { setPatreonInfo } = usePatreon();

  useEffect(() => {
    setPatreonInfo(userInfo);
  }, [userInfo]);

  return (
    <>
      <Head>
        <title>My Programs ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen bg-cyan-50 bg-opacity-80">
          <Menu />
          <MyProgramsComponent />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const CLIENT_ID = process.env.PATREON_CLIENT_ID || "";
  const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET || "";

  let authToken = cookie.parse(req.headers.cookie || "").patreonAccessToken;
  let refreshToken = cookie.parse(req.headers.cookie || "").patreonRefreshToken;

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
  } else {
    fetchedUserInfo = null;
  }

  return {
    props: {
      userInfo: (fetchedUserInfo && fetchedUserInfo) || null,
    },
  };
};
