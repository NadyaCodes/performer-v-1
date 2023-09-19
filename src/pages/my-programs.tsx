import Menu from "@component/components/Menu/Menu";
import MyProgramsComponent from "@component/components/MyPrograms/MyProgramsComponent";
import React, { useEffect } from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { handleTokenAndInfoRefresh, fetchPatreonUserInfo } from "./patreon-si";
import cookie from "cookie";
import type { ObjectList } from "@component/data/types";
import { usePatreon } from "@component/contexts/PatreonContext";
import FooterComponent from "@component/components/Footer/FooterComponent";

export default function MyPrograms({ userInfo }: { userInfo: ObjectList }) {
  const { setPatreonInfo } = usePatreon();

  useEffect(() => {
    setPatreonInfo(userInfo);
  }, [userInfo, setPatreonInfo]);

  return (
    <>
      <Head>
        <title>My Programs ~ Act. Sing. Dance. Repeat.</title>
        <meta
          name="description"
          content="My Programs - Act. Sing. Dance. Repeat."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between bg-cyan-50 bg-opacity-80">
          <div>
            <Menu />
            <MyProgramsComponent />
          </div>
          <div className="mt-20">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const CLIENT_ID = process.env.PATREON_CLIENT_ID || "";
  const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET || "";

  const authToken = cookie.parse(req.headers.cookie || "").patreonAccessToken;
  const refreshToken = cookie.parse(
    req.headers.cookie || ""
  ).patreonRefreshToken;

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
