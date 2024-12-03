---
title: fast_io_sixfile
createTime: 2024/12/03 14:53:25
permalink: /article/72dkdlbu/
---
# fast_io中的六种文件

wine nt win32 posix c filebuf

### c_file
c_file类创建出来的对象，它有个成员变量fp或者native_handle()方法（都一样）
```c++
using namespace ::fast_io::io;
fast_io::c_file cf(u8"文件路径\\out\\cfile_test.txt", fast_io::open_mode::out);

println(cf, "helloworld");//fastio print

fprintf(cf.fp,"Hello %s\n", "World");//c api
fprintf(cf.native_handle(), "cfile_test %s\n", "native_handle()");

static_assert(sizeof(FILE*)==sizeof(c_file),"FILE* 大小与c_file相同")
//fast_io::c_file_unlocked cf2(u8"hello2.txt", fast_io::open_mode::in|fast_io::open_mode::out|fast_io::open_mode::trunc);

```

```FILE* fp=fopen();```
fp通常再c编程中指代文件打开后返回的FILE* 文件指针
c_file就是一个C语言的FILE* 的包装，它有移动语义的，可以放进容器里，而且类型的大小，布局和FILE*完全相同
c_file还有别的字符的版本，例如wc_file, u8c_file, u16c_file, u32c_file
这个就是自动管理FILE*的类，自动关文件
很多代码的接口就只支持FILE*
c_file可以用fast_io的api，也可以用C语言的api


c_file还有另一个类c_file_unlocked
因为c_file所有的操作都会上锁的
如果你不要上锁，那用c_file_unlocked
因为FILE*的操作在POSIX标准中是上锁的
你也可以手工锁
```c++
c_file cf;
cf.lock();
cf.unlock();

c_file cf;
std::lock_guard guard{cf};
```

不过你不用管
它都上锁的

只是说它提供api你可以手工锁

之后变成无锁版本来操作

这样就可以优化

或者你知道你不会多线程中使用这个FILE*

你可以直接用c_file_unlocked

如果是c_file

可以竞争读写

它所有操作都会上锁之后操作的

它就会调用这个

当然是跨平台的，帮你包装好了

windows上就调用win的[win的](https://www.man7.org/linux/man-pages/man3/flockfile.3.html
)

 多线程同时读写同一个全局的c_file是没问题的

一个线程用c_file另一个用它的fp的FILE*也没问题

它用的是FILE*自己的锁
C库提供的锁这个不是文件锁，只是FILE*缓冲区的锁


::: tip
scan print第一个参数如果是io设备类型就从这里输入或者输出
否则从标准输入输出到输入输出呀

它是io缓冲区的锁
比如你使用C语言的printf
stdio并不会直接把数据写盘的
一个io对象一个缓冲区呀

:::

```c++
FILE *fp=fopen();
c_file cf(fp);
```

c_file支持直接用FILE*构造

但你这里不能用c_file

因为你不想把stdout析构函数关掉吧

关掉就ub了
c_file cf(stdout);

语法上正确。但直接程序就炸了

因为析构函数把它关了

c_file一定执行析构的

但你现在手头上就有个FILE*

比如这里stdout

你就想对它用一下fast_io scan print这种api

FILE*直接不能放scan print里

所以你要用
```c++
c_io_observer ciob{fp}; print(ciob,"hello world");
```

用c_io_observer把它包装起来就行了
这个是个聚合类
它没有析构，也没定义复制移动，甚至没有构造方法

:::tip
c_file才关，c_io_observer只是观察者print不写设备就相当于写到c_io_observer{stdout}里,【锅楠阳叫兽】
scan同理
从c_io_observer{stdin}里读
因而它不存在C++流还需要与stdio同步的问题
它就是直接操作的C语言的FILE*
:::

fast_io提供了c_stdout()，它就是c_io_observer{stdout}
但它保证noexcept的，效率会更高的
因为stdout很多C库没加noexcept
实际根本不可能抛出异常(兼容c函数的都是无条件noexcept 这是lakos规则但是编译器是否遵守不知道)

:::info
u8c_io_observer
这就char8_t版本的FILE*
FILE*本身并不提供char8_t的支持
但fast_io是支持的
:::

### filebuf_file
首先你需要include fast_io_legacy.h，表示C++流支持
legacy表示旧的东西

但如果看文件流的类方法
fstream
它有一个rdbuf()
返回的是std::filebuf*
std::fstream继承了std::iostream
实际上就是在iostream上加了个std::filebuf
做设备
把上面虚方法重写让它去操作std filebuf
std::filebuf你是可以直接用的
第二种文件了。叫fast_io::filebuf_file
和前面c_file的用法是一样的，不过filebuf_file是没有锁的，它不能多线程同时使用的
```c++
using namespace ::fast_io::io;
fast_io::filebuf_file fbf(u8"D:\\workfile\\c++ try\\fastio_study\\out\\filebuf_test.txt", fast_io::open_mode::out);
println(fbf, "filebuf_test");
```

这个文件就是一个std::filebuf*的包装器了
就像c_file是FILE*的包装器
它是new/delete打开关闭std::filebuf的
FILE*是用fopen fclose
这里是用的new
new std::filebuf
它也只有一个成员fb,或者native_handle()方法

:::tips
注意，这里是fb
不是fp
fb是std::filebuf的file buf的简称
fp是FILE Pointer的简称
:::

它的作用是与C++流互相操作
操作C++流
就像c_file操作C语言FILE*

```c++
fast_io::filebuf_file fbf("hello.txt", fast_io::open_mode::out);
std::ostream myosm(fbf.fb);
myosm<<"Hello World from std::ostream\n";
print(fbf,"Hello World from fast_io print\n");
```
这样你就得到了一个ostream，或者你用istream，iostream都行
这里有个问题，当然能ostream自然好，可如果某个api就要std::fstream怎么办呢
std::fstream并没有这个方法
构造方法不能接受一个std::streambuf*
因为它把std::filebuf绑定在std::fstream对象里了

所以要这么写
```c++
 fast_io::filebuf_file fbf("hello.txt", fast_io::open_mode::out);
std::ofstream fout;
 *fout.rdbuf()=std::move(*fbf.fb);
```
得这么写
才能让它变成std::ofstream
这样就把fast_io::filebuf_file里的std::filebuf移动给标准库文件流了
去做缓冲了
因而之后你就不可以再使用这个fast_io::filebuf_file了
再用就得用fast_io::filebuf_io_observer了
就像c_io_observer一样

:::note
fbf.fb是什么
:::

它的成员呀
它只有一个成员就是fb
类型是std::filebuf*
```c++
class filebuf_file
{
public:
//析构移动，还有构造方法略
std::filebuf* fb{};
};
```
它就是这样的
当然具体细节还有别的比如char_type之类我就没列出来


比如你现在手头有个std::ifstream std::ofstream 或 std::fstream
你怎么用fast_io操作它呢？
就和刚才有个FILE*你用c_io_observer操作一样














































