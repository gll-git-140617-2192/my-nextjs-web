"use client";

import React, { useState } from "react";
import { Form, Input, Button, App, Checkbox, Divider } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.error) {
        message.error("登录失败：" + res.error);
      } else {
        router.push("/about"); // 建议跳转到管理页
        router.refresh();
      }
    } catch (error) {
      message.error("连接服务器失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[380px] px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">账户登录</h2>
        <p className="text-gray-500 mt-2">使用您的企业邮箱开启管理之旅</p>
      </div>

      <Form
        name="login_form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large" // 企业级大号控件，体验更好
      >
        {/* 邮箱字段 */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "请输入邮箱地址" },
            { type: "email", message: "请输入正确的邮箱格式" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="邮箱: name@company.com"
          />
        </Form.Item>

        {/* 密码字段 */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入您的密码" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="密码"
          />
        </Form.Item>

        {/* 附加选项 */}
        <div className="flex items-center justify-between mb-6">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Link
            href="/reset-password"
            size="small"
            className="text-blue-600 text-sm hover:underline"
          >
            忘记密码?
          </Link>
        </div>

        {/* 提交按钮 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            icon={<ArrowRightOutlined />}
            className="h-11 font-medium shadow-md shadow-blue-100"
          >
            立即登录
          </Button>
        </Form.Item>
      </Form>

      <Divider plain className="text-gray-400 text-xs uppercase">
        或者
      </Divider>

      <div className="text-center space-y-4">
        <p className="text-sm text-gray-600">
          还没有企业账号？{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            立即注册
          </Link>
        </p>

        <p className="text-[11px] text-gray-400 leading-relaxed px-6">
          登录即表示您同意我们的{" "}
          <Link href="/terms" className="hover:text-gray-600 underline">
            服务条款
          </Link>{" "}
          和{" "}
          <Link href="/privacy" className="hover:text-gray-600 underline">
            隐私政策
          </Link>
        </p>
      </div>
    </div>
  );
}
