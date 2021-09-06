import { getSession } from "next-auth/client";

import graphcms from "../../../lib/graphcms";

// TODO rate limiting
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "GET") {
      const { blogsConnection } = await graphcms.request(
        `
          query LoadMore($endCursor: String!) {
            blogsConnection(first: 2, orderBy: releasedAt_DESC, stage: PUBLISHED, where: {isVisible: true, isFeatured: false}, after: $endCursor) {
              blogs: edges {
                node {
                  title
                  content
                  category
                  releasedAt
                  id
                }
              }
              pageInfo {
                pageSize
                hasNextPage
                endCursor
              }
            }
          }
        `,
        {
          endCursor: req.query.endCursor,
        }
      );

      res.status(200).json({ blogsConnection });
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
