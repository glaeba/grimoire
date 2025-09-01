import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// NextAuth.js의 핵심 설정 파일입니다.
// 여기에 우리가 사용할 로그인 방식(Provider)들을 추가합니다.
const handler = NextAuth({
  providers: [
    GoogleProvider({
      // process.env는 .env.local 파일에 저장된 환경 변수를 가리킵니다.
      // 이 값들은 절대로 코드에 직접 노출해서는 안 됩니다.
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // 나중에 다른 Provider(예: Kakao, Naver)를 여기에 추가할 수 있습니다.
  ],
  // JWT(JSON Web Token)를 생성할 때 사용되는 비밀 키입니다.
  // 이 값 또한 .env.local 파일에 저장하여 보안을 유지해야 합니다.
  secret: process.env.NEXTAUTH_SECRET,
})

// HTTP GET, POST 요청을 모두 이 handler가 처리하도록 export 합니다.
export { handler as GET, handler as POST }

