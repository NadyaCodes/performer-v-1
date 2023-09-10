import { signIn, signOut, useSession } from "next-auth/react";
import type { MouseEventHandler } from "react";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const handleSignIn = async () => {
    if (!sessionData) {
      await signIn("google");
    }
  };

  const handleSignOut: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    void signOut();
  };

  return (
    <div className="flex flex-col items-center justify-end 2xl:flex-row">
      <button
        className="rounded-full p-3 font-semibold outline outline-transparent transition hover:bg-cyan-800 hover:text-cyan-50 hover:shadow-md"
        onClick={sessionData ? handleSignOut : handleSignIn}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default AuthShowcase;
