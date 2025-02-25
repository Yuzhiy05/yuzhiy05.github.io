---
title: 编写cmake
createTime: 2024/12/26 22:32:41
permalink: /article/bijxvme0/
---


cmake 各变量名字

PROJECT_SOURCE_DIR 表示当前项目的根目录也就是当前cmakelist文件所在路径。调用project(xxx)指定项目后的源代码目录

PROJECT_BINARY_DIR  项目的构建目录通常都在构建文件夹下(build)文件夹下 当使用Bbuild 或指定构建文件夹.

CMAKE_CURRENT_SOURCE_DIR 表示当前CMakeLists.txt 所在的源码目录
CMAKE_CURRENT_BINARY_DIR 表示当前输出目录的位置

CMAKE_SOURCE_DIR：根项目源码路径最外层cmakeList（存放main.cpp的地方）
CMAKE_BINARY_DIR：根项目输出路径（存放main.exe的地方）

PROJECT_IS_TOP_LEVEL：BOOL类型，表示当前项目是否是（最顶层的）根项目
PROJECT_NAME：当前项目名
CMAKE_PROJECT_NAME：根项目的项目名

EXECUTABLE_OUTPUT_PATH 可执行文件的输出路径(旧变量不建议使用，可能不生效)
CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG
CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE
使用此项代替

LIBRARY_OUTPUT_PATH 库文件的输出路径(旧变量不建议使用，可能不生效)
CMAKE_ARCHIVE_OUTPUT_DIRECTORY 静态库输出路径
CMAKE_LIBRARY_OUTPUT_DIRECTORY 动态库输出路径

小技巧：CMake 的 ${} 表达式可以嵌套

CMAKE_CXX_STANDARD 是一个整数，表示要用的 C++ 标准。
比如需要 C++17 那就设为 17，需要 C++23 就设为 23。

CMAKE_CXX_STANDARD_REQUIRED 是 BOOL 类型，可以为 ON 或 OFF，默认OFF。
他表示是否一定要支持你指定的 C++ 标准：如果为 OFF 则 CMake 检测到编译器不支持 C++17 时不报错，而是默默调低到 C++14 给你用；为 ON 则发现不支持报错，更安全。
通常我们设为ON。
CMAKE_CXX_EXTENSIONS 也是 BOOL 类型，默认为 ON。
设为 ON 表示启用 GCC 特有的一些扩展功能；OFF 则关闭 GCC 的扩展功能，只使用标准的 C++。
要兼容其他编译器（如 MSVC）的项目，都会设为 OFF 防止不小心用了 GCC 才有的特性。
通常我们设为OFF

CMAKE_BUILD_TOOL: 执行构建过程的工具。该变量设置为CMake构建时输出所需的程序。对于VS 6， CMAKE_BUILD_TOOL设置为msdev， 对于Unix，它被设置为make 或 gmake。 对于 VS 7， 它被设置为devenv. 对于Nmake构建文件，它的值为nmake。
CMAKE_DL_LIBS: 包含dlopen和dlclose的库的名称。
CMAKE_COMMAND: 指向cmake可执行程序的全路径。
CMAKE_CTEST_COMMAND: 指向ctest可执行程序的全路径。
CMAKE_EDIT_COMMAND: cmake-gui或ccmake的全路径。
CMAKE_EXECUTABLE_SUFFIX: 该平台上可执行程序的后缀。
CMAKE_SIZEOF_VOID_P: void指针的大小。
CMAKE_SKIP_RPATH: 如果为真，将不添加运行时路径信息。默认情况下是如果平台支持运行时信息，将会添加运行时信息到可执行程序当中。这样从构建树中运行程序将很容易。为了在安装过程中忽略掉RPATH，使用CMAKE_SKIP_INSTALL_RPATH。
CMAKE_GENERATOR: 构建工程的产生器。它将产生构建文件 (e.g. "Unix Makefiles", "Visual Studio 2019", etc.)



从指定目录中搜寻源文件，并将它们存入变量SRC_LIST和CW_SRC_LIST中
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

### 引入第三方静态库
以spdlog为例子
此类库基本为头文件库体积不打使用子模块构建
```powershell
git submodule add <path>仓库地址 注意仓库的分支默认是拉取默认分支

git submodule add -b <branch> <repository> <path>  选择分支拉取

git submodule add git@github.com:gabime/spdlog.git
```

```cmake
add_subdirectory(spdlog) #添加子项目 相对当前cmakelist所在文件夹的相对路径

include_directories(spdlog/include/spdlog) #包含头文件


add_executable(hello main.cpp )

target_link_libraries(hello spdlog) 链接库
```

find_pack








