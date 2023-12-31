import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { oauth as patreonOAuth } from "patreon";
import cookie from "cookie";
import { usePatreon } from "@component/contexts/PatreonContext";
import type { ObjectList } from "@component/data/types";
import type { ServerResponse, IncomingMessage } from "http";
import { useEffectOnce } from "@component/components/AddProgramResult/helpers";

export type PatreonRelationships = {
  memberships: {
    data: ObjectList[];
  };
};

export type PatreonAPIResponse = {
  data: {
    attributes: ObjectList;
    id: string;
    type: string;
    relationships: PatreonRelationships;
  };
};

export type TokenAPIResponse = {
  access_token: string;
  refresh_token: string;
  [key: string]: string;
};

export const makeTokenCookies = (
  authToken: string,
  refreshToken: string,
  res: ServerResponse<IncomingMessage>
) => {
  const accessTokenCookie = cookie.serialize("patreonAccessToken", authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  const refreshTokenCookie = cookie.serialize(
    "patreonRefreshToken",
    refreshToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    }
  );

  res.setHeader("Set-Cookie", [accessTokenCookie, refreshTokenCookie]);
};

export async function fetchPatreonUserInfo(accessToken: string) {
  try {
    const apiUrlMemberships =
      "https://www.patreon.com/api/oauth2/v2/identity?fields%5Buser%5D=first_name,full_name,email&include=memberships";
    const headersAuthToken = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(apiUrlMemberships, {
      method: "GET",
      headers: headersAuthToken,
    });

    if (!response.ok) {
      return null;
    }

    const data: PatreonAPIResponse =
      (await response.json()) as PatreonAPIResponse;

    const membershipData =
      data?.data?.relationships?.memberships?.data[0] || {};
    const extraData = {
      firstName: data.data.attributes.first_name || "",
      fullName: data.data.attributes.full_name || "",
      memberPatreonId: data.data.id || "",
      email: data.data.attributes.email || "",
    };

    const fieldsToAssign = Object.keys(extraData) as (keyof typeof extraData)[];

    fieldsToAssign.forEach((field) => {
      if (extraData[field]) {
        membershipData[field] = extraData[field];
      }
    });

    return membershipData;
  } catch (error) {
    console.error("Error fetching user info: ", error);
    throw error;
  }
}

export const handleTokenAndInfoRefresh = async (
  authToken: string,
  refreshToken: string,
  res: ServerResponse<IncomingMessage>,
  CLIENT_ID: string,
  CLIENT_SECRET: string,
  fetchPatreonUserInfo: (accessToken: string) => Promise<ObjectList | null>
) => {
  if (!authToken || !refreshToken) {
    return null;
  }
  makeTokenCookies(authToken, refreshToken, res);
  let fetchedUserInfo = await fetchPatreonUserInfo(authToken);

  if (!fetchedUserInfo) {
    const payload = new URLSearchParams();
    payload.append("grant_type", "refresh_token");
    payload.append("refresh_token", refreshToken);
    payload.append("client_id", CLIENT_ID);
    payload.append("client_secret", CLIENT_SECRET);

    const refreshUrl = "https://www.patreon.com/api/oauth2/token";
    console.log("payload: ", payload);

    const refreshResponse = await fetch(refreshUrl, {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!refreshResponse.ok) {
      console.error("Error fetching refresh token:", refreshResponse);
      return null;
    }

    const tokensResponse: TokenAPIResponse =
      (await refreshResponse.json()) as TokenAPIResponse;
    authToken = tokensResponse.access_token;
    refreshToken = tokensResponse.refresh_token;

    makeTokenCookies(authToken, refreshToken, res);

    fetchedUserInfo = await fetchPatreonUserInfo(authToken);
  }

  return fetchedUserInfo;
};

type PatreonSIProps = {
  userInfo: ObjectList | null;
};

const PatreonSI: NextPage<PatreonSIProps> = ({ userInfo }) => {
  const { setPatreonInfo } = usePatreon();
  const router = useRouter();

  useEffectOnce(() => {
    setPatreonInfo({ ...userInfo });
    console.log("userInfo: ", userInfo);
    if (userInfo && userInfo.id) {
      router
        .push("/patreon")
        .catch((error) =>
          console.error("Error redirecting to /patreon: ", error)
        );
    } else {
      router
        .push("/patreon-no-account")
        .catch((error) =>
          console.error("Error redirecting to /patreon-no-account: ", error)
        );
    }
  });

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
      <main></main>
    </>
  );
};

export default PatreonSI;

export const getServerSideProps: GetServerSideProps<PatreonSIProps> = async (
  context
) => {
  const { req, res, query } = context;
  const code = query?.code || "";

  const CLIENT_ID = process.env.PATREON_CLIENT_ID || "";
  const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET || "";
  const REDIRECT_URL = `${process.env.BASE_URL || ""}/patreon-si`;

  const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);

  let authToken = cookie.parse(req.headers.cookie || "").patreonAccessToken;
  let refreshToken = cookie.parse(req.headers.cookie || "").patreonRefreshToken;

  if (!authToken) {
    try {
      const tokensResponse = await patreonOAuthClient.getTokens(
        code,
        REDIRECT_URL
      );
      refreshToken = tokensResponse.refresh_token;
      authToken = tokensResponse.access_token;
      if (authToken && refreshToken) {
        makeTokenCookies(authToken, refreshToken, res);
      }
    } catch (error) {
      console.error("Error fetching tokens: ", error);
    }
  }
  let fetchedUserInfo: ObjectList | null;
  try {
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
  } catch (error) {
    console.log("Error fetching and refreshing tokens: ", error);
    fetchedUserInfo = null;
  }

  return {
    props: {
      userInfo: (fetchedUserInfo && fetchedUserInfo) || null,
    },
  };
};
