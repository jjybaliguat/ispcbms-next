import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      roleId: string | null;
      role: any | null;
    };
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
