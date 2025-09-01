import "next-auth";

/**
 * NextAuth.js의 기본 타입을 확장하여 우리가 사용할 커스텀 필드를 추가합니다.
 * 이 파일을 통해 타입스크립트는 session.user.id와 같은 속성을 인지하게 됩니다.
 */

declare module "next-auth" {
  /**
   * `session` 콜백에서 반환되는 Session 객체의 타입을 확장합니다.
   */
  interface Session {
    user: {
      /** 사용자의 고유 ID */
      id: string;
      // 여기에 User 모델에 있는 다른 필드(plan 등)를 나중에 추가할 수 있습니다.
    } & {
      /** 기존 user 타입(name, email, image)을 유지합니다. */
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

