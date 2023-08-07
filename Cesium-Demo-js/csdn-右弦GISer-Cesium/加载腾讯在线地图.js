// 添加腾讯在线地图
this.viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
   // 影像图
   url: "https://p2.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{reverseY}.jpg?version=400",
   customTags: {
       sx: function(imageryProvider, x, y, level) {
           return x >> 4;
       },
       sy: function(imageryProvider, x, y, level) {
           return ((1 << level) - y) >> 4
       }
   }
   // 矢量图
   // url: "https://rt3.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=1&version=297",
   // 黑色风格
   // url: "https://rt3.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=4&scene=0",
   // 注记图1
   // url: "https://rt3.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=3&scene=0",
   // 注记图2
   // url: "https://rt3.map.gtimg.com/tile?z={z}&x={x}&y={reverseY}&styleid=2&version=297",
}))
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123274831