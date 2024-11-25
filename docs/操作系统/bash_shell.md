学习网站：

[快速学习Bash - Vamei - 博客园](https://www.cnblogs.com/vamei/p/8151169.html)

[Bash 脚本教程 – 面向初学者的 Linux Shell 脚本和命令行](https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/)

[Linux 定时任务（超详细） - 犬小哈教程](https://www.quanxiaoha.com/linux-command/linux-cron.html)

vscode插件：

- shellman

- shellcheck

  

#### bash基础：

一些命令

```shell
uname -a    #产看有关本机的设置
date        #查看日期   
which       #查找命令文件所在位置
read        #再终端中读取一行
free -h     #显示内存空间
pwd         #显示当前终端所在目录位置
```



变量有以下的使用方式

```shell
$var = value				#通过=号进行赋值
$word = "happy new year"	#有空格用双引号或者单引号引起来
$echo $var
$echo '$var is 5'			#$var is 5 单引号不会显示变量的值
$echo "$var is 5"			#value is 5 双引号会将变量替换为它的值
$echo ${var}able			#${}将变量和文本区分防止混淆
```



通过$(())语法来进行数值运算。在双括号中你可以放入整数的加减乘除表达式。Bash会对其中的内容进行数值运算，否则bash只会把表达式当作字符串。

```shell
$echo $((2 + (5*2)))	#12
$echo 2+(5*2)			#2+(5*2)
```



C程序主函数都有一个返回值，运行了程序后，可以通过$?变量来获知返回码。

```shell
$gcc foo.c
$./a.out
$echo $?
```



#### bash脚本：

bash脚本是一个命令行组成的文本文件，后缀为.sh，第一行固定为：`#!/bin/bash` ，这一行通常被称为`shebang`的标记（也称为哈希邦行），用于为脚本指定解释器，基本格式为`#!<解释器路径>`。



**脚本的运行方式：**	

- `sh run_all.sh`
- `bash run_all.sh`
- `./run_all.sh`



**脚本参数：**

再调用脚本的后面可以追加参数，参数以空格区分，在脚本中参数以便量的形式存储。

- $0	# 注意这个变量中一般包含的是命令本身
- $1    #参数1
- $2    #参数2，以此类推

**脚本返回值：**

bash脚本通过`exit <num>`来提供返回值，同时脚本执行到这个命令时就会结束，脚本是否有返回值是可选的，没有返回值也能执行，但是如果想知道脚本在什么部分执行结束，就可以给不同的结束情况设置不同的返回值，然后在结束时访问$?来查看脚本结束的状态。

**脚本函数：**

脚本中也可以编写函数，格式如下：

```shell
function 函数名()
{
	命令1
	命令2
	命令3
	.
	.
} #函数声明，关键字function也可以不加

函数名 参数1 参数2 ... #函数调用，参数再函数内的调用也是使用$1,$2..变量

```

一个脚本中声明的函数也可以通过`source`命令被其它函数调用

```shell
#脚本一: cal.sh
#!/bin/bash
function sum()
{
	echo $(($1+$2))
}
echo "计算完成"

#脚本二: main.sh
#!/bin/bash
source cal.sh #通过此命令可以调用其他脚本中定义的函数
sum 1 2
exti 0
```



**逻辑判断:**

bash脚本中使用`test`命令来进行逻辑判断,用法如下:

```shell
test 逻辑表达式;echo $?
#如果逻辑为假返回值为1,逻辑为真返回0.
```

常见用法:

```shell
test 3 -gt 2; echo $?		#大于
test 3 -lt 2; echo $?		#小于
test 3 -eq 3; echo $?		#等于
test 3 -ne 1; echo $? 		#不等于
test 5 -ge 2; echo $? 		#大于等于
test 3 -le 1; echo $? 		#小于等于

#检查字符串是否相等
test abc = abx; echo $? 
test abc != abx; echo $?

#Bash还可以对文件的状态进行逻辑判断：

test –e a.out; echo $? 		#检查一个文件是否存在
test –f file.txt; echo $?	#检查一个文件是否存在，而且是普通文件
test –d myfiles; echo $?	#检查一个文件是否存在，而且是目录文件： 
test –L a.out; echo $? 		#检查一个文件是否存在，而且是软连接
test –r file.txt; echo $? 	#检查一个文件是否可读
test –w file.txt; echo $? 	#检查一个文件是否可写
test –x file.txt; echo $? 	#检查一个文件是否可执行 

#逻辑符
! expression				#逻辑非
expression1 –a expression2	#逻辑与
expression1 –o expression2	#逻辑或
```



**选择结构:**

选择结构和C语言一样一般由if语句和case语句两种形式:

if结构:

```shell
if[逻辑表达式]
then
	命令1
	命令2
elif[逻辑表达式]
then
	命令3
	命令4
else
	命令5
	命令6
fi
#逻辑表达式后面可以选择加;也可以不加
```

case结构:

```shell
case $变量名 in
文本1)
命令....
;;
文本2)
命令....
;;
*)
exit 0
;;
esac

#文本中还可以包含通配符
* 任意文本 *) Xyz, 123, …
? 任意一个字符 a?c) abc, axc, …
[] 范围内一个字符 [1-5][b-d]) 2b, 3d, …
上述例子中的最后一个文本就是通配符*，如果没有任何满足的文本
```



**循环结构：**

可以使用`while`,`for`和`do..while`语句

while语句：

```shell
while[逻辑表达式]	#当表达式为真的时候循环执行do和done之间的内容
do
	命令
done

```

for循环：

```shell
for 变量名 in 变量值1 变量值2 变量值3....
do
	命令
done
#变量会依次取值1，值2....每取一次值就执行一遍循环直到取尽所有值循环结束

#for循环常搭配seq命令使用

seq 1 2 10
#从1开始以步长为2输出数字直到10

eg.
for number in `seq 1 1 100`
do
  total=$(( $total + $number ))
done

```



do while语句：

```shell
while :
do
  if [ $number -gt 100 ]
  then
    break
  fi

  total=$(( $total + $number ))
  number=$(($number + 1))
done
```



#### **添加cron任务：**

cron是Linux平台下一个用于定时执行任务的服务，使用crontab来管理任务，有一个crontab文件记录任务。



```shell
crontab -l	#查看当前用户的定时任务
crontab -e  #打开一个文件，编辑定时任务，每行表示一个任务
#格式： 分钟 小时 日期 月份 星期 命令或者脚本
eg.
0 3 * * * /path/to/your/script.sh
#表示每天三点执行脚本的定时任务
crontab -r	#删除当前用户所有定时任务


```

 **定时任务时间格式说明**

- `*`: 表示所有可能的值。例如，`* * * * *` 表示每分钟都运行一次。
- `*/n`: 表示每 n 个时间单位运行一次。例如，`*/5 * * * *` 表示每 5 分钟运行一次。
- `n`: 表示特定的时间单位。例如，`30 3 * * 1` 表示在星期一的凌晨 3 点 30 分执行任务。



同学们我们从第九周到第十二周每周二晚上的C语言实验课不再上课，相应的我们需要在每周周一到周五下午五点半之前的时间段内抽出两节课的时间进行补课和作业检查。现在进行投票选择合适的上课时间。



git remote add origin https://gitee.com/jane082510086/ict-data





使用命令`git config --global credential.helper store`然后再push一次之后就不用每次都进行身份认证了。



