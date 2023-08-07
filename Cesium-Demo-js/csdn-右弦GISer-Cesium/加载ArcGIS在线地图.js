// 加载ArcGIS在线地图
this.viewer.imageryLayers.addImageryProvider(
    new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer',
    })
);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123064560