// 添加天地图影像注记底图
this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.gov.cn/cia_w/wmts?tk=自己申请的key",
    layer: "cia",
    style: "default",
    tileMatrixSetID: "w",
    format: "tiles",
    maximumLevel: 18
}))
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123029795