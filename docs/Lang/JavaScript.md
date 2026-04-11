内置的参考：[JavaScript 参考 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)

### 语法与数据类型

如果一条语句独占一行的话，那么分号是可以省略的。但如果一行中有多条语句，那么这些语句*必须*用分号进行分隔。

变量声明关键字：

1. var：声明局部或者全局变量，该关键字声明的变量会被[提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)（函数声明都会被提升）
2. let：声明一个块级作用域的局部变量（就是两个花括号之间）
3. const：声明一个块级作用域的只读常量（仅阻止*重新赋值，*而不阻止*修改*。）

变量的作用域：

1. 全局作用域：在脚本模式中运行的所有代码的默认作用域。
2. 模块作用域：在模块模式中运行的代码的作用域。
3. 函数作用域：由[函数](https://developer.mozilla.org/zh-CN/docs/Glossary/Function)创建的作用域。
4. 块级作用域：用一对花括号创建的作用域（[块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)）

数据类型：

- 七种[基本](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)数据类型：
  1. [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)。`true` 和 `false`。
  2. [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)。一个表示空值的特殊关键字。（因为 JavaScript 是区分大小写的，所以 `null` 和 `Null`、`NULL` 或其他变体是不一样的。）
  3. [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/Undefined)。一个未定义值的顶级属性。
  4. [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)。整数或浮点数，64位双精度浮点数。
  5. [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)。任意精度的整数。
  6. [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String)。表示文本值的字符序列。例如，`"Howdy"`。
  7. [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)。其实例是唯一且不可变的数据类型。
- 以及 [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)

使用`+`操作数字和字符串时会将数字转化为字符串

[模板字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)也可用。模板字面量由一对反引号（```）（[重音符](https://zh.wikipedia.org/wiki/重音符)）包围

```js
// 多行字符串
`在 JavaScript 中，模板字符串可以
 跨越行，但是由双引号和单引号
 包裹的字符串不行。`

// 字符串插值
const name = 'Lev', time = 'today';
`你好 ${name}，${time} 过得怎么样？`
```

字符串中插入`""`和`\`需要在符号前添加`\`进行反转义

### 流程控制与循环

所有其他的值——包括所有的对象——在被传递给条件语句时会求值为 `true`。

**备注：** 请不要混淆原始布尔值 `true` 和 `false` 与 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象的真和假！

```js
const b = new Boolean(false);
if (b) {
  // 这个条件求值为 true
}
if (b == true) {
  // 这个条件求值为 false
}
```

异常处理语句：

1. `throw [expression]`语句被执行会抛出异常，`expression`为抛出的值。
2. 使用`try...catch(e)...finally`语句进行异常处理，`catch`块内为异常发生时执行的语句，`e`为`throw`语句抛出的表达式。


label语句：

使用`label+break`语句的组合可以跳转到任意标记的循环外而非只跳出一层循环，同理`continue`也可以与`break`一起使用效果相同。

```javascript
var num = 0;
outPoint: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outPoint; // 在 i = 5，j = 5 时，跳出所有循环，
      // 返回到整个 outPoint 下方，继续执行
    }
    num++;
  }
}
alert(num); // 输出 55
```

`for...of`与`for...in`：

1. `for...of`可以循环遍历数组每一个元素
2. `for...in` 可以循环遍历对象中每一个属性名

```js
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
  console.log(i); // 输出 "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); // 输出 "3", "5", "7"
}

// 注意 for...of 的输出没有出现 "hello"
```

### 函数

函数中改变传入变量不影响变量的全局值因为，和C语言一样传参仅为值的传递，但是对象和数组作为参数进行传递时函数对其的更改对外部则是可见的。解释器会自动将函数的作用域提升到当前作用域的顶部，函数提升仅适用于函数声明，而不适用于函数表达式。

可以使用函数表达式来代表函数（类似函数指针），也可以将函数表达式作为参数传递：

```js
function map(f, a) {
  const result = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = f(a[i]);
  }
  return result;
}

const cube = function (x) {
  return x * x * x;
};

const numbers = [0, 1, 2, 5, 10];
console.log(map(cube, numbers)); // [0, 1, 8, 125, 1000]
```

闭包是可以拥有独立变量以及绑定了这些变量的环境（“封闭”了表达式）的表达式（通常是函数）。js通过闭包实现镶嵌函数（再C语言中没有镶嵌函数，但是GNU拓展的语法中有所支持），即在函数中定义内部函数并使用它，内部函数可以访问上层函数的参数以及变量，但是上层函数却不能访问内层函数的变量，同时也不能直接调用内部函数。

### 运算符

1. `>>`带符号右移。
2. `>>>`补零右移。
3. `===`全等操作数相等且类型相同为真。
4. `delete`删除对象的一个属性或者数组中的有一个值，成功操作会返回`true`，并且操作对象会变为`undefined`。
5. `typeof`返回一个表示操作数类型的字符串。
6. `void`对表达式求值返回`undedined`。
7. `in`如果所指定的属性确实存在于所指定的对象中，则会返回`true`。
8. `instanceof`如果所判别的对象确实是所指定的类型，则返回`true`。
9. `new` 运算符用于创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

解构是能从数组或者对象中的提取数据的表达式：

```js
var foo = ["one", "two", "three"];

// 不使用解构
var one = foo[0];
var two = foo[1];
var three = foo[2];

// 使用解构
var [one, two, three] = foo;
```

### 数字与字符串

八进制数以`0`开头，十进制数字也可以以0开头但是第二个数字如果小于8则会被认为是八yi进制，二进制数以`0b`开头，十六进制以`0x`开头。

`js`内置`Math`对象，其中有关角度的单位均为弧度：

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`abs()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/abs) | 绝对值                                                       |
| [`sin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sin), [`cos()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cos), [`tan()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/tan) | 标准三角函数;参数为弧度                                      |
| [`asin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/asin), [`acos()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/acos), [`atan()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atan), [`atan2()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2) | 反三角函数; 返回值为弧度                                     |
| [`sinh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh), [`cosh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh), [`tanh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh) | 双曲三角函数; 参数为弧度。                                   |
| [`asinh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh), [`acosh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh), [`atanh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh) | 反双曲三角函数;返回值为弧度。                                |
| [`pow()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/pow), [`exp()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/exp), [`expm1()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1), [`log10()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log10), [`log1p()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p), [`log2()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log2) | 指数与对数函数                                               |
| [`floor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor), [`ceil()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) | 返回小于等于参数的最大整数；返回大于等于参数的最小整数       |
| [`min()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min), [`max()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max) | 返回一个以逗号间隔的数字参数列表中的较小或较大值 (分别地)    |
| [`random()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random) | 返回 0 和 1 之间的随机数。                                   |
| [`round()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round), [`fround()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/fround), [`trunc()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc), | 四舍五入和截断函数                                           |
| [`sqrt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt), [`cbrt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt), [`hypot()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot) | 平方根，立方根，所有参数平方和的平方根两个参数平方和的平方根 |
| [`sign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) | 数字的符号，说明数字是否为正、负、零。                       |
| [`clz32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32), [`imul()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/imul) | 在 32 位 2 进制表示中，开头的 0 的数量。*返回传入的两个参数相乘结果的类 C 的 32 位表现形式* |

`js`内置`Date`对象来处理日期：

创建一个日期对象：

```js
var birthday = new Date("January 25, 2005");
//也可以通过年，月，日，时，分，秒的方式初始化
var birthday = new Date(2005, 1, 25, 0, 0, 0);
//当什么么参数都不填写的时候创造的对象为当前日期
var today = new Date();
```

处理日期时间的 Date 对象方法可分为以下几类：

- "set" 方法，用于设置 Date 对象的日期和时间的值。
- "get" 方法，用于获取 Date 对象的日期和时间的值。
- "to" 方法，用于返回 Date 对象的字符串格式的值。
- parse 和 UTC 方法，用于解析 Date 字符串。

### 正则表达式

正则表达式是用于匹配字符串中字符组合的模式，在JavaScript中正则表达式也是对象可以通过一下两种方式来创建：

```js
var re1 = /ab*c/;					//两个斜杠之间的部分就是匹配的模式
var re2 = new RegExp("ab*c");		//也可以通过构造函数来创建表达式
```

