'use client';

// 사용하는 인증 라이브러리에 맞춰 import 하세요 (이 코드는 NextAuth.js 예시입니다)
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-24 h-9 bg-gray-700 rounded-md animate-pulse" />;
  }

  // 로그인 상태일 때
  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User profile image"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <button
          onClick={() => signOut()}
          className="px-3 py-1.5 text-sm font-semibold bg-gray-700 rounded-md hover:bg-gray-600"
        >
          로그아웃
        </button>
      </div>
    );
  }

  // 로그아웃 상태일 때
  return (
    <button
      onClick={() => signIn("google")}
      className="px-4 py-2 font-bold bg-white text-black rounded-md hover:bg-gray-200"
    >
      Google로 시작하기
    </button>
  );
}