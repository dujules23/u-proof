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
        if (!credentials || !credentials.email) {
          throw new Error("No credentials provided");
        }

        const { email } = credentials;
        const user =
          email === "jsmith@example.com"
            ? { id: "1", name: "J Smith", email: "jsmith@example.com" }
            : null;

        if (!user) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error(
            "Invalid credentials. Please check your login details."
          );
        } else {
          return user;
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
