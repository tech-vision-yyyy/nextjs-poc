import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/client";
import useSWR from "swr";

import MainHeader from "../../components/MainHeader";
import graphcms from "../../lib/graphcms";
import fetcher from "../../lib/fetcher";

function set7DayDueDate() {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
    "0" + date.getDate()
  ).slice(-2)}`;
}

async function toggleTaskCompleted(id, isCompleted, mutate) {
  mutate(async (data) => {
    let tasks = [...data];

    const index = tasks.map((t) => t.id).indexOf(id);
    const task = { ...tasks[index], isCompleted };
    tasks[index] = task;

    return [...tasks];
  }, false);

  await fetch(`/api/tasks/completed`, {
    method: "POST",
    body: JSON.stringify({ id, isCompleted }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function deleteTask(id, mutate) {
  mutate(async (data) => data.filter((t) => t.id !== id), false);

  await fetch(`/api/tasks/delete`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function addNewTask(assignedTo, mutate) {
  const description = prompt("Please enter a description:");
  const dueDate = set7DayDueDate();

  mutate(
    async (data) => [...data, { description, dueDate, assignedTo }],
    false
  );

  await fetch(`/api/tasks/create`, {
    method: "POST",
    body: JSON.stringify({ description, dueDate, assignedTo }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  mutate();
}

export default function Tasks({ session }) {
  const {
    data: tasks,
    error,
    mutate,
  } = useSWR("/api/tasks/read", (url) => fetcher(url, { method: "GET" }));

  if (!error && !tasks) {
    <p>Loading...</p>;
  }
  if (error) {
    <p>Error</p>;
  }

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
            {tasks &&
              tasks.map((task, index) => (
                <tr key={index}>
                  <td className="task-table-td text-center">
                    <label className="inline-flex items-center align-middle">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-gray-600"
                        checked={task.isCompleted ? true : false}
                        onChange={(e) =>
                          toggleTaskCompleted(
                            task.id,
                            !task.isCompleted,
                            mutate
                          )
                        }
                      />
                    </label>
                  </td>
                  <td className="task-table-td task-text">
                    {task.description}
                  </td>
                  <td className="task-table-td task-dueDate">{task.dueDate}</td>
                  <td className="task-table-td task-delete">
                    <button onClick={(e) => deleteTask(task.id, mutate)}>
                      x
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <button
          className="btn-submit mt-6"
          onClick={(e) => addNewTask(session.user.email, mutate)}
        >
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
    const assignedTo = session.user.email;

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
        assignedTo,
      }
    );

    return {
      props: {
        session,
        fallback: {
          "/api/tasks/read": tasks,
        },
      },
    };
  }
}
