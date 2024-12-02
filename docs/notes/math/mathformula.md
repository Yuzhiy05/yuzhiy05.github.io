---
title: mathformula
createTime: 2024/11/05 19:34:51
permalink: /math/mathformula/
---
## 整理一些常用的数学公式

1.三角函数公式  
$\LARGE\sec x=\frac{1}{\cos x}$  
$\LARGE\csc x=\frac{1}{\sin x}$   
$\LARGE\cot x=\frac{1}{\tan x}$

$\LARGE\sin ^{2}\theta+\cos^{2}\theta=1$

$\LARGE 1+\tan^{2}\theta=\sec^{2}\theta$

$\LARGE 1+\cot^{2}\theta=\csc^{2}\theta$   

$\LARGE\sin2\theta=2\sin\theta\cos\theta$

$\LARGE\cos2\theta=\cos^{2}\theta-\sin^{2}\theta=2\cos^{2}\theta-1=1-2\sin^{2}\theta$

 万能公式  
$$\LARGE 令 t=\tan\frac{x}{2} ,则有 \sin x=\frac{2t}{1+t^{2}},\cos x=\frac{1-t^2}{1+t^{2}}\\\\   
\sin(\alpha\pm\beta)=\sin\alpha\cos\beta\pm\cos\alpha\sin\beta\\\\
\cos(\alpha\pm\beta)=\cos\alpha\cos\beta\mp\sin\alpha\sin\beta\\\\
\tan(\alpha\pm\beta)=\frac{\tan\alpha\pm\tan\beta}{1\mp\tan\alpha\tan\beta}
$$

### 函数图像左右移动
1.三角函数中加减 $\pi$ 过程中如同在对应的函数图像上左右移动
通常$f(x+k\pi)$中，在图像上相当于将函数左移k$\pi$区间   
例如 $\sin x$的图像过原点，在$\sin(\frac{\pi}{2})$时到最大值`1`,过$\pi$时为`0`，过$\frac{3\pi}{2}$时为最小值`-1`。当$f(x+\frac{\pi}{2})$时图像左移，因为三角函数为周期函数的性质。  
原先$f(0)$现在为$f(0+\frac{\pi}{2})$,原先为$f(\frac{\pi}{2})$现在为$f(\frac{\pi}{2}+\frac{\pi}{2})$,原先$f(\pi)$现在为$f(\pi+\frac{\pi}{2})$对三角函数某些特殊点的推论可以看出函数向左移动了

1.
$\LARGE\sin(\theta+\frac{\pi}{2})=\cos\theta \\
\cos(\theta+\frac{\pi}{2})=-\sin\theta \\
\sin(\frac{\pi}{2}-\theta)=-\sin(\theta-\frac{\pi}{2})=-(-\cos\theta)=\cos\theta\\
\cos(\frac{\pi}{2}-\theta)=\cos(\theta-\frac{\pi}{2})=\sin\theta$

2.和差化积   
$\LARGE\sin\alpha+\sin\beta=2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}\\
\sin\alpha-\sin\beta=2\cos\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}\\
\cos\alpha+\cos\beta=2\cos\frac{\alpha+\beta}{2}\cos\frac{\alpha+\beta}{2}\\
\cos\alpha-\cos\beta=-2\sin\frac{\alpha+\beta}{2}\sin\frac{\alpha-\beta}{2}$

2.1 正弦相关    

$\LARGE\tan\alpha+\tan\beta=\frac{\sin(\alpha+\beta)}{\cos\alpha\cos\beta}\\
\tan\alpha-\tan\beta=\frac{\sin(\alpha-\beta)}{\cos\alpha\cos\beta}\\
\cot\alpha+\cot\beta=\frac{\sin(\alpha+\beta)}{\sin\alpha\sin\beta}\\
\cot\alpha-\cot\beta=-\frac{\sin(\alpha-\beta)}{\sin\alpha\sin\beta}\\
\tan\alpha+\cot\beta=\frac{\cos(\alpha-\beta)}{\cos\alpha\sin\beta}\\
\tan\alpha-\cot\beta=-\frac{\cos(\alpha+\beta)}{\cos\alpha\sin\beta}$

2.1.1

证明:  
$\LARGE\alpha=\frac{\alpha+\beta}{2}+\frac{\alpha-\beta}{2}\\
\beta=\frac{\alpha+\beta}{2}-\frac{\alpha-\beta}{2}$  
利用上述两角和差正余弦公式  
$\LARGE\sin\alpha+\sin\beta=\sin(\frac{\alpha+\beta}{2}+\frac{\alpha-\beta}{2})+\sin(\frac{\alpha+\beta}{2}-\frac{\alpha-\beta}{2})\\
=\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}+\cos\frac{\alpha-\beta}{2}\sin\frac{\alpha-\beta}{2}+\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha+\beta}{2}-\cos\frac{\alpha-\beta}{2}\sin\frac{\alpha-\beta}{2}\\
=2\sin\frac{\alpha+\beta}{2}\cos\frac{\alpha-\beta}{2}$

2.2积化和差

$\LARGE\sin\alpha\cos\beta=\frac{1}{2}[\sin(\alpha+\beta)+\sin(\alpha-\beta)]\\
\cos\alpha\sin\beta=\frac{1}{2}[\sin(\alpha+\beta)-\sin(\alpha-\beta)]\\
\cos\alpha\cos\beta=\frac{1}{2}[\cos(\alpha+\beta)+\cos(\alpha-\beta)]\\
\sin\alpha\sin\beta=-\frac{1}{2}[\cos(\alpha+\beta)-\cos(\alpha-\beta)]$

2.2.1  
证明:  
$\LARGE\frac{1}{2}[\sin(\alpha+\beta)+\sin(\alpha-\beta)]\\
=\frac{1}{2}[\sin\alpha\cos\beta+\cos\alpha\sin\beta+\sin\alpha\cos\beta-\sin\alpha\cos\beta]\\
=\sin\alpha\cos\beta$


$\mathrm{Rt}\triangle$

$$
\LARGE\begin{matrix}
    1 & x & x^2 \\\\
    1 & y & y^2 \\\\
    1 & z & z^2 \\\\
\end{matrix}
$$




$$\begin{array}{c}
C_{n}^{r} = \frac{n!}{r!(n-r)!} \\        C_{n}^{r+1} = C_{n}^{r} +c_{n}^{r-1}\\C_{n}^{r} =C_{n-r}^{r} \\C_{n}^{r}=\frac{A_{n}^{r}}{n!} =\frac{n(n-1)...n(n-m+1)}{n!}  \end{array}$$