import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// https://next-auth.js.org/configuration/options
export default NextAuth({
  theme: "light",
  providers: [
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
  ],
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 12 * 60 * 60, // 12 hours
  },
});
