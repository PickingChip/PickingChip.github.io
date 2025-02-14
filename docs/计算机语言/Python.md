记录一下`Python`学习：

### 基础语法：

Python语法：[Python基础](https://www.cnblogs.com/vamei/archive/2012/05/28/2521650.html)

需要注意的细节：

1.`range()` 函数返回的是一个可迭代的对象，因此需要通过循环或转换为列表等方式才能看到具体的值。

```python
print(list(range(5)))  		# 输出: [0, 1, 2, 3, 4]  
print(range(5))		   		# 输出: range(0, 5)
```



### Anconda使用：

下载：[清华镜像源下载](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/?C=M&O=D)

常见用法：

```shell
conda init			#启动conda
conda info [-e]		#查看当前（所有）环境信息
conda creat -p pa't -n envname python=xx #(在指定位置)创建新的虚拟环境并指定python版本
conda activate envname 		#切换环境
conda remove -n envname --all #移除虚拟环境
set CONDA_FORCE_32BIT=1 # 切换到32位
set CONDA_FORCE_32BIT=0 # 切换到64位
```

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

