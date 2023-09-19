import { useEffect } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import PatreonComponent from "@component/components/Patreon/PatreonComponent";
import type { ObjectList } from "@component/data/types";
import { handleTokenAndInfoRefresh, fetchPatreonUserInfo } from "./patreon-si";
import cookie from "cookie";
import { usePatreon } from "@component/contexts/PatreonContext";
import FooterComponent from "@component/components/Footer/FooterComponent";

interface PatreonProps {
  url: string;
  userInfo: ObjectList;
}

const Patreon: NextPage<PatreonProps> = ({ url, userInfo }) => {
  const { setPatreonInfo } = usePatreon();

  useEffect(() => {
    setPatreonInfo(userInfo);
  }, [userInfo, setPatreonInfo]);

  return (
    <>
      <Head>
        <title>Patreon ~ Act. Sing. Dance. Repeat.</title>
        <meta
          name="description"
          content="Patreon - Act. Sing. Dance. Repeat."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex min-h-screen flex-col justify-between bg-cyan-950 text-cyan-50">
          <div>
            <Menu />
            <div className="flex flex-col items-center justify-center text-center 2xl:mt-10">
              <h1
                className="w-11/12 p-10 text-5xl font-semibold"
                style={{ animation: "fadeInGrow 1s linear forwards" }}
              >
                <span className="font-bold italic text-indigo-200">
                  Unlock Site Features
                </span>{" "}
                and{" "}
                <span className="font-bold italic text-indigo-200">
                  Upgrade Program Listings
                </span>{" "}
                with Patreon
              </h1>

              <PatreonComponent url={url} />
            </div>
          </div>
          <div className="">
            <FooterComponent bgColor="bg-cyan-900" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Patreon;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const CLIENT_ID = process.env.PATREON_CLIENT_ID || "";
  const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET || "";

  const OAUTH_REDIRECT_URL = encodeURIComponent(
    `${process.env.BASE_URL || ""}/patreon-si`
  );

  const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;

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
      url: oauthUrl,
      userInfo: (fetchedUserInfo && fetchedUserInfo) || null,
    },
  };
};
