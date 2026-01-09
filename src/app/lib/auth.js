import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import connectDB from "./db";
import { User } from "@/app/models/user.model";
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
          throw new Error("Missing credentials");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found");

        if (!user.password) {
          throw new Error("PASSWORD_NOT_SET");
        }

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!valid) throw new Error("Invalid password");

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
    // 🔹 GOOGLE SIGNUP / LOGIN
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectDB();

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          user.id = existingUser._id.toString();
          user.role = existingUser.role;
          user.hasPassword = !!existingUser.password;
        } else {
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            role: "user",
            password: null,
          });

          user.id = newUser._id.toString();
          user.role = newUser.role;
          user.hasPassword = false; // 🚨 MUST SET PASSWORD
        }
      }
      return true;
    },

    // 🔹 JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.hasPassword = user.hasPassword;
      }
      return token;
    },

    // 🔹 SESSION
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.hasPassword = token.hasPassword;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: NEXTAUTH_SECRET,
};
