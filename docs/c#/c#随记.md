---
title: c#随记
createTime: 2024/12/04 16:06:14
permalink: /article/vqkwmfa2/
---


System.Collections.Generic
c#中的泛型集合

Thread
C#线程分前台线程和后台线程，前台线程需要进程等待其结束，而后台进程在前台进程执行完
后进程结束时自动中止。

```c#
public bool IsBackground { get; set; }
```

:::tip
默认情况下
主线程，所有通过Thread构造函数构造的线程都为前台线程(IsBackground返回false)
由运行时提供的线程池线程，从非托管代码进入托管执行环境的所有线程为后台线程
:::

:::info
|类型|版本|
|----|-----|
|.NET|Core 1.0, Core 1.1, Core 2.0, Core 2.1, Core 2.2, Core 3.0, Core 3.1, 5, 6, 7, 8, 9|
.NET Framework|1.1, 2.0, 3.0, 3.5, 4.0, 4.5, 4.5.1, 4.5.2, 4.6, 4.6.1, 4.6.2, 4.7, 4.7.1, 4.7.2, 4.8, 4.8.1|
.NET Standard|2.0, 2.1|
:::

```c#
public static bool Yield ();
```
让出当前线程的时间片给，由操作系统选择其他线程。
仅限于执行调用线程的处理器。 操作系统不会将执行切换到另一个处理器，即使该处理器处于空闲状态或正在运行优先级较低的线程也是如此。 如果没有其他线程已准备好在当前处理器上执行，则操作系统不会生成执行，此方法返回 false
此方法等效于使用平台调用调用本机 Win32 SwitchToThread 函数。

```c#
[System.Runtime.Versioning.UnsupportedOSPlatform("browser")]
public void Start ();
```
启动线程