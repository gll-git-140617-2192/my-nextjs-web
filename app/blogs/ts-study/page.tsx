"use client";
import { CodeViewer } from "@/components/CodeViewer";
import {
  baseTypeCode,
  baseTypeCodeStr,
  specialTypeCode,
  specialTypeCodeStr,
  structuralTypeCode,
  structuralTypeCodeStr,
  unionTypeCode,
  unionTypeCodeStr,
  typeAliasCodeStr,
  typeAssertionCodeStr,
  interfaceExtendsCodeStr,
  intersectionTypeCodeStr,
  readonlyOptionalCodeStr,
  indexSignatureCodeStr,
  functionOverloadCodeStr,
  abstractClassCodeStr,
  genericCode,
  genericCodeStr,
  operatorCodeStr,
} from "./index";

baseTypeCode();
specialTypeCode();
structuralTypeCode();
genericCode();

const IndexPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">TS学习指南</h1>
      <h2 className="text-2xl font-bold text-gray-600 mt-4 mb-1">全览</h2>
      <ul className="list-disc list-inside ml-4">
        <li>为什么要学习TS？</li>
        <li>类型和方法</li>
        <ul className="list-[circle] list-inside ml-4">
          <li>基本类型</li>
          <li>特殊类型</li>
          <li>结构与容器类型</li>
          <li>联合类型</li>
          <li>类型别名</li>
          <li>类型断言</li>
          <li>接口的继承</li>
          <li>交叉类型</li>
          <li>只读和可选</li>
          <li>索引签名</li>
          <li>函数重载</li>
          <li>抽象类</li>
          <li>泛型</li>
          <li>操作符</li>
        </ul>
      </ul>
      <h2 className="text-2xl font-bold text-gray-600 mt-4 mb-1">详情</h2>
      <div className="ml-4 flex flex-col gap-2">
        <div className="font-semibold text-2xl">
          {"1、为什么要学习TS？(思维转变)"}
        </div>
        <ul>
          <li>在 JS 中，错误往往发生在运行时（用户用的时候报错了）。</li>
          <li>在 TS 中，错误发生在编译时（你写代码时编辑器就报错了）。</li>
          <li>TypeScript = JavaScript + 类型系统 (Type System)</li>
        </ul>
        <div className="font-semibold text-2xl">{"2、类型和方法"}</div>
        <div className="text-red-400 text-xl">基本类型</div>
        <ul className="list-disc list-inside ml-4">
          <li>string</li>
          <li>number</li>
          <li>boolean</li>
          <li>bigint</li>
          <li>symbol</li>
        </ul>
        <CodeViewer
          defaultOpen={true}
          title="基础类型"
          code={baseTypeCodeStr}
        />
        <div className="text-red-400 text-xl">特殊类型</div>
        <ul className="list-disc list-inside ml-4">
          <li>any:放弃类型检查，可以是任何值</li>
          <li>unknown:安全版any，可以是任何值，但使用前必须进行类型判断</li>
          <li>void:“空”。通常用于没有返回值的函数。</li>
          <li>never:“永不存在”。用于总是抛出异常或死循环的函数返回值。</li>
          <li>null/undefined:对应 JS 中的同名值。</li>
        </ul>
        <CodeViewer
          defaultOpen={false}
          title="特殊类型"
          code={specialTypeCodeStr}
        />
        <div className="text-red-400 text-xl">结构与容器类型</div>
        <ul className="list-disc list-inside ml-4">
          <li>{"Array:数组，写法如 number[] 或 Array<string>"}</li>
          <li>Tuple:元组，固定数量和类型的数组。例如 [string, number]</li>
          <li>Object:对象:通常使用 interface 或 type 定义其结构</li>
          <li>
            {
              "Enum:枚举,给一组数字或字符串赋予友好的名字。例如 enum Status { Active, Inactive}"
            }
          </li>
        </ul>
        <CodeViewer
          defaultOpen={false}
          title="结构类型"
          code={structuralTypeCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">联合类型</div>
        <span className="ml-4">变量可以是多种类型中的一种，用竖线 | 分割</span>
        <CodeViewer
          defaultOpen={false}
          title="联合类型"
          code={unionTypeCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">类型别名</div>
        <span className="ml-4">
          用 type 关键字给类型起个名字，避免重复写长长的对象结构
        </span>
        <CodeViewer
          defaultOpen={false}
          title="类型别名"
          code={typeAliasCodeStr}
          language="typescript"
        />

        <div className="text-red-400 text-xl">类型断言</div>
        <span className="ml-4">
          有时候你比 TS 更清楚某个值的详细类型。你可以用 as 关键字来“强行指认”。
          注意：这并不会进行实际的数据转换，只是在编译阶段骗过 TS。
        </span>
        <CodeViewer
          defaultOpen={false}
          title="类型断言"
          code={typeAssertionCodeStr}
          language="typescript"
        />

        <div className="text-red-400 text-xl">接口的继承</div>
        <span className="ml-4">
          一个接口可以继承多个接口，但只能继承一个类:为了避免"钻石问题"（如果一个类可以同时继承两个父类，而这两个父类都有一个同名的方法（但实现逻辑不同），子类在调用这个方法时，就会产生歧义：到底该听哪个爸爸的）
        </span>
        <CodeViewer
          defaultOpen={false}
          title="接口的继承"
          code={interfaceExtendsCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">交叉类型</div>
        <span className="ml-4">
          如果你想在不使用继承的情况下，把多个类型合并在一起，TS
          提供了一个强大的工具：交叉类型
        </span>
        <CodeViewer
          defaultOpen={false}
          title="交叉类型"
          code={intersectionTypeCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">可读属性与可选属性</div>
        <span className="ml-4">
          在实际开发中，有些数据创建后就不允许修改（如
          ID），有些数据则是可有可无的
        </span>
        <CodeViewer
          defaultOpen={false}
          title="可读属性与可选属性"
          code={readonlyOptionalCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">索引签名</div>
        <span className="ml-4">
          当你不知道一个对象未来会有多少个 Key，或者 Key
          的名字是动态的（比如处理 API 返回的配置项）时，这个非常有用
        </span>
        <CodeViewer
          defaultOpen={false}
          title="索引签名"
          code={indexSignatureCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">函数重载</div>
        <span className="ml-4">
          同一个函数，根据传入参数的不同类型，返回不同类型的结果。TS
          会根据你的调用提供精准的提示
        </span>
        <CodeViewer
          defaultOpen={false}
          title="函数重载"
          code={functionOverloadCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">抽象类</div>
        <span className="ml-4">
          抽象类是一种只能被继承的类，不能被实例化的类（比如“形状”是一个概念，而“圆形”才是具体的实体）
        </span>
        <CodeViewer
          defaultOpen={false}
          title="抽象类"
          code={abstractClassCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">泛型</div>
        <span className="ml-4">
          泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
        </span>
        <CodeViewer
          defaultOpen={false}
          title="泛型"
          code={genericCodeStr}
          language="typescript"
        />
        <div className="text-red-400 text-xl">操作符</div>
        <ul className="list-disc list-inside ml-4">
          <li>联合 (|) 与 交叉 (&)</li>
          <li>索引访问操作符 (T[K])</li>
          <li>索引签名与映射类型 (in)</li>
          <li>类型查询 (keyof 与 typeof)</li>
          <li>非空断言操作符 (!)</li>
          <li>可选链操作符 (?.)</li>
          <li>空值合并操作符 (??)</li>
          <li>条件三元符 (T extends U ? X : Y)</li>
          <li>待推断类型 (infer)</li>
        </ul>
        <CodeViewer
          defaultOpen={false}
          title="操作符"
          code={operatorCodeStr}
          language="typescript"
        />
      </div>
    </div>
  );
};
export default IndexPage;
