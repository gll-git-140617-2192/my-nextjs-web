"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight, oneDark,atomDark,vscDarkPlus, vs, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// --- Prettier 浏览器版异步加载逻辑 ---
const formatWithPrettier = async (code: string, language: string) => {
  try {
    // 动态导入 Prettier 核心及插件，减少首屏体积
    const prettier = await import("prettier/standalone");
    const estree = await import("prettier/plugins/estree");
    const babel = await import("prettier/plugins/babel");
    const typescript = await import("prettier/plugins/typescript");

    return await prettier.format(code, {
      parser:
        language === "typescript" || language === "tsx"
          ? "typescript"
          : "babel",
      plugins: [babel, estree, typescript],
      semi: true, // 补全分号
      singleQuote: true, // 使用单引号
      printWidth: 60, // 窄屏适配
      trailingComma: "all", // 结尾逗号
      tabWidth: 2, // 缩进 2 空格
    });
  } catch (err) {
    console.error("Prettier Format Error:", err);
    return code.trim(); // 失败则返回原始内容
  }
};

interface CodeViewerProps {
  code: string;
  title?: string;
  language?: string;
  defaultOpen?: boolean;
}

export const CodeViewer = ({
  code,
  title = "查看代码示例",
  language = "typescript",
  defaultOpen = true,
}: CodeViewerProps) => {
  const [formattedCode, setFormattedCode] = useState("");
  const [isFormatting, setIsFormatting] = useState(true);
  const [copied, setCopied] = useState(false);

  // 🚀 执行真正的 Prettier 格式化
  useEffect(() => {
    let isMounted = true;
    setIsFormatting(true);

    formatWithPrettier(code, language).then((res) => {
      if (isMounted) {
        setFormattedCode(res);
        setIsFormatting(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [code, language]);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group my-6 w-full">
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? "item-1" : undefined}
        className="w-full border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm transition-all hover:shadow-md"
      >
        <AccordionItem value="item-1" className="border-none">
          <div className="flex items-center justify-between bg-white pr-4">
            <AccordionTrigger className="flex-1 px-5 py-4 hover:no-underline transition-all">
              <div className="flex items-center gap-3">
                <div className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                  {isFormatting ? "Formatting..." : language}
                </div>
                <span className="text-sm font-medium text-slate-600 truncate">
                  {title}
                </span>
                {isFormatting && (
                  <Loader2 className="h-3 w-3 animate-spin text-slate-300" />
                )}
              </div>
            </AccordionTrigger>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg shrink-0"
              onClick={copyToClipboard}
              disabled={isFormatting}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500 animate-in zoom-in" />
              ) : (
                <Copy className="h-4 w-4 animate-in fade-in" />
              )}
            </Button>
          </div>

          <AccordionContent className="p-0 border-t border-slate-50">
            <div className="relative w-full overflow-hidden bg-white">
              <SyntaxHighlighter
                language={language}
                style={prism}
                children={formattedCode || " "}
                showLineNumbers={true} // 🚀 开启行号，更有编辑器感
                lineNumberStyle={{
                  minWidth: "2.5em",
                  paddingRight: "1em",
                  color: "#cbd5e1",
                  textAlign: "right",
                  userSelect: "none",
                }}
                customStyle={{
                  padding: "24px",
                  fontSize: "13.5px",
                  lineHeight: "1.7",
                  background: "transparent",
                  margin: 0,
                  width: "100%",
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
