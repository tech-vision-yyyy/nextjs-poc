import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

// TODO rate limiting
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      const { blogs } = await graphcms.request(
        `
        query GetPosts {
          blogs(first: 4, orderBy: releasedAt_DESC, where: {isVisible: true}) {
            title
            content
            category
            releasedAt
            id
          }
        }
      `
      );
      console.log(`/api/blog/read ${JSON.stringify(blogs)}`);

      res.status(200).json(blogs);
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
