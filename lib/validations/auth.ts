import * as z from "zod";

/**
 * 注册表单校验 Schema
 */
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, "姓名至少需要 2 个字符")
    .max(50, "姓名长度不能超过 50 个字符")
    .regex(/^[a-zA-Z\u4e00-\u9fa5\s·]+$/, "姓名包含非法字符"), // 支持中英文和间隔点

  email: z
    .string()
    .email("请输入有效的企业邮箱地址")
    .toLowerCase() // 统一转为小写存储，防止大小写绕过唯一性检查
    .trim(),

  password: z
    .string()
    .min(8, "密码长度至少为 8 位")
    .max(100, "密码过长")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "密码必须包含大写字母、小写字母和数字"
    ), // 典型的企业级密码强度要求
});

/**
 * 登录表单校验 Schema
 */
export const LoginSchema = z.object({
  email: z.string().email("邮箱格式不正确"),
  password: z.string().min(1, "请输入密码"), // 登录时不需要展示具体规则，只需非空即可
});