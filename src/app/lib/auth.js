import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

import  connectDB  from "./db";
import { User } from "@/app/models/user.model.js";
import { NEXTAUTH_SECRET } from "@/auth-secret";

export const authoptions = {
  providers: [
    // 🔹 GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 🔹 EMAIL + PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.password) {
          throw new Error("PASSWORD_NOT_SET");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        if (user.role === "admin" && !user.isVerified) {
          throw new Error("ADMIN_NOT_VERIFIED");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          hasPassword: true,
        };
      },
    }),
  ],

  callbacks: {
    // 🔹 GOOGLE SIGNUP HANDLER
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectDB();
        console.log("google user", user);

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // Set role and id from existing user
          user.role = existingUser.role;
          user.id = existingUser._id.toString();

          if (existingUser.password !== "") {
            user.hasPassword = true;
          }
        }

        if (!existingUser) {
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            role: "user",
          });

          // Set role and id for new user
          user.role = newUser.role;
          user.id = newUser._id.toString();
        }
      }
      return true;
    },

    // 🔹 JWT (IMPORTANT FOR MIDDLEWARE)
    async jwt({ token, user }) {
      console.log("jwt user", user);
      console.log("jwt token", token);

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.hasPassword = user.hasPassword ?? false;
      }
      return token;
    },

    // 🔹 SESSION
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.hasPassword = token.hasPassword;

      console.log("📋 Final session with role:", session);
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: NEXTAUTH_SECRET,
};
