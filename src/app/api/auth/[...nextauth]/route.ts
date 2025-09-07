import NextAuth from 'next-auth';
// 이제 인증 설계도를 중앙 라이브러리(@/lib/auth.ts)에서 가져옵니다.
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

