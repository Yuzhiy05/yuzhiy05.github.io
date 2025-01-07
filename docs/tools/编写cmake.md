---
title: 编写cmake
createTime: 2024/12/26 22:32:41
permalink: /article/bijxvme0/
---


cmake 各变量名字

PROJECT_SOURCE_DIR 表示当前项目的根目录也就是当前cmakelist文件所在路径。调用project(xxx)指定项目后的源代码目录

PROJECT_BINARY_DIR  项目的构建目录通常都在构建文件夹下(build)文件夹下 当使用Bbuild 或指定构建文件夹.

### 从指定目录中搜寻源文件，并将它们存入变量SRC_LIST和CW_SRC_LIST中
```cmake
aux_source_directory(${PROJECT_SOURCE_DIR} SRC_LIST)
aux_source_directory(${PROJECT_SOURCE_DIR}/cw/src CW_SRC_LIST)
```
此命令不会递归查找子目录,只会识别.cpp .cc .cxx 不会识别.hpp .h文件 同样CMake 无法生成知道何时添加了新的源文件此时需要重新运行 CMake
一般用作
> 显式模板实例化的项目。模板实例化文件可以存储在 Template 子目录中，并使用此命令自动收集，以避免手动列出所有实例化 

最简单的例子

获取所有源文件进行编译
有如下文件结构
:::file-tree

- helloproject      
  - build    
   -...省略
  - src
   - demo1.cpp
   - demo2.cxx
   - demo3.h
   - demo4.hpp
   - ...
   - src2
    - demo3.cpp  
  - CmakeLists.txt
  - CmakePresets.json
  - hello.cpp
:::
添加src文件夹下所有文件进行编译

```cmake
cmake_minimum_required(VERSION 3.5.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED true)
set(CMAKE_CXX_EXTENSIONS OFF)
project(hello)

message(STATUS "PROJECT_SOURCE_DIR目录为=${PROJECT_SOURCE_DIR}")
message(STATUS "PROJECT_BINARY_DIR目录为=${PROJECT_BINARY_DIR}")

aux_source_directory(${PROJECT_SOURCE_DIR}/src SRC_LIST)

include_directories(src)

message(STATUS "源码路径SRC_LIST文件=${SRC_LIST}")

add_executable(hello main.cpp ${SRC_LIST})
```

### 列出所有源码 
```cmake
file(GLOB_RECURSE/GLOB  <变量名>  op(可选项):[CONFIGURE_DEPENDS] <expr-path>) 
```
 是一个用来匹配指定路径下所有符合通配符条件的文件的命令。
GLOB_RECURSE 是递归查找目录下的所有文件，
GLOB 则只在指定文件下
CONFIGURE_DEPENDS 标记依赖 当文件夹下新增文件时cmake会重新编译添加进文件
expr-path 简单的正则表达式表示的路径
file() 命令则可以用来获取文件列表

file(GLOB_RECURSE SOURCES src/*.cpp include/*.h)
递归地查找 src 和 include 目录下所有以 .cpp 或 .h 结尾的文件，并将它们存储在 SOURCES 变量中。然后，add_executable 命令使用 SOURCES 变量中的文件来生成可执行文件 
