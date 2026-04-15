const args = process.argv.slice(1);
console.log('命令行参数:', args); // D:\\code-test\\my-nextjs-app\\app\\blogs\\node-study\\intro\\node.ts

console.log('当前 Node 版本:', process.version); //当前 Node 版本: v20.16.0
console.log('当前操作系统:', process.platform);  //当前操作系统: win32
console.log('当前工作目录:', process.cwd()); //当前工作目录:D:\code-test\my-nextjs-app\app\blogs\node-study\intro
console.log('当前 Node 执行路径:', process.execPath); //C:\nvm4w\nodejs\node.exe
console.log('当前 Node 进程 ID:', process.pid); //当前 Node 进程 ID: 25764
console.log('当前 Node 环境变量:', __dirname);
console.log('当前 Node 环境变量:', __filename);
process.exit(0);