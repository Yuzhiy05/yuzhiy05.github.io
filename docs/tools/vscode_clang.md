---
title: vscode_clang
createTime: 2024/11/06 16:16:41
permalink: /article/a6pj5pt2/
---
# vscode搭配clang

这次同样使用的是阳教授自己编译的clang.   
1.首先是下载，解压(注意使用管理员权限解压)
[下载链接](https://github.com/trcrsired/llvm-releases)   
2.将`/.../llvm/bin`和`/.../x86_64-windows-gnu/bin` 路径添加到用户`path`
3.安装clangd插件
4.测试一下
`clang++ -o hello.exe hello.cpp --target=x86_64-windows-msvc --sysroot=系统根路径 -fuse-ld=lld -D_DLL=1 -lmsvcrt -O3 -flto=thin
-stdlib=libc++`


