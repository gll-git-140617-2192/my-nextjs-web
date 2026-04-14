"use client";

import React, { useState } from "react";
import { Form, Input, Button, message, Space } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/(auth)/register/actions";
import Link from "next/link";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const result = await registerUser(values);
      
      if (result.error) {
        message.error(result.error);
      } else {
        message.success("注册成功！正在跳转至登录页...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      message.error("连接服务器失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-gray-800">创建账户</h2>
        <p className="text-gray-500 mt-2">加入企业智慧管理平台</p>
      </div>

      <Form
        form={form}
        name="register_form"
        layout="vertical"
        onFinish={onFinish}
        size="large"
        requiredMark={false} // 隐藏必填红星，界面更清爽
      >
        {/* 姓名 */}
        <Form.Item
          name="name"
          label="真实姓名"
          rules={[{ required: true, message: "请输入您的姓名" }]}
        >
          <Input 
            prefix={<UserOutlined className="text-gray-400" />} 
            placeholder="例如：王小明" 
          />
        </Form.Item>

        {/* 邮箱 */}
        <Form.Item
          name="email"
          label="企业邮箱"
          rules={[
            { required: true, message: "请输入邮箱地址" },
            { type: "email", message: "请输入有效的邮箱格式" }
          ]}
        >
          <Input 
            prefix={<MailOutlined className="text-gray-400" />} 
            placeholder="name@company.com" 
          />
        </Form.Item>

        {/* 密码 */}
        <Form.Item
          name="password"
          label="设置密码"
          rules={[
            { required: true, message: "请设置您的密码" },
            { min: 8, message: "密码至少需要 8 位" },
            // 可以在此处增加正则校验以匹配企业级强度要求
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="请输入密码"
          />
        </Form.Item>

        {/* 提交按钮 */}
        <Form.Item className="mt-8">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            icon={<ArrowRightOutlined />}
            className="h-11 font-medium shadow-md shadow-blue-100"
          >
            立即注册
          </Button>
        </Form.Item>
      </Form>
      <p className="text-[11px] text-gray-400 text-center mt-8 px-6 leading-relaxed">
        点击注册即表示您同意我们的 <Link href="/terms" className="underline">服务条款</Link>。您的数据将受到企业级加密保护。
      </p>
    </div>
  );
}