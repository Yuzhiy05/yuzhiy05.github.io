import{_ as i,c as a,a as h,o as n}from"./app-BKu1TSIW.js";const t={};function k(l,s){return n(),a("div",null,s[0]||(s[0]=[h(`<h3 id="concrete-class" tabindex="-1"><a class="header-anchor" href="#concrete-class"><span>concrete class</span></a></h3><p>具体类的行为应该和内建类型一样。例如如复数类和int类型除了在数学概念上的可能有操作不同。但使用时不应该有太大从差别。</p><blockquote><p>That allows implementations to be optimally efficient in time and space. In particular, it allows us to:<br> • place objects of concrete types on the stack, in statically allocated memory, and in other objects (§6.4.2);<br> • refer to objects directly (and not just through pointers or references); • initialize objects immediately and completely (e.g., using constructors; §2.3.2); and copy objects (§3.3)</p></blockquote><p>1.第一条暗示了具体类和其内部内存分配和其本身对象分离的实现。这就是标准库容器的做法。std::vector的模板参数有两个第二个为分配器，专门用作内存分配。<br> 2.第二条我没有看懂<br> 3，立即完整的初始化和拷贝对象，毕竟你不想引入一个对象时其中存在无效值。</p><p>如std::vector和std::string他们都是因此设计资源管理类型。这里有标准库简化版的complex的例子</p><div class="language-c++ line-numbers-mode" data-ext="c++" data-title="c++"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> complex</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">double</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // representation: two doubles</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">public</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">complex</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">double</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> r</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> double</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> :</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">r</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">},</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {}</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // construct complex from two scalars</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">complex</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">double</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> r</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> :</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">r</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">},</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {}</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // construct complex from one scalar</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">complex</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> :</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">},</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {}</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // default complex: {0,0}</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">double</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> real</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> const</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> real</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">double</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> d</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">d</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">double</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> imag</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> const</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> imag</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">double</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> d</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">d</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">complex</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&amp;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> operator</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">+=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">complex</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> z</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> re</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">z</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> im</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">z</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ∗</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">this</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // add to re and im</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// and return the result</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&amp;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> operator−</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex z</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> re−</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">z</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">re</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> im−</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">z</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">im</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ∗</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">this</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&amp;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> operator∗</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // defined out-of-class somewhere</span></span>
<span class="line"><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">complex</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&amp;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> operator</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">/=</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">complex</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // defined out-of-class somewhere</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">};</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">//类外其他地方</span></span>
<span class="line"><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">complex</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> operator</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">+</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">complex</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> complex</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> a</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex operator−</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> complex b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> a−</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">b</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex operator−</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">complex a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">−</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">real</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(),</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> −</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">a</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">imag</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()};</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> }</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // unar y minu</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意complex没有参数的构造函数，称为默认构造。定义这样的构造函数保证消除了内部类型未初始化变量的可能。对于一些简单操作为了内联而不生成对应函数调用的机器码而定义在类内。如构造函数，operator+=。<em>对于const限定符修饰的函数意味了此函数不会修改调用他们的对象</em>。 还有一些操作需要直接访问complex的对象表示，我们通常分离实现定义在类外的别处。对于按值传递的函数，因为是对原对象的复制所以可以修改。</p>`,7)]))}const e=i(t,[["render",k],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/test1/chapter3-4/","title":"chapter3-4","lang":"zh-CN","frontmatter":{"title":"chapter3-4","createTime":"2024/11/02 23:46:13","permalink":"/test1/chapter3-4/","description":"concrete class 具体类的行为应该和内建类型一样。例如如复数类和int类型除了在数学概念上的可能有操作不同。但使用时不应该有太大从差别。 That allows implementations to be optimally efficient in time and space. In particular, it allows us t...","head":[["meta",{"property":"og:url","content":"https://github.com/Yuzhiy05/Yuzhiy05.github.io/test1/chapter3-4/"}],["meta",{"property":"og:title","content":"chapter3-4"}],["meta",{"property":"og:description","content":"concrete class 具体类的行为应该和内建类型一样。例如如复数类和int类型除了在数学概念上的可能有操作不同。但使用时不应该有太大从差别。 That allows implementations to be optimally efficient in time and space. In particular, it allows us t..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-02T08:48:44.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-02T08:48:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"chapter3-4\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-02T08:48:44.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"concrete class","slug":"concrete-class","link":"#concrete-class","children":[]}],"readingTime":{"minutes":1.99,"words":597},"git":{"createdTime":1730642028000,"updatedTime":1733129324000,"contributors":[{"name":"Yuzhiy05","email":"ImoutoCon1999@outlook.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/test1/chapter3-4.md","bulletin":false}');export{e as comp,r as data};
