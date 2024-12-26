---
title: 编写cmake
createTime: 2024/12/26 22:32:41
permalink: /article/bijxvme0/
---


cmake 各变量名字

PROJECT_SOURCE_DIR 表示当前项目的根目录也就是当前cmakelist文件所在路径。调用project(xxx)指定项目后的源代码目录

PROJECT_BINARY_DIR  项目的构建目录通常都在构建文件夹下(build)文件夹下 当使用Bbuild 或指定构建文件夹.

# 从指定目录中搜寻源文件，并将它们存入变量SRC_LIST和CW_SRC_LIST中
aux_source_directory(${PROJECT_SOURCE_DIR} SRC_LIST)
aux_source_directory(${PROJECT_SOURCE_DIR}/cw/src CW_SRC_LIST)
