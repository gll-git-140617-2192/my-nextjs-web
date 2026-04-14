import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form/page";
import Link from "next/link";

// ✅ 修改标题极其方便
export const metadata: Metadata = {
  title: "创建企业账户 | 系统管理",
  description: "注册以开始管理您的业务",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">注册账户</h1>
        </div>

        {/* 引用组件 */}
        <RegisterForm />

        <div className="mt-6 text-center text-sm">
          已有账号？ <Link href="/login" className="text-blue-600">去登录</Link>
        </div>
      </div>
    </div>
  );
}