//流动墙材质
function TrailLineMaterialProperty(options) {
    // 默认参数设置
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color;
    this.duration = options.duration;
    this._time = (new Date()).getTime();
}
Object.defineProperties(TrailLineMaterialProperty.prototype, {
    isConstant: {
        get: function() {
            return false;
        }
    },
    definitionChanged: {
        get: function() {
            return this._definitionChanged;
        }
    },
    color: Cesium.createPropertyDescriptor('color')
});
TrailLineMaterialProperty.prototype.getType = function(time) {
    return 'TrailLine';
};
TrailLineMaterialProperty.prototype.getValue = function(time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);

    if (this.duration) {
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    }
    viewer.scene.requestRender();
    return result;
};
TrailLineMaterialProperty.prototype.equals = function(other) {
    return this === other ||
        (other instanceof TrailLineMaterialProperty &&
            Cesium.Property.equals(this._color, other._color))
};
Cesium.TrailLineMaterialProperty = TrailLineMaterialProperty;
Cesium.Material.TrailLineType = 'TrailLine';
Cesium.Material.TrailLineImage = "./src/material/trailLine/arrow.png";
Cesium.Material.TrailLineSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
     czm_material material = czm_getDefaultMaterial(materialInput);\n\
     vec2 st = materialInput.st;\n\
     vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
     material.alpha = colorImage.a * color.a;\n\
     material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
     return material;\n\
 }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.TrailLineType, {
    fabric: {
        type: Cesium.Material.TrailLineType,
        uniforms: {
            color: new Cesium.Color(1.0, 1.0, 1.0, 1),
            image: Cesium.Material.TrailLineImage,
            time: 0
        },
        source: Cesium.Material.TrailLineSource
    },
    translucent: function(material) {
        return true;
    }
});
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122948785
// 流动墙体效果
$.get('./data/trailWall.geojson', function(data) {
    for (let i = 0; i < data.features[0].geometry.coordinates.length; i++) {
        trailWallPositions = data.features[0].geometry.coordinates[i].toString().split(',');
    }
    viewer.entities.add({
        name: "流动墙效果",
        wall: {
            positions: Cesium.Cartesian3.fromDegreesArray(trailWallPositions),
            // 设置高度
            maximumHeights: new Array(trailWallPositions.length).fill(120),
            minimunHeights: new Array(trailWallPositions.length).fill(50),
            material: new Cesium.TrailLineMaterialProperty({
                color: Cesium.Color.RED,
                duration: 18000,
            })
        }
    })
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122948785
