"use client";
import { useState, useEffect } from "react";
import { Form, Input, Button, Card, message, Space } from "antd";
import { MailOutlined, LockOutlined, SafetyOutlined } from "@ant-design/icons";
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 按钮倒计时逻辑
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // 发送验证码处理
  const onSendCode = async () => {
    try {
      const email = form.getFieldValue("email");
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return message.warning("请输入正确的邮箱地址");
      }
      setLoading(true);
      await request.post("/auth/send-code", { email });
      message.success("验证码已发送（请查看终端控制台）");
      setCountdown(60);
    } catch (err) {} 
    finally { setLoading(false); }
  };

  // 提交重置请求
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await request.post("/auth/reset-password", values);
      message.success("新密码设置成功！");
      router.push("/login");
    } catch (err) {} 
    finally { setLoading(false); }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card title={<span className="text-xl font-bold">重置密码</span>} className="w-full max-w-md shadow-md">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="邮箱地址" rules={[{ required: true, type: "email" }]}>
            <Input prefix={<MailOutlined />} placeholder="注册时使用的邮箱" size="large" />
          </Form.Item>

          <Form.Item label="验证码" required>
            <Space.Compact className="w-full">
              <Form.Item name="code" noStyle rules={[{ required: true, len: 6, message: "请输入6位验证码" }]}>
                <Input prefix={<SafetyOutlined />} placeholder="6位数字" size="large" />
              </Form.Item>
              <Button size="large" disabled={countdown > 0} onClick={onSendCode} className="w-32">
                {countdown > 0 ? `${countdown}s` : "获取验证码"}
              </Button>
            </Space.Compact>
          </Form.Item>

          <Form.Item name="password" label="设置新密码" rules={[{ required: true, min: 6, message: "密码至少6位" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="请输入新密码" size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            重置并登录
          </Button>
        </Form>
      </Card>
    </div>
  );
}