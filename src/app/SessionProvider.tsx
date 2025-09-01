'use client'; // 이 컴포넌트는 클라이언트 측에서 실행되어야 함을 명시합니다.

import { SessionProvider } from 'next-auth/react';
import React from 'react';

// NextAuth.js의 세션 정보를 앱 전체에 제공하는 Provider 컴포넌트입니다.
// 이 컴포넌트로 최상위 레이아웃을 감싸주어야 useSession 같은 훅을 사용할 수 있습니다.
export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

