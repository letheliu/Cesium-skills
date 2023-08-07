// 使用primitive方式加载geojson
 let urlPath = './data/park/parks.geojson';
 // 使用jQuery异步加载json数据
 $.get(urlPath, function(data) {
     const features = data.features;
     addDataToGlobe(features);
 })

 function addDataToGlobe(features) {
     const instances = [];
     for (let i = 0; i < features.length; i++) {
         for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
             const polygonArray = features[i].geometry.coordinates[j].toString().split(',');
             const polygon = new Cesium.PolygonGeometry({
                 polygonHierarchy: new Cesium.PolygonHierarchy(
                     Cesium.Cartesian3.fromDegreesArray(polygonArray)
                 ),
                 // 设置面的拉伸高度
                 extrudedHeight: 35,
             });
             const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
             instances.push(new Cesium.GeometryInstance({
                 geometry: geometry,
                 attributes: {
                     color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.GREEN),
                 },
             }));
         }
     }
     // 合并单个geometry,提高渲染效率
     const primitive = new Cesium.Primitive({
         geometryInstances: instances,
         appearance: new Cesium.PerInstanceColorAppearance(),
     });
     this.viewer.scene.primitives.add(primitive);
 }
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122868471