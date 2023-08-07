https://github.com/alberto-acevedo/cesium-navigation

<!-- 引入罗盘控件 -->
    <script src="./src/navigation/viewerCesiumNavigationMixin.min.js"></script>
    // 添加罗盘，比例尺等控件
    viewer.extend(Cesium.viewerCesiumNavigationMixin);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122554744


/* 罗盘定位 */

.compass {
    position: absolute;
    left: 2%;
    top: 2%;
}


/* 比例尺位置 */

.distance-legend {
    position: absolute;
    right: 2%;
    bottom: 6%;
}


/* 缩放位置 */

.navigation-controls {
    position: absolute;
    bottom: 10%;
    right: 2%;
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122554744