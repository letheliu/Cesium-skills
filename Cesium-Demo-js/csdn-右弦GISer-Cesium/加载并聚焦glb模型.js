// 记载glb模型
const modelEntity = viewer.entities.add({
    name: "glb模型",
    position: new Cesium.Cartesian3.fromDegrees(120.14046454, 30.27415039),
    model: {
        uri: '../data/model/car.glb',
        minimumPixelSize: 256,
        maxumunScale: 20000,
    },
});
// 聚焦模型
viewer.trackedEntity = modelEntity;
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123468371