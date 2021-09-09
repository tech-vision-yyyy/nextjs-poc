import { useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import MainHeader from "../../components/MainHeader";

const title = "Home";

export default function Home() {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/support");
    router.prefetch("/faq");
    router.prefetch("/blog");
    router.prefetch("/tasks");
  }, [router]);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">{title}</h1>
      <main>
        <ul>
          <li className="flex my-6">
            <Link href="/tasks">
              <a className="justify-self-center w-full p-6 hover:text-blue-600 rounded-md border-2 border-gray-300 hover:border-blue-600 text-center text-lg">
                Manage project tasks
              </a>
            </Link>
          </li>
          <li className="flex my-6">
            <Link href="/blog">
              <a className="justify-self-center w-full p-6 hover:text-blue-600 rounded-md border-2 border-gray-300 hover:border-blue-600 text-center text-lg">
                Read recent articles
              </a>
            </Link>
          </li>
          <li className="flex my-6">
            <Link href="/faq">
              <a className="justify-self-center w-full p-6 hover:text-blue-600 rounded-md border-2 border-gray-300 hover:border-blue-600 text-center text-lg">
                Read FAQ
              </a>
            </Link>
          </li>
          <li className="flex my-6">
            <Link href="/support">
              <a className="justify-self-center w-full p-6 hover:text-blue-600 rounded-md border-2 border-gray-300 hover:border-blue-600 text-center text-lg">
                Ask for support
              </a>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}

Home.auth = true;
