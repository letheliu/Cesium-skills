// 加载3d tiles
let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '.././data/sz/tileset.json'
}));
viewer.zoomTo(tileset);

// 瓦片内容
let content = undefined;

// 设置瓦片加载完成监听事件
tileset.tileLoad.addEventListener(function(tile) {
    content = tile.content;
})

// 监听相机移动事件
viewer.camera.moveEnd.addEventListener(() => {
    try {
        // 计算当前可视范围矩形
        let viewRectangle = viewer.camera.computeViewRectangle();
        // 遍历所有要素
        let featuresLength = content.featuresLength;
        let count = 0;
        for (let i = 0; i < featuresLength; i++) {
            let feature = content.getFeature(i);
            let lon = feature.getProperty('lon');
            let lat = feature.getProperty('lat');

            let centerCartographic = new Cesium.Cartographic(Cesium.Math.toRadians(Number(lon)), Cesium.Math.toRadians(Number(lat)));
            // 要素中心点与当前可视范围做包含判断
            if (Cesium.Rectangle.contains(viewRectangle, centerCartographic)) {
                count++;
            }
        }
        // 输出
        console.log("当前可视范围内的要素数量为:");
        console.log(count);
    } catch {
        console.log("无法获取");
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123867440