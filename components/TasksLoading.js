import Head from "next/head";
import Link from "next/link";

import MainHeader from "./MainHeader";

export default function TasksLoading({ title, email }) {
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
        <table className="task-table">
          <thead>
            <tr className="border-b-2">
              <th className="w-20"></th>
              <th className="task-text">Description</th>
              <th className="w-1 task-dueDate">Due Date</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="animate-pulse">
              <td className="task-table-td text-center">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td task-text">
                <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td task-dueDate">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td text-center task-delete">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
            </tr>
            <tr className="animate-pulse">
              <td className="task-table-td text-center">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td task-text">
                <div className="h-4 w-5/6 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td task-dueDate">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td text-center task-delete">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
            </tr>
            <tr className="animate-pulse">
              <td className="task-table-td text-center">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td task-text">
                <div className="h-4 w-4/6 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td task-dueDate">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
              <td className="task-table-td text-center task-delete">
                <div className="h-4 bg-gray-400 rounded"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
