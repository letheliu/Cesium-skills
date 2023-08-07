 // 加载3D Tiles
 let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
     url: '.././data/sz/tileset.json'
 }));

 // 聚焦
 viewer.zoomTo(tileset);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123488025