import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./lib/db";
import { User, UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const username = credentials?.username;
        const password = credentials?.password;

        if (!username || !password) {
          throw new Error('Please provide username and password!');
        }

        const user = await db.user.findUnique({
          where: { username: username.toString() },
          select: { id: true, username: true, password: true, pegawaiId: true, role: true }
        });

        if (!user || !user.password || user.password !== password) {
          throw new Error('Invalid credentials!');
        }

        return { 
          id: user.id,
          username: user.username,
          pegawaiId: user.pegawaiId,
          role: user.role 
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.pegawaiId = token.pegawaiId as number | undefined;
        session.user.role = token.role as UserRole | undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.pegawaiId = user.pegawaiId;
        token.role = user.role;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    }
  }
});
