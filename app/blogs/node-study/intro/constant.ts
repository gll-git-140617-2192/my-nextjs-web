export const CJS_VS_ESM_Table_Data: {
  id: number;
  feature: string;
  cjs: string;
  esm: string;
}[] = [
  {
    id: 1,
    feature: "语法",
    cjs: "require/module.exports",
    esm: "import/export",
  },
  {
    id: 2,
    feature: "加载方式",
    cjs: "同步加载(适合服务器磁盘读取)",
    esm: "异步加载(适合网络解析)",
  },
  {
    id: 3,
    feature: "执行时机",
    cjs: "运行时加载",
    esm: "编译时(静态分析)加载",
  },
  {
    id: 4,
    feature: "全局变量",
    cjs: "有__dirname和__filename",
    esm: "没有（需通过import.meta.url转换）",
  },
  {
    id: 5,
    feature: "严格模式",
    cjs: "默认非严格模式",
    esm: "默认use strict",
  },
];


export const FS_Methods_Table_Data: {
  id: number;
  operation: string;
  method: string;
  remark: string;
}[] = [
  {
    id: 1,
    operation: "读文件",
    method: "`readFile(path, 'utf-8')`",
    remark: "不加编码会返回 `Buffer` 对象",
  },
  {
    id: 2,
    operation: "写文件",
    method: "`writeFile(path, data)`",
    remark: "会覆盖原文件内容",
  },
  {
    id: 3,
    operation: "追加内容",
    method: "`appendFile(path, data)`",
    remark: "在文件末尾添加",
  },
  {
    id: 4,
    operation: "删文件",
    method: "`unlink(path)`",
    remark: "永久删除",
  },
  {
    id: 5,
    operation: "创建目录",
    method: "`mkdir(path, { recursive: true })`",
    remark: "`recursive` 可递归创建多级目录",
  },
  {
    id: 6,
    operation: "读目录",
    method: "`readdir(path)`",
    remark: "返回该目录下所有文件名数组",
  },
  {
    id: 7,
    operation: "状态检查",
    method: "`stat(path)`",
    remark: "检查是文件还是目录、大小等",
  },
];