import { PrismaClient } from '@prisma/client';

// TypeScript의 declare global을 사용하여 전역 객체에 prisma 속성을 추가합니다.
// 이렇게 하면 개발 환경에서 hot-reloading 시 불필요하게 많은 PrismaClient 인스턴스가 생성되는 것을 방지할 수 있습니다.
declare global {
  var prisma: PrismaClient | undefined;
}

// globalThis.prisma가 있으면 그것을 사용하고, 없으면 새로 PrismaClient를 생성합니다.
// 개발 환경에서는 globalThis에 저장하여 재사용하고, 프로덕션 환경에서는 매번 새로 생성되지 않도록 합니다.
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;

