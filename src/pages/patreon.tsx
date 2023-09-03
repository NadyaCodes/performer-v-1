import type { NextPage, GetStaticProps } from "next";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import url from "url";
import Link from "next/link";
// import patreon from "patreon";
// var patreon = require("patreon");
import * as patreon from "patreon";

interface PatreonProps {
  url: string;
}

const Patreon: NextPage<PatreonProps> = ({ url }) => {
  // console.log(patreonUser);

  // const PatreonButton = () => {
  //   const clientId = `&client_id=${CLIENT_ID}`;
  //   const pledgeLevel = `$&min_cents=0`;
  //   const v2Params = "&scope=identity%20identity[email]";
  //   const redirectUri = `&redirect_uri=${OAUTH_REDIRECT_URL}`;
  //   const href = `https://www.patreon.com/oauth2/become-patron?response_type=code${pledgeLevel}${clientId}${redirectUri}${v2Params}`;
  //   return (
  //     <a
  //       className="patreon-button link-button"
  //       data-patreon-widget-type="become-patron-button"
  //       href={href}
  //       rel="noreferrer"
  //       target="_blank"
  //     >
  //       <svg
  //         id="patreon-logo"
  //         viewBox="10 0 2560 356"
  //         xmlns="http://www.w3.org/2000/svg"
  //         xmlnsXlink="http://www.w3.org/1999/xlink"
  //       >
  //         <g>
  //           <path d="M1536.54 72.449v76.933h128.24v61.473h-128.24v74.51h128.24v62.921h-206.64V9.529h206.64v62.92h-128.24M2070.82 178.907c0-55.652-37.76-107.434-99.21-107.434-61.95 0-99.21 51.782-99.21 107.434s37.26 107.435 99.21 107.435c61.45 0 99.21-51.783 99.21-107.435zm-278.77 0c0-92.916 66.79-178.093 179.56-178.093 112.26 0 179.05 85.177 179.05 178.093 0 92.916-66.79 178.093-179.05 178.093-112.77 0-179.56-85.177-179.56-178.093zM186.32 131.97c0-31.46-21.299-58.563-54.206-58.563H78.398v117.109h53.716c32.907 0 54.206-27.086 54.206-58.546zM0 9.529h141.788c75.016 0 123.417 56.628 123.417 122.441s-48.401 122.423-123.417 122.423h-63.39v93.893H0V9.529zM492.17 106.314l-41.621 139.382h82.266L492.17 106.314zm73.081 241.972-13.054-41.134H431.69l-13.072 41.134h-83.73L455.882 9.529h72.105l122.442 338.757h-85.178zM782.055 77.277H705.61V9.529h231.793v67.748h-76.951v271.009h-78.397V77.277M2485.08 230.202V9.529h77.91v338.757h-81.78l-121.97-217.78v217.78h-78.4V9.529h81.78l122.46 220.673M1245.68 131.97c0-31.46-21.3-58.563-54.21-58.563h-53.72v117.109h53.72c32.91 0 54.21-27.086 54.21-58.546zM1059.36 9.529h142.29c75 0 123.4 56.628 123.4 122.441 0 47.425-25.17 89.517-67.28 109.369l67.77 106.947h-90.98l-60.03-93.893h-36.78v93.893h-78.39V9.529z" />
  //         </g>
  //       </svg>{" "}
  //     </a>
  //   );
  // };

  const connectPatreonAccount = () => {};

  const contactLink = (
    <Link href={"/contact"} className="font-bold text-cyan-400 underline">
      Contact Us
    </Link>
  );

  return (
    <>
      <Head>
        <title>Patreon ~ Act. Sing. Dance. Repeat.</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen bg-cyan-950 text-cyan-50">
          <Menu />
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="p-10 text-5xl font-bold">
              Unlock All Site Features with Patreon!
            </h1>
            <h2 className="m-5 text-xl font-semibold">
              Already a patreon subscriber to{" "}
              <span className="font-bold">Act. Sing. Dance. Repeat</span>?
            </h2>
            {/* <a href={url} target="_blank" rel="noopener noreferrer"> */}
            <button
              className="rounded-full border-2 border-cyan-200 p-5 text-lg shadow-md shadow-indigo-400 transition-all hover:scale-110 hover:border-indigo-400"
              onClick={() => connectPatreonAccount()}
            >
              Connect Patreon Account Now
            </button>
            {/* </a> */}
            <div className="m-2 flex flex-col italic">
              <div>*occasional re-connections may be required.</div>
              <div>
                Please {contactLink} regarding any technical difficulties!
              </div>
            </div>

            <div className="flex w-4/6 max-w-2xl flex-col ">
              <h2 className="mt-10 flex flex-col text-4xl font-semibold">
                Member Perks
              </h2>
              <div className="flex w-full justify-end">
                <a
                  href="https://www.patreon.com/actsingdancerepeat/membership"
                  target="_blank"
                >
                  <button className=" place-self-end rounded-full border-2 border-cyan-200 p-5 text-lg shadow-md shadow-indigo-400 transition-all hover:scale-110 hover:border-indigo-400">
                    Subscribe Here!
                  </button>
                </a>
              </div>

              <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
                "Artist" - 4.00/Month
                <ul className="list-inside list-disc pl-10 text-left font-normal">
                  <li>Add notes to your saved programs</li>
                  <li>Add custom programs</li>
                </ul>
              </div>
              <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
                "Studio" - 10.00/Month
                <ul className="list-inside list-disc pl-10 text-left font-normal">
                  <li>Add notes to your saved programs</li>
                  <li>Add custom programs</li>
                  <li>
                    1 Upgraded Part-Time Program listing ({contactLink} for
                    requirements)
                  </li>
                </ul>
              </div>
              <div className="m-5 rounded border-2 p-4 font-bold shadow-lg shadow-indigo-400">
                "Institution" - 30.00/Month
                <ul className="list-inside list-disc pl-10 text-left font-normal">
                  <li>Add notes to your saved programs</li>
                  <li>Add custom programs</li>
                  <li>
                    Up to 6 Upgraded Part-Time or Full-Time Program listings for
                    1 institution ({contactLink} for requirements)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* <PatreonButton /> */}
        </div>
      </main>
    </>
  );
};

export default Patreon;

export const getStaticProps: GetStaticProps = () => {
  // const patreonUser = "Joe";
  // const patreonAPI = patreon.patreon;
  // const patreonOAuth = patreon.oauth;

  const CLIENT_ID = process.env.PATREON_CLIENT_ID;
  const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET;
  // const PATREON_CREATOR_ACCESS_TOKEN = process.env.PATREON_CREATOR_ACCESS_TOKEN;

  // const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);

  const OAUTH_REDIRECT_URL = encodeURIComponent(
    "http://127.0.0.1:3000/patreon-si"
  ); // Replace with your actual redirect URL

  // const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}`;
  const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;

  // const OAUTH_REDIRECT_URL = encodeURIComponent(oauthUrl); // Replace with your actual redirect URL

  return {
    props: {
      // patreonUser,
      url: oauthUrl,
    },
  };
};
