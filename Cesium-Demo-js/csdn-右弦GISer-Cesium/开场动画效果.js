let position = {
   lon: 108.9423,
   lat: 34.2609,
   height: 15000
};
flyToPosition(viewer, position, 4);

/**
 * @description : 初始场景动画，飞到目标点
 * @param {*} viewer 
 * @param {*} position ：目标点位置
 * @param {*} duration ：持续时间
 * @return {*}
 */
function flyToPosition(viewer, position, duration) {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.height),
        duration: duration,
    });
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123129641