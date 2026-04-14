import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form/page";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "登录 | 企业级资源管理平台",
  description: "基于 Next.js 16 和 Neon 数据库的安全登录网关",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 左侧：企业品牌展示区（仅在大屏幕显示）: 默认不显示，大于1024px时显示 */}
      <div className="hidden lg:flex w-2/3 bg-slate-900 items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        <div className="max-w-md space-y-4 relative z-10">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/50">
            <Lock className="text-white h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Nextjs + Prisma + Neon
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            一站式企业数字化办公方案。集成身份认证、数据分析与权限管理，为您的业务安全保驾护航。
          </p>
          <div className="pt-8 flex gap-4">
            <div className="px-4 py-2 bg-white/5 rounded-full text-xs border border-white/10">v2026.1.0</div>
            <div className="px-4 py-2 bg-white/5 rounded-full text-xs border border-white/10">SSL 加密</div>
          </div>
        </div>
      </div>

      {/* 右侧：登录交互区 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white lg:bg-gray-50">
        <LoginForm />
      </div>
    </div>
  );
}