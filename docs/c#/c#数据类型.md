


1.简单介绍常见的C#应用到的数据类型

Datatable

命名空间:
System.Data

Datatable是个抽象上的二维表

构造函数
DataTable()	
在不使用参数的情况下初始化 DataTable 类的新实例。

DataTable(String)	
使用指定的表名初始化 DataTable 类的新实例。

DataTable(String, String)	
使用指定的表名和命名空间初始化 DataTable 类的新实例。

存在一个过时的构造函数不予展示


常用属性

CaseSensitive	
指示表中的字符串比较是否区分大小写。

ChildRelations	
获取此 DataTable 的子关系的集合。

Columns	
获取属于该表的列的集合。

Constraints	
获取由该表维护的约束的集合。

Container	
获取组件的容器。
(继承自 MarshalByValueComponent)


DataSet	
获取此表所属的 DataSet。

DefaultView	
获取可能包含筛选视图或游标位置的表的自定义视图。


HasErrors	
获取一个值，该值指示该表所属的 DataSet 的任何表的任何行中是否有错误。



MinimumCapacity	
获取或设置该表最初的起始大小。


Rows	
获取属于该表的行的集合。

Site	
获取或设置 ISite 的 DataTable。

TableName	
获取或设置 DataTable 的名称。

不常用的属性:（折叠）
DesignMode	
获取指示组件当前是否处于设计模式的值。
(继承自 MarshalByValueComponent)

DisplayExpression	
获取或设置一个表达式，该表达式返回的值用于在用户界面中表示此表。 DisplayExpression 属性用于在用户界面中显示此表名。

Events	
获取附加到该组件的事件处理程序的列表。(继承自 MarshalByValueComponent)

ExtendedProperties	
获取自定义用户信息的集合。

IsInitialized	
获取一个值，该值指示是否已初始化 DataTable。

Locale	
获取或设置用于比较表中字符串的区域设置信息。

Namespace	
获取或设置 DataTable 中所存储数据的 XML 表示形式的命名空间。

ParentRelations	
获取该 DataTable 的父关系的集合。

Prefix	
获取或设置 DataTable 中所存储数据的 XML 表示形式的命名空间。

PrimaryKey	
获取或设置用作数据表主键的列数组。

RemotingFormat	
获取或设置序列化格式。

常见方法

BeginInit()	
开始初始化在窗体上使用或由另一个组件使用的 DataTable。 初始化发生在运行时。

Clear()	
清除所有数据的 DataTable。

Clone()	
克隆 DataTable 的结构，包括所有 DataTable 架构和约束。

EndInit()	
结束在窗体上使用或由另一个组件使用的 DataTable 的初始化。 初始化发生在运行时。

ImportRow(DataRow)	
将 DataRow 复制到 DataTable 中，保留任何属性设置以及初始值和当前值。

Merge(DataTable)	
将指定的 DataTable 与当前 DataTable 合并。

Merge(DataTable, Boolean)	
将指定的 DataTable 与当前 DataTable 合并，指示是否保留当前 DataTable 中的更改。

Merge(DataTable, Boolean, MissingSchemaAction)	
将指定的 DataTable 与当前 DataTable 合并，指示是否保留更改以及如何处理当前 DataTable 中缺失的架构

NewRow()	
创建与该表具有相同架构的新 DataRow。

示例

```c#
var dt=new DataTable("table1");
var dt2=new DataTable();

var dc =new DataColum();
dt.Columns.Add(dc);
//
dt.Columns.Add("column1",System.Type.GetType("System.string"));
dt.Columns.Add("column2",typeof(String))

var dc2=new DataColumn("column2",typeof(String));
dt.Colums.Add(dc2);

//添加行
//与创建列不同的是，必须使用NewRow创建新建行
var dr=dt.NewRow()
dr["columns1"]="1";
dr[0]="2";
dt.Rows.Add(dr);

//使用索引或列名
dt.Rows[0][0]="3";
dt.Rows[0]["column"]="4";
//获取值
var str=dt.Row[0][0].ToString();

//筛选行
//使用Select方法

```





