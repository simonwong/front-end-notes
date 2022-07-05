# C++ 笔记

## 前置

学习 c++ 需要的许多前置知识，编译器区别，版本区别，文件后缀区别等。强大的语言，却又有各种各样的规范区别，令新手生畏。

### c++ 标准版本

由近到远：

- c++23（c++2b）草案，仍在制定中
- c++20（c++2a）将这门语言领进了现代化的大门
- c++14（C++1y）、**c++17（c++1x）**是对 c++11 的重要补充和优化
- **c++11（C++0x）**
- c++03
- c++98

![](http://file.wangsijie.top/blog/202203301547655.jpeg)



**gun++** 是 c++ 对应版本标准与 gun 拓展。gun 拓展源自于 GCC



**推荐：**使用 c++17 版本比较合适，有些编译器对 c++20 没有完全支持。

### 编译器

#### 概念

传统的编译器通常分为三个部分，前端（frontEnd），优化器（Optimizer）和后端（backEnd）

- 前端：负责词法语法分析，源码 AST

- 优化器：对中间代码优化

- 后端：将代码转为各自平台的机器码

**现代编译器工作流程**：

源代码 => 预处理器 => 编译器 => 汇编语言 => 目标代码 => 链接器 => 可执行文件

#### Clang

[Clang](https://zh.wikipedia.org/wiki/Clang) 是一个 C、C++、Objective-C 等变成语言的编译器前端，采用了[LLVM](https://zh.wikipedia.org/wiki/LLVM)作为其后端。

**clang** 是

**clang++** 是

查看 Clang 对 c++ 个版本的支持 [C++ Support in Clang](https://clang.llvm.org/cxx_status.html)

**优点：**

- 速度快
- 内存占用小
- 兼容性好
- 有静态分析

#### GNU编译器套装 （GCC）

[GNU编译器套装](https://zh.wikipedia.org/wiki/GCC) 可以处理 C、C++、Objective-C、Java、GO 等语言。

**gcc** 是 GUN C Compiler，即 C 编译器；

**g++** 是 GUN C++ Compiler，即 C++ 编译器；

查看 GCC 对 c++ 的各版本支持 [C++ Standards Support in GCC](https://gcc.gnu.org/projects/cxx-status.html#cxx20)

**优点：**

- 支持更多平台
- 更流行，广泛使用，支持完备

### 文件后缀

C++ 源文件的后缀十分混乱，不同编译器支持不同后缀：

| 编译器       | Microsoft Visual C++ | GCC（GNU C++）             | Borland C++ | UNIX              |
| :----------- | :------------------- | :------------------------- | :---------- | :---------------- |
| 头文件后缀   |                      |                            |             |                   |
| 标准文件后缀 | `.cpp` `.cxx`  `.cc` | `.cpp`  `.cxx`  `.cc`  `.c++` `.C` | `.cpp`         | `.C`  `.cc`  `.cxx`  `.c` |



**谷歌的规范：**

文件使用 `.cc`，头文件使用 `.h`

**推荐：**

文件使用 `.cpp` ，头文件使用 `.h`



## 参考资料

- 《C++ Primer》（中文版）（第 5 版）
- [C++ 参考手册](https://zh.cppreference.com/w/cpp)（中文版）
- [现代 C++ 教程: 高速上手 C++ 11/14/17/20](https://changkun.de/modern-cpp/)
- [Google 风格指南中文版：C++ 风格指南](https://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/contents/)