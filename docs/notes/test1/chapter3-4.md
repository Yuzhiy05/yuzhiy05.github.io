---
title: chapter3-4
createTime: 2024/11/02 23:46:13
permalink: /test1/chapter3-4/
---
# 用户定义类
### concrete class
具体类的行为应该和内建类型一样。例如如复数类和int类型除了在数学概念上的可能有操作不同。但使用时不应该有太大从差别。
>That allows implementations to be optimally efficient in time and space. In particular, it allows us to:  
• place objects of concrete types on the stack, in statically allocated memory, and in other objects (§6.4.2);  
• refer to objects directly (and not just through pointers or references);
• initialize objects immediately and completely (e.g., using constructors; §2.3.2); and  copy objects (§3.3)

1.第一条暗示了具体类和其内部内存分配和其本身对象分离的实现。这就是标准库容器的做法。std::vector的模板参数有两个第二个为分配器，专门用作内存分配。  
2.第二条我没有看懂  
3，立即完整的初始化和拷贝对象，毕竟你不想引入一个对象时其中存在无效值。

如std::vector和std::string他们都是因此设计资源管理类型。这里有标准库简化版的complex的例子
```c++
class complex {
double re, im; // representation: two doubles
public:
complex(double r, double i) :re{r}, im{i} {} // construct complex from two scalars
complex(double r) :re{r}, im{0} {} // construct complex from one scalar
complex() :re{0}, im{0} {} // default complex: {0,0}
double real() const { return re; }
void real(double d) { re=d; }
double imag() const { return im; }
void imag(double d) { im=d; }
complex& operator+=(complex z) { re+=z.re , im+=z.im; return ∗this; } // add to re and im
// and return the result
complex& operator−=(complex z) { re−=z.re , im−=z.im; return ∗this; }
complex& operator∗=(complex); // defined out-of-class somewhere
complex& operator/=(complex); // defined out-of-class somewhere
};
//类外其他地方
complex operator+(complex a, complex b) { return a+=b; }
complex operator−(complex a, complex b) { return a−=b; }
complex operator−(complex a) { return {−a.real(), −a.imag()}; } // unar y minu
```
注意complex没有参数的构造函数，称为默认构造。定义这样的构造函数保证消除了内部类型未初始化变量的可能。对于一些简单操作为了内联而不生成对应函数调用的机器码而定义在类内。如构造函数，operator+=。*对于const限定符修饰的函数意味了此函数不会修改调用他们的对象*。
还有一些操作需要直接访问complex的对象表示，我们通常分离实现定义在类外的别处。对于按值传递的函数，因为是对原对象的复制所以可以修改。

