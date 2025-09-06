import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

// 1. NextAuth 설정을 `authOptions`라는 상수로 분리하고, 타입을 명시합니다.
// 2. 이 상수를 export하여 다른 파일에서 '인증 설계도'로 사용할 수 있게 합니다.
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // 세션에 사용자 ID를 포함시킵니다.
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

