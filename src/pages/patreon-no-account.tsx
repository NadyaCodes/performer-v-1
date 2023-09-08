import { NextPage } from "next";
import Link from "next/link";

const PatreonNoAccount: NextPage = () => {
  return (
    <div className="flex w-1/2 flex-col text-cyan-800">
      <div>There has been an error connecting your accounts</div>
      <div>
        Please make sure you're logged into the correct patreon account and try
        again
      </div>
      <Link
        href="/patreon"
        className="m-3 rounded-md border-2 border-cyan-700 p-3 text-cyan-900"
      >
        Try again Here
      </Link>
    </div>
  );
};

export default PatreonNoAccount;
