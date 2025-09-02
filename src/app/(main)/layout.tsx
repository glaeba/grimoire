import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grimoire Dashboard",
  description: "AI 스터디 그룹 파트너 Grimoire",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* 왼쪽 사이드바 */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-700 p-4">
        <h1 className="text-xl font-bold">My Chapters</h1>
        {/* 챕터 목록이 렌더링될 영역 */}
      </aside>

      {/* 오른쪽 메인 콘텐츠 */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}