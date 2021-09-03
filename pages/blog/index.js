import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/client";
import useSWR from "swr";

import MainHeader from "../../components/MainHeader";
import truncate from "../../lib/truncate";
import graphcms from "../../lib/graphcms";
import fetcher from "../../lib/fetcher";

export default function Blog() {
  const [session] = useSession();

  const { data, error } = useSWR("/api/blog/read", (url) =>
    fetcher(url, { method: "GET" })
  );
  data && console.log(`data ${JSON.stringify(data.featuredPost)}`);

  if (!error && !data) {
    <p>Loading...</p>;
  }
  if (error) {
    <p>Error</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Blog</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">Blog</h1>
      <Link href="/home">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        <div className="featured-section">
          <div className="border-2 border-gray-200 rounded-md p-3 mb-6">
            <h2 className="text-green-400">Featured</h2>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/blog/${
                  data &&
                  data.featuredPost &&
                  data.featuredPost.length > 0 &&
                  data.featuredPost[0].id
                }`}
              >
                <a className="post-link">
                  <div>
                    <h2>
                      {data &&
                        data.featuredPost &&
                        data.featuredPost.length > 0 &&
                        data.featuredPost[0].title}
                    </h2>
                    <span className="text-gray-400">
                      {data &&
                        data.featuredPost &&
                        data.featuredPost.length > 0 &&
                        data.featuredPost[0].releasedAt}{" "}
                      |{" "}
                      {data &&
                        data.featuredPost &&
                        data.featuredPost.length > 0 &&
                        data.featuredPost[0].category}
                    </span>
                    <p>
                      {data &&
                        data.featuredPost &&
                        data.featuredPost.length > 0 &&
                        truncate(data.featuredPost[0].content, 500)}
                    </p>
                  </div>
                </a>
              </Link>
              <Image
                src="https://images.ctfassets.net/hrltx12pl8hq/zpozZxV0PvBUevOlUkpEK/220a46578f42ba182231eb7d91051f61/04-technology_1218220324.jpg"
                width="480"
                height="270"
                className="rounded-md"
                layout="responsive"
                alt="Technology"
              ></Image>
            </div>
          </div>
        </div>
        <div className="recent-section">
          <h2>Recent</h2>
          <div className="grid grid-flow-row auto-rows-max">
            <Link href="/blog/ckt06urqw0hso0b70nvvms6wv">
              <a className="post-link">
                <div className="p-3">
                  <h3>4 Ways to Build a Successful AI Startup</h3>
                  <span className="text-gray-600">MM-DD-YYYY | Technology</span>
                  <p>
                    {truncate(
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel aliquet nunc. Nam in sollicitudin magna, a lacinia augue. Nam posuere cursus auctor. Sed dapibus sollicitudin turpis, nec tincidunt nunc auctor in. Maecenas egestas mattis sem, dignissim tincidunt lectus ullamcorper sed. Maecenas pulvinar",
                      250
                    )}
                  </p>
                </div>
              </a>
            </Link>
            <Link href="/blog/ckt06urqw0hso0b70nvvms6wv">
              <a className="post-link">
                <div className="p-3">
                  <h3>4 Ways to Build a Successful AI Startup</h3>
                  <span className="text-gray-600">MM-DD-YYYY | Technology</span>
                  <p>
                    {truncate(
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel aliquet nunc. Nam in sollicitudin magna, a lacinia augue. Nam posuere cursus auctor. Sed dapibus sollicitudin turpis, nec tincidunt nunc auctor in. Maecenas egestas mattis sem, dignissim tincidunt lectus ullamcorper sed. Maecenas pulvinar",
                      250
                    )}
                  </p>
                </div>
              </a>
            </Link>
            <Link href="/blog/ckt06urqw0hso0b70nvvms6wv">
              <a className="post-link">
                <div className="p-3">
                  <h3>4 Ways to Build a Successful AI Startup</h3>
                  <span className="text-gray-600">MM-DD-YYYY | Technology</span>
                  <p>
                    {truncate(
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel aliquet nunc. Nam in sollicitudin magna, a lacinia augue. Nam posuere cursus auctor. Sed dapibus sollicitudin turpis, nec tincidunt nunc auctor in. Maecenas egestas mattis sem, dignissim tincidunt lectus ullamcorper sed. Maecenas pulvinar",
                      250
                    )}
                  </p>
                </div>
              </a>
            </Link>
            <Link href="/blog/ckt06urqw0hso0b70nvvms6wv">
              <a className="post-link">
                <div className="p-3">
                  <h3>4 Ways to Build a Successful AI Startup</h3>
                  <span className="text-gray-600">MM-DD-YYYY | Technology</span>
                  <p>
                    {truncate(
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel aliquet nunc. Nam in sollicitudin magna, a lacinia augue. Nam posuere cursus auctor. Sed dapibus sollicitudin turpis, nec tincidunt nunc auctor in. Maecenas egestas mattis sem, dignissim tincidunt lectus ullamcorper sed. Maecenas pulvinar",
                      250
                    )}
                  </p>
                </div>
              </a>
            </Link>
          </div>

          <button className="btn-loadMore justify-self-auto w-full mt-4 mb-20">
            Load more...
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { featuredPost, blogs } = await graphcms.request(
    `
    query GetPosts {
      featuredPost: blogs(first: 1, where: {isFeatured: true}) {
        title
        content
        category
        releasedAt
        id
      }
      blogs(first: 4, orderBy: releasedAt_DESC, where: {isVisible: true}) {
        title
        content
        category
        releasedAt
        id
      }
    }
  `
  );

  return {
    props: {
      fallback: {
        "/api/blog/read": { featuredPost, blogs },
      },
    },
    // Seconds after which a page re-generation can occur
    revalidate: 60 * 60 * 12,
  };
}

Blog.auth = true;
