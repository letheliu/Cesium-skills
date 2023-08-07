/**
 * @description: 多彩矩形地球（使用随机颜色）
 * @param {*} viewer
 * @return {*}
 */
function initColorfulRectEarth(viewer) {
    let instances = [];
    for (let lon = -180.0; lon < 180.0; lon += 5.0) {
        for (let lat = -90.0; lat < 90.0; lat += 5.0) {
            instances.push(new Cesium.GeometryInstance({
                geometry: new Cesium.RectangleGeometry({
                    rectangle: Cesium.Rectangle.fromDegrees(lon, lat, lon + 5.0, lat + 5.0)
                }),
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({
                        alpha: 0.5
                    }))
                }
            }));
        }
    }
    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: instances,
        appearance: new Cesium.PerInstanceColorAppearance()
    }));
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123071743