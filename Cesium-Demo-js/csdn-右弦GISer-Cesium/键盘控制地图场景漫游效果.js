// 键盘控制漫游
keyboardMapRoamingInit(viewer);

/*
 * @Description: 使用键盘控制地图漫游
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-04-07 16:04:07
 * @LastEditors: Julian
 * @LastEditTime: 2022-04-07 18:40:40
 */


/**
 * @description: 使用键盘控制地图漫游初始化
 * @param {*} _viewer
 * @return {*}
 */
function keyboardMapRoamingInit(_viewer) {
    // 添加键盘监听事件
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);

    // 为每一帧添加监听事件
    _viewer.clock.onTick.addEventListener(function() {
        keyboardMapRoamingRender(_viewer);
    });
}

// 定义事件组
let flags = {
    // 相机位置
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false,
    // 相机姿态
    lookUp: false,
    lookDown: false,
    lookLeft: false,
    lookRight: false,
    twistLeft: false,
    twistRight: false,
    // 缩放
    zoomIn: false,
    zoomOut: false
}



// 相机位置：W：向前；S：向后；D：向右；A：向左；Q：升高；E：降低；
// 相机姿态：↑：抬头；↓：低头；←：左转；→：右转；0：顺时针；.：逆时针
// 缩放：+：放大，-：缩小；

/**
 * @description: 根据键盘输入字符返回事件信息
 * @param {*} key
 * @return {*}
 */
function getFlagFromKeyboard(key) {
    switch (key) {
        // 按字符的Unicode编码
        // 相机位置
        case 87:
            return 'moveForward';
        case 83:
            return 'moveBackward';
        case 68:
            return 'moveRight';
        case 65:
            return 'moveLeft';
        case 81:
            return 'moveUp';
        case 69:
            return 'moveDown';
        // 相机姿态 
        case 38:
            return 'lookUp';
        case 40:
            return 'lookDown';
        case 37:
            return 'lookLeft';
        case 39:
            return 'lookRight';
        case 96:
            return 'twistLeft';
        case 110:
            return 'twistRight';
        // 缩放
        case 107:
            return 'zoomIn';
        case 109:
            return 'zoomOut';
        default:
            return undefined;
    }
}

/**
 * @description: 键盘按下
 * @param {*} event
 * @return {*}
 */
function keyDown(event) {
    let flagName = getFlagFromKeyboard(event.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = true;
    }
}

/**
 * @description: 键盘弹起
 * @param {*} event
 * @return {*}
 */
function keyUp(event) {
    let flagName = getFlagFromKeyboard(event.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = false;
    }
}


/**
 * @description: 根据事件调整相机
 * @param {*} _viewer
 * @return {*}
 */
function keyboardMapRoamingRender(_viewer) {
    let camera = _viewer.camera;
    let ellipsoid = _viewer.scene.globe.ellipsoid;
    let cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;

    // 根据相机高度设置移动距离，比默认距离移动效果更好
    let moveRate = cameraHeight / 20.0;

    if (flags.moveForward) {
        camera.moveForward(moveRate);
    }
    if (flags.moveBackward) {
        camera.moveBackward(moveRate);
    }
    if (flags.moveLeft) {
        camera.moveLeft(moveRate);
    }
    if (flags.moveRight) {
        camera.moveRight(moveRate);
    }
    if (flags.moveUp) {
        camera.moveUp(moveRate);
    }
    if (flags.moveDown) {
        camera.moveDown(moveRate);
    }
    if (flags.lookUp) {
        camera.lookUp();
    }
    if (flags.lookDown) {
        camera.lookDown();
    }
    if (flags.lookLeft) {
        camera.lookLeft();
    }
    if (flags.lookRight) {
        camera.lookRight();
    }
    if (flags.twistLeft) {
        camera.twistLeft();
    }
    if (flags.twistRight) {
        camera.twistRight();
    }
    // 根据相机高度设置缩放参数
    if (flags.zoomIn) {
        camera.zoomIn(cameraHeight / 2);
    }
    if (flags.zoomOut) {
        camera.zoomOut(cameraHeight / 2);
    }
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/124019424