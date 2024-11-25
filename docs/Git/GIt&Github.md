

### Git：

Git简介：

​	为什么用Git？使用Git有很多好处，虽然刚开始你只会觉得麻烦（好吧至少我是这样），但是母庸质疑熟练掌握后会给你的日常工作与团队合作带来巨大便利。让我们看看涛哥怎么讲：[为什么要用Git](https://flowus.cn/deadline039/share/6b386014-3c9a-45b0-afd2-8ae472510ea0)

官方Git指南：[Git](https://git-scm.com/book/zh/v2)

Git常用用法

- Git 创建仓库

  ```bash
  git init [directory]
  git clone  [directory]       #可以选择不同协议（SSH,GIT,HTTP)
  ```

- Git 基本配置指令

  ```bash
  git config --global user.name '你的用户名'
  git config --global user.email '你的邮箱'	#配置用户名和邮箱地址方便远程提交
  ```

  

- Git工作常用命令

  ```bash
  git add 文件名
  #添加文件到缓存命令
  #后跟‘.’表示将所有文件提交缓存，跟‘.c’表示将所有.c文件提交 
  
  git commit -m'提交说明'
  #将项目提交本地仓库，-m选项用来在后面添加提交说明
         
  ```

  

```
    - 4.**

    - 5. **git status**：查看文件的状态命令

    - 6.**git diff**：查看更新的详细信息命令

    执行 git diff 来查看更新的详细信息，与git status不同的是，git status只显示更新的状态，而 git diff 可以显示已写入缓存与已修改但尚未写入缓存的改动的区别具体的详细信息。

    尚未缓存的改动：git diff

    查看已缓存的改动： git diff --cached

    查看已缓存的与未缓存的所有改动：git diff HEAD

    显示摘要而非整个 diff：git diff --stat

    - 7.**git commit**：提交命令

    ```Plain Text
git commit -m "第一次版本提交"
//在后面加-m选项，以在命令行中提供提交注释
git commit -am "第一次版本提交"
//想跳过add这一步可以直接使用 -a选项
- 8.**git reset HEAD**：取消缓存命令

git reset HEAD 命令用于取消已缓存的内容，如我们要取消已提交的test.txt文件，可以如下使用：

```Plain Text
```

git reset HEAD test.txt

```
    - 9.**git rm**：删除命令

    - 10.**git mv**：移动或重命名命令

      git mv 命令用于移动或重命名一个文件、目录、软连接，如要将一个test.txt文件重命名为newtest.txt，则可以使用如下命令：

    ```Plain Text
git mv test.txt newtest.txt
- 11.**git checkout – <文件名>**放弃未暂存文件的修改命令
```

- Git的分支管理

  - **git branch**：查看分支命令
  - **git branch (branchname)**：创建分支命令
  - **git checkout (branchname)**：切换分支命令
  - **git merge**：合并分支命令
  - **git branch -d (branchname)**：删除分支命令

- Git查看提交历史

  **git log** 命令查看

  –oneline ：查看历史记录的简洁版本

  –graph ：查看历史中什么时候出现了分支、合并

  –reverse ：逆向显示所有日志

  –author ：查找指定用户的提交日志

  –since、–before、 --until、–after： 指定筛选日期

  –no-merges ：选项以隐藏合并提交

- Git 远程仓库

  - **git remote add**：添加远程仓库
  - **git remote**：查看当前的远程仓库
  - **git fetch**、**git pull**：提取远程仓仓库
  - **git push**：推送到远程仓库
  - **git remote rm**：删除远程仓库

常用命令：

​		创建设置仓库

​		提交/查看版本

​		分支管理

​		远程仓库

​	vscode上的Git

Github:

​	获取开源资料	

​	远程仓库创建

​	远程仓库操作

​	