/**
 * @description: 将图片和文字合成新图标使用（参考Cesium源码）
 * @param {*} url：图片地址
 * @param {*} label：文字
 * @param {*} size：画布大小
 * @return {*} 返回canvas
 */
function combineIconAndLabel(url, label, size) {
    // 创建画布对象
    let canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    let ctx = canvas.getContext("2d");

    let promise = new Cesium.Resource.fetchImage(url).then(image => {
        // 异常判断
        try {
            ctx.drawImage(image, 0, 0);
        } catch (e) {
            console.log(e);
        }
        
        // 渲染字体
        // font属性设置顺序：font-style, font-variant, font-weight, font-size, line-height, font-family
        ctx.fillStyle = Cesium.Color.WHITE.toCssColorString();
        ctx.font = 'bold 20px Microsoft YaHei';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, size / 2, size / 2);

        return canvas;
    });
    return promise;
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123092062