<script src="https://cdn.jsdelivr.net/npm/@dvgis/cesium-map"></script>
// 添加百度地图并使用插件纠正偏移
 viewer.imageryLayers.addImageryProvider(new Cesium.BaiduImageryProvider({
     style: 'normal',
     crs: 'WGS84'
 }));


https://github.com/dvgis/cesium-map(百度地图纠偏插件-digital visual，即 DC-SDK）