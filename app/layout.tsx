import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry"; // antd样式注册表
import { ConfigProvider, App } from "antd";
import zhCN from "antd/locale/zh_CN";
import { SessionGuard } from "@/components/auth/session-guard";
import NextAuthProvider from "@/components/auth/providers/session-provider";
import MainLayout from "@/components/layout/main-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "企业级资源管理平台",
  description: "基于 Next.js 16 和 Neon 数据库的安全登录网关",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <ConfigProvider locale={zhCN} warning={{ strict: false }}>
            <NextAuthProvider>
              <App>
                <SessionGuard />
                <MainLayout>{children}</MainLayout>
              </App>
            </NextAuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
