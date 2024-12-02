---
title: map_str
createTime: 2024/12/02 20:15:05
permalink: /data_struct/map_str/
---
# 图解析

图由顶点集和边集组成，记G=(V,E)   

V(G)表示图G中的顶点有限非空集  
E(G)表示图G中顶点之间的关系(边)集合  
$$
\begin{align*}
&V=\{v1,v2,v3,v4...\},|V|表示图G中顶点个数，也称图G的阶\\  
&E=\{(u,v)|u \in V,v\in V \} ,|E|表达式图G中的边数
\end{align*} 
$$

1.有向图
$$
\begin{align*}  
&G_{1}=(V_{1},E_{1})\\
&V_{1}=\{1,2,3\}\\ 
&E_{1}=\{(1,2),(1,3),(1,4),(2,3),(2,4),(3,4)\}
\end{align*}
$$


定义节点类型与边类型
node_type
```c++
template<typename value_t>
struct{
    int index;
    value_t value
}
template<typename arc_t>
struct{
  int pre_;//出度节点
  int next_;//入度节点
  int weight;//边的权值
};
```
边节点用链表实现是否更好思考？


