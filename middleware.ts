// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // 1. 如果是 API 请求且 Token 失效，返回 401 状态码（供 Axios 拦截器触发弹窗）
    if (pathname.startsWith("/api") && !token) {
      return NextResponse.json(
        { message: "登录已过期" },
        { status: 401 }
      );
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // 2. 白名单（公共页面）：无需 Token 即可访问
        const publicPaths = ["/login", "/register", "/reset-password"];
        if (publicPaths.some(path => pathname === path)) {
          return true;
        }

        // 3. 非公共页面：必须有 Token 才是“有效登录”
        // 如果返回 false，withAuth 会自动重定向到 authOptions.pages.signIn 定义的 /login
        return !!token;
      },
    },
  }
);

// 匹配所有路径，排除静态资源
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};