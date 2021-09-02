import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";

import MainHeader from "../../components/MainHeader";
import graphcms from "../../lib/graphcms";

export default function FAQ({ faqs }) {
  const [session] = useSession();

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>FAQ</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">Frequently Asked Questions</h1>
      <Link href="/home">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        {faqs.map((qa, index) => {
          return (
            <div className="p-3 my-6" key={index}>
              <h2 className="mb-3">{qa.question}</h2>
              <p>{qa.answer}</p>
              <divider></divider>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { faqs } = await graphcms.request(`
    {
      faqs(where: { isVisible: true }) {
        question
        answer
      }
    }
  `);

  return {
    props: {
      faqs,
    },
  };
}

FAQ.auth = true;
