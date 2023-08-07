// 获取3D tiles中所有feature的数据
 let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
     url: '.././data/sz/tileset.json'
 }));
 viewer.zoomTo(tileset);
 // 设置瓦片加载完成监听事件
 tileset.tileLoad.addEventListener(function(tile) {
     let content = tile.content;
     let featuresLength = content.featuresLength;
     console.log("要素数量为：");
     console.log(featuresLength);
     console.log("第一个要素为：");
     let feature = content.getFeature(0);
     console.log(feature);
 })
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123873146