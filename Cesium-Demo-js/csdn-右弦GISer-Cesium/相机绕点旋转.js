//https://blog.csdn.net/weixin_45782925/article/details/124649736

class AroundPoint {
    constructor(viewer, amount, position) {
        this._viewer = viewer;
        this._amount = amount;
        this._position = position;
    }

    _bindEvent() {
        this._viewer.clock.onTick.addEventListener(this._aroundPoint, this);
    }

    _unbindEvent() {
        this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        this._viewer.clock.onTick.removeEventListener(this._aroundPoint, this);
    }

    start() {
        this._viewer.clock.shouldAnimate = true;
        this._unbindEvent();
        this._bindEvent();
        return this;
    }

    stop() {
        this._unbindEvent();
        return this;
    }

    // 相机绕点旋转函数
    _aroundPoint() {
        let heading = this._viewer.camera.heading;
        let pitch = this._viewer.camera.pitch;


        heading += Cesium.Math.toRadians(this._amount);
        if (heading >= Math.PI * 2 || heading <= -Math.PI * 2) {
            heading = 0;
        }

        this._viewer.camera.lookAt(
            this._position,
            new Cesium.HeadingPitchRange(
                heading,
                pitch,
                5000.0,
            )
        )
    }
}