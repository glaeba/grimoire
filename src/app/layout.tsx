import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. 우리가 만든 SessionProvider를 import 합니다.
import NextAuthProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 앱의 제목과 설명을 우리 프로젝트에 맞게 수정합니다.
  title: "그리무아르",
  description: "당신만의 AI 마법서",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. NextAuthProvider로 앱 전체를 감싸줍니다. */}
        {/* 이렇게 하면 모든 페이지와 컴포넌트에서 로그인 상태를 알 수 있게 됩니다. */}
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}

