import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/client";
import useSWR from "swr";

import BlogLoading from "../../components/BlogLoading";
import MainHeader from "../../components/MainHeader";

import truncate from "../../lib/truncate";
import graphcms from "../../lib/graphcms";
import fetcher from "../../lib/fetcher";

const title = "Blog";

async function loadMorePosts(endCursor, mutate) {
  alert("Loading...");
  // TODO query /api/blog/loadMore see Tasks Page
  // TODO mutate data
}

export default function Blog() {
  const [session] = useSession();

  const { data, error, mutate } = useSWR("/api/blog", (url) =>
    fetcher(url, { method: "GET" })
  );

  if (!error && !data) {
    return <BlogLoading title={title} email={session.user.email}></BlogLoading>;
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
                src={
                  data &&
                  data.featuredPost &&
                  data.featuredPost.length > 0 &&
                  data.featuredPost[0].image &&
                  data.featuredPost[0].image.url
                }
                width="600"
                height="400"
                className="rounded-md"
                layout="intrinsic"
                alt="Technology"
              ></Image>
            </div>
          </div>
        </div>
        <div className="recent-section">
          <h2>Recent</h2>
          <div className="grid grid-flow-row auto-rows-max">
            {data &&
              data.blogsConnection &&
              data.blogsConnection.blogs &&
              data.blogsConnection.blogs.map((post, index) => {
                return (
                  <Link href={`/blog/${post.node.id}`} key={index}>
                    <a className="post-link">
                      <div className="p-3">
                        <h3>{post.node.title}</h3>
                        <span className="text-gray-600">
                          {post.node.releasedAt} | {post.node.category}
                        </span>
                        <p>{truncate(post.node.content, 250)}</p>
                      </div>
                    </a>
                  </Link>
                );
              })}
          </div>

          {data &&
          data.blogsConnection &&
          data.blogsConnection.pageInfo.hasNextPage == false ? (
            <button
              className="btn-loadMore justify-self-auto w-full mt-4 mb-20"
              onClick={(e) =>
                loadMorePosts(data.blogsConnection.pageInfo.endCursor, mutate)
              }
            >
              Load more...
            </button>
          ) : (
            <div className="mb-20"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { featuredPost, blogsConnection } = await graphcms.request(
    `
    query GetPosts {
      featuredPost: blogs(first: 1, where: {isFeatured: true}) {
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
      blogsConnection(first: 2, orderBy: releasedAt_DESC, stage: PUBLISHED, where: {isVisible: true, isFeatured: false}) {
        blogs: edges {
          node {
            title
            content
            category
            releasedAt
            id
          }
        }
        pageInfo {
          pageSize
          hasNextPage
          endCursor
        }
      }
    }
  `
  );

  return {
    props: {
      fallback: {
        "/api/blog": { featuredPost, blogsConnection },
      },
    },
    // Seconds after which a page re-generation can occur
    revalidate: 60 * 60 * 6,
  };
}

Blog.auth = true;
