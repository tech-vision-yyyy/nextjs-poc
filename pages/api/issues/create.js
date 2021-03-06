import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "POST") {
      const projectName = req.body.projectName;
      const shortDescription = req.body.shortDescription;
      const description = req.body.description;
      const assignedTo = session.user.email;

      const { issues } = await graphcms.request(
        `
        mutation AddIssue($projectName: String, $shortDescription: String!, $description: String!, $assignedTo: String!) {
          createIssue(data: {
            projectName: $projectName,
            shortDescription: $shortDescription,
            description: $description,
            assignedTo: $assignedTo
          }) {
            id
          }
        }
      `,
        {
          projectName,
          shortDescription,
          description,
          assignedTo,
        }
      );

      res.status(201).json(issues);
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
