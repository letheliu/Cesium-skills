// 调用
lightingShadowInit(viewer, 1000);
/**
 * @description: 日照阴影效果模拟
 * @param {*} _viewer
 * @param {*} _speed：变化速率
 * @return {*}
 */
function lightingShadowInit(_viewer, _speed) {
    _viewer.scene.globe.enableLighting = true;
    _viewer.shadows = true;
    _viewer.clock.multiplier = speed;
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123428712