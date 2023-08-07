1.概述
Cesium为开发者提供了丰富的图形绘制和空间数据管理的API，可以分为两类，一类是面向图形开发人员的低层次API，通常被称为Primitive API，另一类是用于驱动数据可视化的高层次API，称为Entity API。
总的来说，Primitive偏底层，图形绘制和数据加载效率较高，但开发难度更大，而Entity基于Primitive做了进一步封装，调用便捷。

2.Primitive
Primitive通常有两个部分组成：

2.1Geometry
几何形状，定义了Primitive的结构，例如点、线、面、体等。

2.2Appearance
外观，定义了Primitive的着色（shading），包括顶点着色器（vertex shader）、片元着色器（fragment shader），以及渲染状态（render state）。

2.3优势与不足
使用Geometry和Apperance的优势是：
（1）高性能。绘制大量Primitive时，可以将其合并为单个Geometry，提高效率，合并由Web worker执行，UI保持响应性。
（2）灵活性。Geometry与Appearance相互独立，可分别修改。
（3）低级别访问，易于修改着色器，使用自定义的渲染状态。
不足之处：
（1）实现同样的功能，需要比entity编写更多的代码。
（2）需要开发者对图形编程，OpenGL有较为深入的了解。

3.Entity
entity是对primitive的封装，使得使用者专注于数据的呈现，而不用去纠结底层的实现机制。
entity中绘制几何体的接口是graphics，而primitive则是geometry。
对于材质而言，entity是MaterialProperty，而primitive的材质则是Material，使用上要注意区别。
entity更方便于实际可视化的操作，虽然便捷，但不利用自定义可视化效果。
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122690683