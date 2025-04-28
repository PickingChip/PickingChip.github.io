记录一下`Python`学习：

### 基础语法

Python语法：[Python基础](https://www.cnblogs.com/vamei/archive/2012/05/28/2521650.html)

#### 1.`range()` 函数

`range()` 函数返回的是一个可迭代的对象，因此需要通过循环或转换为列表等方式才能看到具体的值。

```python
print(list(range(5)))  		# 输出: [0, 1, 2, 3, 4]  
print(range(5))		   		# 输出: range(0, 5)
```

#### 2.`**kargs`表示可变参

```python
def print_info(**kwargs):  
    for key, value in kwargs.items():  
        print(f"{key}: {value}")  

# 调用函数时传递关键字参数  
print_info(name="Alice", age=30, city="New York")  
```

#### 3.`try..expect..finally`做异常处理

#### 4.`with`上下文管理

`with`做上下文管理是为了保证代码块在执行过程中发生意外也能保证资源的正常释放。

```python
#with的语法结构
with context_expression [as target(s)]:
    with-body
```

`with`后面的对象需要满足上下文管理器协议，也就是包含类中要包含下面两个方法：

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

#### 5.if `__name__`== `__main__`:



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

`urlib`是`python`网络请求的标准库，功能全面但是使用复杂，`requests`是一个第三方的`python`常用的HTTP请求库使用方便。

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

### GUI

Tkinter

### 程序打包

