<div id="cesiumContainer">
    <div id="view3D"></div>
    <div id="view2D"></div>
</div>

 <style>
        #cesiumContainer {
            display: flex;
            width: 100%;
            height: 100%;
        }
        
        #view3D {
            display: inline-block;
            width: 100%;
        }
        
        #view2D {
            display: inline-block;
            width: 100%;
        }
    </style>
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/124293349


let view2D = new Cesium.Viewer("view2D", {
    sceneMode: Cesium.SceneMode.SCENE2D
});

let view3D = new Cesium.Viewer("view3D");


/**
 * @description: 将二维地图的视图与三维同步
 * @param {*}
 * @return {*}



 */
function sync2D() {
    // 三维地图中心点
    let center = new Cesium.Cartesian2(
        Math.floor(view3D.canvas.clientWidth / 2),
        Math.floor(view3D.canvas.clientHeight / 2)
    );

    console.log(center);

    // 转为世界坐标系
    let position = view3D.scene.camera.pickEllipsoid(center);

    // 判断中心点是否在椭球体上
    if (Cesium.defined(position)) {

        // 获取三维地图中心点与相机之间的距离
        let distance = Cesium.Cartesian3.distance(
            position,
            view3D.scene.camera.positionWC
        );

        // 更新二维地图
        view2D.scene.camera.lookAt(
            position,
            new Cesium.Cartesian3(0.0, 0.0, distance)
        )
    }


}

view3D.camera.percentageChanged = 0.01;
// 监听三维地图变化
view3D.camera.changed.addEventListener(sync2D);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/124293349