import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/client";

import MainHeader from "../../components/MainHeader";
import graphcms from "../../lib/graphcms";

async function toggleTaskCompleted(id, isCompleted) {
  await fetch(`/api/tasks/completed`, {
    method: "POST",
    body: JSON.stringify({ id, isCompleted }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // TODO optimistic update of State
  location.reload();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/delete`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // TODO optimistic update of State
  location.reload();
}

async function addNewTask() {
  const description = prompt("Please enter a description:");

  await fetch(`/api/tasks/create`, {
    method: "POST",
    body: JSON.stringify({ description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // TODO optimistic update of State
  location.reload();
}

export default function Tasks({ session, tasks }) {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Tasks</title>
      </Head>
      <MainHeader email={session.user.email}></MainHeader>
      <h1 className="my-3">Tasks</h1>
      <Link href="/home">
        <a className="simple-link">Back</a>
      </Link>
      <div className="mt-6">
        <table className="task-table">
          <thead>
            <tr className="border-b-2">
              <th className="w-20"></th>
              <th className="task-text">Description</th>
              <th className="task-dueDate">Due Date</th>
              <th className="w-15"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="task-table-td text-center">
                  <label className="inline-flex items-center align-middle">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      checked={task.isCompleted ? true : false}
                      onChange={(e) =>
                        toggleTaskCompleted(task.id, !task.isCompleted)
                      }
                    />
                  </label>
                </td>
                <td className="task-table-td task-text">{task.description}</td>
                <td className="task-table-td task-dueDate">{task.dueDate}</td>
                <td className="task-table-td task-delete">
                  <button onClick={(e) => deleteTask(task.id)}>x</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn-submit mt-6" onClick={(e) => addNewTask()}>
          New Task
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  } else {
    const { tasks } = await graphcms.request(
      `
      query GetTasks($assignedTo: String!) {
        tasks(where: { assignedTo: $assignedTo }) {
          id
          description
          dueDate
          isCompleted
        }
      }
    `,
      {
        assignedTo: session.user.email,
      }
    );

    return {
      props: {
        session,
        tasks,
      },
    };
  }
}
