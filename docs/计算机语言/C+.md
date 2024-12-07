### What's C+ ?

每一个掌握C语言的人都至少要学两遍C语言，C+这里记录就是一些C语言的进阶知识，是用来精进C语言水平以满足嵌入式开发要求。

[Deadline039的C语言总结](https://deadline039.github.io/C)

### 内存空间

每一个程序在运行时都需要在内存中为它分配空间，当一个C语言代码运行时他需要的内存空间由以下部分组成：

![内存区域](.\Picture\程序运行内存分布.png)

观察下面两行代码：

```c
char *p1 = "hello world";

char p2[2] = "hello world";
```

两者的区别：

1.p1作为字符类型的指针存放在栈区，"hello world"作为字符串常量存放在数据段，**p1中仅存放"hello world"的地址**。

2.p2作为字符串数组，存放在栈区，"hello world"是存在数组中的值。

对于字符串数组你可修改的第一个字母的值，但是对于字符串指针你却不能这样做，因为你想要修改的对象实际上是一个字符串常量，你只能通过给赋予指针另一个字符串常量的地址来改变它所指向的值。





sizeof 和 strlen特点和区别

![C+sizeof](.\Picture\C+sizeof.png)

melloc，relloc，。。。

scanf和fgets

```C
scanf("%[^\n]", String); // 读取直到换行符的所有字符
```



### 函数指针

函数指针相当重要，回调函数就是依托函数指针实现的（中断服务函数的实现机制），同时使用函数指针可以大大提高程序的灵活性，方便不同函数进行组合来应对不同的问题。



### 结构体

结构体本质上来说就是用户使用基本数据类型进行组合自定义的用于描述特定对象的数据类型。

结构体变量作为局部变量赋进行声明的时候注意一定要赋初值，不然可能结构体变量的存储空间中可能存在内存中残留的数值（这在电机结构中可能会导致电机上电疯转）。

结构体数据对齐

众所周知结构体中的成员在内存中并不是紧挨着排列的，这就造成结构体所占内存大小并不是成员所占大小的和。可以通过下面的方法查看结构体的大小：

```c
#include <stdio.h>
#define OFFSET(st,member) ((int)&((struct st*)0)->member) //这个宏定义用来查看结构成员相对于首地址的偏移量
struct S1
{
    short a;
    long b;//对齐参数：min(4,1)=1,sizeof(long)=4;
};

struct S2
{
    char c;//offset = 0;
    struct S1 d;//offset = 1(对齐参数为 min(1,2)),sizeof(s1)=6;
    double e;//offset = 8(对齐参数为 min(8,2))
};

int main()
{
    printf("sizeof(struct S1) = %d\n",sizeof(struct S1));//6
    printf("sizeof(struct S2) = %d\n",sizeof(struct S2));//16
    printf("Member's Offset of Struct S2:\n");
    printf("&s2.c=%d, &s2.d=%d, &s2.e=%d\n",
    OFFSET(S2,c),OFFSET(S2,d),OFFSET(S2,e));
    return 0;
}
```

### I/O流

C语言中的文件操作都是以流的形式进行的，流是一个将数据抽象后的概念。







### 宏定义：想成为宏仙人吗？

宏定义在C语言中相当重要它可用来实现相当多的功能，虽然它的本质就是字符的替换。

宏的一些性质：

- 宏在""中就不会被展开
- 宏定义可以重复定义，但是不能定义不同的值，如果需要改变宏定义的值需要使用`#undef`取消宏定义
- 宏定义中可以包含宏定义
- 但是宏定义不支持递归展开，比如A宏包含B宏，B宏中又有A宏，那么这个宏之展开到B宏就不会继续展开
- 宏定义的作用域：从声明的位置到文件结尾

```c
#include <stdio.h>
#define A B
#define B A
int main()
{ 
    int A = 10;
    printf("%d\n", A);
    printf("%d\n", B); //会报B未定义的错误，所有宏只替换两次
    return 0;
}
```

**带参数的宏定义**：

宏定义可以传参数，从某种程度上可以实现简单的函数的功能，但是本质上来讲都是文本的替换。

```c
#define MAX(a,b) (a > b ? a : b) 

int m = 0, n = 0;
scanf("%d%d",&m,&n);
printf("MAX NUM IS:%d\n",MAX(m,n));
```

但是与函数相比带参数的宏定义并不会对传入参数的类型进行检查

**标识符和字符串：**

标识符是变量，函数名的名称，字符串是由字符组成的序列，以'\0'结尾通常使用双引号包裹。

```c++
#define TEXT helloworld 
printf("%s",TEXT);//这是错误的TEXT即使被替换，helloworld在这里依旧是作为标识符存在的

/*改法一*/
#define TEXT "helloworld"
/*改法二*/
#define TEXT helloworld 

char *TEXT = "helloworld"
printf("%s\n", TEXT);			
printf("%s\n", helloworld);		//这两个都会输出helloworld，相当于变量名给赋值了
```

从以上案例可以看出，在宏后面如果跟的是字符或者字符和数字的组合，就会被认作标识符，但是如果跟的全为数字就会被认为是`int`或者`double`类型的字面量。

**#和##**

1.`#`是字符串化运算符，能够将后面跟的参数转换为字符串

```c
#define XNAME(n) "x"#n

// 输出 x4
printf("%s\n", XNAME(4));
```

2.`##`是记号粘贴运算符，将参数和标识符粘连在一起组成新的标识符

观察下面代码

```c
#define A(n) An

int A(1) = 10;
printf("%s\n",A(1));//没问题，宏替换后作为标识量被声明
printf("%s\n",A1);//错误的，传进宏的参数并没有起作用，A(1)依旧替换为An

```

如果我想要传进去的参数和它前面的字符组合形成标识符就需要用到`##`

```c
#define A(n) A##n
int A(1) = 10;
printf("%s\n",A1);//没问题，因为A(1)被替换称为A1，作为已经声明
```

如果`##`粘连的是一个宏，那么这个宏将不会被展开，解决方法是提前将宏展开在将其粘连。
