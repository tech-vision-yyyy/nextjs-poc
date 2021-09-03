import { useRouter } from "next/router";
import { Provider } from "next-auth/client";
import { IntlProvider } from "react-intl";

// import SWRConfig from "../lib/swr-config";
import NextAuth from "../lib/next-auth";
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
            <NextAuth>
              <Component {...pageProps} />
            </NextAuth>
          ) : (
            <Component {...pageProps} />
          )}
        </IntlProvider>
      </Provider>
    </>
  );
  // return (
  //   <>
  //     <Provider session={pageProps.session}>
  //       <IntlProvider
  //         key={router.locale}
  //         locale={router.locale}
  //         messages={Messages[router.locale]}
  //         defaultLocale="en-US"
  //       >
  //         <SWRConfig {...pageProps}>
  //           {Component.auth ? (
  //             <NextAuth>
  //               <Component {...pageProps} />
  //             </NextAuth>
  //           ) : (
  //             <Component {...pageProps} />
  //           )}
  //         </SWRConfig>
  //       </IntlProvider>
  //     </Provider>
  //   </>
  // );
}

export default MyApp;
