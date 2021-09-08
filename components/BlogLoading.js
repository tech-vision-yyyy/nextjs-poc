import Head from "next/head";
import Link from "next/link";

import MainHeader from "./MainHeader";

export default function BlogLoading({ title, email }) {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>{title}</title>
      </Head>
      <MainHeader email={email}></MainHeader>
      <h1 className="my-3">Blog</h1>
      <Link href="/home">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        <div className="featured-section">
          <div className="border border-gray-300 shadow rounded-md p-4 w-full mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <h2 className="text-green-400">Featured</h2>
                <div className="animate-pulse grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                  </div>
                  <div className="h-22 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="recent-section">
          <h2>Recent</h2>
          <div className="grid grid-flow-row auto-rows-max">
            <div className="p-3">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
