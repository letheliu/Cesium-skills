// 流动水面效果
viewer.scene.primitives.add(
    new Cesium.Primitive({
        geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                    113.95, 22.48,
                    113.99, 22.52
                ),
                vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            }),
        }),
        appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: "Water",
                    uniforms: {
                        baseWaterColor: new Cesium.Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5),
                        normalMap: './icons/waterNormals.jpg',
                        frequency: 1000.0,
                        animationSpeed: 0.1,
                        amplitude: 10,
                        specularIntensity: 10
                    }
                }
            })
        }),
    })
);
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123382069