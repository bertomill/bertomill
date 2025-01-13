import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth"
import GithubProvider from "next-auth/providers/github"

const prisma = new PrismaClient()

interface SessionUser {
  name?: string | null
  email?: string | null
  image?: string | null
  isAdmin?: boolean
}

interface ExtendedUser extends NextAuthUser {
  isAdmin?: boolean
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          isAdmin: (user as ExtendedUser).isAdmin,
        } as SessionUser,
      }
    },
  },
}

export default NextAuth(authOptions) 