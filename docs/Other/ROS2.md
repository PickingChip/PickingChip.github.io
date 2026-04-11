![jazzy-small](./Picture/jazzy-small.png)

rcl 是 ROS Client Library

rqt 是 ROS Qt-based GUI Tool

### 工作区

ROS 工作区结构如下：

```bash
workspace_folder/
├── src/               # 存放所有软件包源代码。
│   ├── package1/
│   ├── package2/
│   └── ...
├── build/             # 存放构建过程中的中间文件和缓存。
├── install/           # 编译生成的可执行文件，库，脚本在这里。
└── log/               # 日志文件存放处。
```

使用`colcon build`命令会构建工作区中所有的软件包，使用`key--packages-select pkg_name`可以指定构建软件包，使用`python`虚拟环境调时用`python -m colcon build`命令构建。创建虚拟环境时`include-system-site-packages`选项设置为`true`，用于继承 ros 原生 python 的 ros 库。

构建完成完成之后使用`source install/setup.bash`修改环境变量`AMENT_PREFIX_PATH`来使ros能够找到软件包。

### 软件包

软件包相关命令

```bash
#构建python软件包
ros2 pkg create pkg_name --build-type python --license Apache-2.0
#构建C++软件包
ros2 pkg create pkg_name --build-type ament_cmake --license Apache-2.0
#运行软件包的指定节点
ros2 run pkg_name node_name 
```

python软件包结构

```python
my_python_package/          # 功能包根目录。
├── package.xml             # 包描述文件，包含包的结构，许可证，依赖等信息。
├── setup.py                # 使用setuptools进行打包，setuptools根据这个文件的信息进行打包。
├── setup.cfg               # 与上面文件共同定义构建完成的文件存放位置。
├── resource/               # 存放节点运行需要的资源。
├── test/                   # 运行 colcon test 时会进行这些测试。
│   ├── test_copyright.py
│   ├── test_flake8.py
│   └── test_pep257.py
└── my_python_package/      # 与包同名的源码目录，在这个文件夹下编写节点文件。
    ├── __init__.py
    └── my_node.py          # 自行编写的Python节点
```

在`package.xml`文件当中需要手动添加依赖的其它软件包。

```xml
<?xml version="1.0"?><!--XML声明不需要管-->
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>demo_python_service</name><!--包名，版本信息，包功能描述，维护者信息，许可证-->
  <version>0.0.0</version>
  <description>TODO: Package description</description>
  <maintainer email="pickingchip@todo.todo">pickingchip</maintainer>
  <license>Apache-2.0</license>

  <depend>rclpy</depend><!--依赖项:需要手动添加-->
  <depend>chapt4_interfaces</depend>

  <test_depend>ament_copyright</test_depend><!--测试依赖项-->
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <export>
    <build_type>ament_python</build_type><!--构建类型-->
  </export>
</package>
```

在`setup.py`文件当中添加需要构建的节点文件，以及需要的资源文件。

```python
    ...
    #在data_files选项下添加资源文件
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        ('share/' + package_name + '/resource', ['resource/Man.jpg']),
        ('share/' + package_name + '/launch', glob('launch/*.launch.py')),
    ],
    ...
    #在entry_points选项下添加编写的节点文件
    entry_points={
        'console_scripts': [
                'face_detect_client_node = demo_python_service.face_detect_client_node:main',
        ],
    },
    ...
```

C++软件包结构如下：

```python
my_cpp_package/             # 功能包根目录。
├── package.xml             # 包描述文件，包含包的结构，许可证，依赖等信息。
├── CMakeLists.txt          # CMake构建规则文件
├── include/                # 存放头文件(.hpp)
│   └── my_cpp_package/
│       └── my_node.hpp
└── src/                    # 存放节点的源文件(.cpp)
    └── my_node.cpp         # C++节点
```

C++软件包使用 Cmake 文件构建：

```cmake
cmake_minimum_required(VERSION 3.8)  #要求的CMake最低版本
project(demo_cpp_service)            #定义项目名称

#根据编译器设置编译选项
if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# 查找依赖项
find_package(ament_cmake REQUIRED)#查找ament_cmake包，这是ROS2构建系统的核心包。
find_package(rclcpp REQUIRED)
find_package(chapt4_interfaces REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(turtlesim REQUIRED)

# 编写一个节点后需手动添加的部分
add_executable(turtle_control src/turtle_control.cpp)#添加可执行文件，指定源文件路径
ament_target_dependencies(turtle_control chapt4_interfaces rclcpp turtlesim geometry_msgs)#指定需要链接的依赖项。
install(TARGETS turtle_control
  DESTINATION lib/${PROJECT_NAME})#指定安装路径
  
#安装启动文件
install(DIRECTORY launch
  DESTINATION share/${PROJECT_NAME}/
)

#创建接口（如果需要）
rosidl_generate_interfaces(${PROJECT_NAME}
  "srv/FaceDetector.srv"
  "srv/Patrol.srv"
  DEPENDENCIES sensor_msgs
)

# 测试相关
if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  # the following line skips the linter which checks for copyrights
  # comment the line when a copyright and license is added to all source files
  set(ament_cmake_copyright_FOUND TRUE)
  # the following line skips cpplint (only works in a git repo)
  # comment the line when this package is in a git repo and when
  # a copyright and license is added to all source files
  set(ament_cmake_cpplint_FOUND TRUE)
  ament_lint_auto_find_test_dependencies()
endif()

ament_package()

```



### 节点

命令行操作

```bash
#运行软件包的指定节点
ros2 run <package_name> <executable_name>
ros2 run turtlesim turtlesim_node --ros-args --remap __node:=my_turtle	#进行重映射
ros2 run demo_python_service face_detect_node --ros-args -p face_locations_ model:=cnn #进行参数设置
ros2 run <package_name> <executable_name> --ros-args --params-file <file_name>
#显示所有正在运行的节点
ros2 node list
#显示节点的信息
ros2 node info node_name
```

C++

```c++
#include "rclcpp/rclcpp.hpp"//引用客户端头文件

int main(int argc, char **argv)
{
    rclcpp::init(argc, argv);//初始化客户端库
    auto node = std::make_shared<rclcpp::Node>("first_ros2_node");//通过智能指针创建一个节点
    RCLCPP_INFO(node->get_logger(), "Hello ROS2!");//发送节点日志
    rclcpp::spin(node);//启动节点进行任务处理
    rclcpp::shutdown();//关闭节点，释放资源
    return 0;
}
```

Python

```python
import rclpy	#导入ros2库
from rclpy.node import Node

def main():
    rclpy.init()
    node = Node("python_node")#初始化节点
    node.get_logger().info("Hello, ROS 2 from Python!")#发送日志消息
    rclpy.spin(node)#启动节点处理任务
    rclpy.shutdown()

if __name__ == "__main__":
    main()
```



### 话题

```bash
#显示所有活跃的话题，-t显示话题接口
ros2 topic list [-t]
#显示话题上正在发送的数据
ros2 topic echo <topic_name>
#查看话题的信息，-v显示详细信息
ros2 topic info topic_name [-v]
#查看话题接口的信息
ros2 interface show <topic_type>
#通过命令行发送消息到话题，--once表示仅发送一次，-w 2表示等待两个匹配的订阅，--rate 2表示发送频率两Hz
ros2 topic pub [--once -w 2 --rate 2] <topic_name> <msg_type> '<args>'
#查看消息发布的频率，带宽
ros2 topic [hz bw] <topic_name>
```

节点命名空间

### 服务

```bash
#显示当前所有活跃的服务,-t显示服务接口
ros2 service list [-t]
#显示特定服务信息
ros2 service info <service_name>
#查看同一服务接口的所有服务
ros2 service find <type_name>
#查看接口的定义，---以上是请求结构，以下是响应结构
ros2 interface show <type_name>
#调用服务
ros2 service call <service_name> <service_type> <arguments>
```



### 参数

```bash
#查看当前运行节点的参数
ros2 param list  
#显示参数类型与当前值
ros2 param get <node_name> <parameter_name>
#改变参数值
ros2 param set <node_name> <parameter_name> <value>
#查看节点所有参数
ros2 param dump <node_name>
#从文件中重新加载参数值
ros2 param load <node_name> <parameter_file>
```



### 动作

```bash
#查看所有动作，-t显示动作接口
ros2 action list [-t]
#查看动作信息
ros2 action info <action_name>
#查看动作类型，请求|结果|反馈
ros2 interface show <type_name>
```



### 启动文件

```bash
#运行一个启动文件
ros2 launch <pkg_name> <launch_file>
```

`<build_depend>`：只在“构建（编译/代码生成）阶段”需要的依赖

`<exec_depend>`：只在“运行阶段”需要的依赖







### TF变换















`<depend>`：既是构建依赖，又是运行依赖
