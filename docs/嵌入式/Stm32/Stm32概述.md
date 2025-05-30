# Stm32

### 简介

STM32 是意法半导体 (STMicroelectronics) 推出的基于 ARM Cortex-M 内核的微控制器系列，有着丰富的外设资源和良好的实时性以及社区开发环境。

ARM Cortex系列：

 **● Cortex-A—面向性能密集型系统的应用处理器内核**

 **● Cortex-R—面向实时应用的高性能内核**

 **● Cortex-M—面向各类嵌入式应用的微控制器内核**

### 系列型号

意法半导体芯片的种类繁多，主要系列如下

![芯片种类](./Picture/芯片种类.png)

### 命名规则

芯片的命名包含了芯片的基本信息，具体命名规则如下

MCU：

![芯片命名规则](./Picture/芯片命名规则.png)

MPU

![MPU命名规则](./Picture/MPU命名规则.png)

选型手册：[Selection_Guide.pdf](https://static.stmcu.com.cn/upload/Selection_Guide.pdf)

PS.
MPU和MCU的最主要的区别就是MPU的性能更强具有MMU（内存管理单元）能够运行Linux操作系统，而MCU则只能运行FreeRTOS这类操作系统，相较之下MPU的性能更强同时功耗更大，而MCU的性能稍显逊色但功耗更低，实时性更强。

文档下载：[STMCU中文官网](https://www.stmcu.com.cn/design_resource/) [STM32相关PDF文档](https://www.st.com.cn/zh/microcontrollers-microprocessors/stm32f103/documentation.html#)

### 芯片结构

![系统架构](./Picture/系统架构.png)





### 时钟系统

stm32单片机有四个时钟源：

- 外部高速时钟
- 外部低俗时钟
- 内部高速时钟
- 内部低俗时钟

单片机默认使用内部高速时钟，但在实际使用的过程中通常使用外部高速时钟，通过锁相环倍频到系统总线能使用的最高频率。（例如F1系列就是8MHZ*9得到72MHZ）

在STM32中，RCC（Reset and Clock Control）是时钟和复位控制模块

它负责管理系统时钟的生成和分配，以及控制外设的复位和时钟开启/关闭，通过RCC配置，开发者可以优化STM32的性能和功耗，确保系统在不同工作条件下稳定运行。

RCC的主要功能包括：

- 时钟源选择：RCC可以选择不同的时钟源，比如内部振荡器、外部晶振等

- 时钟配置：可以配置主时钟、外设时钟等，以满足不同外设的工作频率需求
- 复位控制：RCC可以对各个外设进行复位，确保在系统初始化时外设处于已知状态
- 时钟使能/禁用：动态地开启或关闭外设的时钟，以节省功耗

