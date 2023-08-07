/*
 * @Description: 立体雷达扫描效果（参考开源代码）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-05 10:22:01
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-05 15:04:44
 */
function radarSolidScan(options) {
    this._viewer = options.viewer;
    // 半径
    this._radius = options.radius;
    // 扫描扇形颜色
    this._color = options.color;
    // 扫描速度
    this._speed = options.speed;
    // 中心点坐标经纬度
    this._cenLon = options.position[0];
    this._cenLat = options.position[1];

    // 先建立椭球体
    this._viewer.entities.add({
        position: new Cesium.Cartesian3.fromDegrees(this._cenLon, this._cenLat),
        name: "立体雷达扫描",
        ellipsoid: {
            radii: new Cesium.Cartesian3(this._radius, this._radius, this._radius),
            material: this._color,
            outline: true,
            outlineColor: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
            outlineWidth: 1,
        }
    })

    let heading = 0;
    // 每一帧刷新时调用
    this._viewer.clock.onTick.addEventListener(() => {
        heading += this._speed;
        positionArr = calculatePane(113.9236839, 22.528061, 1000.0, heading);
    })

    // 创建1/4圆形立体墙
    let radarWall = this._viewer.entities.add({
        wall: {
            positions: new Cesium.CallbackProperty(() => {
                return Cesium.Cartesian3.fromDegreesArrayHeights(positionArr);
            }, false),
            material: this._color,
        }
    })

    // 计算平面扫描范围
    function calculatePane(x1, y1, radius, heading) {
        var m = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(x1, y1));
        var rx = radius * Math.cos(heading * Math.PI / 180.0);
        var ry = radius * Math.sin(heading * Math.PI / 180.0);
        var translation = Cesium.Cartesian3.fromElements(rx, ry, 0);
        var d = Cesium.Matrix4.multiplyByPoint(m, translation, new Cesium.Cartesian3());
        var c = Cesium.Cartographic.fromCartesian(d);
        var x2 = Cesium.Math.toDegrees(c.longitude);
        var y2 = Cesium.Math.toDegrees(c.latitude);
        return calculateSector(x1, y1, x2, y2);
    }

    // 计算竖直扇形
    function calculateSector(x1, y1, x2, y2) {
        let positionArr = [];
        positionArr.push(x1);
        positionArr.push(y1);
        positionArr.push(0);
        var radius = Cesium.Cartesian3.distance(Cesium.Cartesian3.fromDegrees(x1, y1), Cesium.Cartesian3.fromDegrees(x2, y2));
        // 扇形是1/4圆，因此角度设置为0-90
        for (let i = 0; i <= 90; i++) {
            let h = radius * Math.sin(i * Math.PI / 180.0);
            let r = Math.cos(i * Math.PI / 180.0);
            let x = (x2 - x1) * r + x1;
            let y = (y2 - y1) * r + y1;
            positionArr.push(x);
            positionArr.push(y);
            positionArr.push(h);
        }
        return positionArr;
    }
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123294411


radarSolidScan({
     viewer: this.viewer,
     position: [113.9236839, 22.528061],
     radius: 1000.0,
     color: new Cesium.Color(1.0, 1.0, 0.0, 0.3),
     speed: 5.0
 })
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123294411