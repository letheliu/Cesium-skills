// 获取当前地图中心的经纬度
 function getCenterPosition(viewer) {
     let centerResult = viewer.camera.pickEllipsoid(
         new Cesium.Cartesian2(
             viewer.canvas.clientWidth / 2,
             viewer.canvas.clientHeight / 2,
         ),
     )
     let curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(centerResult);
     let curLongitude = (curPosition.longitude * 180) / Math.PI;
     let curLatitude = (curPosition.latitude * 180) / Math.PI;
     return {
         lon: curLongitude,
         lat: curLatitude,
     }

————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122559517