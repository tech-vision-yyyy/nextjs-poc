# Next.js-GraphCMS Proof of Concept

Deployed: https://nextjs-graphcms-poc.vercel.app

This is a [Next.js](https://nextjs.org/) project
bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with
your browser to see the result.

You can start editing the page by modifying `pages/index.js`.
The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction)
can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello).
This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in
this directory are treated as
[API routes](https://nextjs.org/docs/api-routes/introduction)
instead of React pages.

### Setup Email-Password

While the production environment is setup to use Okta
authentication the development environment can be
configured to use any email-password.

```bash
# Create your password_hash
npm run hash my-secret
#=> HASH $2b$14$sWpOC1vklO2.8/GbsfTl6.a9O2F8FV.K3g9vOCWpj0Pk60L1tfWJ2

# Set environment variables
# ~/.env.local
NEXTAUTH_URL=http://localhost:3000
PREVIEW_EMAIL=my-email@example.com
# WARNING: you have to escape $ characters with '\'
# this is because Next.js supports variable substitution
# in the ~/.env.local file.
PREVIEW_PASSWORD_HASH=\$2b\$14\$sWpOC1vklO2.8/GbsfTl6.a9O2F8FV.K3g9vOCWpj0Pk60L1tfWJ2
# NOTE: to run Cypress integration testing locally or in
# an ADO Pipeline you'll want to set the  PREVIEW_PASSWORD
# environment variable.
PREVIEW_PASSWORD=my-secret
```

## Setup GraphCMS

This POC's Backend is supported by GraphCMS. The following schema
is required:

Model: FAQ

- Question: Single line text
- Answer: Single line text
- Is Visible: Boolean

Model: Issue

- Project Name: Single line text
- Short Description: Single line text
- Description: Multi line text
- Assigned To: Single line text

Model: Post

- Title: Single line text
- Content: Markdown
- Category: Single line text
- Is Featured: Boolean
- Is Visible: Boolean
- Realesed At: Date
- Image: Asset

Model: Task

- Description: Single line text
- Is Completed: Boolean
- Due Date: Date
- Assigned To: Single line text

Set the GRAPHCMS_TOKEN environment variable:

```bash
# ~/.env.local
GRAPHCMS_TOKEN=eyJhbGciOiJSUzI1NiIsInR5c...
```

## Learn More

To learn more about Next.js, take a look at the
following resources:

- [Next.js Documentation](https://nextjs.org/docs) -
  learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) -
  an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) -
your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators
of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment)
for more details.
