// 加载公园面状文件并拉伸一定高度
Cesium.GeoJsonDataSource.load('./data/park/parks.geojson').then(function(dataSource) {
   this.viewer.dataSources.add(dataSource);
   let entities = dataSource.entities.values;
   for (let i = 0; i < entities.length; i++) {
       let entity = entities[i];
       entity.polygon.material = new Cesium.Color(204 / 255, 247 / 255, 217 / 255, 0.6);
       entity.polygon.outline = false;
       // 将高度拉伸至35米
       entity.polygon.extrudedHeight = 35;
   }
});
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122683036