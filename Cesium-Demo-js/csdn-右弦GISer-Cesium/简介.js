1.什么是Cesium？
Cesium是AGI公司计算机图形开发小组与2011年研发的三维地球和地图可视化开源JavaScript库，Cesium一词来源于化学元素铯，铯是制造原子钟的关键元素，研发小组通过命名强调Cesium产品精益求精，专注时间数据可视化。Cesium为三维GIS提供了一个高效的数据可视化平台。即：
（1）Cesium是一个跨平台、跨浏览器的展示三维地球和地图的JavaScript库
（2）Cesium使用WebGL来进行硬件加速图形，使用时不需要任何插件支持。
（3）Cesium是基于Apache2.0许可的开源程序，可以免费用于商业和非商业用途。

2.Cesium能做什么？

Cesium的知识体系，跨GIS、Web前端和图形学。
Cesium用于地理数据可视化。支持海量数据的高效渲染，支持时间序列动态数据的三维可视化，具备太阳、大气、云雾等地理环境要素的动态模拟和地形等要素的加载绘制。包含丰富的可用工具。即Cesium基本控件所提供的工具，如地理编码器，图层选择器等。
Cesium在项目中的定位如下图：


主要的功能有：
（1）使用3d tiles格式流式加载各种不同的3d数据，包含倾斜摄影模型、三维建筑物、CAD和BIM的外部和内部，点云数据。并支持样式配置和用户交互操作。
（2）全球高精度地形数据可视化，支持地形夸张效果、以及可编程实现的等高线和坡度分析效果。
（3）支持多种资源的图像图层，包括WMS，TMS，WMTS以及时序图像。图像支持透明度叠加、亮度、对比度、GAMMA、色调、饱和度都可以动态调整。支持图像的卷帘对比。
（4）支持标准的矢量格式KML、GeoJSON、TopoJSON、以及矢量的贴地效果。
（5）三维模型支持gltf2.0标准的PRB材质、动画、蒙皮和变形效果。贴地以及高亮效果。
（6）使用CZML支持动态时序数据的展示。
（7）支持各种几何体：点、线、面、标注、公告牌、立方体、球体、椭圆体、圆柱体、走廊、管径、墙体。
（8）可视化效果包括：基于太阳位置的阴影、自身阴影、柔和阴影。
（9）支持大气、雾、太阳、阳光、月亮、星星、水面。
（10）粒子特效：烟、火、火花。
（11）地形、模型、3d tiles模型的面裁剪。
（12）对象点选和地形点选。
（13）支持鼠标和触摸操作的缩放、渲染、惯性平移、飞行、任意视角、地形碰撞检测。
（14）支持3d地球、2d地图、2.5d哥伦布模式。3d视图可以使用透视和正视两种投影方式。
支持点、标注、公告牌的聚集效果。

3.Cesium的依赖性
①基于HTML5标准，无插件，跨平台
②无法独立运行，依赖于浏览器
③浏览器基于HTTP协议，Cesium正确运行必须有HTTP Server
④HTTP Server的实现不限于开发语言和服务器（可不学nodejs）


4.Cesium学习参考
Cesium做为三维GIS开发最火爆的前端框架，在三维数据管理、三维地形分析、动态场景可视化等方面广泛应用。

Cesium学习可用参考的文档有：
1.官网API文档：官网
2.官网沙盒例子：官网
3.Cesiumlab
4.Cesium中文网
5.一些学习者分享的博客文章
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122687181