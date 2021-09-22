import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "POST") {
      const id = req.body.id;
      const isCompleted = req.body.isCompleted;

      // TODO validate task is assigned to user.
      const { task } = await graphcms.request(
        `
        mutation ToggleTaskCompleted($id: ID!, $isCompleted: Boolean!) {
          updateTask(
            where: { id: $id },
            data: { isCompleted: $isCompleted }
          ) {
            id
            isCompleted
          }
          publishTask(where: { id: $id }) { id }
        }
      `,
        {
          id,
          isCompleted,
        }
      );

      res.status(200).json(task);
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
