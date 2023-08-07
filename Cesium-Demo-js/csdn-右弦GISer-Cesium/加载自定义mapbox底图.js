// 添加mapbox自定义地图
        var mapboxLayer = new Cesium.MapboxStyleImageryProvider({
            username: "你的账号名称",
            styleId: '你的地图Id',
            accessToken: '你的accessToken',
        });
        viewer.imageryLayers.addImageryProvider(mapboxLayer);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122555686