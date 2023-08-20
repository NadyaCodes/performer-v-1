import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@component/utils/api";
import "@component/styles/globals.css";
import "@component/styles/loading.css";
import "@component/styles/face.css";
import "@component/styles/animations.css";
import "tailwindcss/tailwind.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
