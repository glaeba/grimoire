// src/auth.ts

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// 1. 환경 변수를 변수에 할당합니다.
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

// 2. 환경 변수가 제대로 로드되었는지 확인합니다.
if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing Google OAuth environment variables");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      // 3. 확인된 변수를 사용합니다.
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
});