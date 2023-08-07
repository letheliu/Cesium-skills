/**
 * @description: 获取当前鼠标点击位置坐标，并添加到图上显示
 * @param {*} _viewer
 * @return {*}
 */
function getClickPointAdd(_viewer) {
    // 注册屏幕点击事件
    let handler = new Cesium.ScreenSpaceEventHandler(_viewer.scene.canvas);
    handler.setInputAction(function(event) {
        // 转换为不包含地形的笛卡尔坐标
        let clickPosition = _viewer.scene.camera.pickEllipsoid(event.position);
        // 转经纬度（弧度）坐标
        let radiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
        // 转角度
        console.log("经度：" + Cesium.Math.toDegrees(radiansPos.longitude) + ", 纬度：" + Cesium.Math.toDegrees(radiansPos.latitude));

        // 添加点
        _viewer.entities.add({
            position: clickPosition,
            point: {
                color: Cesium.Color.YELLOW,
                pixelSize: 30,
            }
        })
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123366325

disableDepthTestDistance: 1000.0,
disableDepthTestDistance: Number.POSITIVE_INFINITY,

position:Cesium.Cartesian3.fromDegrees(lon, lat, height);
// 关闭深度检测
viewer.scene.globe.depthTestAgainstTerrain = false;