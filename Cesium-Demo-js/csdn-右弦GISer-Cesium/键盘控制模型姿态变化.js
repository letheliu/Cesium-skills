// 初始化viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
    // 允许动画
    shouldAnimate: true,
});


// 设置相机初始位置
viewer.camera.setView({
    destination: {
        x: -2769293.799109788,
        y: 4796599.883886506,
        z: 3171113.878101777
    },
    orientation: {
        heading: 6.283185307179586,
        pitch: -0.7854060155492881,
        roll: 6.283185307179586
    }
})

let headingPitchRoll = new Cesium.HeadingPitchRoll();
// 模型初始位置
let position = new Cesium.Cartesian3.fromDegrees(120, 30, 5000);
// 局部变换坐标系
let fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator("north", "west");

// 每次操作姿态变化为5°
let deltaRadians = Cesium.Math.toRadians(5.0);


// 使用primitive方式加载模型
let airplaneModel = viewer.scene.primitives.add(
    Cesium.Model.fromGltf({
        url: '../.././icons/hz/model/airplane.glb',
        scale: 100.0,
        modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
            position,
            headingPitchRoll,
            Cesium.Ellipsoid.WGS84,
            fixedFrameTransform
        ),
        minimumPixelSize: 256,
    }))


// 添加键盘监听事件
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        // 抬头
        case 38:
            headingPitchRoll.pitch += deltaRadians;
            // 判断是否超过2π范围
            if (headingPitchRoll.pitch > Cesium.Math.TWO_PI) {
                headingPitchRoll.pitch -= Cesium.Math.TWO_PI;
            }
            console.log("抬头：pitch+");
            break;

        // 低头
        case 40:
            headingPitchRoll.pitch -= deltaRadians;
            if (headingPitchRoll.pitch < -Cesium.Math.TWO_PI) {
                headingPitchRoll.pitch += Cesium.Math.TWO_PI;
            }
            console.log("低头：pitch-");

            break;
            
        // 左转
        case 37:
            headingPitchRoll.heading -= deltaRadians;
            // 判断是否超过2π范围
            if (headingPitchRoll.heading < -Cesium.Math.TWO_PI) {
                headingPitchRoll.heading += Cesium.Math.TWO_PI;
            }
            console.log("左转：heading+");
            break;
            
        // 右转
        case 39:
            headingPitchRoll.heading += deltaRadians;
            // 判断是否超过2π范围
            if (headingPitchRoll.heading > Cesium.Math.TWO_PI) {
                headingPitchRoll.heading -= Cesium.Math.TWO_PI;
            }
            console.log("右转：heading-");
            break;
            
        // 顺时针
        case 96:
            headingPitchRoll.roll += deltaRadians;
            // 判断是否超过2π范围
            if (headingPitchRoll.roll > Cesium.Math.TWO_PI) {
                headingPitchRoll.roll -= Cesium.Math.TWO_PI;
            }
            console.log("顺时针翻滚：roll+");
            break;
            
        // 逆时针
        case 110:
            headingPitchRoll.roll -= deltaRadians;
            // 判断是否超过2π范围
            if (headingPitchRoll.roll < -Cesium.Math.TWO_PI) {
                headingPitchRoll.roll += Cesium.Math.TWO_PI;
            }
            console.log("逆时针翻滚：roll-");
            break;
            
        // 加速
        case 107:
            speed += 10
            speed = Math.min(speed, 10000);
            console.log("加速:" + speed);
            break;
        // 减速
        case 109:
            speed -= 10;
            speed = Math.max(speed, 100);
            console.log("减速:" + speed);
            break;

        default:
            break;
    }
})

// 速度
let speed = 100;
// 速度向量
let speedVector = new Cesium.Cartesian3();

// 飞行路径
const pathPosition = new Cesium.SampledPositionProperty();
const entityPath = viewer.entities.add({
    position: pathPosition,
    name: "飞行路径",
    path: {
        show: true,
        leadTime: 0,
        trailTime: 60,
        width: 20,
        resolution: 1,
        material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.3,
            taperPower: 0.3,
            color: Cesium.Color.PALEGOLDENROD,
        }),
    },
});

// 渲染更新前阶段添加监听
viewer.scene.preUpdate.addEventListener(() => {
    speedVector = Cesium.Cartesian3.multiplyByScalar(
        Cesium.Cartesian3.UNIT_X,
        speed / 10,
        speedVector
    );
    position = Cesium.Matrix4.multiplyByPoint(
        airplaneModel.modelMatrix,
        speedVector,
        position
    );
    // 将点添加到路径中
    pathPosition.addSample(Cesium.JulianDate.now(), position);

	  // 更新模型姿态与位置
    Cesium.Transforms.headingPitchRollToFixedFrame(
        position,
        headingPitchRoll,
        Cesium.Ellipsoid.WGS84,
        fixedFrameTransform,
        airplaneModel.modelMatrix
    )
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/124044606