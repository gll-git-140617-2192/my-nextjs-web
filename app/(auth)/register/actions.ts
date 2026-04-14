"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/lib/validations/auth";
import * as z from "zod";

export async function registerUser(values: z.infer<typeof RegisterSchema>) {
  // 1. 服务端校验（永远不要相信前端传来的数据）
  const validatedFields = RegisterSchema.safeParse(values);
  
  if (!validatedFields.success) {
    return { error: "输入数据格式不正确，请检查后重试" };
  }

  const { email, password, name } = validatedFields.data;

  try {
    // 2. 检查邮箱是否已被占用
    // 企业级开发中，查询数据库必须使用 findUnique 来保证效率
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "该邮箱已被注册，请尝试直接登录" };
    }

    // 3. 密码哈希处理
    // 强度设为 12 是目前行业推荐的平衡点（既安全又不过分消耗服务器资源）
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. 创建用户记录
    // Prisma 会自动映射到你的 Neon 数据库
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // 默认角色
      },
    });

    // 5. 返回成功响应
    return { success: "账户创建成功" };

  } catch (error) {
    // 6. 错误处理
    console.error("[REGISTER_ACTION_ERROR]:", error);
    return { error: "数据库连接异常，请稍后再试" };
  }
}