"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { App } from "antd";
import { useRouter } from "next/navigation";

export function SessionGuard() {
  const { status } = useSession();
  const { modal } = App.useApp();
  const router = useRouter();

  useEffect(() => {
    // 🛡️ 当 NextAuth 发现 Session 过期时，status 会自动变为 unauthenticated
    if (status === "unauthenticated") {
      modal.warning({
        title: "登录已失效",
        content: "您的会话已过期，请重新登录以确保数据安全。",
        okText: "重新登录",
        // 彻底清理并跳转，防止循环弹窗
        onOk: () => {
          router.push("/login");
        },
      });
    }
  }, [status, router, modal]);

  return null;
}