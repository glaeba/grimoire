import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 쿠키에서 세션 토큰을 가져오는 로직 (예시)
  const sessionToken = request.cookies.get('authjs.session-token');

  // 보호된 경로에 접근하는데 세션 토큰이 없다면
  if (!sessionToken) {
    // 사용자를 홈페이지로 리디렉션
    const absoluteURL = new URL("/", request.url);
    return NextResponse.redirect(absoluteURL);
  }

  // 인증되었다면 요청을 그대로 통과
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}