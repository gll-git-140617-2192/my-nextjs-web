"use client";

import React, { useEffect, useState } from "react";
// import { ProLayout } from "@ant-design/pro-components";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import HeaderBar from "./header-bar";
import { MENU_ITEMS } from "@/constants/menu";
import dynamic from "next/dynamic";
import { BLOG_CONFIG } from "@/constants/blog";

// 🚀 动态导入 ProLayout，并关闭服务端渲染
const ProLayout = dynamic(
  () => import("@ant-design/pro-components").then((mod) => mod.ProLayout),
  {
    ssr: false,
    loading: () => <div className="h-screen bg-gray-50" />, // 加载时的占位图
  },
);
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  // 解决水合问题的第二道防线：组件挂载检查
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const publicPaths = ["/login", "/register", "/reset-password"];
  const isPublicPage = publicPaths.includes(pathname);
  const isBlogsPage = pathname.startsWith("/blogs");

  // 如果是公共页面（登录/注册），直接渲染，不带侧边栏和头部
  if (isPublicPage) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }
  // 如果还没挂载完成，先返回占位符或 null，避免水合冲突
  if (!mounted) return <div className="h-screen bg-gray-50" />;
  return (
    <div className="h-screen">
      <ProLayout
        title={`${isBlogsPage ? "博客" : "系统管理"}`}
        logo={false}
        layout={`${isBlogsPage ? "top" : "mix"}`} // 混合模式：顶部+侧边
        fixedHeader={true}
        fixSiderbar={!isBlogsPage}
        location={{ pathname }}
        route={{ routes: isBlogsPage ? undefined : MENU_ITEMS }}
        className="py-0 px-0"
        // 自定义 Header 右侧
        rightContentRender={() => <HeaderBar />}
        // 处理菜单点击跳转
        menuItemRender={(item, dom) => (
          <Link
            href={item.path || "/"}
            onClick={() => router.push(item.path || "/")}
          >
            {dom}
          </Link>
        )}
        // 样式自定义
        token={{
          sider: {
            colorMenuBackground: "#fff",
            colorTextMenuSelected: "#1677ff",
            colorBgMenuItemSelected: "#e6f4ff",
          },
        }}
      >
        <div className="w-full">
          {isBlogsPage ? (
            <BlogMinimalistLayout>{children}</BlogMinimalistLayout>
          ) : (
            <div className="min-h-[calc(100vh-120px)] bg-gray-50 p-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                {children}
              </div>
            </div>
          )}
        </div>
      </ProLayout>
    </div>
  );
}

function BlogMinimalistLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showBackTop, setShowBackTop] = useState(false);
  // 监听滚动逻辑
  useEffect(() => {
    const handleScroll = () => {
      // 滚动超过 400 像素显示按钮
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#f8fafd] p-0 flex">
      <div className=" min-h-[calc(100vh-120px)] w-1/5 ml-6 p-6 flex flex-col h-fit text-3xl sticky top-16">
        <div
          className="mx-auto my-0 hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            console.log("点击了", e);
          }}
        >
          {BLOG_CONFIG.map((item) => {
            const children = item?.children;
            const hasChildren = children && children.length > 0;
            return (
              <div key={item.id} className="flex flex-col">
                {/* 子项目或单项列表 */}
                <div className="space-y-1">
                  {hasChildren ? (
                    <>
                      <div
                        className={`text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 px-3`}
                      >
                        {item.title}
                      </div>
                      {item.children?.map((child) => (
                        <MenuLink
                          key={child.id}
                          href={child.path}
                          title={child.title}
                          active={pathname === child.path}
                        />
                      ))}
                    </>
                  ) : (
                    <MenuLink
                      key={item.id}
                      href={item?.path}
                      title={item.title}
                      active={pathname === item.path}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm w-3/5 mb-12 flex-1 mt-4">
        {children}
      </div>
      {/* 右侧悬浮面板 (回到顶部) */}
      <div className="fixed bottom-20 right-10 flex flex-col gap-4 z-50">
        {showBackTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-white text-blue-600 rounded-full shadow-lg border border-gray-100 hover:cursor-pointer"
            title="回到顶部"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 group-hover:-translate-y-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d=" orbit 5 15l7-7 7 7" // 这是一个简单的向上箭头
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function MenuLink({
  href,
  title,
  active,
}: {
  href: string;
  title: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        block px-3 py-2 rounded-lg text-sm transition-all pl-6 mb-2
        ${
          active
            ? "bg-white text-blue-600 shadow-sm font-semibold"
            : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-900"
        }
      `}
    >
      {title}
    </Link>
  );
}
