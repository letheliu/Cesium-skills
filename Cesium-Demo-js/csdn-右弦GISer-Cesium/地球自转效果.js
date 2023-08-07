/*
 * @Description: 地球自转效果
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-02-25 15:14:20
 * @LastEditors: Julian
 * @LastEditTime: 2022-02-26 12:18:03
 */


/**
 * @description: 地球自转类
 */
class GlobeRotate {
    constructor(viewer) {
        this._viewer = viewer;
    }

    // 根据国际天体参考系计算旋转矩阵
    _icrf() {
        if (this._viewer.scene.mode !== Cesium.SceneMode.SCENE3D) {
            return ture;
        }
        console.log(this._viewer.camera.position);
        let icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(this._viewer.clock.currentTime);
        if (icrfToFixed) {
            let camera = this._viewer.camera;
            let offset = Cesium.Cartesian3.clone(camera.position);
            let transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
            // 偏移相机，否则会场景旋转而地球不转
            camera.lookAtTransform(transform, offset);
        }
    }

    // 绑定事件
    _bindEvent() {
    	// 转动的速度设置
        this._viewer.clock.multiplier = 15 * 1000;
        // 初始化为单位矩阵
        this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        this._viewer.scene.postUpdate.addEventListener(this._icrf, this);
    }

    // 解除绑定
    _unbindEvent() {
        this._viewer.clock.multiplier = 1;
        this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        this._viewer.scene.postUpdate.removeEventListener(this._icrf, this);
    }

    // 开始旋转
    start() {
        this._viewer.clock.shouldAnimate = true;
        this._unbindEvent();
        this._bindEvent();
        return this;
    }

    // 停止旋转
    stop() {
        this._unbindEvent();
        return this;
    }
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123133126

<!-- 引入地球自转js -->
 <script src="./demo/globeRotate/globeRotate.js"></script>

// 地球球体自转
let globeRotate = new GlobeRotate(viewer);
globeRotate.start();