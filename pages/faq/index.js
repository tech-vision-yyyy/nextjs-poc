import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";
import _ from "lodash";

import MainHeader from "../../components/MainHeader";
import graphcms from "../../lib/graphcms";

const title = "FAQ";

export default function FAQ({ faqs }) {
  const [session] = useSession();

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">Frequently Asked Questions</h1>
      <Link href="/home">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        {faqs.map((qa, index) => {
          return (
            <div id={_.kebabCase(qa.question)} className="p-3 my-6" key={index}>
              <a href={`#${_.kebabCase(qa.question)}`}>
                <h2 className="mb-3">{qa.question}</h2>
              </a>
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
