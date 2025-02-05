import dbConnect from "@/lib/dbConnect";
import User from "@/models/userSchema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  // pages: { signIn: "/message-form", signOut: "/" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
      },
      async authorize(credentials: { email: string } | undefined, req) {
        await dbConnect();

        if (!credentials || !credentials.email) {
          throw new Error("No email provided. Please enter your email.");
        }

        const user = await User.findOne({ email: credentials.email }).exec();

        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error("User not found. Please check your login details.");
        } else {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
});

export const GET = handler;
export const POST = handler;
