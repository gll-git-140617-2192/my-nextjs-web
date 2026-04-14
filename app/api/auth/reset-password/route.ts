import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, code, password } = await req.json();

    // 1. 查找最新的验证码记录
    const record = await prisma.verificationCode.findFirst({
      where: { email, code },
      orderBy: { createdAt: "desc" },
    });

    // 2. 校验验证码与时效
    if (!record || record.expires < new Date()) {
      return NextResponse.json({ message: "验证码错误或已过期" }, { status: 400 });
    }

    // 3. 事务处理：更新密码 + 阅后即焚
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      }),
      // 删除该邮箱下所有的验证码记录，确保验证码一次性有效
      prisma.verificationCode.deleteMany({
        where: { email },
      }),
    ]);

    return NextResponse.json({ success: true, message: "密码重置成功" });
  } catch (error) {
    return NextResponse.json({ message: "重置过程中出现错误" }, { status: 500 });
  }
}