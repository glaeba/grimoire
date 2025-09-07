import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
// 이제 인증 설계도를 중앙 라이브러리(@/lib/auth.ts)에서 가져옵니다.
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

/**
 * 특정 과목의 상세 정보(업로드된 파일 목록 포함)를 조회하는 API 핸들러
 * @param req Next.js의 API 요청 객체
 * @param params URL 파라미터 (subjectId 포함)
 */
export async function GET(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  try {
    // 1. 사용자 인증 확인 (중앙 라이브러리 사용)
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }
    const userId = session.user.id;
    const { subjectId } = params;

    // 2. 데이터베이스에서 과목 정보 조회 (소유권 검증 포함)
    const subjectDetails = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        userId: userId,
      },
      include: {
        sources: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    // 3. 과목이 없거나, 내 과목이 아닐 경우
    if (!subjectDetails) {
      return NextResponse.json({ error: '해당 과목을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 4. 성공적으로 조회되면, 과목 상세 정보와 파일 목록을 함께 반환
    return NextResponse.json(subjectDetails, { status: 200 });

  } catch (error) {
    console.error("Error fetching subject details:", error);
    return NextResponse.json({ error: '과목 정보를 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

