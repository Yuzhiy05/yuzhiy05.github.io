import{_ as i,c as a,a as t,o as n}from"./app-BKu1TSIW.js";const p={};function e(l,s){return n(),a("div",null,s[0]||(s[0]=[t(`<h3 id="at-t汇编" tabindex="-1"><a class="header-anchor" href="#at-t汇编"><span>AT&amp;T汇编</span></a></h3><p>指令 源操作数 目的操作数 描述内存中的位置 intel QWORD PTR[rbx] AT&amp;T (%rbx)</p><p>16位数据 字 WORD 32位数据 双字 DWORD 64位数据 四字 QWORD</p><p>x86-64 提供了16个通用寄存器<br> rax eax ax al 返回值<br> rbx 被调用者保存 rcx 第四个参数 rdx 第三个参数 rsi esi si sil 第二个参数 rdi 第一个参数<br> rbp 栈底指针 r8 r8d r8w r8b 第五个参数 r9 第六个参数 r10 被调用者保存 ... r15 被调用者保存</p><p>mov 指令 MOV S D S-&gt;D 传送 源操作数是一个立即数，存储寄存器或内存中 目的操作数是一个&quot;地址&quot;，也就是这个位置。它可以是寄存器或是内存地址 目的操作数指定为立即数时需要 movabsq指令 如 movabsq $0x0011223344556677 ,%rax %rax =0x0011223344556677 指令需要指明移动寄存器的部分大小(b,w,l,q) movl以寄存器为目的寄存器时会把寄存器的高四位设置为0</p><p>较小的原值移动到较大的目的地址 MOVS 以0填充高位 MOVZ 以符号位填充高位</p><p>cltq S R 符号位扩展%eax -&gt; %rax</p><p>exampl movabsq$0x0011223344556677 ,%rax %rax =0x0011223344556677 movb $0xAA ,%dl %dl=AA 将立即数移动到寄存器rdx最低八位也就是dl movb %dl,%al %rax=0x00112233445566AA 将寄存器rdx的低八位%dl中的值移动到%al寄存器中 movsbq %dl ,%rax %rax=FFFFFFFFFFFFFFAA 跟据原字节最高位设置扩展 movzbq %dl,%rax %rax=00000000000000AA 零扩展</p><p>示例</p><div class="language-c" data-ext="c" data-title="c"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> exchange</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> *</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">xo</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> y</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    long</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">xp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    *</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">xp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">y</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre></div><div class="language-at&amp;t" data-ext="at&amp;t" data-title="at&amp;t"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>long exchange(long *xp,long y) xp int %rdi,y in %rsi</span></span>
<span class="line"><span>1 exchange:  </span></span>
<span class="line"><span>2 moveq (%rdi),%rax   取%rdi地址指向的内存空间的值传送给%rax。xp是指针，指针的值在寄存器中，那么解引用指针得出指针指向的值，这个&quot;解引用&quot;的操作映射为(%rdi)</span></span>
<span class="line"><span>3 movq %rsi,(%rdi)   作为对比这里不加括号，因为值就存储在%rsi寄存器中，取%rsi寄存器存储的值，移动到%rdi寄存器值所指向的内存中。</span></span>
<span class="line"><span>4 ret</span></span></code></pre></div><p>pushq S 栈指针减少8（指针大小） 将四字压入栈 因为栈是倒过来画的地址由高到低 等价于 subq $8 ,%rsp movq %rbq,(%rsp) popq D 栈指针加8 将四字弹出 等价于 movq (%rsp),%rax addq $8,%rsp</p><p>算数操作 leaq S, D D &lt;-&amp;S 把S的地址传送给D INC D D &lt;-D+1 加1 DEC D D &lt;-D-1 减1 NEG 取负 NOR 取补 ADD 加 SUB S,D D&lt;-D+S 减 IMUL 乘<br> XOR 异或 OR 或 AND 与 SAL S,D D &lt;-D&lt;&lt;k 左移 SHL 左移同上 SAR 算数右移 SHR 逻辑右移</p><p>leaq 指令 load effective address 是movq指令的变形，他将有效地址写入到目的操作数，是从内存读数据到寄存器 如 设 %rdx中值为x leaq 7(%rdx,%rdx,4),%rax 将%rax中的值设置为5x+7 例</p><div class="language-c" data-ext="c" data-title="c"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> scale</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> y</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">long</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> z</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    long</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> t</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">x</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">4</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">y</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">12</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">*</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">z</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre></div><p>3.9.1</p><p>#例题3.46</p><h3 id="_3-1" tabindex="-1"><a class="header-anchor" href="#_3-1"><span>3.1</span></a></h3><p>%rax 0x100<br> 0x104 0xAB<br> $0x108 0x108<br> (%rax) 0xFF<br> 4(%rax) 0x103<br> 9(%rcx,%rdx) 0x10c<br> 260(%rcx,%rdx) 0x108<br> 0xFC(,%rcx,4) 0x101<br> (%rax,rdx,4) 0x118</p><h3 id="_3-5" tabindex="-1"><a class="header-anchor" href="#_3-5"><span>3.5</span></a></h3><p>函数原型为 void decode1(long *xp,long *yp,long *zp) xp in %rdi yp in %rsi ,zp in % rdx</p><p>long xp1=*xp; long yp1=*xp; long zp1=*zp; *yp=xp1; *zp=yp1; *xp=zp1;</p><h3 id="_3-6" tabindex="-1"><a class="header-anchor" href="#_3-6"><span>3.6</span></a></h3>`,23)]))}const h=i(p,[["render",e],["__file","index.html.vue"]]),k=JSON.parse('{"path":"/article/027o3g1x/","title":"程序结构和执行","lang":"zh-CN","frontmatter":{"title":"程序结构和执行","createTime":"2024/11/02 12:45:16","permalink":"/article/027o3g1x/","description":"AT&T汇编 指令 源操作数 目的操作数 描述内存中的位置 intel QWORD PTR[rbx] AT&T (%rbx) 16位数据 字 WORD 32位数据 双字 DWORD 64位数据 四字 QWORD x86-64 提供了16个通用寄存器 rax eax ax al 返回值 rbx 被调用者保存 rcx 第四个参数 rdx 第三个参数 rsi...","head":[["meta",{"property":"og:url","content":"https://github.com/Yuzhiy05/Yuzhiy05.github.io/article/027o3g1x/"}],["meta",{"property":"og:title","content":"程序结构和执行"}],["meta",{"property":"og:description","content":"AT&T汇编 指令 源操作数 目的操作数 描述内存中的位置 intel QWORD PTR[rbx] AT&T (%rbx) 16位数据 字 WORD 32位数据 双字 DWORD 64位数据 四字 QWORD x86-64 提供了16个通用寄存器 rax eax ax al 返回值 rbx 被调用者保存 rcx 第四个参数 rdx 第三个参数 rsi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-03T13:53:48.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-03T13:53:48.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"程序结构和执行\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-03T13:53:48.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"AT&T汇编","slug":"at-t汇编","link":"#at-t汇编","children":[]},{"level":3,"title":"3.1","slug":"_3-1","link":"#_3-1","children":[]},{"level":3,"title":"3.5","slug":"_3-5","link":"#_3-5","children":[]},{"level":3,"title":"3.6","slug":"_3-6","link":"#_3-6","children":[]}],"readingTime":{"minutes":2.79,"words":838},"git":{"createdTime":1730442226000,"updatedTime":1730642028000,"contributors":[{"name":"ImoutoCon1999","email":"ImoutoCon1999@outlook.com","commits":1}]},"autoDesc":true,"filePathRelative":"2.csapp/程序结构和执行.md","categoryList":[{"id":"dd7fd8","sort":2,"name":"csapp"}],"bulletin":false}');export{h as comp,k as data};
