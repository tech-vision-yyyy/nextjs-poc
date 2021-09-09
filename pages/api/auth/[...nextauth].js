import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcrypt";

const isProduction =
  process.env.NODE_ENV == "production" &&
  process.env.NEXT_PUBLIC_APP_ENV != "test";
const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV == "preview";

// https://next-auth.js.org/configuration/options
export default NextAuth({
  theme: "light",
  providers: [
    // The Credentials provider can only be used if JSON Web Tokens are
    // enabled for sessions. Users authenticated with the Credentials
    // provider are not persisted in the database.
    ...(!isProduction || isPreview
      ? [
          Providers.Credentials({
            id: "credentials",
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
              email: {
                label: "Email",
                type: "email",
                placeholder: "john@gmail.com",
              },
              password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)

              const previewEmail = process.env.PREVIEW_EMAIL;
              const previewPasswordHash = process.env.PREVIEW_PASSWORD_HASH;

              const passwordMatch = bcrypt.compareSync(
                credentials.password,
                previewPasswordHash
              );

              // Return user object if previewEmail and previewPassword are correct
              if (previewEmail == credentials.email && passwordMatch) {
                return { email: previewEmail };
              }
              // Return null if either previewEmail or previewPassword are incorrect
              return null;
            },
          }),
        ]
      : []),

    ...(!isProduction || isPreview
      ? []
      : [
          Providers.Okta({
            id: "okta",
            clientId: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            domain: process.env.OKTA_DOMAIN,
            scope: "openid email",
            accessTokenUrl: `https://${process.env.OKTA_DOMAIN}/oauth2/v1/token`,
            authorizationUrl: `https://${process.env.OKTA_DOMAIN}/oauth2/v1/authorize/?response_type=code`,
            profileUrl: `https://${process.env.OKTA_DOMAIN}/oauth2/v1/userinfo/`,
          }),
        ]),
  ],
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 12 * 60 * 60, // 12 hours
  },
});
