// 昼夜交替
updateLighting(viewer);

/**
 * @description: 昼夜交替效果
 * @param {*} _viewer
 * @return {*}
 */
function updateLighting(_viewer) {
    // OSM标准风格地图
    const dayLayer = _viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
            url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            subdomains: ["a", "b", "c", "d"],
        })
    );

    // OSM暗色系地图
    const nightLayer = _viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            subdomains: ["a", "b", "c", "d"],
        })
    );
    // 启用光照
    _viewer.scene.globe.enableLighting = true;
    _viewer.clock.shouldAnimate = true;
    _viewer.clock.multiplier = 5000;
    nightLayer.dayAlpha = 0.0;
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123507280