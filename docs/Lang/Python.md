记录一下`Python`学习：

### 语法

`Python`语法：[Python基础](https://docs.python.org/zh-cn/3/tutorial/index.html)

#### 可变对象与不可变对象

不可变对象 ：数字，字符串，元组，布尔值，字节串...

- 创建后内容不能改变，修改操作会创建新的对象。
- 在函数中对全局不可修改变量进行重新赋值时需要用`global`关键字声明，否则视为创建一个新的局部变量。
- 可以作为字典的键。

可变对象：列表，字典，集合，自定义类型实例...

- 创建之后可以被修改，修改操作在原对象上进行。
- 在函数中可以直接对全局可变对象进行修改。
- 不可以作为字典的键。
- 一般情况下不要作为函数的默认参数。

#### 生成器&迭代器



#### 输入输出

```python
#输出函数
print( *object, sep=' ', end='\n', file=sys.stdout, flush=False)

#格式化输出
print(f"hello {name}！")	
print('Pi is {:.2f}'.format(3.14159))

#输入函数，接收终端的输入直到遇见换行符，所有输入合成一个字符串返回
input(['输入提示语句'])

#分割输入
m, n = input('请输入姓名与年龄（使用空格间隔）：').split(maxsplit = 1)
```

#### 数值类型

`python`中数字有三种类型：整型，浮点数，复数。

- 整数可以存储无限大（取决于你的内存），`0b`表示二进制，`0o`表示 八进制，`0x`表示16进制，使用`int( num,base = 10)`强制转换，`base`参数指明输入数据的进制。（`False`和`Ture`也是整型大小为0，1）
- 浮点数存储17位精度，占用8个字节，超出会触发`OverflowError`，使用`float()`强制转换。
- 复数可以用`a+bj`或者`complex(a, b)`表示，实部和虚部都是浮点数，可以通过`.real`和`.imag`方法获取实部和虚部，使用`complex()`强制转换。

数值运算符：

- `//`：整除运算向下取整（像负无穷取整），参与运算的都是整数时结果为整数，有浮点数参与时结果是浮点数。
- `%`：取模运算，两数符号不同时与数学上的取模有区别，**模非零时结果与除数符号相同**，`a%b = a-(a//b)*b`。
- `**`：幂运算。

逻辑运算符

- `==`和`!=`：用于判断对象的数值是否相等，字典，列表，集合只能进行同类型的比较。
- `is`和`not is`：用于判断对象的地址是否相等。
- `not`，`and`，`or`：优先级依次递减，`or`与`and`优先计算左边等式。

内置数学函数：

```python
abs(x)	#取绝对值
divmod(a,b)	#以元组的形式返回(a//b, a%b)
pow(x, y[, z])	#返回x的y次方对z取模的结果
round(num, n=0)	#返回浮点数num保留的n位的值，默认为0
max()	#返回一组数，或者一个可迭代对象中的最大值
min()	#返回一组数，或者一个可迭代对象中的最小值
```

Math库：[math --- 数学函数 — Python 3.14.2 文档](https://docs.python.org/zh-cn/3/library/math.html)

#### 序列类型

字符串，元组，列表，range等数据类型都是序列类型，它们都是可迭代的具有一定的共性，内部的元素存在先后顺序，都能使用以下方法。

| 操作                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `len(seq)`             | 获取序列长度                                                 |
| `seq[index]`           | 按索引访问序列的元素                                         |
| `seq[start:stop:step]` | 切片，返回序列的一部分                                       |
| `for item in seq:`     | 迭代，依此返回序列中的每个元素                               |
| `element in seq`       | 存在性检查，如果存在返回真                                   |
| `element not in seq`   | 不存在检查，如果不存在返回真                                 |
| `seq1 + seq2`          | 连接两个相同类型的序列                                       |
| `seq * n` 或 `n * seq` | n为整数，将序列重复n次拼接成一个新序列                       |
| `seq.index(x,[i,j])`   | 返回序列中 *x* 首次出现位置的从零开始的索引。 如无此条目则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ValueError)。可选参数 *start* 和 *end* 是切片符号，用于将搜索限制为序列的特定子序列。返回的索引是相对于整个序列的开始计算的，而不是 *start* 参数。 |
| `seq.count(x)`         | 返回序列中元素 *x* 出现的次数。                              |



字符串：是不可变对象，元素类型只能是字符，默认使用`UTF-8`编码，通常使用下述两种方式创建

- `string = 'ni hao!'`：可以用双引号或者单引号。
- `string = str(object, encoding = 'utf-8', errors = 'strict')`

| 操作                             | 描述                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| `str.find(sub[, start[, end]])`  | 查找子串首次出现位置                                         |
| `str.upper()/lower()`            | 所有字符转大写/小写                                          |
| `str.title()`                    | 每个单词首字母大写                                           |
| `str.replace(old, new[, count])` | 替换子串                                                     |
| `str.split([sep[, maxsplit]])`   | 按分隔符分割字符串，默认按照空格分割， maxsplit代表分割次数默认-1全部分割，**返回列表** |
| `str.join(iterable)`             | 用`str`连接可迭代对象为一个新的字符串，可迭代对象的每一个元素必须是字符串 |
| `str.strip([chars])`             | 去除两端字符                                                 |
| `str.center(width[, fillchar])`  | 居中填充                                                     |



元组：是不可变对象，元素可以是任何对象，使用 `tup = ()`或者`tuple()`初始化,方法只有`count()`和`index()`。



列表：是可变对象，元素可以是任何对象，使用`ls = []`或者`list(iterable)`初始化

| 操作                                            | 作用                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| list.**append**(*x*)                            | 在列表末尾添加一项。 类似于 `a[len(a):] = [x]`。             |
| list.**extend**(*iterable*)                     | 通过添加来自 iterable 的所有项来扩展列表。 类似于 `a[len(a):] = iterable`。 |
| list.**insert**(*i*, *x*)                       | 在指定位置插入元素。第一个参数是插入元素的索引，因此，`a.insert(0, x)` 在列表开头插入元素， `a.insert(len(a), x)` 等同于 `a.append(x)` 。 |
| list.**remove**(*x*)                            | 从列表中删除第一个值为 *x* 的元素。未找到指定元素时，触发 [`ValueError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ValueError) 异常。 |
| list.**pop**([*i*])                             | 移除列表中给定位置上的条目，并返回该条目。 如果未指定索引号，则 `a.pop()` 将移除并返回列表中的最后一个条目。 如果列表为空或索引号在列表索引范围之外则会引发 [`IndexError`](https://docs.python.org/zh-cn/3/library/exceptions.html#IndexError)。 |
| list.**clear**()                                | 移除列表中的所有项。 类似于 `del a[:]`。                     |
| list.**sort**(***, *key=None*, *reverse=False*) | 就地排序列表中的元素。                                       |
| list.**reverse**()                              | 翻转列表中的元素。                                           |
| list.**copy**()                                 | 返回列表的浅拷贝。 类似于 `a[:]`。                           |

注意：

不能直接给一个列表的**不存在的索引位置**赋值。列表必须先用 `append()` 添加元素，或者预先创建足够长度。

#### 集合与映射类型

集合与字典中元素不能通过索引访问，同时集合中的元素与字典中的键值都必须是**唯一且不可变**的，Python 3.7+之后有序，保持插入顺序。



集合：`set([iterable])`或者`seta = {1}`创建的普通集合是可变对象，`frozenset([iterable])`创建的冻结集合是不可迭代对象，**注意不能通过`setb = {}`创建空集合，因为默认创建的是空字典**。

| 方法                    | 描述                               | 返回值类型   | 是否原地修改 |
| :---------------------- | :--------------------------------- | :----------- | :----------- |
| `add(x)`                | 添加元素x到集合                    | None         | 是           |
| `remove(x)`             | 移除元素x，不存在则报KeyError      | None         | 是           |
| `discard(x)`            | 移除元素x，不存在不报错            | None         | 是           |
| `pop()`                 | 随机移除并返回一个元素             | 被移除的元素 | 是           |
| `clear()`               | 清空集合所有元素                   | None         | 是           |
| `copy()`                | 返回集合的浅拷贝                   | 新集合       | 否           |
| `union(*others)`        | 返回与一个或多个集合的并集         | 新集合       | 否           |
| `update(*others)`       | 用与一个或多个集合的并集更新原集合 | None         | 是           |
| `intersection(*others)` | 返回与一个或多个集合的交集         | 新集合       | 否           |

字典：使用`D1 = {'key1':'value','key2':'value'}`或者`D2 = dict(key1 = 'value',key2 = 'value')`创建（键值不加引号），键值必须唯一且是不可更改对象。

| 方法                          | 描述                                 | 返回值类型       | 是否原地修改 |
| :---------------------------- | :----------------------------------- | :--------------- | :----------- |
| `get(key[, default])`         | 获取key的值，不存在返回default       | 值或default      | 否           |
| `setdefault(key[, default])`  | 获取key的值，不存在则设置为default   | 值或default      | 可能         |
| `pop(key[, default])`         | 移除key并返回其值，不存在返回default | 值或default      | 是           |
| `popitem()`                   | 移除并返回最后插入的(key, value)     | (key, value)元组 | 是           |
| `clear()`                     | 清空字典所有元素                     | None             | 是           |
| `copy()`                      | 返回字典的浅拷贝                     | 新字典           | 否           |
| `update([other])`             | 用其他字典或键值对更新字典           | None             | 是           |
| `fromkeys(iterable[, value])` | 从可迭代对象创建新字典（类方法）     | 新字典           | 否           |
| `keys()`                      | 返回字典键的视图对象                 | dict_keys视图    | 否           |
| `values()`                    | 返回字典值的视图对象                 | dict_values视图  | 否           |
| `items()`                     | 返回字典键值对的视图对象             | dict_items视图   | 否           |
| `len()`                       | 返回间对值数量                       | int              | 否           |



#### 上下文管理

`python`中使用`with`做上下文管理，能够实现离开作用域自动释放资源，保证代码块在执行过程中发生意外资源也能正常释放。

```python
#with的语法结构
with context_expression [as target(s)]:
    with-body
```

`with`后面的对象需要满足上下文管理器协议，需要实现下面两个方法：

- `__enter__`：在进入 `with` 语法块之前调用，返回值会赋值给 `with` 的 `target`
- `__exit__`：在退出 `with` 语法块时调用，一般用作异常处理

```python
class TestContext:

    def __enter__(self):
        print('__enter__')
        return 1

    def __exit__(self, exc_type, exc_value, exc_tb):
        print('exc_type: %s' % exc_type)
        print('exc_value: %s' % exc_value)
        print('exc_tb: %s' % exc_tb)

with TestContext() as t:
    print('t: %s' % t)
```



#### None

任何数值类型的0与任何空对象以及定义为`None`或者`False`的常量布尔值为False

```python
# None是Python中的单例对象，表示"空"或"无"，不是0或者Flase
print(type(None))           # <class 'NoneType'>
print(id(None))             # 固定地址
print(None is None)         # True
print(None == None)         # True

# 每个None都是同一个对象
a = None
b = None
c = None
print(a is b is c)          # True
print(id(a) == id(b) == id(c))  # True

print(not None)		#Ture
Print(None == False)	#False
```



#### 函数可变参

`**kargs`用于实现可变参

```python
def print_info(**kwargs):  
    for key, value in kwargs.items():  
        print(f"{key}: {value}")  

# 调用函数时传递关键字参数  
print_info(name="Alice", age=30, city="New York")  
```



#### 异常处理

`try..expect..finally`用于做异常处理：



#### lambda表达式

`lambda`表达式又称为匿名函数是一个没有名字临时使用的小函数（不能包含复杂语句），表达式本身的计算结果就是函数的返回值，**不能访问自身参数列表以外的所有变量，不能包含赋值语句，不能包含多条语句**。

```python
#语法
lambda 参数列表：表达式

#用法举例，配合map，sorted，filter函数使用
ls = [5,8,-4,7,3]
print(sorted(ls, key=lambda x: x ** 2,reverse=True)) #按照平方大小将列表排序
print(*(filter(lambda x: x%3 == 0, range(31))), sep='\n') #输出0-30中3的倍数
max_val = lambda a, b: a if a > b else b
#自行调用，使用(lambda)(参数)的形式传参
fib_sequence = [0, 1] + (lambda f: [f.append(f[-1] + f[-2]) or f[-1] for _ in range(8)])([0, 1])
```

`lambda`表达式中可以使用`sum(),filter(),map(),len()`等内置函数

#### 推导式

列表推导式：

```python
#条件过滤（if 在 for 后面）
[关于x的表达式 for x in iterable if condition]
#条件表达式（if-else 在 for 前面）
[表达式1 if condition else 表达式2 for x in iterable]

#例子
[x for x in range(5)]  # [0, 1, 2, 3, 4] 简单生成
[x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8] 带条件过滤 
["偶数" if x % 2 == 0 else "奇数" for x in range(5)]  # ['偶数', '奇数', '偶数', '奇数', '偶数'] 带条件表达式（三目运算符）
[(x, y) for x in range(3) for y in range(2)]  # [(0,0), (0,1), (1,0), (1,1), (2,0), (2,1)] 多重循环
```

字典推导式：

```python
# 语法：{键表达式: 值表达式 for 变量 in 可迭代对象 if 条件}
{key_expr: value_expr for item in iterable if condition}

```

集合推导式：

```python
# 语法：{表达式 for 变量 in 可迭代对象 if 条件}
set = {x**2 for x in range(-5, 6)}
```

生成器推导式：

```python
# 语法：(表达式 for 变量 in 可迭代对象 if 条件)
gen_squares = (x**2 for x in range(10))
```



#### 尾递归

尾递归能够将计算结果作为递归调用的参数传入，从而复用同一个栈帧实现所有递归操作避免栈溢出，其关键特征：
1. 递归调用是函数的最后一个操作。
2. 递归调用的返回值直接作为函数的返回值。
3. `return`后没有额外的计算（操作符、函数等）。

```python
# 普通递归
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # 不是尾递归：需要乘法操作

# 尾递归版本
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    return factorial_tail(n - 1, acc * n)  # 尾递归：只有函数调用
```

`python`不会自动开启尾递归优化，需要手动添加修饰器实现。



#### 内置变量

1.` __name__ `表示当前模块的名称，当文件作为主函数执行时`__name__`的值为`__main__`，当文件作为模块被导入时`__main__`的值为当前文件名（除掉后缀），通常用作实现文件的**可导入 + 可执行**。

```python
#模块内的函数与方法    
if __name__ == "__main__":
    #当文件当作主文件时该部分被执行
    #当文件作为模块导入时该部分不会被执行
```

2.`__file__`表示当前执行文件的路径，注意交互式环境下没有这个变量。

```python
# 当前文件的路径
print(f"当前文件: {__file__}")  # 脚本运行时显示完整路径
# 获取目录名
import os
print(f"文件目录: {os.path.dirname(__file__)}")
```

3.`__debug__`是一个内置布尔常量，在正常模式下时为`Ture`，优化时为`False`，默认执行的脚本都是调试模式。



### 内置函数

检查函数是不是内置函数的方法

```python
# 方法1：检查类型
print(type(sum))           # <class 'builtin_function_or_method'>
print(callable(sum))       # True

# 方法2：查看内置函数列表
import builtins
print("sum" in dir(builtins))  # True
```

#### range()函数

`range()` 函数返回的是一个可迭代的对象，因此需要通过循环或转换为列表等方式才能看到具体的值。

```python
print(list(range(5)))  		# 输出: [0, 1, 2, 3, 4]  
print(range(5))		   		# 输出: range(0, 5)
```



#### sorted()函数

排序函数支持列表，元组，字符串，**字典视图**，任何可迭代对象的排序，**返回列表**。

```python
#语法
sorted(iterable, key=None, reverse=False)

#例子
students = [
    {'name': 'Alice', 'score': 85},
    {'name': 'Bob', 'score': 92},
    {'name': 'Charlie', 'score': 78}
]

# 按分数排序
sorted_students = sorted(students, key=lambda x: x['score'])

#使用sort按有限级比较多个条件的时候可以使用元组作为比较条件
students = [('Alice',85), ('Bob', 92),('Charlie',78),('David',92)]
sorted_students =sorted(students, key=lambda x: (-x[1], x[0]))
```



#### filter()函数

按照一定条件筛选可迭代对象，返回一个可迭代对象。

```python
filter(function, iterable)

numbers = [1, 2, 3, 4, 5]
even_numbers = filter(lambda x: x % 2 == 0, numbers)
```

注意这里lambda表达式做判断条件，而map函数中lambda表达式做转换式

#### map()函数

该函数可以将函数作用于可迭代对象的每一个元素，并**返回一个可迭代对象** 。

```python
#语法
map(func, iterable, ...)
#用法
m,n = map(int, input().split()) #将输入的数据转换为整型并分别赋给m和n

s=['1','2','3']
print(*map(int, s))
```

 `map()` 需要的是函数对象，不是函数结果

```python
# 错误示例：加了括号
map(str.upper(), numbers) 
# str.upper() 会立即执行，但缺少 self 参数，会报错

# 正确示例：不加括号
map(str.upper, numbers)   
# 传递函数对象给 map，map 会自己调用它
```

#### zip()函数

该函数可以组合可遍历对象生成一个zip 生成器。

```python
#语法
zip(iter1, iter2, ...)
#举例
city = ['上海','郑州','乌鲁木齐']
gdp = ['1700','1280']
print(*zip(city, gdp))#输出结果：('上海', '1700') ('郑州', '1280')
```

#### sum()函数

用于可迭代对象元素（数字类型）求和

```python
'''
- iterable: 可迭代对象（列表、元组、集合等）
- start: 起始值（可选，默认为0）
'''
sum(iterable, start=0)

```



### 内置库



### Numpy和Pandas



```python
df = pd.read_csv('file.csv',
                 encoding='utf-8',      # 编码格式
                 sep=',',              # 分隔符，默认逗号
                 header=0,             # 指定表头行
                 names=['col1', 'col2', 'col3'],  # 自定义列名
                 index_col=0,          # 指定索引列
                 skiprows=[0, 2],      # 跳过指定行
                 nrows=1000,           # 只读取前1000行
                 usecols=[0, 1, 3],    # 只读取指定列
                 dtype={'col1': str, 'col2': float},  # 指定列数据类型
                 na_values=['NA', 'null', 'NaN'])  # 指定缺失值标识

df.to_csv('output.csv',
          index=False,          # 不写入索引
          encoding='utf-8-sig', # 支持中文
          sep=';',             # 使用分号分隔
          columns=['col1', 'col3'],  # 只写入指定列
          header=True,         # 包含表头
          na_rep='NULL',       # 缺失值替换为NULL
          float_format='%.2f') # 浮点数格式

# 类型转换
df['column'] = df['column'].astype(int)
df['column'] = pd.to_numeric(df['column'], errors='coerce')
df['date_column'] = pd.to_datetime(df['date_column'])

# 重命名列
df.rename(columns={'old_name': 'new_name'})

# 聚合操作
df.groupby('category')['value'].sum()
df.groupby('category')['value'].mean()
df.groupby('category').agg({'value1': 'sum', 'value2': 'mean'})

# 使用iloc按位置选择
df.iloc[0]           # 第一行
df.iloc[0:5]         # 前5行
df.iloc[0:5, 1:3]    # 前5行，第1-2列

# 使用loc按标签选择
df.loc[0]            # 索引为0的行
df.loc[0:5, 'col1':'col3']  # 切片选择

# 条件筛选
df[df['column'] > 100]                     # 大于条件
df[(df['col1'] > 100) & (df['col2'] < 50)]  # 多个条件
df[df['column'].isin(['A', 'B', 'C'])]      # 在列表中
df[df['column'].str.contains('abc')]        # 字符串包含
```



### jieba

汉语分词库

```py

```



### Matplotlib

图表绘制库

```python
pl.rcParams['font.sans-serif'] = ['SimHei']  # 设置中文字体
pl.rcParams['axes.unicode_minus'] = False    # 正常显示负号
```

`.dt` 是 Pandas 为 `datetime` 类型的 Series 提供的**特殊访问器**，专门用来提取日期时间的各个组成部分。

| 属性             | 说明                     | 示例值     |
| :--------------- | :----------------------- | :--------- |
| `.date`          | 返回日期部分（年-月-日） | 2024-01-02 |
| `.year`          | 年份                     | 2024       |
| `.month`         | 月份（1-12）             | 1          |
| `.day`           | 日期（1-31）             | 2          |
| `.hour`          | 小时（0-23）             | 0          |
| `.minute`        | 分钟（0-59）             | 0          |
| `.second`        | 秒（0-59）               | 0          |
| `.dayofweek`     | 星期几（0=周一，6=周日） | 1          |
| `.day_name()`    | 星期几名称               | Tuesday    |
| `.quarter`       | 季度（1-4）              | 1          |
| `.is_leap_year`  | 是否闰年                 | True/False |
| `.days_in_month` | 当月天数                 | 31         |

### 虚拟环境

#### 使用`venv`

`venv`是`python`自带的虚拟环境管理工具，操作简单方便，但是不能指定虚拟环境解释器的版本。

创建虚拟环境：

```powershell
 python -m venv C:\path\to\new\virtual\environment	#-h查看关于venv的参数，-m是用于无需指出路径调用模块
```

环境激活方式：

|  平台   | Shell      | 用于激活虚拟环境的命令                  |
| :-----: | :--------- | :-------------------------------------- |
|  POSIX  | bash/zsh   | `$ source *<venv>*/bin/activate`        |
|         | fish       | `$ source *<venv>*/bin/activate.fish`   |
|         | csh/tcsh   | `$ source *<venv>*/bin/activate.csh`    |
|         | pwsh       | `$ *<venv>*/bin/Activate.ps1`           |
| Windows | cmd.exe    | `C:\> *<venv>*\Scripts\activate.bat`    |
|         | PowerShell | `PS C:\> *<venv>*\Scripts\Activate.ps1` |

取消激活：

```powershell
deactivate	#处于虚拟环境中时，通过 deactivate 来取消激活一个虚拟环境。
```

删除环境：

可以直接删除虚拟环境的文件夹，也可以通过下的命令直接将虚拟环境清空，这里的清空指的是虚拟环境还在但是安装的所有依赖都删除了，就像环境刚创建一样。

```powershell
python -m venv --clear path/to/venv
```

因为安装在虚拟环境中的脚本可以在虚拟环境未被激活的情况下运行，所以它们的`"#!"`行会包含虚拟环境的绝对路径。 因为这一点虚拟环境在通常情况下都是不可移植的。 你应当保证提供重建一个虚拟环境的简便方式（举例来说，如果你准备了需求文件 `requirements.txt`，则可以使用虚拟环境的 `pip` 执行 `pip install -r requirements.txt` 来安装虚拟环境所需的所有软件包）。 如果出于某种原因你需要将虚拟环境移动到一个新的位置，则你应当在目标位置上重建它并删除旧位置上的虚拟环境。 如果出于某种原因你移动了一个虚拟环境的上级目录，你也应当在新位置上重建该虚拟环境。 否则安装到该虚拟环境的软件包可能无法正常工作。

参考文档：[venv --- 虚拟环境的创建 — Python 3.13.2 文档](https://docs.python.org/zh-cn/3/library/venv.html)

#### 使用`virtualenv`

`virtualenv`是一个第三方的Python虚拟环境管理工具，可以指定Python解释器版本、创建基于现有环境的虚拟环境等。

基本使用方法和`venv`相同，不同点在于:

1.指定虚拟环境解释器版本

可以通过 `-p` 或 `--python` 选项指定要使用的 Python 解释器版本。

```bash
virtualenv -p python3.7 myenv	#例如要创建一个使用 Python 3.7 的虚拟环境
```

2. 使用系统站点包

默认情况下，虚拟环境与系统的包隔离。如果你需要在虚拟环境中访问系统安装的包，可以使用 `--system-site-packages` 选项：

```bash
virtualenv --system-site-packages myenv
```

这样，虚拟环境将能访问全局 Python 包，但仍然允许你安装其他独立的包。

3. 使用符号链接

如果你希望虚拟环境减少占用磁盘空间，可以使用符号链接而不是复制系统包中的文件。使用 `--symlinks` 选项：

```bash
virtualenv --symlinks myenv
```

这样，虚拟环境会创建指向系统包目录的符号链接。

4. 清除已有环境

如果目标目录已经存在虚拟环境，使用 `--clear` 选项清除并重新创建虚拟环境：

```bash
virtualenv --clear myenv
```

5. 自定义种子包

在创建虚拟环境时，你可以指定要安装的种子包（如 `pip`、`setuptools` 和 `wheel`）。可以使用 `--no-seed` 选项来禁止安装默认的种子包。

```bash
virtualenv --no-seed myenv
```

此外，还可以指定安装特定版本的包：

```bash
virtualenv --pip=19.3.1 --setuptools=41.0.1 --wheel=0.33.6 myenv
```

6. 使用配置文件

你可以通过配置文件来自动化虚拟环境的创建，文件名为 `virtualenv.ini`，位于用户的应用程序数据目录中。你可以在文件中设置默认的 Python 版本、使用符号链接等选项：

```ini
[virtualenv]
python = python3.8
symlinks = true
```

7. 使用环境变量

你也可以通过设置环境变量来控制 `virtualenv` 的行为。例如，以下命令会默认使用 Python 3.8 并启用符号链接：

```bash
export VIRTUALENV_PYTHON=python3.8
export VIRTUALENV_SYMLINKS=true
```

#### 使用`conda`

conda是一个流行的开源虚拟环境和包管理工具，适用于Python和其他编程语言。它可以创建、激活和管理虚拟环境，并提供了强大的包管理功能，可以方便地安装、更新和删除包。

`conda`通过下载`Anaconda`获取，但是`Anaconda`会安装许多开发包，如果仅仅是想使用`conda`也可以选择下载`Miniconda`（默认只包含了 `python `和 `conda`）。

`Anaconda`：[清华镜像源下载](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/?C=M&O=D)

`Miniconda`:[清华镜像源下载](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/)

常见用法：

```shell
conda init			#启动conda
conda info [-e]		#查看当前（所有）环境信息
conda env list	#查看安装的环境
conda creat -p path -n envname python=xx softname#(在指定位置)创建新的虚拟环境并指定python版本,安装指定软件包
conda activate envname 		#切换环境
conda remove -n envname --all #移除虚拟环境

conda config   #修改 .condarc 中的配置；这个命令是模仿 git config而来，默认写入到~/.condarc，使用-h查看详细参数
conda config --get channels	#查看已有通道
conda config --add channels	#添加通道
conda config --remove channels channelName	#移除通道

conda search   #搜索安装包，并展示搜索结果
conda update   #更新安装包 
conda update conda	#更新conda
conda env export > environment.yaml	#将当前环境导出为Yaml文件
conda env create -f environment.yaml	#根据yaml文件生成环境
conda install -n envname softname	#安装包到指定环境，默认安装到当前环境
set CONDA_FORCE_32BIT=1 # 切换到32位
set CONDA_FORCE_32BIT=0 # 切换到64位
```

更多内容参考：[Conda文档](https://docs.conda.io/projects/conda/en/latest/commands)

用户文件夹下的`.condarc`文件中进行换源，记事本打开粘贴如下内容：

```
channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
show_channel_urls: true
ssl_verify: false
```



### 线程编程

`python`中可以通过`thread`模块或`threading`模块实现线程编程，两者都属于标准库不同在于前者为面向过程的模块，功能单一仅在`python 2`上支持使用，后者是面向对象的模块可以在`python 2`和`python 3`中使用同时功能更加丰富。

#### Thread类

`threading`通过面向对象的方法进行线程编程，线程的创建通过`Thread`类来实现，通常有两种方式。

可以使用以下方法直接创建线程：

```python
import threading
import time
def print_time(delay, counter):
    while counter:
        time.sleep(delay)
        print (time.ctime(time.time()))
        counter -= 1
#创建一个线程执行target参数所指的函数，args参数传入一个元组，存放执行函数的参数。
thread = threading.Thread(target = print_time, args=(5,5))
thread.start()
```

也可已通过继承的方式创建专门的线程类：

```python
import threading
import time

def print_time(name, delay, counter):
    while counter:
        time.sleep(delay)
        print (name, time.ctime(time.time()))
        counter -= 1  
#创建专门的线程类继承threading，同时重载__init__()和run()方法，线程启动时会自动执行run()方法
class mythread(threading.Thread):
    def __init__(self, threadname, counter):
        threading.Thread.__init__(self)
        self.name = threadname
        self.counter = counter
    def run(self):
        print("START"+self.name)
        print_time(self.name, 1, self.counter)
        print("EXICT"+self.name)
        
thread1 = mythread("Thread-1", 5)
thread2 = mythread("Thread-2", 5)

thread1.start()
thread2.start()
```

`Thread`类还有一些常用方法

```python
class threading.Thread(group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None)
#group 保留给将来实现 ThreadGroup 类的扩展使用。
#name 是线程名称。
#kwargs 传递可变参
#daemon 用于设置是否为守护线程，主程序会等到所有非守护线程结束后再结束，而守护线程在主程序结束后会被强制结束。

Thread.start()	#开始线程活动。
Thread.join(timeout=None)	#阻塞调用该方法的线程，直到被执行这个方法的的线程结束或者超时。
Thread.is_alive()	#返回线程是否存活。
```

#### 线程锁

当有多个线程存在时，为了保证公共资源（数据结构、文件等）同一时间只有一个线程能够访问，因此需要创建线程锁来保证公共资源的正确访问，只有获得锁的线程才能访问公共资源，同一时间只有一个线程拥有线程锁的使用权，当线程使用完成后释放锁的所有权，这是其他的线程先才能获得锁的使用权。



```python
ThreadLock = threading.lock() #创建线程锁
ThreadLock.acquire(blocking=True, timeout=-1)	#获得线程锁，默认blocking值为真，当线程申请获得线程锁而线程锁位处于空闲状态时，线程会一直阻塞直至线程锁空闲被获取，也可以通过timeout设置最长阻塞秒数。
Thread.release()	#释放线程锁

```

> *在 3.13 版本发生变更:* 现在 `Lock` 是一个类。 在更早的 Python 版本中，`Lock` 是一个返回下层私有锁类型的实例的工厂函数。

可重入锁

防止死锁

`with`上下文切换配合线程锁使用

注意：在 CPython 中，由于存在 [全局解释器锁](https://docs.python.org/zh-cn/3/glossary.html#term-global-interpreter-lock)，同一时刻只有一个线程可以执行 Python 代码，这意味着多线程只是分时复用，而不能实现真正意义上同时执行两个线程，换句话说如果多核处理器运行多线程程序时，不论有多少个线程都只有一个核心进行工作，如果想要充分利用处理器的性能推荐使用多进程编程。

详见：[threading --- 基于线程的并行 ](https://docs.python.org/zh-cn/3/library/threading.html)



### 进程编程

python的进程编程基于`multiprocessing`和`subprocess`两个库来实现，前者用于实现多个python程序多进程运行，后者则用以python程序开辟进程调用其它子程序。

#### Process类

`multiprocessing`通过创建一个 `Process`对象然后调用它的 `start()` 方法来生成进程，这和之前创建线程的方法类似，但是它通过子进程的方式绕过了全局解释锁，可以充分利用处理器的多核。

```python
class multiprocessing.Process(group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None)
##参数
#qroup 存在只是为了和Thread保持相同
#target 进程中执行的函数
#args 传入的参数元组

##方法
start()		#启动进程活动。
join([timeout])	#阻塞
pid			#返回进程ID。在生成该进程之前，这将是None。
exitcode	#子进程的退出代码。
kill()		#调用系统结束进程， exit 处理器和 finally 子句等将不会被执行。
terminate()	#调用系统结束进程， exit 处理器和 finally 子句等将不会被执行。
close()		#结束进程，释放资源，如果底层进程仍在运行，会引发 ValueError
```



#### 进程之间的消息传递

队列：通过`Queue()`创建一个队列，通过向队列中读取和存放数据来实现数据的交换。

```python
from multiprocessing import Process, Queue

def f(q):
    q.put([42, None, 'hello'])

if __name__ == '__main__':
    q = Queue()
    p = Process(target=f, args=(q,))
    p.start()
    print(q.get())    # 打印 "[42, None, 'hello']"
    p.join()
```

管道：通过`Pipe()`创建一对由管道连接的对象，可以双向传递信息，但是两端同时发送数据时会破坏数据。

```python
from multiprocessing import Process, Pipe

def f(conn):
    conn.send([42, None, 'hello'])	#通过管道发送消息
    conn.close()

if __name__ == '__main__':
    parent_conn, child_conn = Pipe()	#创建一对由管道连接起来的对象
    p = Process(target=f, args=(child_conn,))
    p.start()
    print(parent_conn.recv())   #读取管道消息
    p.join()
```

共享内存

不同进程之间的内存空间是独立分配的，但是也可以通过以下方法实现共享内存

```python
import multiprocessing 
num = multiprocessing.Value('d', 0.0)			#在共享空间中创建双精度浮点类型变量值为0.0
arr = multiprocessing.Array('i', range(10))		#在共享空间中创建一个1~10的列表
```

还可以使用[`multiprocessing.sharedctypes`](https://docs.python.org/zh-cn/3/library/multiprocessing.html#module-multiprocessing.sharedctypes) 模块创建任意的ctype对象。

服务进程

还可以通过单独设立一个进程来管理各个进程间共享的对，这个进程就是服务进程

```python
from multiprocessing import Process, Manager

def worker(shared_list, value):
    shared_list.append(value)  # 修改共享列表
    print(f"Added {value} to the list")

if __name__ == '__main__':
    with Manager() as manager:
        shared_list = manager.list()  # 创建一个共享列表

        processes = []
        for i in range(5):
            p = Process(target=worker, args=(shared_list, i))
            processes.append(p)
            p.start()

        for p in processes:
            p.join()

        print("Final shared list:", list(shared_list))
```



详见：[multiprocessing --- 基于进程的并行 — Python 3.13.3 文档](https://docs.python.org/zh-cn/3/library/multiprocessing.html)
		   [subprocess --- 子进程管理 — Python 3.13.3 文档](https://docs.python.org/zh-cn/3.13/library/subprocess.html)



### pyserial串口通信

![pyserial](./Picture/pyserial.webp)

`python`的串口编程通过第三方库`pyserial`来实现，在`python3`之前的版本串口编程通过`python`自带的`serial`库来实现，只需`import serial`就能够调用`serial`类来实现串口编程，但是在`python3`之后serial库被移除了取而代之的是第三方库`pyserial`，可能是为保证兼容性在安装`pyserial`之后依旧使用`import serial`来实现`serial`类的调用。



### Socket编程

套接字是两个位于网络中的进程进行信息传递的一种方式，使用`python`实现套接字编程十分方便，只需要`import socket`库即可进行socket编程，下面是一个简单的例子：

```python
#服务端
import socket

s = socket.socket()		#创建socket对象
host = '127.0.0.1'
port = 12345
s.bind((host, port))	#绑定监听的端口
s.listen(5)
while True:
    c, addr = s.accept()	#阻塞式等待客户端连接
    print( '连接地址', addr)
    c.send(b'hello socket!')#以字节的形式向客户端发送消息
    c.close()				#关闭套接字以释放资源，并不会销毁套接字对象
```

```python
#客户端
import socket

s = socket.socket()
host = '127.0.0.1'
port = 12345
s.connect((host,port))	#连接服务器端
messge = s.recv(1024).decode('utf-8')#接收消息并转换为utf-8编码
print(messge)
s.close
```

在两个终端中分别运行两个脚本就能实现通信，这个库中还有一些常用的函数：

```python
socket.socket(family=AF_INET, type=SOCK_STREAM, proto=0, fileno=None)#创建套接字对象，所填参数均为默认参数
socket.gethostname() # 获取本地主机名
socket.getaddrinfo(host, port, family=AF_UNSPEC, type=0, proto=0, flags=0)#获取目标端口的套接字信息，返回值是一个五元组的列表，包含的信息分别是：地址族，套接字类型，协议，主机名，端口号
socket.getsockname()#返回一个元组套接字本身的地址（ip,端口）
socket.makefile() #用于创建和返回一个文件对象，可以通过文件接口与 socket 进行读写操作。
```

举个例子：

```python
#获得ip函数
def get_local_ip():
    s = None
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    finally:
        if s:
            s.close()
    return ip
```

详见：[socket 低层级的网络接口](https://docs.python.org/zh-cn/3/library/socket.html#functions)



### 网络请求

`urlib`是`python`网络请求的标准库，功能全面但是使用复杂，`requests`是一个第三方的HTTP请求库使用方便。

使用`requests.get(URL, param, header)`方法你可以得到一个`Response`对象你可以从中获得所有的信息

```python
response = requests.get(URL, param, header)
#后两个参数是字典类形可选填，param用于在URL中添加指定内容，header用来告诉服务器客户端信息

response.text	#得到文本响应内容
response.content #得到二进制响应内容
response.json	# 得到json数据
response.raw	#得到原始套接字响应
response.headers #得到响应头
response.status_code #得到状态码
response.encoding #找出编码方式
```

下面是一个使用`request`库将页面抓取下来的例子：

```python
import requests

myURL1 = requests.get("https://www.baidu.com/")
file = open("demo.html","w")
file.write(myURL1.text) 
file.close()
```

使用`request.post(URL, header, data)`方法你能将数据上传到指定的服务器

requests 方法如下表：

| 方法                             | 描述                            |
| :------------------------------- | :------------------------------ |
| delete(*url*, *args*)            | 发送 DELETE 请求到指定 url      |
| get(*url*, *params, args*)       | 发送 GET 请求到指定 url         |
| head(*url*, *args*)              | 发送 HEAD 请求到指定 url        |
| patch(*url*, *data, args*)       | 发送 PATCH 请求到指定 url       |
| post(*url*, *data, json, args*)  | 发送 POST 请求到指定 url        |
| put(*url*, *data, args*)         | 发送 PUT 请求到指定 url         |
| request(*method*, *url*, *args*) | 向指定的 url 发送指定的请求方法 |

详见：[Requests: 让 HTTP 服务人类 ](https://requests.readthedocs.io/projects/cn/zh-cn/latest/)

### 正则

[re --- 正则表达式操作 — Python 3.13.3 文档](https://docs.python.org/zh-cn/3/library/re.html)

### 程序打包

