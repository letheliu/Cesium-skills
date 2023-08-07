/**
 * @description: 旋转实体entity
 * @param {*} instance ：具体的实体
 * @param {*} _rotation ：初始旋转角度
 * @param {*} _amount ：旋转角度变化量
 * @return {*}
 */        
function rotateEntity(instance, _rotation, _amount) {
    instance.rotation = new Cesium.CallbackProperty(function() {
        _rotation += _amount;
        if (_rotation >= 360 || _rotation <= -360) {
            _stRotation = 0;
        }
        return Cesium.Math.toRadians(_rotation);
    }, false)
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123277002

// 旋转椭圆
let ellipseRotate = this.viewer.entities.add({
   position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
   id: 'ellipseRotateTest',
   ellipse: {
       semiMinorAxis: 500.0,
       semiMajorAxis: 1000.0,
       material: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
   }
})

rotateEntity(ellipseRotate.ellipse, 0, 1);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123277002