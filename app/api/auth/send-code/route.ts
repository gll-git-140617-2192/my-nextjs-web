import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. 频率限制 (60秒)
    const lastCode = await prisma.verificationCode.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (lastCode) {
      const diff = Date.now() - lastCode.createdAt.getTime();
      if (diff < 60 * 1000) {
        return NextResponse.json(
          { message: `请等待 ${Math.ceil((60000 - diff) / 1000)} 秒后重新获取` },
          { status: 429 }
        );
      }
    }

    // 2. 生成验证码与 5 分钟有效期
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.verificationCode.create({
      data: { email, code, expires },
    });

    // 3. 开发环境特殊处理：不发邮件，只控制台输出
    if (process.env.NODE_ENV === "development") {
      console.log("-----------------------------------------");
      console.log(`🚀 [DEV ONLY] 验证码发送至: ${email}`);
      console.log(`🔑 验证码: ${code}`);
      console.log(`⏰ 过期时间: ${expires.toLocaleTimeString()}`);
      console.log("-----------------------------------------");
    } else {
      // TODO: 这里写生产环境的邮件发送逻辑 (如 Resend)
      // await sendEmail(email, code);
    }

    return NextResponse.json({ success: true, message: "验证码已发送（开发环境请查看控制台）" });
  } catch (error) {
    return NextResponse.json({ message: "系统繁忙" }, { status: 500 });
  }
}