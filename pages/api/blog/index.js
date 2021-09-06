import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

// TODO rate limiting
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      const { featuredPost, blogs } = await graphcms.request(
        `
        query GetPosts {
          featuredPost: blogs(first: 1, where: {isFeatured: true}) {
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
          blogs(first: 4, orderBy: releasedAt_DESC, where: {isVisible: true, isFeatured: false}) {
            title
            content
            category
            releasedAt
            id
          }
        }
      `
      );

      res.status(200).json({ featuredPost, blogs });
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
