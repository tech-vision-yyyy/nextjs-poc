import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

// TODO rate limiting
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "POST") {
      const id = req.body.id;

      // TODO validate task is assigned to user.
      const { task } = await graphcms.request(
        `
        mutation ToggleTaskCompleted($id: ID!) {
          deleteTask(where: { id: $id }) { id }
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
