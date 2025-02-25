### 安装 abseil


```powershell
cmake --build . --target clean //清除构建生成

Remove-Item -Recurse -Force *  //ps 删除当前文件夹下所有文件

按如下顺序构建
cmake .. -DCMAKE_TOOLCHAIN_FILE=D:/workfile/compiler/toolchaincmake/clang-msvc-toolchain.cmake  -G "Ninja"

cmake --build . --config Release //Release 构建项目

cmake 安装  cmake --install . --prefix "D:\workfile\lib\abseil" //指定安装地址

//其他细化命令
cmake .. -G"Ninja" -DCMAKE_CXX_COMPILER="D:\\workfile\\compiler\\clang\\llvm\\bin\\clang++.exe" -DCMAKE_SYSROOT="D:\\workfile\\compiler\\windows-msvc-sysroot" 

cmake .. -G"Ninja" -DCMAKE_CXX_COMPILER="D:\\workfile\\compiler\\clang\\llvm\\bin\\clang++.exe" -DCMAKE_SYSROOT="D:\\workfile\\compiler\\clang\\x86_64-windows-gnu" 


cmake .. -G"Ninja" -DCMAKE_TOOLCHAIN_FILE="D:/workfile/compiler/toolchaincmake/clang-toolchain.cmake"

```