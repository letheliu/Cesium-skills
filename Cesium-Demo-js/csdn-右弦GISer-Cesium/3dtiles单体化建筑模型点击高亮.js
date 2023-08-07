 // 添加3D tiles单体化建筑白膜并点击高亮显示

 let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
     url: '.././data/sz/tileset.json'
 }));

 // 聚焦
 viewer.zoomTo(tileset);

 // 高亮元素
 const hightLighted = {
     feautre: undefined,
     originalColor: new Cesium.Color(),
 }

 viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(event) {
     // 清除之前的高亮元素
     if (Cesium.defined(hightLighted.feature)) {
         hightLighted.feature.color = hightLighted.originalColor;
         hightLighted.feature = undefined;
     }

     // 选择新要素
     const pickedFeature = viewer.scene.pick(event.position);
     if (!Cesium.defined(pickedFeature)) {
         return;
     }

     // 存储选中要素的信息
     hightLighted.feature = pickedFeature;
     Cesium.Color.clone(
         pickedFeature.color,
         hightLighted.originalColor
     );
     // 高亮选中元素
     pickedFeature.color = Cesium.Color.YELLOW;
 }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123773002