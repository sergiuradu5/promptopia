import User from "@models/user";
import { connectToDb } from "@utils/database";
import { env } from "@utils/env-config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.google.clientId,
      clientSecret: env.google.clientSecret,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });

      if (session.user) {
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ profile }) {
      if (!profile) {
        throw new Error("No profile available");
      }
      try {
        await connectToDb();
        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if not, create a new user
        if (!userExists) {
          const userData = {
            email: profile.email,
            username: profile.name?.replaceAll(" ", "").toLowerCase(),
            image: (profile as { picture: string })?.picture,
          };
          await User.create(userData);
        }

        return true;
      } catch (e: any) {
        console.log(e.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
