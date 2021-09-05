import Head from "next/head";
import Link from "next/link";

import MainHeader from "./MainHeader";

export default function PostLoading({ title, email }) {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader email={email}></MainHeader>
      <h1 className="my-3">Blog Post</h1>
      <Link href="/blog">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        <div className="featured-section">
          <div className="border border-gray-200 shadow rounded-md p-4 w-full mx-auto">
            <div className="flex space-x-4">
              <div className="animate-pulse flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/6"></div>
                <div
                  className="h-4 bg-gray-400 rounded"
                  style={{ "min-height": "200px" }}
                ></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-400 rounded"></div>
                  <div className="h-4 bg-gray-400 rounded"></div>
                  <div className="h-4 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
