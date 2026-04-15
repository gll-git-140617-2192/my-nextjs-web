import React from 'react';

interface DescriptionProps {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}
/**
 * @description 将字符串中的指定包裹符号替换成对应的 HTML 标签
 * @example `xxx` => 行内代码 *xxx* => 加粗 #xxx# => 红色字体 =xxx= => 背景高亮 _xxx_ => 斜体样式 ~xxx~ => 下划线
 * */ 
const Description = ({ children, className, as: Component = 'p' }: DescriptionProps) => {
  if (typeof children !== 'string') {
    return <p className={`text-gray-600 ${className}`}>{children}</p>;
  }

  // 1. 构造正则表达式，匹配所有指定的包裹符号
  // 匹配：`...` 或 *...* 或 #...# 或 =...= 或 _..._ 或 ~...~
  const regex = /(`[^`]+`|\*[^*]+\*|#[^#]+#|=[^=]+=|_[^_]+_|~[^~]+~)/g;
  
  const parts = children.split(regex);

  return (
    <Component className={`text-gray-600 leading-relaxed whitespace-pre-wrap mt-1 ${className}`}>
      {parts.map((part, index) => {
        // 行内代码 `code`
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="mx-1 px-1.5 py-0.5 font-mono text-[0.9em] bg-gray-100 border border-gray-200 rounded">
              {part.slice(1, -1)}
            </code>
          );
        }
        // 加粗 *bold*
        if (part.startsWith('*') && part.endsWith('*')) {
          return <strong key={index} className="font-bold text-gray-900">{part.slice(1, -1)}</strong>;
        }
        // 红色字体 #red#
        if (part.startsWith('#') && part.endsWith('#')) {
          return <span key={index} className="text-red-500">{part.slice(1, -1)}</span>;
        }
        // 背景黄色标注 =highlight=
        if (part.startsWith('=') && part.endsWith('=')) {
          return <mark key={index} className="bg-yellow-200 px-0.5 rounded text-gray-900">{part.slice(1, -1)}</mark>;
        }
        // 斜体 _italic_
        if (part.startsWith('_') && part.endsWith('_')) {
          return <em key={index} className="italic text-gray-700">{part.slice(1, -1)}</em>;
        }
        // 下划线 ~underline~
        if (part.startsWith('~') && part.endsWith('~')) {
          return <u key={index} className="decoration-gray-400 underline-offset-4">{part.slice(1, -1)}</u>;
        }

        // 普通文本
        return <span key={index}>{part}</span>;
      })}
    </Component>
  );
};

export default Description;