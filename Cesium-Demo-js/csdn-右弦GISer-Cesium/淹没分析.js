/**
 * 淹没分析函数，通过拉伸面的高度来进行分析
 * @param {*} viewer
 * @param {*} targertWaterHeight ：目标水位高度
 * @param {*} positions ：研究区域底部坐标数组
 * @param {*} waterHeight ：当前水位高度
 */
function induationAnalysis(viewer, targertWaterHeight, positions, waterHeight) {
    viewer.entities.add({
        polygon: {
            hierarchy: new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(positions)),
            perPositionHeight: true,
            // 使用回调函数Callback，直接设置extrudedHeight会导致闪烁
            extrudedHeight: new Cesium.CallbackProperty(function() {
                waterHeight += 0.2;
                if (waterHeight > targertWaterHeight) {
                    waterHeight = targertWaterHeight;
                }
                return waterHeight;
            }, false),
            material: new Cesium.Color.fromBytes(64, 157, 253, 150),
        }
    });
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122941134