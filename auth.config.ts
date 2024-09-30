// @ts-nocheck
import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { PrismaClient } from 'prisma/prisma-client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });
        // console.log(user)
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          const passwordMatched = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatched) {
            return null;
          }
          if (passwordMatched) {
            return user;
          } else {
            return null;
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
