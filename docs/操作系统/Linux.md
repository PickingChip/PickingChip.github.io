> **一切皆文件**

### 前言

Linux是世界上最重要的操作系统之一。它完全开源，是全世界程序员智慧的结晶，几乎所有的服务器设备上运行的都是Linux操作系统。

### 发行版

### 系统结构

![Linux文件结构](.\Picture\Linux文件结构.png)

- /bin目录中存放的是可执行文件，和一些脚本，常用的命令就在这里。
- /dev目录中是设备文件，Linux将设备抽象成一个个文件进行管理
- /etc目录中存放的是系统配置文件，例如用户密码文件，apt换源配置文件，启动文件都在这里。
- /home目录就是用户的个人目录，所有用户的个人目录在这。
- /temp目录存放临时文件
- /usr目录曾经是用户目录但是后来被/home取代，现在存放的是系统文件。



### 基础概念：

**变量，全局变量，环境变量**

变量名 =“变量值” 设置局部变量尽在当前shell中有用

export 变量名 = “变量值” 设置全局变量父子shell中均可使用

printenv 输出环境变量

$PATH=$PATH:要添加的路径

永久添加可以在 /etc/bash.bashrc里添加

#### 链接：

软链接(符号链接 Symbolic links)：可以理解为创建快捷方式

```bash
ln -s 原文件名称 创建的链接名称
```

硬链接：可以理解为windows平台上的创建副本

```bash
ln 原文件名称 创建的链接名称
```

概括：硬链接创建的文件要和原文件在一个硬盘上，这两个文件的大小并没有区别（相当于创建了一个副本），而软链接则是又创建了一个类似快捷方式的文件，他们之间的链接可以跨越不同硬盘，因此一般使用软链接居多。

#### 进程

Linux中任务都是以进程的形式执行的，每一个任务都有一个进程号（PID：Process identifier）

**父子shell**：你可以同时打开多个shell它们属于不同的进程有着不同的PID属于并列关系，你也可以在shell中再打开一个shell这样他们之间就属于父shell和子shell的关系了。

**进程相关的命令**

```bash
ps 						#查看用户进程

top 					#产看当前所有进程

kill + PID 				 #结束进程命令 

kill -STOP PID			 #暂停进程

kill -CONT PID			 #将进程挂在后台

coproc 协程名字 {空格 命令；空格} 		#这个命令将任务挂载在子shell中（相当于创建了一个协作进程）
```

#### 挂载：

外接一个设备到电脑上都属于挂载（例如插入U盘），一般来说都是自动挂载，但是在Linux上外部设备会自动挂载在根目录的/media文件夹下。

mount 命令可以在别的路径下创建挂载

直接使用mount命令显示所有的挂载的设备

也可以使用 sudo fdisk -l命令显示当前所有挂载的设备详细信息

umount 命令可以删除挂载

**对于挂载概念的解释：**

Linux中的根目录以外的文件要想被访问，需要将其“关联”到根目录下的某个目录来实现，这种关联操作就是“挂载”，这个目录就是“挂载点”，解除次关联关系的过程称之为“卸载”。

因此当`Linux`设备上插入U盘或者有根目录以外的其它硬盘时，需要将其它存储设备挂载在某一目录下Linux才能与其建立联系访问之中的内容。举例来说，当你接入一块硬盘时在`/dev` 路径下会显示新添加的硬盘的名字`sdb1`，但是你不能直接通过这个路径访问硬盘中的内容，因为这个目录仅仅是显示系统上接入了哪些设备，你需要执行`mount`命令将硬盘挂载在你希望的路径下，才能正常访问其中的内容。

一般来说插入外部存储设备时，系统其实自动执行了 `mount `命令，将设备挂载在/media目录下，但是这只是临时的如果你想永久的挂载需要到`/etc/fstab`目录下修改配置文件。

df 显示现在所有挂载磁盘的使用情况 -h选项：显示大小的单位

du 显示目录下所有文件的大小 -h选项：同上

sort 可以对文件进行排序 -M选项可以对日志的月份排序

sao操作：du -sh * | sort -nr 该命令将当前文件夹下的文件按照文件大小逆序排列

grep 用于查找文件中匹配的部分

### 终端操作：

#### 光标移动的快捷键

- ctrl+a 光标移到最前面
- ctrl+e 光标移到最后面
- ctrl+u 删除光标之前的所有字符
- ctrl+t 光标前的字符后移
- ctrl+←→ 按照字母跳动
- ctrl +r 搜索用过的命令
- ctrl + k 光标之后的字符全部删除



cd !$ ->执行上一条命令的最后一个路径

命令后加上& 表示命令挂载在后台进行

命令；命令；命令 可以一次性输入多个命令并且会依次执行

（命令）命令将在子shell中进行

jobs命令查看当前有多少个后台进行的命令

ctrl + z 将当前前台正在执行的任务放到后台并暂停 可用fg + 进程号恢复执行

ctrl + d 将当前终端正在执行的命令结束

ctrl + c 强制中断当前任务

ctrl + \ 表示退出。

外部命令：需要独立创建进程的命令，如ps

内建命令：直接在shell的进程里执行的命令

alias -p查看别名

alias 命令=“别名”

#### 压缩&解压缩

.Z Unix上的上古压缩格式

用gzip压缩 后缀为.gzip

用zip压缩 后缀为.zip

用bzip2压缩 后缀为.bz2

Linux上压缩每次只能压缩一个文件，因此压缩多个文件前需要将多个文件打包成一个文件因此需要用到tar命令

tar -zcvf 压缩后的文件名.tar.gzip 要压缩的文件名

tar -zxvf 要解压的文件命 要解压到的路径

-z 表示使用gzip压缩

-c 表示创建一个压缩文档

-v 表示显示压缩过程

-f 表示要创建的档案名称S

-x 要解压文件

-j 表示用bzip2压缩

#### 安装软件

Linux中安装软件类似手机从应用中心安装软件一样，需要在包管理系统（pms）中安装下载

ubnatu使用apt命令进行下载

apt update 更新包管理系统的包

apt upgrate 更新已安装的软件包

apt intall 安装要安装的软件

apt remove 卸载已安装的软件

**修改软件安装的镜像源**

GUI的方法 可以在软件和更新里更改

CLI方法 可以在 /etc/apt/sources.list 文件中添加



### 常用命令

在Linux操作系统中绝大多数任务都是通过命令行来执行的，因此命令行的学习是Linux学习中很重要的一部分，这里记录一些常用命令。

命令行查询网站：[Linux命令搜索引擎](https://wangchujiang.com/linux-command/list.html)

`cd`命令：

```bash
cd directory	#切换目录命令，后跟想要切换的目录路径，可以是绝对路径也可以是相对于当前目录的相对路径
cd ~  			#回到home目录
cd -			#回到上一次切换前的目录下
```

`ls`命令：

```bash
ls directory	#显示制定路径下的存放的文件，不添加路径名默认显示当前路径下的文件，可添加下列选项得到想要的信息
ls -l                    # 以长格式显示当前目录中的文件和目录
ls -a                    # 显示当前目录中的所有文件和目录，包括隐藏文件
ls -lh                   # 以人类可读的方式显示当前目录中的文件和目录大小
ls -t                    # 按照修改时间排序显示当前目录中的文件和目录
ls -R                    # 递归显示当前目录中的所有文件和子目录
```

`touch,mkdir,rm,cp`命令：

```bash
touch filename	#创建一个新文件或者将已经存在的文件创建时间修改为当下时间
mkdir directory	#创建一个目录
rm filename	#删除一个文件或者目录
-i 删除前逐一询问确认。
-f 即使原档案属性设为唯读，亦直接删除，无需逐一确认。
-r 将目录及以下之档案亦逐一删除。
cp 源文件 目标文件	#复制文件或者目录
-r 或 -R：递归复制目录及其内容（用于复制目录）。
-i：交互模式，覆盖前提示用户确认。
-f：强制复制，覆盖目标文件而不提示。
-v：显示详细的复制过程（verbose）。
-p：保留文件的原始属性（如权限、时间戳等）。。
-l：创建硬链接而不是复制文件。
-s：创建符号链接（软链接）而不是复制文件。
```

`cat`命令：

```bash
cat  filename	#显示文件内容输出到终端
-n：#显示行号，会在输出的每一行前加上行号。
-b：#显示行号，但只对非空行进行编号。
-s：#压缩连续的空行，只显示一个空行。
-E：#在每一行的末尾显示 $ 符号。
-T：#将 Tab 字符显示为 ^I。
-v：#显示一些非打印字符。
```

`tail`命令：

```bash
tail fialname	#实时查看文件内容，默认显示文件最后十行
-f #循环读取
-q #不显示处理信息
-v #显示详细的处理信息
-c<数目> #显示的字节数
-n<行数> #显示文件的尾部 n 行内容 +n表示从正数第几行显示到结尾
--pid=PID #与-f合用,表示在进程ID,PID死掉之后结束
-q, --quiet, --silent #从不输出给出文件名的首部
-s, --sleep-interval=S #与-f合用,表示在每次反复的间隔休眠S秒
```

`grep`命令：

```bash
grep string file	#在文件中查找字符串或正则表达式
-i：#忽略大小写进行匹配。
-v：#反向查找，只打印不匹配的行。
-n：#显示匹配行的行号。
-r：#递归查找子目录中的文件。
-l：#只打印匹配的文件名。
-c：#只打印匹配的行数。
```

`ps`命令：

```bash
ps [options]	#默认只会显示与当前终端会话关联的进程列表
-A #列出所有的进程
-w	#显示加宽可以显示较多的资讯
-f	#显示完整格式
-aux #显示所有包含其他使用者的进程
#-aux的输出格式：USER	 PID	 %CPU 	%MEM	 VSZ	 RSS 	TTY 	STAT 	START	 TIME 	COMMAND
#通常配合管道符查找指定的进程
ps aux | grep PID
```

`chmod`命令：

```bash
chmod 权限 filename	#修改文件权限
-R #对目前目录下的所有文件与子目录进行相同的权限变更(即以递归的方式逐个变更)
#u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是
#+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
```

`mount`命令：

```bash
mount 要挂载的文件/硬盘 挂载到的目录	#将硬盘挂载在你想挂载的目录
-o ro：用唯读模式挂上。
-o rw：用可读写模式挂上。
```

查看命令：

```bash
fdisk -l	#显示所有的分区，通过不同选项能够对分区进行编辑
lsblk		#显示所有块设备
lscpu		#显示CPU信息
free -h		#显示内存的使用情况
lsusb 		#显示所有连接在USB总线上的设备信息
```

`su&sudo`命令：

```bash
sudo command	#一管理以管理员权限执行命令
sudo -i			#切换root用户
su usernamen	#切换命令一般是切换到root用户
exit			#退出root用户，或者CTRL+D
```

