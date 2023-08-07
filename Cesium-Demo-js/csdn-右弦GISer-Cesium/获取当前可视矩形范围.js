/**
 * @description: 获取当前可视矩形范围
 * @param {*} _viewer
 * @return {*}
 */
function refreshViewRectangle(_viewer) {
    let rectangle = _viewer.camera.computeViewRectangle();
    console.log("当前可视范围矩形为：");
    console.log(rectangle);
}

// 添加相机监听事件
viewer.camera.moveEnd.addEventListener(() => {
    refreshViewRectangle(viewer);
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123866749