// 加载OSM在线地图（标准风格）
this.viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
        url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        subdomains: ["a", "b", "c", "d"],
    })
);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123064581
// 加载OSM在线地图（黑色风格）
 this.viewer.imageryLayers.addImageryProvider(
     new Cesium.UrlTemplateImageryProvider({
         url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
         subdomains: ["a", "b", "c", "d"],
     })
 );
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123064581