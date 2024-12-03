### **什么是Qt：**

​	Qt是一个跨平台的程序开发框架，使用C++作为开发语言开发GUI程序。（框架就是一个提供开发某一类工程方法和标准的软件）帮你逃离“黑框程序”走进彩色的世界，主要就是用来写上位机，和一些PC端程序（诸如WPS，网易云，有道翻译都是使用QT编写的）。

### **Qt框架简介：**

Qt程序主要有以下三个部分组成：

- `main`文件：
- `.ui`文件：QtCreater中可以在`.ui`文件中进行GUI界面进行页面设计·

- `.h文件`：

### **信号和槽：**

信号（signals ）：对图形界面进行操作时希望它能得到对应操作的反馈，这就需要为对应操作声明信号。

槽（slots）：当图形对象收到反馈信号时，我们希望它进行指定的操作，这就需要编写对应的槽函数。

连接：为了使信号和它的槽函数相对应，需要在构造函数中使用`connect`函数将两者连接起来。



### **帮助文档：**

Qt中帮助文档的使用十分重要，里面可以各种类和方法的使用方法。

### **软件打包：**

因为Qt编写的程序有许多依赖的动态库，单个的可执行程序无法直接执行，因此就需要将需所需要的库打包好一并发送才能运行。

release构建可执行程序，创建一个文件夹将可执行程序解压到该文件夹下，然后在终端中使用以下命令加载所需要的环境：

```shell
windeployqt <文件夹目录>
```

ps.如果程序执行需要相应的文件，如图片可以在文件编写时采用相对路径，并将文件复制到错创建的文件夹下。



### **一些示例：**

短整型转换成字符串

```c++
QString::number(num);
```



#### QT定时器：

Qobject: 

Qtimer:

 

#### 文件操作：

文件的打开

```c++
//需要#include <QFileDialog>

QString fileName = QFileDialog::getOpenFileName(this, "选择一个文件",QCoreApplication::applicationFilePath()/*获取当前路径*/,"*.cpp");
if(fileName.isEmpty())
{
	QMessageBox::warning(this, "警告", "请选择一个文件");
}
else
{
	QFile file(fileName);//创建一个文件对象
	file.open(QIODevice::ReadOnly);//打开方式
	QByteArray ba = file.readAll();//读取文件内容
	ui->textEdit->setText(QString(ba));//放入文本框
	file.close();
}

```

文件的保存：

```c++
//需要#include <QFileDialog>
QString fileName = QFileDialog::getOpenFileName(this, "选择一个文件",QCoreApplication::applicationFilePath()/*获取当前路径*/);
if(fileName.isEmpty())
{
    QMessageBox::warning(this,"警告","请选择一个文件夹");
}
else
{
	QFile file(fileName);//创建一个文件对象
	file.open(QIODevice::WriteOnly);//打开方式
	QByteArray ba;
	ba.append(ui->textEdit->toPlainText());
    file.write(ba);
	file.close();
}
```



#### QT事件：

QT中的事件的类型有很多，例如键盘上按下的按钮，鼠标的点击都属于一个事件，这些事件都继承于`QEvent`这个抽象的类。 当你需要检测某一个事件的时候你需要重写对应事件的虚函数。

鼠标点击事件：

```c++
//#include <QMouseEvent>

void MainWindow::mousePressEvent(QMouseEvent *m)
{
    QPoint pt = m->pos();
    qDebug() << pt;
    if (m->button() == Qt::LeftButton)
    {
        qDebug() << "左键被按下";//当时事件发生时在控制台输出信息
    }
    eelse if (m->button() == Qt::RightButton)
    {
        qDebug() << "右键被按下";
    }
}
```



### 连接服务器：

需要在工程文件添加`network`,使用qmake构建工程才会有。

网络连接需要创建套接字（socket）对象才能进行。

```c++
QT		+= core gui network
```

需要输入服务器ip和端口号：

```c++
//#include <QTcpSocktet>
```







 
