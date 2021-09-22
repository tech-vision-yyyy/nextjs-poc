import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
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

      res.status(200).json(tasks);
    } else {
      res.status(404).json({});
    }
  } else {
    // Not Signed In
    res.status(401);
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5kb",
    },
  },
};
