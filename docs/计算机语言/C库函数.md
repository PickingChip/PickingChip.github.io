## 一，字符串函数（引用"string.h"）

## **1.strcpy_s/strncpy_s**

描述

C 库函数 **char \*strcpy(char \*dest, const char \*src)** 把 **src** 所指向的字符串复制到 **dest**。

需要注意的是如果目标数组 dest 不够大，而源字符串的长度又太长，可能会造成缓冲溢出的情况。

因此C11标准制定了**strcpy_s**函数，该函数增加了一个形参要求指定目标字符串大小。

strncpy多一个参数(size_t n)用于指定复制字符的个数。

声明

```
char *strcpy(char *dest, const char *src)

errno_t strcpy_s(char* dest, rsize_t destsz, const char* src);

char *strncpy(char *dest, const char *src, size_t n)
```

参数

- **dest** -- 指向用于存储复制内容的目标数组。
- **src** -- 要复制的字符串。
- **destsz**--目标数组的大小
- **n**--要复制的字符数

返回值

strcpy函数返回一个指向最终的目标字符串 dest 的指针。

strcpy_s函数如果函数成功执行，`strcpy_s()` 将返回 `0`。如果出现错误，例如目标缓冲区太小，它将返回一个非零的错误代码。

## **2.strlen**

描述

C 库函数 **size_t strlen(const char \*str)** 计算字符串 **str** 的长度，直到空结束字符，但不包括空结束字符。

声明

下面是 strlen() 函数的声明。

```
size_t strlen(const char *str)
```

参数

- **str** -- 要计算长度的字符串。

返回值

该函数返回字符串的长度。

## **3.strcat_s/strncat_s**

描述

C 库函数 **char \*strcat(char \*dest, const char \*src)** 把 **src** 所指向的字符串追加到 **dest** 所指向的字符串的结尾(覆盖dest结尾处的'\0')并添加'\0'。strncat指定追加src中的n个字符，strcat_s则要求指定dest的大小。

声明

```
char *strcat(char *dest, const char *src)

char *strncat(char *dest, const char *src, size_t n)

errno_t strcat_s(char *dest, size_t numberOfelement, const char *str);
```

参数

- **dest** -- 指向目标数组，该数组包含了一个 C 字符串，且足够容纳追加后的字符串。
- **src** -- 指向要追加的字符串，该字符串不会覆盖目标字符串。
- **n**--要 追加的字符个数。
- **numberOfelement**--拼接后的字符串大小**(strlen(src)+strlen(dst)+1)**

返回值

strcat函数返回一个指向最终的目标字符串 dest 的指针。

strcat_s函数如果执行成功返回0，不成功返回非零值

## **4.sprintf_s**

描述

C 库函数 **int sprintf(char \*str, const char \*format, ...)** 发送格式化输出到 **str** 所指向的字符串。

声明

```
int sprintf(char *str, const char *format, ...)

int sprintf_s(char *str， size_t sizeOfStr, const char *format,...);
```

参数

- **str** -- 这是指向一个字符数组的指针，该数组存储了 C 字符串。
- **format** -- 这是字符串，包含了要被写入到字符串 str 的文本。它可以包含嵌入的 format 标签，format 标签可被随后的附加参数中指定的值替换，并按需求进行格式化。
- **sizeofstr**--str字符串大小

返回值

如果成功，则返回写入的字符总数，不包括字符串追加在字符串末尾的空字符。如果失败，则返回一个负数。

## **5.gets_s**

描述

C 库函数 **char \*gets(char \*str)** 从标准输入 stdin 读取一行（读到换行符为止），并把它存储在 str 所指向的字符串中。当读取到换行符时，或者到达文件末尾时，它会停止，具体视情况而定。

声明

```
char *gets(char *str)
char *gets_s(char *str,size_t sizeInCharacters)
```

参数

- **str** -- 这是指向一个字符数组的指针，该数组存储了 C 字符串。
- **sizeInCharacters**--缓冲区大小

返回值

如果成功，该函数返回 str。如果发生错误或者到达文件末尾时还未读取任何字符，则返回 NULL。

## **6.strtok_s**

描述

C 库函数 **char \*strtok(char \*str, const char \*delim)** 分解字符串 **str** 为一组字符串，**delim** 为分隔符。

声明

```
char *strtok(char *str, const char *delim)

char *strtok_s(char *str, const char *delim，char** context)
```

参数

- **str** -- 要被分解成一组小字符串的字符串。
- **delim** -- 包含分隔符的 C 字符串。
- **context**--二级指针保存函数内部位置之间的上下文指针

返回值

该函数返回被分解的第一个子字符串，如果没有可检索的字符串，则返回一个空指针。如果想输出被分解的每一个字符串，则在接下来的调用中用NULL代替str的值，函数会在上一次输出的基础上继续执行。

实例

下面的实例演示了 strtok() 函数的用法。

      #include <string.h>
    #include <stdio.h>
    
    int main () {
       char str[80] = "This is - www.runoob.com - website";
       const char s[2] = "-";
       char *token;
    
       /* 获取第一个子字符串 */
       token = strtok(str, s);
    
       /* 继续获取其他的子字符串 */
       while( token != NULL ) {
          printf( "%s\n", token );
      token = strtok(NULL, s);
         }
    
       return(0);
    }
让我们编译并运行上面的程序，这将产生以下结果：

```
This is 
 www.runoob.com 
 website
```

## **7.strcmp/strncmp**

描述

C 库函数 **int strcmp(const char \*str1, const char \*str2)** 把 **str1** 所指向的字符串和 **str2** 所指向的字符串进行比较（**按照ASCII码的大小比较**最先有较大字符的字符串为大）。

**strncmp()** 是一个标准库函数，用于比较两个字符串的前 **n** 个字符是否相等。

声明

```
int strcmp(const char *str1, const char *str2)

int strncmp(const char *str1, const char *str2, size_t n)
```

参数

- **str1** -- 要进行比较的第一个字符串。
- **str2** -- 要进行比较的第二个字符串。
- **n** -- 要比较的最大字符数。

返回值

该函数返回值如下：

- 如果返回值小于 0，则表示 str1 小于 str2。
- 如果返回值大于 0，则表示 str1 大于 str2。
- 如果返回值等于 0，则表示 str1 等于 str2。

## **8.strchr/strrchr**

描述

strchr() 用于查找字符串中的一个字符，并返回该字符在字符串中**第一次**出现的位置。

strchrr()函数 用于查找在参数 **str** 所指向的字符串中搜索**最后一次**出现字符 **c**（一个无符号字符）的位置。

声明

```
char *strchr(const char *str, int c)
char *strrchr(const char *str, int c)
```

参数

- **str** -- 要查找的字符串。
- **c** -- 要查找的字符。

返回值

如果在字符串 str 中找到字符 c，则函数返回指向该字符的指针，如果未找到该字符则返回 NULL。

实例

下面的实例演示了 strrchr() 函数的用法。

```
#include <stdio.h>
#include <string.h>

int main ()
{
   int len;
   const char str[] = "https://www.runoob.com";
   const char ch = '.';
   char *ret;

   ret = strrchr(str, ch);

   printf("|%c| 之后的字符串是 - |%s|\n", ch, ret);

   return(0);
}
```

让我们编译并运行上面的程序，这将产生以下结果：

```
|.| 之后的字符串是 - |.com|
```

## **9.strspn/strcspn**

描述

C 库函数 **size_t strspn(const char \*str1, const char \*str2)** 检索字符串 **str1** 中第一个不在字符串 **str2** 中出现的字符下标（实际就是返回两个字符串匹配的长度）。

C 库函数 **size_t strcspn(const char \*str1, const char \*str2)** 检索字符串 **str1** 开头连续有几个字符都不含字符串 **str2** 中的字符。

声明

```
size_t strspn(const char *str1, const char *str2)

size_t strcspn(const char *str1, const char *str2)
```

参数

- **str1** -- 要被检索的 C 字符串。
- **str2** -- 该字符串包含了要在 str1 中进行匹配的字符列表。

返回值

strspn()函数返回 str1 中第一个不在字符串 str2 中出现的字符下标。

strcspn()函数返回 str1 开头连续都不含字符串 str2 中字符的字符数。

实例

下面的实例演示了 strcspn() 函数的用法。

```
#include <stdio.h>
#include <string.h>


int main ()
{
   int len;
   const char str1[] = "ABCDEF4960910";
   const char str2[] = "013";

   len = strcspn(str1, str2);

   printf("第一个匹配的字符是在 %d\n", len + 1);
   
   return(0);
}
```

让我们编译并运行上面的程序，这将产生以下结果：

```
第一个匹配的字符是在 10
```

## **10.strstr**

描述

C 库函数 **char \*strstr(const char \*haystack, const char \*needle)** 在字符串 **haystack** 中查找第一次出现字符串 **needle** 的位置，不包含终止符 '\0'。

声明

下面是 strstr() 函数的声明。

```
char *strstr(const char *haystack, const char *needle)
```

参数

- **haystack** -- 要被检索的 C 字符串。
- **needle** -- 在 haystack 字符串内要搜索的小字符串。

返回值

该函数返回在 haystack 中第一次出现 needle 字符串的位置，如果未找到则返回 null。

实例

```
#include <stdio.h>
#include <string.h>

int main()
{
   const char haystack[20] = "RUNOOB";
   const char needle[10] = "NOOB";
   char *ret;

   ret = strstr(haystack, needle);

   printf("子字符串是： %s\n", ret);

   return(0);
}
```

让我们编译并运行上面的程序，这将产生以下结果：

```
子字符串是： NOOB
```

# 二，文件流函数

关于文件和及其函数的相关概念可参考以下文章：

[C语言文件流(字节流) IO 操作(二) —— 初识“流”以及文件的顺序读写（fgetc / fgets / fscanf / fread ）_c语言流-CSDN博客](https://blog.csdn.net/challenglistic/article/details/127524074)

[【C语言】计算机中的流和文件概述（文件的概念及打开关闭）_计算机中流-CSDN博客](https://blog.csdn.net/Jacky_Feng/article/details/109247048)

## **1.scanf_s**

需要的参数比scanf()多一个，需要指定输入变量的大小，例如：

```
scanf_s("%s", arr1, sizeof(arr1));
```



## **2.fopen_s/fclose**

描述

C 库函数 **FILE \*fopen(const char \*filename, const char \*mode)** 使用给定的模式 **mode** 打开 **filename** 所指向的文件。

C 库函数 **int fclose(FILE \*stream)** 关闭流 stream。**刷新所有的缓冲区**。

**ps.C语言在操作文件时会为文件在内存里创建文件缓存区，以提高磁盘的读写效率，因此每一次操作完文件时应调用fclose函数来清除缓存区，否则将会慢慢耗尽系统资源。**

声明

```
FILE *fopen(const char *filename, const char *mode)

errno_t fopen_s(FILE** pFile,const char *filename,const char *mode);

int fclose(FILE *stream)
```

参数

- **filename** -- 字符串，表示要打开的文件名称。
- **mode** -- 字符串，表示文件的访问模式，可以是以下表格中的值：
- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象指定了要被关闭的流。
- **pFile**--stream的地址

| 模式 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| "r"  | 打开一个用于读取的文件。该文件必须存在。                     |
| "w"  | 创建一个用于写入的空文件。如果文件名称与已存在的文件相同，则会删除已有文件的内容，文件被视为一个新的空文件。 |
| "a"  | 追加到一个文件。写操作向文件末尾追加数据。如果文件不存在，则创建文件。 |
| "r+" | 打开一个用于更新的文件，可读取也可写入。该文件必须存在。     |
| "w+" | 创建一个用于读写的空文件。                                   |
| "a+" | 打开一个用于读取和追加的文件。                               |

返回值

fopen函数返回一个 FILE 指针。否则返回 NULL，且设置**全局变量 errno** 来标识错误。

如果流成功关闭，fclose函数返回零。如果失败，则返回 **EOF**。

实例

```
#include <stdio.h>
#include <stdlib.h> 
int main() 
{   
	FILE * fp；
	fp = fopen ("file.txt", "w+");
    fprintf(fp, "%s %s %s %d", "We", "are", "in", 2014);
    fclose(fp);
    return(0); 
    }
```

让我们编译并运行上面的程序，这将创建一个带有一下内容的文件 **file.txt**：

```
We are in 2014
```

现在让我们使用下面的程序查看上面文件的内容：

```
#include <stdio.h>

int main ()
{
   FILE *fp;
   int c;
  
   fp = fopen("file.txt","r");
   while(1)
   {
      c = fgetc(fp);
      if( feof(fp) )
      { 
          break ;
      }
      printf("%c", c);
   }
   fclose(fp);
   return(0);
}
```

## **3.fgetc/fgets**

描述

C 库函数 **int fgetc(FILE \*stream)** 从指定的流 stream 获取下一个字符（一个无符号字符），并把位置标识符往前移动。

C 库函数 **char \*fgets(char \*str, int n, FILE \*stream)** 从指定的流 stream 读取一行，并把它存储在 **str** 所指向的字符串内。当读取 **(n-1)** 个字符时，或者读取到换行符时，或者到达文件末尾时，它会停止，具体视情况而定。

声明

```
int fgetc(FILE *stream)

char *fgets(char *str, int n, FILE *stream)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了要在上面执行操作的流。
- **str** -- 这是指向一个字符数组的指针，该数组存储了要读取的字符串。
- **n** -- 这是要读取的最大字符数（包括最后的空字符）。通常是使用以 str 传递的数组长度。

返回值

fgetc函数以无符号 char 强制转换为 int 的形式返回读取的字符，如果到达文件末尾或发生读错误，则返回 EOF。

如果成功，fgets函数返回相同的 str 参数。如果到达文件末尾或者没有读取到任何字符，str 的内容保持不变，并返回一个空指针。如果发生错误，返回一个空指针。

实例

下面的实例演示了两个函数的用法。

```
#include <stdio.h>

int main ()
{
   FILE *fp;
   int c;
   int n = 0;
  
   fp = fopen("file.txt","r");
   if(fp == NULL) 
   {
      perror("打开文件时发生错误");
      return(-1);
   }
   do
   {
      c = fgetc(fp);
      if( feof(fp) )
      {
          break ;
      }
      printf("%c", c);
   }while(1);
	rewind(fp);
	 if( fgets (str, 60, fp)!=NULL ) {
      /* 向标准输出 stdout 写入内容 */
      puts(str);
   }
   fclose(fp);
   return(0);
}
```

假设我们有一个文本文件 **file.txt**，它的内容如下。文件将作为实例中的输入：

```
We are in 2014
We are in 2014
```

## **4.fputc/fputs**

描述

C 库函数 **int fputc(int char, FILE \*stream)** 把参数 **char** 指定的字符（一个无符号字符）写入到指定的流 stream 中，并把位置标识符往前移动。

C 库函数 **int fputs(const char \*str, FILE \*stream)** 把字符串写入到指定的流 stream 中，但不包括空字符。

声明

```
int fputc(int char, FILE *stream)

int fputs(const char *str, FILE *stream)
```

参数

- **char** -- 这是要被写入的字符。该字符以其对应的 int 值进行传递。
- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了要被写入字符的流。
- **str** -- 这是一个数组，包含了要写入的以空字符终止的字符序列。

返回值

fputc函数如果没有发生错误，则返回被写入的字符。如果发生错误，则返回 EOF，并设置错误标识符。

fputs函数返回一个非负值，如果发生错误则返回 EOF。

## **5.ftell**

描述

C 库函数 **long int ftell(FILE \*stream)** 返回给定流 stream 的当前文件位置。

获取文件的当前指针位置相对于文件首地址的偏移字节数（可用该函数计算文件大小） 。

声明

下面是 ftell() 函数的声明。

```
long int ftell(FILE *stream)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。

返回值

该函数返回位置标识符的当前值。如果发生错误，则返回 -1L，全局变量 errno 被设置为一个正值。

实例

下面的实例演示了 ftell() 函数计算文件大小的用法。

```
#include <stdio.h>

int main ()
{
   FILE *fp;
   int len;

   fp = fopen("file.txt", "r");
   if( fp == NULL ) 
   {
      perror ("打开文件错误");
      return(-1);
   }
   fseek(fp, 0, SEEK_END);

   len = ftell(fp);
   fclose(fp);

   printf("file.txt 的总大小 = %d 字节\n", len);
   
   return(0);
}
```

假设我们有一个文本文件 **file.txt**，它的内容如下：

```
This is runoob.com
```

让我们编译并运行上面的程序，如果文件内容如上所示，这将产生以下结果，否则会根据文件内容给出不同的结果：

```
file.txt 的总大小 = 19 字节
```

## **6.rewind**

描述

C 库函数 **void rewind(FILE \*stream)** 设置文件位置为给定流 **stream** 的文件的开头。

声明

下面是 rewind() 函数的声明。

```
void rewind(FILE *stream)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。

返回值

该函数不返回任何值。

## **7.fseek**

描述

C 库函数 **int fseek(FILE \*stream, long int offset, int whence)** 设置流 **stream** 的文件位置为给定的偏移 **offset**，参数 offset 意味着从给定的 **whence** 位置查找的字节数。

声明

下面是 fseek() 函数的声明。

```
int fseek(FILE *stream, long int offset, int whence)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。
- **offset** -- 这是相对 whence 的偏移量，以字节为单位。
- **whence** -- 这是表示开始添加偏移 offset 的位置。它一般指定为下列常量之一：

| 常量     | 描述               |
| :------- | :----------------- |
| SEEK_SET | 文件的开头         |
| SEEK_CUR | 文件指针的当前位置 |
| SEEK_END | 文件的末尾         |

返回值

如果成功，则该函数返回零，否则返回非零值。

## 8.fscanf

描述

C 库函数 **int fscanf(FILE \*stream, const char \*format, ...)** 从流 stream 读取格式化输入。（将文件中的数据格式化输入到缓冲区）

声明

下面是 fscanf() 函数的声明。

```
int fscanf(FILE *stream, const char *format, ...)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。
- **format** -- 这是 C 字符串，包含了以下各项中的一个或多个：*空格字符、非空格字符* 和 *format 说明符*。

返回值

如果成功，该函数返回成功匹配和赋值的个数。如果到达文件末尾或发生读错误，则返回 EOF。

实例

下面的实例演示了 fscanf() 函数的用法。

```
#include <stdio.h>
#include <stdlib.h>


int main()
{
   char str1[10], str2[10], str3[10];
   int year;
   FILE * fp;

   fp = fopen ("file.txt", "w+");
   fputs("We are in 2014", fp);
   
   rewind(fp);
   fscanf(fp, "%s %s %s %d", str1, str2, str3, &year);
   
   printf("Read String1 |%s|\n", str1 );
   printf("Read String2 |%s|\n", str2 );
   printf("Read String3 |%s|\n", str3 );
   printf("Read Integer |%d|\n", year );

   fclose(fp);
   
   return(0);
}
```

让我们编译并运行上面的程序，这将产生以下结果：

```
Read String1 |We|
Read String2 |are|
Read String3 |in|
Read Integer |2014|
```

ps.fscanf_s函数也要多一个参数指定变量位宽，

详见：[你真的会用C语言的fscanf_s吗_fscanf %s-CSDN博客](https://blog.csdn.net/apple_52109766/article/details/118084359)

## **9.fprinf**

描述

C 库函数 **int fprintf(FILE \*stream, const char \*format, ...)** 发送格式化输出到流 stream 中。

声明

下面是 fprintf() 函数的声明。

```
int fprintf(FILE *stream, const char *format, ...)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。
- **format** -- 这是 C 字符串，包含了要被写入到流 stream 中的文本。它可以包含嵌入的 format 标签，format 标签可被随后的附加参数中指定的值替换，并按需求进行格式化。

返回值

如果成功，则返回写入的字符总数，否则返回一个负数。

实例

```
#include <stdio.h>
#include <stdlib.h>

int main()
{
  FILE * fp;

  fp = fopen ("file.txt", "w+");
  fprintf(fp, "%s %s %s %d", "We", "are", "in", 2014);

  fclose(fp);

  return(0);
}
```

让我们编译并运行上面的程序，这将创建文件 **file.txt**，它的内容如下：

```
We are in 2014
```

## **10.ferror**

描述

C 库函数 **int ferror(FILE \*stream)** 测试给定流 stream 的错误标识符。

声明

下面是 ferror() 函数的声明。

```
int ferror(FILE *stream)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。

返回值

如果设置了与流关联的错误标识符，该函数返回一个非零值，否则返回一个零值。

实例

下面的实例演示了 ferror() 函数的用法。

```
#include <stdio.h>

int main()
{
   FILE *fp;
   char c;

   fp = fopen("file.txt", "w");

   c = fgetc(fp);
   if( ferror(fp) )
   {
      printf("读取文件：file.txt 时发生错误\n");
   }
   clearerr(fp);
   fclose(fp);

   return(0);
}
```

假设我们有一个文本文件 **file.txt**，它是一个空文件。让我们编译并运行上面的程序，因为我们试图读取一个以只写模式打开的文件，这将产生以下结果。

```
读取文件：file.txt 时发生错误
```

## **11.feof**

描述

C 库函数 **int feof(FILE \*stream)** 测试给定流 stream 的文件结束标识符。

声明

下面是 feof() 函数的声明。

```
int feof(FILE *stream)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。

返回值

当设置了与流关联的文件结束标识符时，该函数返回一个非零值，否则返回零。

实例

下面的实例演示了 feof() 函数的用法。

```
#include <stdio.h>

int main ()
{
   FILE *fp;
   int c;
  
   fp = fopen("file.txt","r");
   if(fp == NULL) 
   {
      perror("打开文件时发生错误");
      return(-1);
   }
   while(1)
   {
      c = fgetc(fp);
      if( feof(fp) )
      { 
          break ;
      }
      printf("%c", c);
   }
   fclose(fp);
   return(0);
}
```

假设我们有一个文本文件 **file.txt**，它的内容如下所示。该文件将作为我们实例程序中的一个输入使用：

```
这里是 runoob.com
```

让我们编译并运行上面的程序，这将产生以下结果：

```
这里是 runoob.com
```

## **12.clearerr**

描述

C 库函数 **void clearerr(FILE \*stream)** 清除给定流 stream 的文件结束和错误标识符。

声明

下面是 clearerr() 函数的声明。

```
void clearerr(FILE *stream)
```

参数

- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象标识了流。

返回值

这不会失败，且不会设置外部变量 errno，但是如果它检测到它的参数不是一个有效的流，则返回 -1，并设置 errno 为 EBADF。

## **13.fread**/fwrite

描述

C 库函数 **size_t fread(void \*ptr, size_t size, size_t nmemb, FILE \*stream)** 从给定流 **stream** 读取数据到 **ptr** 所指向的数组中。

C 库函数 **size_t fwrite(const void \*ptr, size_t size, size_t nmemb, FILE \*stream)** 把 **ptr** 所指向的数组中的数据写入到给定流 **stream** 中。

**ps.这两个函数是以二进制的形式读写，不像上面的函数适用于所有流，仅适用于文件的读写。**

声明

```
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream)

size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream)
```

参数

- **ptr** -- 这是指向带有最小尺寸 *size\*nmemb* 字节的内存块的指针。
- **size** -- 这是要读取的每个元素的大小，以字节为单位。
- **nmemb** -- 这是元素的个数，每个元素的大小为 size 字节。
- **stream** -- 这是指向 FILE 对象的指针，该 FILE 对象指定了一个输入流。

返回值

fread读取的元素总数会以 size_t 对象返回，size_t 对象是一个整型数据类型。如果总数与 nmemb 参数不同，则可能发生了一个错误或者到达了文件末尾。

fwrite函数返回一个 size_t 对象，表示元素的总数，该对象是一个整型数据类型。如果该数字与 nmemb 参数不同，则会显示一个错误。

实例

```
#include <stdio.h>
#include <string.h>
int main()
{
  FILE *fp;
  char c[] = "This is runoob";
  char buffer[20];

  /* 打开文件用于读写 */
  fp = fopen("file.txt", "w+");

  /* 写入数据到文件 */
  fwrite(c, strlen(c) + 1, 1, fp);

  /* 查找文件的开头 */
  fseek(fp, 0, SEEK_SET);

  /* 读取并显示数据 */
  fread(buffer, strlen(c)+1, 1, fp);
  printf("%s**\n**", buffer);
  fclose(fp);

  return(0);
}
```

让我们编译并运行上面的程序，这将创建一个文件 **file.txt**，然后写入内容 *This is runoob*。接下来我们使用 **fseek()** 函数来重置写指针到文件的开头，文件内容如下所示：

```
This is runoob
```

