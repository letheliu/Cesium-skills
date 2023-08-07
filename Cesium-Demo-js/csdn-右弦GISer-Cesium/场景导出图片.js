// https://blog.csdn.net/weixin_45782925/article/details/124572635
function saveToImage(_viewer) {
    // 不写会导出为黑图
    _viewer.render();

    let canvas = _viewer.scene.canvas;
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    let link = document.createElement("a");
    let blob = dataURLtoBlob(image);
    let objurl = URL.createObjectURL(blob);
    link.download = "scene.png";
    link.href = objurl;
    link.click();
}

function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}
