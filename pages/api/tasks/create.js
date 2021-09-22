import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "POST") {
      const description = req.body.description;
      const dueDate = req.body.dueDate;
      const assignedTo = session.user.email;

      const { task } = await graphcms.request(
        `
        mutation CreateTask($description: String!, $dueDate: Date!, $assignedTo: String!) {
          task: createTask(data: {
              description: $description,
              dueDate: $dueDate,
              assignedTo: $assignedTo,
              isCompleted: false
          }) {
            id
            description
            dueDate
            isCompleted
          }
        }
      `,
        {
          description,
          dueDate,
          assignedTo,
        }
      );
      await graphcms.request(
        `
        mutation PublishTask($id: ID!) {
          publishTask(where: { id: $id }) { id }
        }
      `,
        {
          id: task.id,
        }
      );

      res.status(201).json(task);
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
