角度转弧度：let radians = Cesium.Math.toRadians(degrees);
弧度转角度：let degrees = Cesium.Math.toDegrees(radians);

// 角度制与笛卡尔转换
// 格式：[113.21, 25.61, 100.0]，高度默认为0，可以不写
let cartesian3 = Cesium.Cartesian3.fromDegrees(lon, lat, height);
// 格式：[113.21, 25.61, 113.54, 25.24]，不带高度格式的数组
let cartesian3s = Cesium.Cartesian3.fromDegreesArray(coordinates);
// 格式：[113.21, 25.61, 100.0, 113.54, 25.24, 200.0]，带高度格式的数组
let cartesian3s = Cesium.Cartesian3.fromDegreesArrayHeights(coordinates);

// 弧度制也类似，使用Cesium.Cartesian3.fromRadians, Cesium.Cartesian3.fromRadiansArray, Cesium.Cartesian3.fromRadiansArrayHeights
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123365834

let position = Cesium.Cartographic.fromDegrees(lon, lat, height);
// 单个坐标
let cartesian3 = Cesium.Ellipsoid.WGS84.cartographicToCartesian(position);
// 多个坐标
let cartesian3s = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(positions);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123365834

let cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
// 单个坐标
let cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian3);
// 多个坐标
let cartographics = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographic(cartesain3Array);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123365834


let cartesain3 = viewer.scene.camera.pickEllipsoid(cartesian2);
let cartesian3 = viewer.scene.pickPosition(cartesian2);
let ray = viewer.camera.getPickRay(cartesian2);
let cartesian3 = globe.pick(ray,viewer.scene);
let cartesian2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates(cartesian3);
let modelMatrix = Cesium.Transforms.esatNorthUpToFixedFrame(cartesian3);
// point：局部坐标；result：椭球笛卡尔坐标
let result = Cesium.Matrix4.multiplyByPoint(modelMatrix, point, new Cesium.Cartesian3());