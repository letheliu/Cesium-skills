// https://blog.csdn.net/weixin_45782925/article/details/124450047

$.get('./data/wh/wh.geojson').then((data) => {
    let features = data.features;
    let positionArray = [];

    // 获取区域的经纬度坐标
    for (let i = 0; i < features[0].geometry.coordinates[0].length; i++) {
        let coor = features[0].geometry.coordinates[0][i];
        positionArray.push(coor[0]);
        positionArray.push(coor[1]);
    }


    // 遮罩
    let polygonEntity = new Cesium.Entity({
        polygon: {
            hierarchy: {
                // 添加外部区域为1/4半圆，设置为180会报错
                positions: Cesium.Cartesian3.fromDegreesArray([0, 0, 0, 90, 179, 90, 179, 0]),
                // 中心挖空的“洞”
                holes: [{
                    positions: Cesium.Cartesian3.fromDegreesArray(positionArray)
                }]
            },
            material: new Cesium.Color(15 / 255.0, 38 / 255.0, 84 / 255.0, 0.7)
        }
    })

    // 边界线
    let lineEntity = new Cesium.Entity({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(positionArray),
            width: 5,
            material: Cesium.Color.YELLOW,
        }
    })

    viewer.entities.add(polygonEntity);
    viewer.entities.add(lineEntity);
    viewer.flyTo(lineEntity);
});