"use client";

import React from "react";
import { Dropdown, Avatar, Space,type MenuProps } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HeaderBar() {
  const { data: session } = useSession();
  const router = useRouter();

  // 定义下拉菜单的操作
  const menuItems: MenuProps["items"] = [
    {
      key: "reset-password",
      icon: <KeyOutlined />,
      label: "修改密码",
      onClick: () => router.push("/reset-password"),
    },
    {
      type: "divider", // 分割线
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      danger: true,
      onClick: () => signOut({ callbackUrl: "/login" }),
    },
  ];

  return (
    <div style={{ paddingRight: 16 }}>
      <Dropdown menu={{ items: menuItems }} placement="bottomRight">
        <Space className="cursor-pointer">
          <Avatar size="small" icon={<UserOutlined />} />
          <span>{session?.user?.name}</span>
        </Space>
      </Dropdown>
    </div>
  );
}
