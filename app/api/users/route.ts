import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from 'bcryptjs';

/**
 * GET: 获取用户列表
 */
export async function GET() {
  try {
    // 1. 校验会话（双重保险，配合 middleware）
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    // 2. 真实数据库查询
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json({
      success: true,
      data: users,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: "获取用户失败" }, { status: 500 });
  }
}

/**
 * POST: 创建新用户
 */
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "未授权访问" }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, role, password } = body;

    // 参数验证
    if (!name || !email || !password) {
      return NextResponse.json({ error: '请填写完整的信息' }, { status: 400 });
    }

    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: '该邮箱已被注册' }, { status: 400 });
    }

    // 创建用户（注意：实际场景建议对 password 进行 bcrypt 加密后再存入）
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role: role || 'User',
        password: await bcrypt.hash(password, 12),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    return NextResponse.json({
      success: true,
      data: newUser,
      message: '用户创建成功',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}