<script src="https://cdn.jsdelivr.net/npm/@dvgis/cesium-map"></script>
// 添加高德地图并使用插件纠偏
viewer.imageryLayers.addImageryProvider(new Cesium.AmapImageryProvider({
    style: 'img',
    crs: 'WGS84'
}));
