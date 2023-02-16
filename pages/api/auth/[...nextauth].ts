import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Account, PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

declare module "next-auth" {
  export interface Session {
    accounts: Account[];
  }
}

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    jwt: async (params) => {
      console.log("jwt-params", params);
      if (params.account) {
        params.token.id = params.account.providerAccountId;
        params.token.accessToken = params.account.access_token;
      }
      return params.token;
    },
    session: async (params) => {
      const accounts = await prisma.account.findMany({
        where: {
          userId: params.user.id,
        },
      });
      params.session.accounts = accounts;
      return params.session;
    },
  },
};
export default NextAuth(authOptions);
