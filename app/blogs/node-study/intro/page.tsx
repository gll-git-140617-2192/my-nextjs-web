import Link from "next/link";
import RecursiveList from "@/components/Common/ui/RecursiveList";
import H1 from "@/components/Common/ui/H1";
import H2 from "@/components/Common/ui/H2";
import Description from "@/components/Common/ui/Description";
import { CodeViewer } from "@/components/CodeViewer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { id } from "zod/v4/locales";
import { CJS_VS_ESM_Table_Data, FS_Methods_Table_Data } from "./constant";
import H3 from "@/components/Common/ui/H3";

const NodeStudyPage = () => {
  return (
    <div className="space-y-4 w-full max-w-full">
      <h1 className="text-3xl font-bold text-gray-800">Node学习指南</h1>
      <Link href="https://www.runoob.com/nodejs/nodejs-tutorial.html">
        菜鸟教程
      </Link>
      <div className="space-y-1 min-w-0">
        <div className="text-2xl">一句话介绍</div>
        <div className="mt-2">
          简单的说 Node.js 就是运行在服务端的 JavaScript。 Node.js 是一个基于
          Chrome JavaScript 运行时建立的一个平台。 Node.js 是一个事件驱动 I/O
          服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 Javascript
          的速度非常快，性能非常好
        </div>
        <H1 className="mt-4">第一章：环境与全局对象 (Global Objects)</H1>
        <Description className="ml-8">
          在 Node.js 中，没有 `window`，取而代之的是 `global`
        </Description>
        <H2 className="ml-4">1.1 运行时环境</H2>
        <Description className="ml-8">
          Node.js 是基于 V8 引擎的 JavaScript
          运行时。与浏览器不同，它提供了直接访问操作系统的 API。
        </Description>
        <H2 className="ml-4">1.2 全职变量与常用全局对象</H2>
        <RecursiveList
          data={[
            {
              content: (
                <Description as="span">
                  `global`: 全局命名空间（类似于浏览器的 `window`）
                </Description>
              ),
            },
            {
              content: (
                <Description as="span">
                  `__dirname` / `__filename`:
                  当前脚本的目录名和绝对路径（注：ESM 模式下需通过
                  `import.meta.url` 获取）
                </Description>
              ),
            },
            {
              content: (
                <Description as="span">
                  `process`: 提供当前进程的信息
                </Description>
              ),
              children: [
                {
                  content: (
                    <Description as="span">
                      `process.env`: 获取环境变量
                    </Description>
                  ),
                },
                {
                  content: (
                    <Description as="span">
                      `process.argv`: 获取命令行参数
                    </Description>
                  ),
                },
                {
                  content: (
                    <Description as="span">
                      `process.cwd`: 获取当前工作目录
                    </Description>
                  ),
                },
                {
                  content: (
                    <Description as="span">
                      `process.exit`: 强制退出当前进程
                    </Description>
                  ),
                },
                {
                  content: (
                    <Description as="span">
                      `process.pid`: 获取当前进程的 ID
                    </Description>
                  ),
                },
                {
                  content: (
                    <Description as="span">
                      `process.platform`: 获取当前操作系统
                    </Description>
                  ),
                },
                {
                  content: (
                    <Description as="span">
                      `process.version`: 获取当前 Node 版本
                    </Description>
                  ),
                },
                {
                  content: (
                    <Description as="span">
                      `process.execPath`: 获取当前 Node 执行路径
                    </Description>
                  ),
                },
              ],
            },
          ]}
          depth={0}
          className="ml-8"
        />
        <CodeViewer
          code={`const args = process.argv.slice(1);
console.log('命令行参数:', args); // D:\\code-test\\my-nextjs-app\\app\\blogs\\node-study\\intro\\node.ts

console.log('当前 Node 版本:', process.version); //当前 Node 版本: v20.16.0
console.log('当前操作系统:', process.platform);  //当前操作系统: win32
console.log('当前工作目录:', process.cwd()); //当前工作目录:D:\\code-test\\my-nextjs-app\\app\\blogs\\node-study\\intro
console.log('当前 Node 执行路径:', process.execPath); //C:\\nvm4w\\nodejs\\node.exe
console.log('当前 Node 进程 ID:', process.pid); //当前 Node 进程 ID: 25764
console.log('当前 Node 环境变量:', process.env);
process.exit(0);`}
          language="typescript"
        />
        <H1 className="mt-4">第二章：模块系统 (Module System)</H1>
        <Description className="ml-8">
          Node.js 2026 年的标准是 `ES Modules (ESM)`,之前是 `CommonJS`
        </Description>
        <H2 className="ml-4">2.1 CommonJS (CJS) — Node.js 的原生标准</H2>
        <Description className="ml-8">
          这是 Node.js 默认的模块规范。当你看到 require 和 module.exports
          时，就是在使用 CJS 标准。
        </Description>
        <RecursiveList
          data={[
            {
              content: (
                <Description as="span">导入： 使用 `require()`</Description>
              ),
            },
            {
              content: (
                <Description as="span">
                  导出： 使用 `module.exports` 或 `exports`
                </Description>
              ),
            },
          ]}
        />
        <CodeViewer
          code={`// math.js
            const add = (a, b) => a + b;
            module.exports = { add }; 

            // app.js
            const math = require('./math');
            console.log(math.add(2, 3));`}
          language="typescript"
        />
        <Description className="ml-8">
          运行机制：#模块包装器 (The Module Wrapper)#
        </Description>
        <Description className="ml-8">
          在执行模块代码之前，Node.js
          会使用一个函数包装器将代码包裹起来。这解释了为什么你可以在模块中直接使用
          __dirname 或 require 而不报错。
        </Description>
        <H2 className="ml-4">2.2 ES Modules (ESM) — 现代 JS 标准</H2>
        <Description className="ml-8">
          这是浏览器原生的模块标准，Node.js 从 v12 开始正式支持。在Node.js
          中使用 ESM 有两种方式：1、在 `package.json` 中设置 `"type": "module"`
          2、将文件后缀名改为 *.mjs*
        </Description>
        <H2 className="ml-4">核心语法</H2>
        <RecursiveList
          data={[
            {
              content: <Description as="span">导入： `import`</Description>,
            },
            {
              content: (
                <Description as="span">
                  导出： `export` 或 `export default`
                </Description>
              ),
            },
          ]}
        />
        <H2 className="ml-4">2.3 CJS vs ESM：深度对比</H2>
        <div className="ml-8 pb-3 bg-gray-50">
          <Table className="w-full table-fixed">
            <TableCaption>CJS vs ESM：深度对比</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>feature</TableHead>
                <TableHead>CommonJS(CJS)</TableHead>
                <TableHead>ES Modules(ESM)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CJS_VS_ESM_Table_Data.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.feature}
                  </TableCell>
                  <TableCell>{invoice.cjs}</TableCell>
                  <TableCell>{invoice.esm}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <H1 className="mt-4">第三章：文件系统 (File System - fs)</H1>
        <Description className="ml-8">
          fs 模块的操作通常有三种形式，这反映了 Node.js 的进化史。
        </Description>
        <H2 className="ml-4">3.1 同步模式 (Synchronous)</H2>
        <RecursiveList
          className="ml-8"
          data={[
            {
              content: (
                <Description as="span">语法： `fs.readFileSync`</Description>
              ),
            },
            {
              content: (
                <Description as="span">
                  特点：
                  阻塞线程。代码运行到这里会死等文件读取完毕，才执行下一行。
                </Description>
              ),
            },
            {
              content: (
                <Description as="span">
                  场景： 仅用于简单的脚本或程序启动时的配置读取
                </Description>
              ),
            },
          ]}
        />
        <H2 className="ml-4">3.2 回调模式 (Callback)</H2>
        <RecursiveList
          className="ml-8"
          data={[
            {
              content: (
                <Description as="span">语法： `fs.readFile`</Description>
              ),
            },
            {
              content: (
                <Description as="span">
                  特点： 非阻塞。Node.js 传统做法，容易陷入“回调地狱”
                </Description>
              ),
            },
          ]}
        />
        <H2 className="ml-4">3.3 Promise 模式 (Promise)</H2>
        <RecursiveList
          className="ml-8"
          data={[
            {
              content: (
                <Description as="span">
                  语法： `fs.promises.readFile` 或 `import fs from
                  'fs/promises'`
                </Description>
              ),
            },
            {
              content: (
                <Description as="span">
                  特点：可结合
                  `async/await`使用，既可有同步代码的可读性，又可有异步的高性能。
                </Description>
              ),
            },
          ]}
        />
        <H2 className="ml-4">3.4 实战：读取并修改JSON配置</H2>
        <CodeViewer
          code={`
        import fs from 'fs/promises';
        import { fileURLToPath } from 'url';
        import path from 'path';

        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const configPath = path.join(__dirname, 'config.json');

        async function updateConfig() {
            try {
                // 1. 读取文件
                const data = await fs.readFile(configPath, 'utf-8');
                const config = JSON.parse(data);

                // 2. 修改数据
                config.lastModified = new Date().toISOString();
                config.version += 1;

                // 3. 写回文件 (JSON.stringify 的参数可保持格式美观)
                await fs.writeFile(configPath, JSON.stringify(config, null, 2));
                console.log('配置更新成功！');
            } catch (err) {
                console.error('操作失败:', err.message);
            }
        }

        updateConfig();`}
          language="typescript"
        />
        <H2 className="ml-4">常用操作速查表</H2>
        <div className="ml-8 pb-3 bg-gray-50">
          <Table className="w-full table-fixed">
            <TableCaption>fs/promises介绍</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>操作</TableHead>
                <TableHead>方法</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FS_Methods_Table_Data.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {<Description>{invoice.operation}</Description>}
                  </TableCell>
                  <TableCell>
                    {<Description>{invoice.method}</Description>}
                  </TableCell>
                  <TableCell>
                    {<Description>{invoice.remark}</Description>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <H2 className="ml-4">3.5 避坑指南</H2>
        <H3 className="ml-8">⚠️ 相对路径的陷阱</H3>
        <CodeViewer
          code={`// 错误示范
            fs.readFile('./data.txt');`}
          language="typescript"
        />
        <Description className="ml-8">
          Node.js 中的 ./ 是相对于 你执行命令时所在的目录
          (CWD)，而不是文件所在的目录。解决方案： 永远使用 path.join(__dirname,
          '文件名') 来拼接绝对路径
        </Description>
        <H3 className="ml-8">⚠️ 忘记处理 Buffer</H3>
        <Description className="ml-8">
          如果你不指定读取编码（如 `utf-8`），fs.readFile 会返回一个十六进制的
          `Buffer` 对象
        </Description>
        <H3 className="ml-8">⚠️ 大文件的性能问题</H3>
        <Description className="ml-8">
          如果要读取一个 4GB 的日志文件，fs.readFile 会尝试一次性将 4GB
          加载进内存，这会导致程序崩溃。后续学习Stream (流)可解决
        </Description>

        <H1 className="mt-4">第四章：事件循环与异步机制 (Event Loop)</H1>
        <H2 className="ml-4">4.1 核心哲学：非阻塞 I/O</H2>
        <Description className="ml-8">
          在 Java 或 PHP 中，读文件时线程会“卡死”等结果；在 Node.js
          中，你发出读文件请求后，线程立即去干别的事了，等文件读完，系统会发个通知，Node
          把它塞进#回调队列#里等着执行。
        </Description>
        <H3 className="ml-8">4.2 Node.js 事件循环的六个阶段</H3>
        <Description className="ml-8">
          不同于浏览器简单的“宏任务/微任务”，Node.js 的事件循环分为 6
          个阶段，它们按顺序循环执行：
        </Description>
        <ol className="list-decimal list-inside ml-8 space-y-1.5">
          <li>
            <Description as="span">
              `Poll (轮询阶段)`: 最关键阶段。处理大部分 I/O
              回调（文件、网络）。如果队列为空，它会在这里停留等待
            </Description>
          </li>
          <li>
            <Description as="span">
              `Check (检查阶段)`: 专门执行 `setImmediate()` 的回调
            </Description>
          </li>
          <li>
            <Description as="span">
              `Close Callbacks (关闭回调阶段)`: 执行一些关闭资源的回调，如
              socket.on('close', ...)
            </Description>
          </li>
          <li>
            <Description as="span">
              `Timers (定时器阶段)`: 执行 `setTimeout` 和 `setInterval`
            </Description>
          </li>
          <li>
            <Description as="span">
              `I/O Callbacks(I/O 回调阶段)`: 处理上一轮循环遗留的、被延迟的 I/O
              回调
            </Description>
          </li>
          <li>
            <Description as="span">
              `Idle, Prepare(闲置，准备阶段)`: 仅限系统内部使用
            </Description>
          </li>
        </ol>
        <H2 className="ml-4">4.3 两个特殊的“插队生”</H2>
        <Description className="ml-8">
          在上述 6 个阶段切换的间隙，有两个任务队列拥有最高优先级，它们不是
          Event Loop 的一部分，但会“插队”
        </Description>
        <H3 className="ml-8">① process.nextTick()</H3>
        <RecursiveList
          data={[
            {
              content:
                "优先级：最高:它会在“当前操作”完成后、事件循环进入下一阶段前立即执行",
            },
            {
              content:
                "注意： 如果递归调用 nextTick，会导致事件循环饥饿（卡死）",
            },
          ]}
          className="ml-12"
        />
        <H3 className="ml-8">② Promise (Microtask)</H3>
        <RecursiveList
          data={[
            {
              content:
                "优先级：次高,仅次于 nextTick。所有的 Promise.then() 都会在阶段切换时清空",
            },
          ]}
          className="ml-12"
        />
        <CodeViewer
          code={`import fs from 'fs';

          console.log('1. 开始');

          setTimeout(() => {
            console.log('2. setTimeout (Timers阶段)');
          }, 0);

          setImmediate(() => {
            console.log('3. setImmediate (Check阶段)');
          });

          process.nextTick(() => {
            console.log('4. nextTick (插队生)');
          });

          Promise.resolve().then(() => {
            console.log('5. Promise (微任务)');
          });

          console.log('6. 结束');

          // 执行结果：1->6->4->5->2->3 (注：2 和 3 的顺序在某些环境下可能由于毫秒级性能差异而变动，但在 I/O 回调中，setImmediate 永远先于 setTimeout)
          `}
          title="node事件循环执行顺序"
        />
      </div>
    </div>
  );
};

export default NodeStudyPage;
