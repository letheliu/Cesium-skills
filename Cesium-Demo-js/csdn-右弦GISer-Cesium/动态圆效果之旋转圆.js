/**
* @description: 旋转材质
* @param {*} instance ：实体
* @param {*} _stRotation : 初始材质旋转角度
* @param {*} _amount ：旋转角度变化量
* @return {*}
*/        
function rotateMaterial(instance, _stRotation, _amount) {
   instance.stRotation = new Cesium.CallbackProperty(function() {
       _stRotation += _amount;
       if (_stRotation >= 360 || _stRotation <= -360) {
           _stRotation = 0;
       }
       return Cesium.Math.toRadians(_stRotation);
   }, false)
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123277979

// 旋转圆
let circleRotate = this.viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
    id: 'circleRotateTest',
    ellipse: {
        semiMinorAxis: 1000.0,
        semiMajorAxis: 1000.0,
        material: new Cesium.ImageMaterialProperty({
            image: './icons/circle_rotate.svg'
        })
    }
})
rotateMaterial(circleRotate.ellipse, 0, 1);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123277979