/*
 * @Description: 鹰眼地图效果
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-02-25 16:23:36
 * @LastEditors: Julian
 * @LastEditTime: 2022-02-26 12:40:35
 */

class HawkEyeMap {
    constructor(viewer) {
        this._viewer = viewer;
        this._hawkEyeMap = null;
    }

    // 初始化函数
    _init() {
        this._hawkEyeMap = new Cesium.Viewer('hawkEyeMap', {
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
        });
        this._hawkEyeMap.cesiumWidget.creditContainer.style.display = 'none';
        this._hawkEyeMap.scene.backgroundColor = Cesium.Color.TRANSPARENT;
        this._hawkEyeMap.imageryLayers.removeAll();

        // 鹰眼图中添加高德路网中文注记图
        this._hawkEyeMap.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                minimumLevel: 3,
                maximumLevel: 18
            })
        );

        // 引起事件监听的相机变化幅度
        this._viewer.camera.percentageChanged = 0.01;

        this._bindEvent();
    }

    // 绑定事件
    _bindEvent() {
        // 监听主图相机变化
        this._viewer.camera.changed.addEventListener(this._syncMap, this);
        // 第一次刷新渲染时联动（否则第一次鹰眼地图不会联动）
        this._viewer.scene.preRender.addEventListener(this._syncEyeMap, this);
    }

    // 同步主图与鹰眼地图
    _syncMap() {
        this._hawkEyeMap.camera.flyTo({
            destination: this._viewer.camera.position,
            orientation: {
                heading: this._viewer.camera.heading,
                pitch: this._viewer.camera.pitch,
                roll: this._viewer.camera.roll,
            },
            duration: 0.0,
        })
    }
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123109769

<div id="hawkEyeMap"></div>
/* 鹰眼图样式 */
#hawkEyeMap {
    position: absolute;
    left: 70%;
    top: 2%;
    border-radius: 50%;
    height: 160px;
    width: 160px;
    overflow: hidden;
    border: 2px solid #002FA7;
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123109769

<!-- 引入鹰眼地图js -->
<script src="./demo/hawkEyeMap/hawkEyeMap.js"></script>
// 鹰眼地图初始化
let hawkEyeMap = new HawkEyeMap(viewer);
hawkEyeMap._init();
