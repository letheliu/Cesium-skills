/**
 * @description: 扩散墙效果（基于turf实现，可以放到或缩小）
 * @param {*} _positions：底部坐标，单个面坐标的格式为[[[lon,lat]]]
 * @param {*} _scale：最大缩放比例
 * @param {*} _height：墙高度
 * @param {*} _material：墙材质
 * @return {*}
 */
function wallDiffuse(_positions, _scale, _height, _material) {
    let scale = 1;
    this.viewer.entities.add({
        name: "扩散墙",
        wall: {
            positions: new Cesium.CallbackProperty(() => {
                // 判断是放大还是缩小
                if (_scale >= 1) {
                    scale += _scale / 200.0;
                    if (scale >= _scale) {
                        scale = 1.0;
                    }
                } else {
                    scale -= _scale / 200.0;
                    if (scale <= _scale) {
                        scale = 1;
                    }
                }

                let polygon = turf.polygon(_positions);
                let scaledPolygon = turf.transformScale(polygon, scale);
                let newPositions = [];
                // 遍历多边形
                for (let i = 0; i < scaledPolygon.geometry.coordinates[0].length; i++) {
                    // 遍历节点
                    scaledPolygon.geometry.coordinates[0][i].forEach((item) => {
                        newPositions.push(item);
                    })
                    newPositions.push(_height);
                }
                return Cesium.Cartesian3.fromDegreesArrayHeights(newPositions);
            }, false),
            material: _material
        }
    });
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123333391

// 扩散墙
let wallPositions = [
   [
       [113.8236839, 22.528061],
       [113.9236839, 22.628061],
       [114.0236839, 22.528061],
       [113.9236839, 22.428061],
       [113.8236839, 22.528061],
   ]
];
wallDiffuse(wallPositions, 3.0, 5000.0, new Cesium.Color(1.0, 1.0, 0.0, 0.7));
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123333391
