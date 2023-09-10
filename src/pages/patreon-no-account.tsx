import { NextPage } from "next";
import Link from "next/link";
import Menu from "@component/components/Menu/Menu";
import Head from "next/head";
import ContactLink from "@component/components/Patreon/ContactLink";

const PatreonNoAccount: NextPage = () => {
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
          <div className=" mt-10 flex flex-col items-center justify-center text-center">
            <div className="flex flex-col text-cyan-50 ">
              <div className="mx-2 mb-5 text-2xl font-bold">
                There has been an error connecting your accounts
              </div>
              <div className="mx-5 rounded border-2 p-4 shadow-md shadow-cyan-700">
                <div className="mb-2 text-xl font-semibold">
                  Troubleshooting:
                </div>
                <ul className="list-inside list-disc text-left">
                  <li>
                    Check that you are logged into the correct Patreon account
                  </li>
                  <li>
                    Check that you are subscribing to Act. Sing. Dance. Repeat.
                    on Patreon
                  </li>
                </ul>
              </div>
              <div className="mt-5 flex justify-around">
                <Link
                  href="/patreon"
                  className="rounded-md border-2 border-cyan-100 p-2 py-3 text-cyan-50 shadow-md shadow-indigo-300 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-300 mobileMenu:w-60"
                >
                  Try Connecting Again
                </Link>
                <a
                  href="https://www.patreon.com/actsingdancerepeat"
                  target="_blank"
                  className="rounded-md border-2 border-cyan-100 p-2 py-3 text-cyan-50 shadow-md shadow-indigo-300 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-300 mobileMenu:w-60"
                >
                  Go to Patreon
                </a>
              </div>
              <div className="m-5">
                If issues persist, please <ContactLink /> and provide us with
                your patreon email address so we can start investigating!!
                <span className="text-2xl"> 🧐</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PatreonNoAccount;
