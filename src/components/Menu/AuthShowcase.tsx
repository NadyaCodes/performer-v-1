import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const handleSignIn = async () => {
    if (!sessionData) {
      await signIn("google");
    }
  };

  return (
    <div className="flex items-center justify-end">
      <p className="text-center italic">
        {sessionData && (
          <span className="mx-2 flex flex-col">
            <span>Logged in as</span>
            <span>{sessionData.user?.name}</span>
          </span>
        )}
      </p>
      <button
        className=" m-3 rounded-full p-3 font-semibold outline outline-transparent transition hover:bg-cyan-800 hover:text-cyan-50 hover:shadow-md"
        onClick={sessionData ? () => signOut() : handleSignIn}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default AuthShowcase;
