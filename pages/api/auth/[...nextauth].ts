import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    signIn: async (params) => {
      console.log("signIn-params", params);
      return true;
    },
    jwt: async (params) => {
      console.log("jwt-params", params);
      if (params.account) {
        params.token.id = params.account.providerAccountId;
        params.token.accessToken = params.account.access_token;
      }
      return params.token;
    },
    session: async (params) => {
      console.log("session-params", params);
      //params.session.user = params.user;
      params.session.id = params.token.id;
      params.session.token = params.token.accessToken;
      return params.session;
    },
  },
};
export default NextAuth(authOptions);
