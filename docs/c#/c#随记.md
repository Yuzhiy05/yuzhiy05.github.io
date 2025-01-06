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

控件的Invoke方法
在主线程间开子线程，如果子线程需要修改主线程的空间则需要Invoke方法.不然线程间资源无法跨线程访问。同时Invoke会把委托交给主线程运行。阻塞当前子线程。当主线程执行完成后返回子线程所谓"同步"

Invoke
```c#
private void button1_Click(object sender, EventArgs e)
{
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+"AAA");
            var invokeThread = new Thread(new ThreadStart(StartMethod));
            invokeThread.Start();
            string a = string.Empty;
            for (int i = 0; i < 3; i++)      //调整循环次数，看的会更清楚
            {
                Thread.Sleep(1000);   
                a = a + "B";
            }
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+a);
}
 private void StartMethod()
{
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+"CCC");
            button1.Invoke(new Action(invokeMethod));  
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+"DDD");
}

 private void invokeMethod()
{
            //Thread.Sleep(3000);
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString() + "EEE");
}
```

和begininvoke的区别

```c#
private void button1_Click(object sender, EventArgs e)
{
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+"AAA");
            var invokeThread = new Thread(new ThreadStart(StartMethod));
            invokeThread.Start();
            string a = string.Empty;
            for (int i = 0; i < 3; i++)      //调整循环次数，看的会更清楚
            {
                Thread.Sleep(1000);   
                a = a + "B";
            }
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+a);
}

 private void StartMethod()
{
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+"CCC");
            button1.BeginInvoke(new Action(invokeMethod));  
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString()+"DDD");
}

 private void beginInvokeMethod()
        {
            //Thread.Sleep(3000);
            MessageBox.Show(Thread.CurrentThread.GetHashCode().ToString() + "EEEEEEEEEEEE");
        }
```

将方法委托给主线程后，子线程可继续执行DDD而不需要等待主线程返回。

在多线程编程中，我们经常要在工作线程中去更新界面显示，而在多线程中直接调用界面控件的方法是错误的做法，Invoke 和 BeginInvoke 就是为了解决这个问题而出现的，使你在多线程中安全的更新界面显示。

正确的做法是将工作线程中涉及更新界面的代码封装为一个方法，通过 Invoke 或者 BeginInvoke 去调用，两者的区别就是一个导致工作线程等待，而另外一个则不会

在 WinForm开发过程中经常会用到线程，有时候还往往需要在线程中访问线程外的控件，比如：设置textbox的Text属性等等。如果直接设置程序必 定会报出：从不是创建控件的线程访问它，这个异常。通常我们可以采用两种方法来解决。一是通过设置control的属性。二是通过delegate,而通 过delegate也有两种方式，一种是常用的方式，另一种就是匿名方式。下面分别加以说明.
 

首先，通过设置control的一个属性值为false.我们可以在Form_Load方法中添加：Control.CheckForIllegalCrossThreadCalls=false;来解决。设置为false表示不对错误线程的调用进行捕获。这样在线程中对textbox的Text属性进行设置时就不会再报错了。

Invoke(Action)	
在拥有控件的基础窗口句柄的线程上执行指定的委托。

Invoke(Delegate)	
在拥有控件的基础窗口句柄的线程上执行指定的委托。

Invoke(Delegate, Object[])	
在拥有控件的基础窗口句柄的线程上，使用指定的参数列表执行指定的委托。
```c#
Invoke<T>(Func<T>)	
//在拥有控件的基础窗口句柄的线程上执行指定的委托。
```