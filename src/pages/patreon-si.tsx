import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import { GetServerSideProps } from "next";
// import url from "url";
// import patreonAPI, { oauth as patreonOAuth } from "patreon";
import { useEffect, useState } from "react";

import { NextApiRequest, NextApiResponse } from "next";
// import patreonAPI, { oauth as patreonOAuth } from 'patreon';
import url from "url";
import { patreon, oauth as patreonOAuth } from "patreon";
import { getSession } from "next-auth/react";
import * as cookie from "cookie";
import { usePatreon } from "@component/contexts/PatreonContext";
import { ObjectList } from "@component/data/types";

export const makeTokenCookies = (authToken, refreshToken, res) => {
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

export async function fetchPatreonUserInfo(accessToken) {
  try {
    //////////version that fetches user info

    // console.log("tokensResponse: ", tokensResponse);
    // const patreonAPIClient = patreon(tokensResponse.access_token);

    // console.log("patreonAPIClient: ", patreonAPIClient);

    ////this is where things go south
    // const apiUrlMemberships =
    //   "https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers";
    const apiUrlMemberships =
      "https://www.patreon.com/api/oauth2/v2/identity?fields%5Buser%5D=first_name,full_name,email&include=memberships";

    // const apiUrlMemberships = "https://www.patreon.com/api/oauth2/v2/identity";
    const headersAuthToken = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(apiUrlMemberships, {
      method: "GET",
      headers: headersAuthToken,
    });

    if (!response.ok) {
      console.log("Token rejected");
      return null;
    }

    const data = await response.json();
    console.log("data: ", data);
    const membershipData = data.data.relationships.memberships.data[0];
    const extraData: ObjectList = {
      firstName: data.data.attributes.first_name,
      fullName: data.data.attributes.full_name,
      memberPatreonId: data.data.id,
      email: data.data.attributes.email,
    };

    // Define the fields you want to assign to membershipData
    const fieldsToAssign = [
      "firstName",
      "fullName",
      "memberPatreonId",
      "email",
    ];

    // Use a loop to assign the defined fields to membershipData
    fieldsToAssign.forEach((field) => {
      if (extraData[field]) {
        membershipData[field] = extraData[field];
      }
    });

    console.log("membershipData: ", membershipData);

    return membershipData;
  } catch (error) {
    console.error("Error fetching user info: ", error);
    throw error;
  }
}

export const handleTokenAndInfoRefresh = async (
  // session,
  authToken,
  refreshToken,
  res,
  CLIENT_ID,
  CLIENT_SECRET,
  fetchPatreonUserInfo
) => {
  console.log("inside func authToken: ", authToken);
  console.log("inside func refreshToken: ", refreshToken);

  // Check if the user is authenticated
  // if (session) {
  // Refresh tokens if needed
  makeTokenCookies(authToken, refreshToken, res);
  let fetchedUserInfo = await fetchPatreonUserInfo(authToken);

  if (!fetchedUserInfo) {
    const payload = new URLSearchParams();
    payload.append("grant_type", "refresh_token");
    payload.append("refresh_token", refreshToken);
    payload.append("client_id", CLIENT_ID);
    payload.append("client_secret", CLIENT_SECRET);

    const refreshUrl = "https://www.patreon.com/api/oauth2/token";
    console.log(payload);

    const refreshResponse = await fetch(refreshUrl, {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!refreshResponse.ok) {
      throw new Error("Failed to refresh access token");
    }

    const tokensResponse = await refreshResponse.json();
    authToken = tokensResponse.access_token;
    refreshToken = tokensResponse.refresh_token;

    // Set the updated cookies
    makeTokenCookies(authToken, refreshToken, res);

    fetchedUserInfo = await fetchPatreonUserInfo(authToken);
  }

  return fetchedUserInfo;
  // }

  // return null; // User is not authenticated
};

interface PatreonProps {
  userInfo: any;
  logoutFlag: any;
}

const PatreonSI: NextPage<PatreonProps> = ({ userInfo, logoutFlag }) => {
  const { setPatreonInfo } = usePatreon();
  const router = useRouter();
  useEffect(() => {
    setPatreonInfo({ ...userInfo });
    router.push("/patreon");
  }, []);
  // const [patreonUser, setPatreonUser] = useState(userInfo);
  // useEffect(() => {
  //   console.log("New User Info! ", userInfo);
  // }, [userInfo]);

  // const patreonLogOut = async () => {
  //   try {
  //     // Call the server-side logout route
  //     const response = await fetch("/api/patreon-logout"); // Replace with your actual route

  //     if (response.ok) {
  //       // Handle successful logout
  //       // Redirect to the login page or any other appropriate action
  //       // window.location.href = '/login';
  //       setPatreonUser(null);
  //     } else {
  //       // Handle logout error
  //       console.error("Logout failed:", response.statusText);
  //     }
  //   } catch (error) {
  //     // Handle any logout errors here
  //     console.error("Logout failed:", error);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Patreon ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <div className="min-h-screen bg-cyan-50 text-cyan-950 opacity-80">
          <Menu />
          <div className="flex flex-col items-center justify-center">
            <h1 className="p-10 text-3xl font-bold">Patreon Page</h1>
            <div>{patreonUser ? patreonUser : "User isn't a member"}</div> */}
        {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
        {/* <button
              className="rounded-full border-2 border-cyan-900 p-5 text-lg hover:scale-110"
              onClick={() => patreonLogOut()}
            >
              Log Out of Patreon
            </button> */}
        {/* </a> */}
        {/* </div>
        </div> */}
      </main>
    </>
  );
};

export default PatreonSI;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  const session = await getSession({ req });
  const code = query?.code || "";

  const CLIENT_ID = process.env.PATREON_CLIENT_ID;
  const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET;
  const REDIRECT_URL = "http://127.0.0.1:3000/patreon-si";

  const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);

  let authToken = cookie.parse(req.headers.cookie || "").patreonAccessToken;
  let refreshToken = cookie.parse(req.headers.cookie || "").patreonRefreshToken;

  if (!authToken) {
    const tokensResponse = await patreonOAuthClient.getTokens(
      code,
      REDIRECT_URL
    );
    refreshToken = tokensResponse.refresh_token;
    authToken = tokensResponse.access_token;

    makeTokenCookies(authToken, refreshToken, res);
  }
  let fetchedUserInfo;
  try {
    fetchedUserInfo = await handleTokenAndInfoRefresh(
      authToken,
      refreshToken,
      res,
      CLIENT_ID,
      CLIENT_SECRET,
      fetchPatreonUserInfo
    );
    // let fetchedUserInfo;
    // if (session) {
    //   makeTokenCookies(authToken, refreshToken, res);
    //   fetchedUserInfo = await fetchPatreonUserInfo(
    //     authToken
    //     // "uo7m8UVhHz1sUAsRA73s7oocHsXR-O8bOQUNSVgvGeo"
    //   );
    //   if (!fetchedUserInfo) {
    //     const payload = new URLSearchParams();
    //     payload.append("grant_type", "refresh_token");
    //     payload.append("refresh_token", refreshToken);
    //     payload.append("client_id", CLIENT_ID);
    //     payload.append("client_secret", CLIENT_SECRET);

    //     const refreshUrl = "https://www.patreon.com/api/oauth2/token";

    //     const refreshResponse = await fetch(refreshUrl, {
    //       method: "POST",
    //       body: payload,
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     });
    //     if (!refreshResponse.ok) {
    //       throw new Error("Failed to refresh access token");
    //     }

    //     const tokensResponse = await refreshResponse.json();
    //     authToken = tokensResponse.access_token;
    //     refreshToken = tokensResponse.refresh_token;
    //     makeTokenCookies(authToken, refreshToken, res);

    //     fetchedUserInfo = await fetchPatreonUserInfo(authToken);
    // }
  } catch (error) {
    console.log("Error fetching and refreshing tokens: ", error);
    fetchedUserInfo = null;
  }

  const logoutFlag = context.query.logout === "true";

  return {
    props: {
      userInfo: (fetchedUserInfo && fetchedUserInfo) || "",
      logoutFlag,
    },
  };
  // } catch (error) {
  //   console.error("Error fetching user profile:", error);

  //   return {
  //     props: {
  //       userInfo: null,
  //     },
  //   };
  // }
};

// const apiUrlCampaigns =
//   "https://www.patreon.com/api/oauth2/v2/campaigns/11012516";

// const apiUrlCampaigns =
//   "https://www.patreon.com/api/oauth2/v2/campaigns/11012516/pledges?include=patron.null";
// const apiUrlCampaigns =
//   "https://www.patreon.com/api/oauth2/v2/campaigns/11012516/members";
// const apiUrlCampaigns = "https://www.patreon.com/api/oauth2/v2/campaigns";
