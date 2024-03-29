import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PatreonProvider } from "@component/contexts/PatreonContext";
import { type AppType } from "next/app";
import { api } from "@component/utils/api";
import CookieConsent from "react-cookie-consent";
import "@component/styles/globals.css";
import "@component/styles/loading.css";
import "@component/styles/face.css";
import "@component/styles/animations.css";
import "tailwindcss/tailwind.css";
import { Analytics } from "@vercel/analytics/react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PatreonProvider>
        <Component {...pageProps} />
        <CookieConsent
          location="top"
          buttonText="Sure - that's fine!"
          cookieName="cookie_accept"
          style={{ background: "#4338ca" }}
          buttonStyle={{
            background: "#fde047",
            fontSize: "13px",
            borderRadius: "5px",
          }}
          expires={150}
          acceptOnScroll
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
        <Analytics />
      </PatreonProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
