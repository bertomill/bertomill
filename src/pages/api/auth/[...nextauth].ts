import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [], // Add your providers here if needed
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)