/**
 * @description: 三维鹰眼地图及与主图联动
 * @param {*}
 * @return {*}
 */
class HawkEye3DMap {
    constructor(viewer) {
        // 主图
        this._viewer = viewer;
        // 鹰眼图
        this._hawkEyeMap = null;
        // 判断事件是主图触发还是鹰眼地图触发
        this._isMainMapTrigger = false;
        this._isEyeMapTrigger = false;
    }

    // 初始化函数
    _init() {
        this._divInit();
        this._mapInit();
    }

    // 创建div，并设置样式
    _divInit() {
        let hawkEyeDiv = document.createElement("div");
        hawkEyeDiv.setAttribute('id', "hawkEye3dMap");
        hawkEyeDiv.style.cssText = "position: absolute;left: 70% ;top: 2% ;border-radius: 50% ;height: 160px;width: 160px;overflow: hidden;border: 2px solid #002FA7;"
        document.getElementsByTagName("body").item(0).appendChild(hawkEyeDiv);
    };

    _mapInit() {
        // div创建完成后才能初始化地图，否则会找不到div保错
        // 初始化地图
        this._hawkEyeMap = new Cesium.Viewer('hawkEye3dMap', {
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

        // 鹰眼图中添加高德路网中文注记图（鹰眼图中坐标偏移一点不影响）
        this._hawkEyeMap.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                minimumLevel: 3,
                maximumLevel: 18
            })
        );

        // 引起事件监听的相机变化幅度
        this._viewer.camera.percentageChanged = 0.02;
        this._hawkEyeMap.camera.percentageChanged = 0.5;

        this._bindEvent();
    }

    // 绑定事件
    _bindEvent() {
        // 鹰眼与主图同步
        this._viewer.camera.changed.addEventListener(this._syncEyeMap, this);
        // 第一次刷新渲染时联动
        this._viewer.scene.preRender.addEventListener(this._syncEyeMap, this);

        // 主图与鹰眼图同步
        this._hawkEyeMap.camera.changed.addEventListener(this._syncMap, this);
        this._hawkEyeMap.scene.preRender.addEventListener(this._syncMap, this);
    }

    // 同步主图与鹰眼地图
    _syncEyeMap() {
        // 监听主图
        new Cesium.ScreenSpaceEventHandler(this._viewer.canvas).setInputAction(() => {
            this._isMainMapTrigger = true;
            this._isEyeMapTrigger = false;
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 判断是否为主图移动
        if (!this._isMainMapTrigger) {
            return false;
        }

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

    // 鹰眼地图与主图联动效果
    _syncMap() {
        // 监听鹰眼地图
        new Cesium.ScreenSpaceEventHandler(this._hawkEyeMap.canvas).setInputAction(() => {
            this._isMainMapTrigger = false;
            this._isEyeMapTrigger = true;
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

        // 判断是否为鹰眼地图移动
        if (!this._isEyeMapTrigger) {
            return false;
        }
        this._viewer.camera.flyTo({
            destination: this._hawkEyeMap.camera.position,
            orientation: {
                heading: this._hawkEyeMap.camera.heading,
                pitch: this._hawkEyeMap.camera.pitch,
                roll: this._hawkEyeMap.camera.roll,
            },
            duration: 0.0,
        })
    }
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123121908

// 鹰眼地图初始化
let hawkEyeMap = new HawkEye3DMap(viewer);
hawkEyeMap._init();