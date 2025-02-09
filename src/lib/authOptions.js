import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNames } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const user = await loginUser(credentials);
        console.log(user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //   console.log(user, account, profile, email, credentials);
      if (account) {
        const { providerAccountId, provider } = account;
        const { name, email: user_email, image } = user;
        const userCollection = dbConnect(collectionNames.userCollection);

        const isUserExist = await userCollection.findOne({ providerAccountId });
        if (!isUserExist) {
          const userData = {
            provider,
            providerAccountId,
            name,
            email: user_email,
            image,
          };
          const postUser = await userCollection.insertOne(userData);
          console.log("user posted", postUser);
        }
      }

      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    // async session({ session, token, user }) {
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token;
    // },
  },
};
