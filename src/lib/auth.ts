import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

/**
 * NextAuth.js의 인증 설정을 담고 있는 핵심 객체입니다.
 * 프로젝트의 모든 API에서 이 설정을 'import'하여 일관된 인증 정책을 유지합니다.
 */
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
