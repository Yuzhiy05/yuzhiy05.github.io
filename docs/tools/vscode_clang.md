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
4.测试一下
`clang++ -o hello.exe hello.cpp --target=x86_64-windows-msvc --sysroot=系统根路径 -fuse-ld=lld -D_DLL=1 -lmsvcrt  -flto=thin -stdlib=libc++`

--sysroot=D:\\workfile\\compiler\\windows-msvc-sysroot

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
