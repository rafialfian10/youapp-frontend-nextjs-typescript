import NextAuth from "next-auth/next"; 
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

import { API } from "../api";
// ----------------------------------------

export const Options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username...." },
        email: { label: "Email", type: "email", placeholder: "Email...." },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password....",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }

        const data = {
          username: credentials?.username,
          email: credentials?.email,
          password: credentials?.password
        }

        const body = JSON.stringify(data)

        try {
          const res = await API.post("/login", body, config); 
          if (res.data.message === "Incorrect password" || res.data.message === "User not found") {
            return null
          } else {
            const user = res.data;
            return user;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/pages/login"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) { 
      return { ...token, ...user };
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      session.user = token as any; 
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "production",
};

const handler = NextAuth(Options);
export { handler as GET, handler as POST };

