let tileset = new Cesium.Cesium3DTileset({
    url: '.././data/sz/tileset.json'
});

// 判断加载完成
tileset.readyPromise.then((tileset) => {
    viewer.scene.primitives.add(tileset);
    viewer.zoomTo(tileset);
    
    // 将3d tiles离地高度抬升100米
    let cartographic = Cesium.Cartographic.fromCartesian(
        tileset.boundingSphere.center
    );

    let surface = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        0.0
    );

    let offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        100.0
    );

    let translation = Cesium.Cartesian3.subtract(
        offset,
        surface,
        new Cesium.Cartesian3()
    );

    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123999347