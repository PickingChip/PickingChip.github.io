

## Git：

### Git简介：

​	什么是Git？为什么用Git？使用Git有很多好处，让我们看看涛哥怎么讲：[为什么要用Git](https://flowus.cn/deadline039/share/6b386014-3c9a-45b0-afd2-8ae472510ea0)。虽然刚开始你只会觉得麻烦（好吧至少我是这样），但是母庸质疑熟练掌握后会给你的日常工作与团队合作带来巨大便利。

官方Git指南：[Git](https://git-scm.com/book/zh/v2)

### Git常用用法：

- #### Git 创建仓库

```bash
git init [directory]		#在本地创建一个Git仓库
git clone  [directory]       #将现存的远程仓库克隆到本地，可以选择不同协议（SSH,GIT,HTTP)
```

- #### Git 基本配置指令

```bash
git config --global user.name '你的用户名'
git config --global user.email '你的邮箱'	#配置用户名和邮箱地址方便远程提交
```

- #### Git三连

```bash
git add 文件名
#添加文件到缓存命令
#后跟‘.’表示将所有文件提交缓存，跟‘.c’表示将所有.c文件提交 

git commit -m'提交说明'
#将项目提交本地仓库，-m选项用来在后面添加提交说明，-am可以用来跳过add这一步

git push origin
#将本地仓库提交到远程仓库，第一次要自行设置远程仓库，之后就可以用origin代指远程仓库的地址
```

- #### Git状态查看

```bash
 git status				#查看仓库当前状态，如果有缓存和未提交的文件会有提示。
 
 git diff				#用来查看更新的详细信息。
```

- 尚未缓存的改动：`git diff`

- 查看已缓存的改动： `git diff --cached`

- 查看已缓存的与未缓存的所有改动：`git diff HEAD`

- 显示摘要而非整个 diff：`git diff --stat`

- #### Git文件操作

```bash
git reset HEAD <documents>			#取消缓存

git rm							  #删除命令

git mv							  #移动或重命名命令,命令用于移动或重命名一个文件、目录、软连接。

#如要将一个test.txt文件重命名为newtest.txt，则可以使用如下命令：

git mv test.txt newtest.txt

git checkout <documents>		#放弃未暂存文件的修改命令
```

- #### Git的分支管理

```bash
git branch				  #查看当前仓库所有分支，并会标记出当前分支

git branch (branchname)	   #创建分支

git checkout (branchname)  #切换分支

git merge	(branchname)   #合并分支命令,将目标分支合并到当前分支上

git branch -d (branchname)	#删除分支命令
```

- #### Git查看提交历史

```bash
git log					#命令查看
```

- –oneline ：查看历史记录的简洁版本
- –graph ：查看历史中什么时候出现了分支、合并
- –reverse ：逆向显示所有日志

- –author ：查找指定用户的提交日志

- –since、–before、 --until、–after： 指定筛选日期

- –no-merges ：选项以隐藏合并提交

- #### Git 远程仓库

```bash
git remote add  <website>	 #添加远程仓库

git remote					#查看当前的远程仓库

git fetch					#提取远程仓库的所有更新

git pull  <website>			 #提取远程仓仓库,并合并

git push					#推送到远程仓库

git remote rm				#删除远程仓库
```

