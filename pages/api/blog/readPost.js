import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

// TODO rate limiting
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      const { post } = await graphcms.request(
        `
          query GetPost($id: ID!) {
            post: blogs(where: { id: $id }) {
              title
              content
              category
              releasedAt
              id
              image {
                url
                height
                width
              }
            }
          }
        `,
        {
          id: req.query.id,
        }
      );

      res.status(200).json({ post: post[0] });
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
