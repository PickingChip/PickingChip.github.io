### 什么是Git？为什么用Git？

​	Git是一个分布式版本控制软件，是Linux之父为了维护Linux内核开发，花费十天时间开发的。使用Git能够方便我们在对项目不断更改时记录不同的版本，同时也有助于团队内部协作开发。 Git使用命令行进行操作，虽然在不熟悉的时候会觉得好麻烦（好吧至少我是这样），但是熟练掌握后会给你的日常工作与团队合作带来巨大便利。

让我们看看DDL怎么讲：[为什么要用Git](https://flowus.cn/deadline039/share/6b386014-3c9a-45b0-afd2-8ae472510ea0)。

官方指南：[Git](https://git-scm.com/book/zh/v2)

### Git常用用法

- #### Git 创建仓库

```bash
git init [directory]		#在本地创建一个Git仓库
git clone  [directory]       #将现存的远程仓库克隆到本地，可以选择不同协议（SSH,GIT,HTTP)
```

- #### Git 基本配置

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
 
 git log				#用来查看项目提交的版本有哪些
 
 git relog				#查看HEAD的变化历史
```

- #### Git文件操作

```bash
git reset HEAD <documents>			#取消缓存

git rm							  #删除命令

git mv							  #移动或重命名命令,命令用于移动或重命名一个文件、目录、软连接。

#如要将一个test.txt文件重命名为newtest.txt，则可以使用如下命令：

git mv test.txt newtest.txt

git checkout <documents>		#放弃未暂存文件的修改命令
```

- #### Git版本管理

```bash
git checkout <commit_hash>	#查看对应版本的哈希值之后切换到对应版本

git revert <commit_hash>	#撤销指定的的提交，但是会产生一个新的提交记录这个更改

git reset <commit_hash>		#永久的退回到指定的提交版本之后的版本
					 	  #--hard参数指定硬重置会放弃所有的提交
					 	  #--soft参数指定软重置会将之后的提交放在暂存区
```

- #### Git的分支管理

```bash
git branch				  #查看当前仓库所有分支，并会标记出当前分支

git branch (branchname)	   #创建分支

git checkout (branchname)  #切换分支

git merge	(branchname)   #合并分支命令,将目标分支合并到当前分支上，如果存在冲突需要手动打开编辑器，处理冲突然后进行分支合并。

git branch -d (branchname)	#删除分支命令
```

- #### Git 远程仓库

```bash
git remote add origin <website>	 #添加远程仓库

git remote	 <website>		#查看当前的远程仓库 -v查看网址

git fetch	 <website>		#提取远程仓库的所有更新

git pull  <website>			 #提取远程仓仓库,并自动合并

git push <website>			#推送到远程仓库

git remote rm				#删除远程仓库
```

- #### Git设置代理

```shell
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
```



### VS Code中的Git操作

`VS Code`提供了图形化的`Git`模块来方便管理程序开发版本。：[VS Code使用Git可视化管理源代码教程](https://www.cnblogs.com/lgx5/p/18577380)
