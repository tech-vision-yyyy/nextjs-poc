import { useEffect } from "react";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { Provider, useSession, signIn } from "next-auth/client";

import Messages from "../i18n/Messages";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Provider session={pageProps.session}>
        <IntlProvider
          key={router.locale}
          locale={router.locale}
          messages={Messages[router.locale]}
          defaultLocale="en-US"
        >
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </IntlProvider>
      </Provider>
    </>
  );
}

function Auth({ children }) {
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return;
    if (!isUser) {
      signIn("okta", { callbackUrl: "/home" });
    }
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }
  return <div>Loading...</div>;
}

export default MyApp;
