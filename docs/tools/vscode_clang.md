---
title: vscode_clang
createTime: 2024/12/02 19:37:42
permalink: /article/j3e883z1/
---
# vscode搭配clang
   
1.首先是下载，解压(注意使用管理员权限解压)
[下载链接](https://github.com/trcrsired/llvm-releases)   
2.将`/.../llvm/bin`和`/.../x86_64-windows-gnu/bin` 路径添加到用户`path`
3.安装clangd插件
4.创建一个项目文件夹此处为helloproject，进入文件夹，右键打打开powershell
5.测试clang
`clang --version`
测试cmake 
`cmake --version`
测试ninja
`ninja --version`

编写一个最简单hello.cpp文件保存

首先编写CmakeLists.txt和CmakePresets.json


```cmake
cmake_minimum_required(VERSION 3.5.0)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED true)
set(CMAKE_CXX_EXTENSIONS OFF)

project(hello)

add_executable(hello hello.cpp)

```

```json
{"version": 8,
    "configurePresets": [
        {
            "name": "clang",
            "hidden": false,
            "generator": "Ninja",
            "binaryDir": "${sourceDir}/build/${presetName}",
            "cacheVariables": {
                "CMAKE_BUILD_TYPE": "Debug",
                "CMAKE_C_COMPILER": "D:\\workfile\\compiler\\clang\\llvm\\bin\\clang.exe",
                "CMAKE_CXX_COMPILER": "D:\\workfile\\compiler\\clang\\llvm\\bin\\clang++.exe",
                "CMAKE_CXX_FLAGS": "--target=x86_64-windows-gnu --sysroot=D:\\workfile\\compiler\\clang\\x86_64-windows-gnu -fuse-ld=lld  -rtlib=compiler-rt -unwindlib=libunwind  -lc++abi -lunwind -lntdll -Wno-unused-command-line-argument  -fcolor-diagnostics -stdlib=libc++",
                "CMAKE_C_FLAGS": "--target=x86_64-windows-gnu --sysroot=D:\\workfile\\compiler\\clang\\x86_64-windows-gnu -fuse-ld=lld -rtlib=compiler-rt -unwindlib=libunwind  -lc++abi -lunwind -lntdll -Wno-unused-command-line-argument -fcolor-diagnostics "
            }
        }
    ]
}
```

在当前项目文件夹下打开powershell,或使用vscode的终端,依次输入一下命令

```powershell
cmake -Bbuild --preset clang .

ninja -C build hello

./hello
```

这就是完整的使用cmake和ninja的构建，并执行的过程。
准备工作做好后
首先开始配置vscode相关配置
1.taskjson 
taskjson相当于任务配置文件，而一个task任务相当于执行一个个命令行命令。把一个个命令行命令抽象成任务。
也就是说用taskjson中的任务代替你执行上述的命令
相比每次开始新项目时重新写taskjson，vscode支持配置默认任务。这是写在C:\Users\<用户名>\AppData\Roaming\Code\User\profiles文件中的全局任务设置。

当然这里我们先选择配置任务而不是默认生成的任务，注意这个默认生成的任务是全局的.点击配置任务后，`命令面板`也就是出现的下拉框。如果之前没有配置本地任务，则会出现`使用模板创建taskjson文件`,点击后，选择`Other`后会在本地项目的文件夹下创建一个.vscode文件夹其中包含一个task.json文件。其中包含了vscode模板创建的任务一般为` echo Hello`

:::file-tree

- helloproject   
  - .vscode   
    - task.json    
  - build    
   - Cmakefile    
     - ...   
   - .ninja_deps  
   - .ninja_log
   - build.ninja
   - cmake_install.cmake
   - CmakeCache.txt
   - hello.exe
  - CmakeLists.txt
  - CmakePresets.json
  - hello.cpp

:::
首先提供以下三个最基础的代替上述命令的任务
```json
"version": "2.0.0",
    "tasks": [
        {
            "type": "shell",
            "label": "cmake-build",
            "command": "cmake",
            "args": [
                "-Bbuild",
                "--preset",
                "clang",
                "."
            ],
            "options": {
                "cwd": "${workspaceFolder}/"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "cmake构建",
            "problemMatcher": []
        },
        {
            "type": "shell",
            "label": "ninja-make",
            "command": "ninja ",
            "args": [
                "-v"
            ],
            "options": {
                "cwd": "${workspaceFolder}/build"
            },
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": false
            },
            "detail": "ninja编译"
        },
        {
            "label": "执行",
            "type": "shell",
            "command": "./hello",
            "options": {
                "cwd": "${workspaceFolder}/build"
            },
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "detail": "执行exe",
            "dependsOrder": "sequence",
            "dependsOn": [
                "cmake-build",
                "ninja-make"
            ]
        }
    ]
```
保存task.json文件后点击vscode的任务栏的`终端`选项,点击运行任务。在出现的下拉框中点击`执行`。
vscode的终端列表会按顺序执行，之前的三个任务。不过这还不够，我们需要对vscode的任务与生成的cmake做更多的定制,以便于像使用ide一样顺畅，当然我们也可以选择使用一些插件这些后续再述

### 了解task.json
[参考链接](https://code.visualstudio.com/Docs/editor/tasks)

简单介绍一些每个任务的属性   
1.label :任务的名字或者任务的标签，这是自定义的
2.type : 任务类型。通常为`shell`或`process`当然除此之外可以像vsc提供自定义任务类类型。shell为要在命令行中执行的任务，而process为需要执行的进程。
3.command:具体的命令.command中的命令会原样传输给shell，但有时一些命令需要转义才能完成此时命令需要包含正确的引号或转义字符。
4.args:命令的参数通常不需要特别设置，但是不同shell的转义字符不同需要进行不同设置
5.options:覆盖一些默认值 例如 `"cwd": "${workspaceFolder}/build"`此项使得你的命令在当前工作目录下的build文件夹下执行。这对一些指令比较有用。例如ninja命令的必须在含有构建文件的夹下执行。
存在`cwd(当前工作目录),env(环境变量),shell`
6.problemMatcher:错误匹配，运行结果报错通常含有一大段内容。此项可以帮助你快速定位问题，通常需要手动写正则表达式。
7.group:任务的分组通常是自定义，但是这与后续的debug配置有关。
8.detail:显示在任务名字下方的任务的详细描述。
9.dependsOrder:组合任务的依赖顺序，如上例一样如果此属性指定了`sequence`。那么会顺序执行dependsOn中声明的任务。
10.dependsOn:组合任务,将已存在任务加入依赖中。通常未设置dependsOrder属性任务会并行执行。
11.presentation:控制终端的行为。

$env:path.split(";")

clang++ -o main.exe main.cpp --target=x86_64-windows-msvc --sysroot=D:\\workfile\\compiler\\windows-msvc-sysroot -fuse-ld=lld -D_DLL=1 -lmsvcrt  -flto=thin
```powershell

-L<dir>, --library-directory <arg>, --library-directory=<arg>
Add directory to library search path

-flto-jobs=<arg>
Controls the backend parallelism of -flto=thin (default of 0 means the number of threads will be derived from the number of CPUs detected)

-flto=<arg>, -flto (equivalent to -flto=full), -flto=auto (equivalent to -flto=full), -flto=jobserver (equivalent to -flto=full)
Set LTO mode. <arg> must be ‘thin’ or ‘full’.

-fuse-ld=lld 指定链接器为lld

-rtlib=compiler-rt 指定[低级运行时库](https://compiler-rt.llvm.org/)


-unwindlib=libunwind 这玩意不支持windows系统时是给 elf格式文件用的 参考[这个](https://github.com/libunwind/libunwind)

指定栈回退的库确定 ELF 程序执行线程的当前调用链，并在该调用链的任意点恢复执行。主要是处理异常和调用栈(debug)的

-unwindlib=<arg>, --unwindlib=<arg>
Unwind library to use. <arg> must be ‘libgcc’, ‘unwindlib’ or ‘platform’.

-lunwind 链接unwind库

-lc++abi  链接cxxabi 库 这玩意是为了生成的abi兼容 libc++abi is a new implementation of low level support for a standard C++ library.
简单说就是libc++的底层实现比如异常的一些[玩意](https://libcxxabi.llvm.org/)


-lntdll ntdll 是windows的内核dll NT Layer DLL  包含一些系统调用 异常处理等功能


-stdlib=<arg>, --stdlib=<arg>, --stdlib <arg>¶
C++ standard library to use. <arg> must be ‘libc++’, ‘libstdc++’ or ‘platform’.
```

[-Wno-unused-command-line-argument](https://maskray.me/blog/2023-08-25-clang-wunused-command-line-argument)
关闭未使用参数的警告



cmake --build . 在build文件夹下编译项目

cmake --build ./build -t(--target) <目标>

ninja -C build 两步操作1.进入build文件夹2.编译项目

ninja -C build <目标>同上


在build文件夹下
ninja -t clean 清除构建文件  

ninja <目标>  编译对应项目 有时你的引入的库依赖太多文件 此时只构建你的目标文件

ninja  -v  详细模式构建所有目标


### clang 查看模板实例化

 clang++  -Xclang -ast-print -fsyntax-only test.cpp --target=x86_64-windows-gnu --sysroot=D:\workfile\toolchain\compiler\x86_64-windows-gnu\x86_64-windows-gnu -fuse-ld=lld -flto=thin -rtlib=compiler-rt -stdlib=libc++ -std=c++20 >> ./test.txt

输出到test.txt 通过裁剪 生成实例化文件

test.cpp 文件
 ```c++
#include <iostream>


void bbegin(); //起始点

template<typename T>
struct A{
  T a;
  T* b;
};

template <class... T> void print_(const T &...arg) {
  (std::cout << ... << arg) << std::endl;
}
template <bool f, class U, class... T>
constexpr auto sub_1(const U &val, const T &...arg) {
  if constexpr (f)
    return (val - ... - arg);
  else
    return (arg - ... - val);
}
void func() {
  print_("hhh", 'k', 1);
  auto x1 = sub_1<false>(10, 3, 5);
 A x{1,new int{1}};
}
void eend();//结束点

int main(){
  func();
}
 ```
 
