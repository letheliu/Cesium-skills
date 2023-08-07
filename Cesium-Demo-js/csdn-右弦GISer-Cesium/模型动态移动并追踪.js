let startPosition = new Cesium.Cartesian3.fromDegrees(120.14046454, 30.27415039);
 let endPosition = new Cesium.Cartesian3.fromDegrees(120.16701991, 30.27648221);
 let factor = 0;

 // 添加模型
 const vehicleEntity = viewer.entities.add({
     position: new Cesium.CallbackProperty(function() {
         if (factor > 5000) {
             factor = 0;
         }
         factor++;
         // 动态更新位置
         return Cesium.Cartesian3.lerp(startPosition, endPosition, factor / 5000.0, new Cesium.Cartesian3());
     }, false),
     model: {
         uri: "../.././icons/hz/model/car.glb",
         scale: 1000.0,
     },
 });

 viewer.trackedEntity = vehicleEntity;
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123430335