// 添加高德影像图
 atLayer = new Cesium.UrlTemplateImageryProvider({
     url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
     minimumLevel: 3,
     maximumLevel: 18
 })
 viewer.imageryLayers.addImageryProvider(atLayer);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122983947
