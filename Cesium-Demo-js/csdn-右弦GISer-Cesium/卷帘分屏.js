// 创建div
<div id='split'></div>

// 设置样式
<style>
    #split {
        position: absolute;
        left: 50%;
        top: 0;
        background-color: red;
        width: 3px;
        height: 100%;
    }
</style>
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123121883

const viewer = new Cesium.Viewer("cesiumContainer");

// 加载OSM在线地图（黑色风格）
const layerLeft = viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c", "d"],
    })
);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123121883

// 设置分屏显示
layerLeft.splitDirection = Cesium.ImagerySplitDirection.LEFT;

// 设置分屏位置
const split = document.getElementById("split");
viewer.scene.imagerySplitPosition = split.offsetLeft / split.parentElement.offsetWidth;
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123121883