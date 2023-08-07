var particleSystem = viewer.scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../SampleData/smoke.png',
    imageSize : new Cesium.Cartesian2(20, 20),
    startScale : 1.0,
    endScale : 4.0,
    particleLife : 1.0,
    speed : 5.0,
    emitter : new Cesium.CircleEmitter(0.5),
    emissionRate : 5.0,
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    lifetime : 16.0
}));
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/124305484