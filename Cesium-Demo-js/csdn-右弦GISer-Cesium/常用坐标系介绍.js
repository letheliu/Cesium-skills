学习Cesium和学习GIS一样，坐标参考系作为数学基础是必须要了解的部分，本篇文章将详细介绍Cesium中的坐标系，避免在之后的开发中因为坐标参考系的问题而踩坑。

1.屏幕坐标系

屏幕坐标系即二维笛卡尔坐标系，Cesium中使用Cartesian2来描述，屏幕左上角为原点（0,0），单位为像素值，屏幕水平方向为X轴，向右为正，垂直方向为Y轴，向下为正。

2.笛卡尔空间直角坐标系

在计算机进行绘图的时候，由于不方便直接使用经纬度绘图，一般会将坐标系转换为笛卡尔坐标系（坐标系原点为椭球中心），Cesium中使用Cartesian3表示。

3.WGS-84地理坐标系
WGS84坐标系是地理信息数据最常用的坐标系，基于参考椭球体使用大地经度、大地纬度和大地高三个参数表示具体的空间点位。
在二维GIS中地理数据的参考系通常用地理坐标系和投影坐标系两种，但在三维中一般都使用WGS84地理坐标系，所以在加载本地地理数据的时候，一定要先将本地的数据坐标系设置为WGS84，若设置成WGS84-Web Mercator或其他坐标系，则会产生偏差，使得数据无法叠加到一起。
在表示经纬度的时候，有度数制和弧度制两种，在开发过程中，经常要进行相互转换。Cesium中使用Cartographic表示弧度制的WGS84地理坐标系。


4.WebGL坐标系

Cesium使用WebGL进行图形渲染，因此WebGL坐标系也必须了解。在进行自定义渲染时需要用到WebGL坐标系，WebGL坐标系也是右手坐标系，X轴水平，正方向为右；Y轴垂直，正方向为上；Z轴垂直与屏幕，正方向为外。
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122688128