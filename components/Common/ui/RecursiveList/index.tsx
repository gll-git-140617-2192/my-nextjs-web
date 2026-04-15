import React from "react";

type ListItem = {
  content: React.ReactNode;
  children?: ListItem | ListItem[];
};

interface RecursiveListProps {
  data: ListItem | ListItem[];
  depth?: number;
  className?: string;
}

const RecursiveList: React.FC<RecursiveListProps> = ({ data, depth = 0, className }) => {
  const items = Array.isArray(data) ? data : [data];

  // 根据深度定义不同的点状样式
  // 层级 0: list-disc (实心圆)
  // 层级 1: list-[circle] (空心圆)
  // 层级 2: list-square (正方形)
  const getListStyle = (d: number) => {
    const styles = ["list-disc", "list-[circle]", "list-[square]"];
    return styles[d % styles.length];
  };

  return (
    <ul className={`${getListStyle(depth)} list-inside ml-5 space-y-1 ${className}`}>
      {items.map((item, index) => {
        const hasChildren =
          item.children &&
          (Array.isArray(item.children) ? item.children.length > 0 : true);

        return (
          <li key={index} className="text-gray-700 transition-all">
            <span className="ml-1">{item.content}</span>

            {/* 递归调用，并将 depth 加 1 */}
            {hasChildren && (
              <div className="mt-1">
                <RecursiveList data={item.children!} depth={depth + 1} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RecursiveList;
