// 基础类型
export const baseTypeCode = () => {
  // 基本:布尔、数字、字符串、大整数、标识符
  let nickname: string = "阿强";
  let count: number = 42;
  let isDone: boolean = false;
  let big: bigint = 100n;
  let symbol: symbol = Symbol("id");
};
export const baseTypeCodeStr = `
 // 基本:布尔、数字、字符串、大整数、标识符
  let nickname: string = "阿强";
  let count: number = 42;
  let isDone: boolean = false;
  let big: bigint = 100n;
  let symbol: symbol = Symbol("id");`;
export const specialTypeCode = () => {
  // 特殊:any、unknown、undefined、null、void、nerver
  let a: any = 1;
  let un: unknown = 1;
  let u: undefined = undefined;
  let n: null = null;
  let v: void = undefined;
  let ne: never;
  // unknown 使用
  if (typeof un === "number") {
    console.log(un);
  }
  // 定义无返回值的函数
  const fn = (): void => {};
};

export const specialTypeCodeStr = `
// 特殊:any、unknown、undefined、null、void、nerver
  let a: any = 1;
  let un: unknown = 1;
  let u: undefined = undefined;
  let n: null = null;
  let v: void = undefined;
  let ne: never;
  // unknown 使用
  if (typeof un === "number") {
    console.log(un);
  }
  // 定义无返回值的函数
  const fn = (): void => {};
`;

export const structuralTypeCode = () => {
  // 结构:数组、元组、枚举、对象、类、接口
  // 数组
  let arr: number[] = [1, 2, 3];
  let arr1: Array<string> = ["a", "b", "c"];
  // 元组
  let tup: [number, string] = [1, "a"];
  let tup1: [number, ...string[]] = [1, "a", "b"];
  // tup = ["a",1];// 报错：类型“[string, number]”不兼容类型“[number, string]”。

  // 枚举
  enum Color {
    Red = "#ff0000",
    Green = "#00ff00",
    Blue = "#0000ff",
  }
  let c: Color = Color.Green;
  console.log(c);
  // 对象
  let obj: { name: string; age: number } = { name: "阿强", age: 18 };
  let obj1: { [key: string]: string } = { name: "阿强", age: "18" }; //key为字符串类型，value为字符串类型

  // 类
  class User {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  let user = new User("阿强", 18);
  console.log(user.age);

  // 接口
  interface User {
    name: string;
    age: number;
  }
  let user1: User = { name: "阿强", age: 18 };
  console.log("hhahahah", JSON.stringify(baseTypeCode));
};

export const structuralTypeCodeStr = `
// 结构:数组、元组、枚举、对象、类、接口
  // 数组
  let arr: number[] = [1, 2, 3];
  let arr1: Array<string> = ["a", "b", "c"];
  // 元组
  let tup: [number, string] = [1, "a"];
  let tup1: [number, ...string[]] = [1, "a", "b"];
  // tup = ["a",1];// 报错：类型“[string, number]”不兼容类型“[number, string]”。

  // 枚举
  enum Color {
    Red = "#ff0000",
    Green = "#00ff00",
    Blue = "#0000ff",
  }
  let c: Color = Color.Green;
  console.log(c);
  // 对象
  let obj: { name: string; age: number } = { name: "阿强", age: 18 };
  let obj1: { [key: string]: string } = { name: "阿强", age: "18" }; //key为字符串类型，value为字符串类型

  // 类
  class User {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  let user = new User("阿强", 18);
  console.log(user.age);

  // 接口
  interface User {
    name: string;
    age: number;
  }
  let user1: User = { name: "阿强", age: 18 };
  console.log("hhahahah", JSON.stringify(baseTypeCode));
`;

// 联合类型
export const unionTypeCode = () => {
  // 联合类型
  let a: number | string = 1;
  a = "1"; // ok
  a = 1; // ok
  // a = true; // error
};

export const unionTypeCodeStr = `
// 联合类型
  let a: number | string = 1;
  a = "1"; // ok
  a = 1; // ok
  // a = true; // error
`;

// 类型别名
export const typeAliasCode = () => {
  type ID = number | string;
  type UserPost = {
    id: ID;
    title: string;
    content: string;
  };

  let myPost: UserPost = { id: 1, title: "学习 TS", content: "..." };
};

export const typeAliasCodeStr = `
// 类型别名
  type ID = number | string;
  type UserPost = {
    id: ID;
    title: string;
    content: string;
  };

  let myPost: UserPost = { id: 1, title: "学习 TS", content: "..." };
`;

// 类型断言
export const typeAssertionCode = () => {
  let someValue: unknown = "this is a string";
  // 告诉 TS：相信我，我知道它是字符串
  let strLength: number = (someValue as string).length;
};

export const typeAssertionCodeStr = `
// 类型断言
  let someValue: unknown = "this is a string";
  // 告诉 TS：相信我，我知道它是字符串
  let strLength: number = (someValue as string).length;
`;

// 接口的继承
export const interfaceExtendsCode = () => {
  // 一个接口可以继承多个接口
  interface CanSwim {
    swim: () => void;
  }

  interface CanFly {
    fly: () => void;
  }

  // ✅ 鸭子接口同时继承了游泳和飞行的契约
  interface Duck extends CanSwim, CanFly {
    quack: () => void;
  }

  const myDuck: Duck = {
    swim: () => console.log("游泳"),
    fly: () => console.log("飞"),
    quack: () => console.log("嘎嘎"),
  };

  // 但只能继承一个类
  class Animal {
    eat() {
      console.log("吃东西");
    }
  }

  class Robot {
    eat() {
      console.log("充电");
    }
  }

  // ❌ 报错：类只能扩展一个类
  // class RobotDog extends Animal, Robot { }
};

export const interfaceExtendsCodeStr = `
// 一个接口可以继承多个接口
  interface CanSwim {
    swim: () => void;
  }

  interface CanFly {
    fly: () => void;
  }

  // ✅ 鸭子接口同时继承了游泳和飞行的契约
  interface Duck extends CanSwim, CanFly {
    quack: () => void;
  }

  const myDuck: Duck = {
    swim: () => console.log("游泳"),
    fly: () => console.log("飞"),
    quack: () => console.log("嘎嘎"),
  };

  // 但只能继承一个类
  class Animal {
    eat() {
      console.log("吃东西");
    }
  }

  class Robot {
    eat() {
      console.log("充电");
    }
  }

  // ❌ 报错：类只能扩展一个类
  // class RobotDog extends Animal, Robot { }`;

// 交叉类型
export const intersectionTypeCode = () => {
  // 它与联合类型 | 相反，要求变量必须同时满足所有类型的要求
  type Person = { name: string };
  type Contact = { phone: string };

  // 交叉类型：必须既有 name 又有 phone
  type Employee = Person & Contact;

  const worker: Employee = {
    name: "阿强",
    phone: "13800138000",
  };
};

export const intersectionTypeCodeStr = `
  // 它与联合类型 | 相反，要求变量必须同时满足所有类型的要求
  type Person = { name: string };
  type Contact = { phone: string };

  // 交叉类型：必须既有 name 又有 phone
  type Employee = Person & Contact;

  const worker: Employee = {
    name: "阿强",
    phone: "13800138000",
  };`;

// 可读属性与可选属性
export const readonlyOptionalCode = () => {
  interface User {
    readonly id: number; // 只读，初始化后不可修改
    name: string;
    age?: number; // 可选，这个属性可以不存在
  }

  let user: User = { id: 1, name: "阿强" };
  user.name = "大强";
  // user.id = 2; // 报错：无法分配到 "id" ，因为它是只读属性。
};

export const readonlyOptionalCodeStr = `
  interface User {
    readonly id: number; // 只读，初始化后不可修改
    name: string;
    age?: number; // 可选，这个属性可以不存在
  }

  let user: User = { id: 1, name: "阿强" };
  user.name = "大强";
  // user.id = 2; // 报错：无法分配到 "id"，因为它是只读属性。`;

// 索引签名
export const indexSignatureCode = () => {
  // 这里的含义是：Key 是字符串，Value 也是字符串
  interface Cache {
    [key: string]: string;
  }

  const myCache: Cache = {
    theme: "dark",
    language: "zh-CN",
  };
};

export const indexSignatureCodeStr = `
  // 这里的含义是：Key 是字符串，Value 也是字符串
  interface Cache {
    [key: string]: string;
  }

  const myCache: Cache = {
    theme: "dark",
    language: "zh-CN",
  };`;

// 函数重载
export const functionOverloadCode = () => {
  // 1. 定义重载签名（告诉 TS 有哪几种情况）
  function getValue(str: string): string[];
  function getValue(num: number): number[];

  // 2. 实现函数逻辑（统一处理）
  function getValue(val: any): any {
    if (typeof val === "string") return val.split("");
    return [val];
  }

  const v1 = getValue("abc"); // TS 知道 v1 是 string[]
  const v2 = getValue(123); // TS 知道 v2 是 number[]
};

export const functionOverloadCodeStr = `
  // 1. 定义重载签名（告诉 TS 有哪几种情况）
  function getValue(str: string): string[];
  function getValue(num: number): number[];

  // 2. 实现函数逻辑（统一处理）
  function getValue(val: any): any {
    if (typeof val === "string") return val.split("");
    return [val];
  }

  const v1 = getValue("abc"); // TS 知道 v1 是 string[]
  const v2 = getValue(123); // TS 知道 v2 是 number[]`;

// 抽象类
export const abstractClassCode = () => {
  abstract class Shape {
    abstract getArea(): number; // 抽象方法，子类必须实现
    print() {
      console.log("计算中...");
    }
  }

  class Circle extends Shape {
    constructor(public radius: number) {
      super();
    }
    getArea() {
      return Math.PI * this.radius ** 2;
    }
  }

  // let s = new Shape(); // 报错：无法创建抽象类的实例
  let c = new Circle(10);
};

export const abstractClassCodeStr = `
  abstract class Shape {
    abstract getArea(): number; // 抽象方法，子类必须实现
    print() {
      console.log("计算中...");
    }
  }

  class Circle extends Shape {
    constructor(public radius: number) {
      super();
    }
    getArea() {
      return Math.PI * this.radius ** 2;
    }
  }

  // let s = new Shape(); // 报错：无法创建抽象类的实例
  let c = new Circle(10);`;

// 泛型
export const genericCode = () => {
  // 1、为什么需要泛型？（逻辑复用）

  // 如果用 number，那这个函数就只能给数字用
  function identityNum(arg: number): number {
    return arg;
  }
  // 如果用 any，虽然能用，但我们失去了类型检查（输入 string，输出也变成了 any）
  function identityAny(arg: any): any {
    return arg;
  }

  // 泛型解决方案：使用 <T>（T 只是个代号，代表 Type）
  function identity<T>(arg: T): T {
    return arg;
  }

  // 使用方式 A：明确指定类型
  let output1 = identity<string>("myString");
  // 使用方式 B：类型推断（编译器会自动看 "myString" 是字符串，从而推断出 T 是 string）
  let output2 = identity("myString");
  console.log(output1, output2);

  // 2、泛型约束 (Generic Constraints)：有时候你不想让 T 是任何类型，你希望它“至少具备某些特征”。比如，你要求传入的参数必须有 .length 属性

  interface Lengthwise {
    length: number;
  }

  // T extends Lengthwise 表示：T 可以是任何类型，但必须满足 Lengthwise 接口
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 现在这里不会报错了
    return arg;
  }

  loggingIdentity({ length: 10, value: "hello" }); // OK
  // loggingIdentity(5); // 报错：number 没有 length 属性

  // 3、泛型接口 (Generic Interfaces)：这在定义 API 响应结构时非常常用。后端返回的格式通常是固定的，但 data 里的内容千变万化
  interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T; // 数据部分是泛型的
  }

  // 也可以给泛型一个默认值，但是仍可以是其他类型的值
  interface ApiResponse<T = string> {
    code: number;
    msg: string;
    data: T; // 数据部分是泛型的
  }

  interface User {
    name: string;
    age: number;
  }

  // 当请求用户接口时,会把 ApiResponse 内部所有的 T 都替换成 User
  const response: ApiResponse<User> = {
    code: 200,
    msg: "success",
    data: { name: "阿强", age: 18 },
  };

  // {code: number;msg: string;data: { name: string; age: number; }; // 这里的 data 不再是模糊的，而是精准的 User}

  // 4、类也可以是泛型的。比如我们要写一个堆栈（Stack）数据结构。
  class Stack<T> {
    private items: T[] = [];

    push(item: T) {
      this.items.push(item);
    }

    pop(): T | undefined {
      return this.items.pop();
    }
  }

  const numberStack = new Stack<number>();
  numberStack.push(1);
  // numberStack.push("1"); // 报错，只能推入数字

  // 5、常用泛型工具类型 (Built-in Utility Types)：Partial<T>将 T 中所有属性变为可选 Readonly<T>将 T 中所有属性变为只读 Pick<T, K>从 T 中选择某些属性，形成一个新的类型 Omit<T, K>从 T 中删除某些属性，形成一个新的类型

  interface Todo {
    title: string;
    desc: string;
  }

  // 只需要 title 属性的新类型
  type TodoPreview = Pick<Todo, "title">;

  // 所有属性都变成可选的新类型
  type OptionalTodo = Partial<Todo>;
};

export const genericCodeStr = `
  // 1、为什么需要泛型？（逻辑复用）

  // 如果用 number，那这个函数就只能给数字用
  function identityNum(arg: number): number {
    return arg;
  }
  // 如果用 any，虽然能用，但我们失去了类型检查（输入 string，输出也变成了 any）
  function identityAny(arg: any): any {
    return arg;
  }

  // 泛型解决方案：使用 <T>（T 只是个代号，代表 Type）
  function identity<T>(arg: T): T {
    return arg;
  }

  // 使用方式 A：明确指定类型
  let output1 = identity<string>("myString");
  // 使用方式 B：类型推断（编译器会自动看 "myString" 是字符串，从而推断出 T 是 string）
  let output2 = identity("myString");
  console.log(output1, output2);

  // 2、泛型约束 (Generic Constraints)：有时候你不想让 T 是任何类型，你希望它“至少具备某些特征”。比如，你要求传入的参数必须有 .length 属性

  interface Lengthwise {
    length: number;
  }

  // T extends Lengthwise 表示：T 可以是任何类型，但必须满足 Lengthwise 接口
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 现在这里不会报错了
    return arg;
  }

  loggingIdentity({ length: 10, value: "hello" }); // OK
  // loggingIdentity(5); // 报错：number 没有 length 属性

  // 3、泛型接口 (Generic Interfaces)：这在定义 API 响应结构时非常常用。后端返回的格式通常是固定的，但 data 里的内容千变万化
  interface ApiResponse<T> {
    code: number;
    msg: string;
    data: T; // 数据部分是泛型的
  }

  // 也可以给泛型一个默认值，但是仍可以是其他类型的值
  interface ApiResponse<T = string> {
    code: number;
    msg: string;
    data: T; // 数据部分是泛型的
  }

  interface User {
    name: string;
    age: number;
  }

  // 当请求用户接口时,会把 ApiResponse 内部所有的 T 都替换成 User
  const response: ApiResponse<User> = {
    code: 200,
    msg: "success",
    data: { name: "阿强", age: 18 },
  };

  // {code: number;msg: string;data: { name: string; age: number; }; // 这里的 data 不再是模糊的，而是精准的 User}

  // 4、类也可以是泛型的。比如我们要写一个堆栈（Stack）数据结构。
  class Stack<T> {
    private items: T[] = [];

    push(item: T) {
      this.items.push(item);
    }

    pop(): T | undefined {
      return this.items.pop();
    }
  }

  const numberStack = new Stack<number>();
  numberStack.push(1);
  // numberStack.push("1"); // 报错，只能推入数字

  // 5、常用泛型工具类型 (Built-in Utility Types)：Partial<T>将 T 中所有属性变为可选 Readonly<T>将 T 中所有属性变为只读 Pick<T, K>从 T 中选择某些属性，形成一个新的类型 Omit<T, K>从 T 中删除某些属性，形成一个新的类型

  interface Todo {
    title: string;
    desc: string;
  }

  // 只需要 title 属性的新类型
  type TodoPreview = Pick<Todo, "title">;

  // 所有属性都变成可选的新类型
  type OptionalTodo = Partial<Todo>;`;

// 操作符
export const operatorCode = () => {
  // 1、联合 (|) 与 交叉 (&)

  // 2、索引访问操作符 (T[K])
  // 3、索引签名与映射类型 (in)
  type Keys = "id" | "name";
  // [K in Keys] 遍历了 Keys，为每个 Key 创建一个 string 类型的属性
  type NewObj = {
    [K in Keys]: string;
  }; // 结果: { id: string; name: string }

  // 4、 类型查询 (keyof 与 typeof)
  const person = { name: "阿强", age: 18 };
  // typeof：在类型位置使用，获取一个 JS 变量/实例 的类型
  type PersonType = typeof person; // { name: string; age: number }
  // keyof：获取一个对象类型的所有键，返回联合类型
  type PersonKey = keyof PersonType; // "name" | "age"

  // 5、非空断言操作符 (!)
  function process(name: string | null) {
    const len = name!.length; // 强行断言 name 不是 null
  }

  // 6、可选链操作符 (?.)
  const city = { address: { city: "北京" } }?.address?.city;

  // 7、空值合并操作符 (??)
  const count = { count: null }.count ?? 10;

  // 8、条件三元符 (T extends U ? X : Y)
  // 如果 T 能分配给 string，结果就是 "YES"，否则是 "NO"
  type IsString<T> = T extends string ? "YES" : "NO";

  type Result = IsString<123>; // "NO"

  // 9、待推断类型 (infer)：仅能用在 extends 条件类型中，用于在模式匹配中“声明”并“抓取”一个类型变量
  // 获取函数返回值的内置工具类型 ReturnType 的原理：
  type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

  function fn() {
    return { a: 1 };
  }
  type R = MyReturnType<typeof fn>; // { a: number }
};

export const operatorCodeStr = `
  // 1、联合 (|) 与 交叉 (&)

  // 2、索引访问操作符 (T[K])
  // 3、索引签名与映射类型 (in)
  type Keys = "id" | "name";
  // [K in Keys] 遍历了 Keys，为每个 Key 创建一个 string 类型的属性
  type NewObj = {
    [K in Keys]: string;
  }; // 结果: { id: string; name: string }

  // 4、 类型查询 (keyof 与 typeof)
  const person = { name: "阿强", age: 18 };
  // typeof：在类型位置使用，获取一个 JS 变量/实例 的类型
  type PersonType = typeof person; // { name: string; age: number }
  // keyof：获取一个对象类型的所有键，返回联合类型
  type PersonKey = keyof PersonType; // "name" | "age"

  // 5、非空断言操作符 (!)
  function process(name: string | null) {
    const len = name!.length; // 强行断言 name 不是 null
  }

  // 6、可选链操作符 (?.)
  const city = { address: { city: "北京" } }?.address?.city;

  // 7、空值合并操作符 (??)
  const count = { count: null }.count ?? 10;

  // 8、条件三元符 (T extends U ? X : Y)
  // 如果 T 能分配给 string，结果就是 "YES"，否则是 "NO"
  type IsString<T> = T extends string ? "YES" : "NO";

  type Result = IsString<123>; // "NO"

  // 9、待推断类型 (infer)：仅能用在 extends 条件类型中，用于在模式匹配中“声明”并“抓取”一个类型变量
  // 获取函数返回值的内置工具类型 ReturnType 的原理：
  type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

  function fn() {
    return { a: 1 };
  }
  type R = MyReturnType<typeof fn>; // { a: number }`;
