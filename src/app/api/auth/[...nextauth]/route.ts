import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

// schema.prisma의 generator 설정 변경에 따라,
// PrismaClient의 import 경로가 기본 경로인 '@prisma/client'로 변경되었습니다.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  // PrismaAdapter를 사용하여 NextAuth와 데이터베이스를 연결합니다.
  adapter: PrismaAdapter(prisma),

  // 사용할 로그인 제공자(Provider) 목록입니다.
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // 세션 관리 전략을 데이터베이스로 설정합니다.
  // 이렇게 해야 로그인 정보가 DB의 Session 테이블에 저장됩니다.
  session: {
    strategy: "database",
  },

  // 콜백 함수를 통해 세션 및 리디렉션 동작을 제어합니다.
  callbacks: {
    // session 콜백을 통해 기본 세션 객체에 우리가 원하는 데이터를 추가할 수 있습니다.
    // 여기서는 클라이언트 측에서 사용자의 고유 ID를 알 수 있도록 session.user.id를 추가합니다.
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // user.id는 DB에 저장된 사용자의 ID입니다.
      }
      return session;
    },
  },

  // JWT 생성에 사용될 시크릿 키입니다. .env.local 파일에서 관리합니다.
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

