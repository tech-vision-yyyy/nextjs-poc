import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { useSession, signIn } from "next-auth/client";

import styles from "../styles/Index.module.css";
import SimpleText from "../components/SimpleText";

const isProduction =
  process.env.NODE_ENV == "production" &&
  process.env.NEXT_PUBLIC_APP_ENV != "test";
const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV == "preview";

export default function Index() {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, [router, session, loading]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FormattedMessage
            id="index.welcome"
            defaultMessage="Welcome to a Next.js Demo!"
          ></FormattedMessage>
        </h1>

        <p className={styles.description}>
          <FormattedMessage
            id="index.getStarted"
            defaultMessage="Get started by"
          ></FormattedMessage>{" "}
          {isProduction && !isPreview ? (
            <button
              onClick={() => signIn("okta", { callbackUrl: "/home" })}
              className="bold-link"
            >
              <FormattedMessage
                id="index.loggingIn"
                defaultMessage="logging in via Okta"
              ></FormattedMessage>{" "}
            </button>
          ) : (
            <Link href="/api/auth/signin">
              <a className="bold-link">logging in.</a>
            </Link>
          )}
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>
              <FormattedMessage
                id="index.documentation"
                defaultMessage="Documentation"
              ></FormattedMessage>{" "}
              &rarr;
            </h2>
            <SimpleText>
              <FormattedMessage
                id="index.findInfo"
                defaultMessage="Find in-depth information about Next.js features and API."
              ></FormattedMessage>
            </SimpleText>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>
              <FormattedMessage
                id="index.learn"
                defaultMessage="Learn"
              ></FormattedMessage>{" "}
              &rarr;
            </h2>
            <SimpleText>
              <FormattedMessage
                id="index.learnAbout"
                defaultMessage="Learn about Next.js in an interactive course with quizzes!"
              ></FormattedMessage>
            </SimpleText>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>
              <FormattedMessage
                id="index.examples"
                defaultMessage="Examples"
              ></FormattedMessage>{" "}
              &rarr;
            </h2>
            <SimpleText>
              <FormattedMessage
                id="index.discoverAndDeploy"
                defaultMessage="Discover and deploy boilerplate example Next.js projects."
              ></FormattedMessage>
            </SimpleText>
          </a>

          <a href="https://vercel.com/new" className={styles.card}>
            <h2>
              <FormattedMessage
                id="index.deploy"
                defaultMessage="Deploy"
              ></FormattedMessage>{" "}
              &rarr;
            </h2>
            <SimpleText>
              <FormattedMessage
                id="index.instantlyDeploy"
                defaultMessage="Instantly deploy your Next.js site to a public URL with Vercel."
              ></FormattedMessage>
            </SimpleText>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage
            id="index.poweredBy"
            defaultMessage="Powered by"
          ></FormattedMessage>{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
