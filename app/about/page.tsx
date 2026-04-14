"use client";
import { Button } from "@/components/ui/button";
import {request} from "@/lib/request";
import Link from "next/link";
const IndexPage = () => {
  const handleGetUsersClick = async () => {
    const res = await request.get("/users");
    console.log("接口数据", res);
  }
  return (
    <div>
      <h1>About我的npx shadcn@latest add button</h1>
      <Button onClick={handleGetUsersClick}>获取用户表</Button>
    </div>
  );
};
export default IndexPage;
