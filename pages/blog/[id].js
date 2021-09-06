import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import useSWR from "swr";

import PostLoading from "../../components/PostLoading";
import MainHeader from "../../components/MainHeader";

import graphcms from "../../lib/graphcms";
import fetcher from "../../lib/fetcher";

const title = "Blog Post";

export default function BlogPost() {
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/blog/readPost?id=${id}`, (url) =>
    fetcher(url, { method: "GET" })
  );

  if (!error && !data) {
    return <PostLoading title={title} email={session.user.email}></PostLoading>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">Blog Post</h1>
      <Link href="/blog">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        <div className="featured-section">
          <div className="border-2 border-gray-200 rounded-md p-3 mb-6">
            <div>
              <h2>{data && data.post && data.post.title}</h2>
              <span className="text-gray-400">
                {data && data.post && data.post.releasedAt} |{" "}
                {data && data.post && data.post.category}
              </span>
              <div className="my-3 bg-gray-800 grid justify-items-center">
                <Image
                  src={
                    data && data.post && data.post.image && data.post.image.url
                  }
                  width="600"
                  height="400"
                  className="text-center"
                  layout="intrinsic"
                  alt="Technology"
                ></Image>
              </div>
              <p className="mb-4">{data && data.post && data.post.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { blogs } = await graphcms.request(`
    query GetPostIDs {
      blogs(where: {isVisible: true}) {
        id
      }
    }
  `);
  const paths = blogs.map((p) => `/blog/${p.id}`);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const { post } = await graphcms.request(
    `
      query GetPost($id: ID!) {
        post: blogs(where: { id: $id }) {
          title
          content
          category
          releasedAt
          id
          image {
            url
            height
            width
          }
        }
      }
    `,
    {
      id,
    }
  );
  console.log(`IMAGE ${JSON.stringify(post[0].image)}`);

  return {
    props: {
      fallback: {
        "/api/blog/readPost": { post: post[0] },
      },
    },
    // Seconds after which a page re-generation can occur
    revalidate: 60 * 60 * 12,
  };
}

BlogPost.auth = true;
