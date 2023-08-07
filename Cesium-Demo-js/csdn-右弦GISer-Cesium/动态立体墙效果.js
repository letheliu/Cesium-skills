/**
 * @description:动态立体墙材质
 * @date: 2022-02-11
 */


//动态墙材质
function DynamicWallMaterialProperty(options) {
    // 默认参数设置
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color;
    this.duration = options.duration;
    this.trailImage = options.trailImage;
    this._time = (new Date()).getTime();
}
Object.defineProperties(DynamicWallMaterialProperty.prototype, {
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
DynamicWallMaterialProperty.prototype.getType = function(time) {
    return 'DynamicWall';
};
DynamicWallMaterialProperty.prototype.getValue = function(time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
    if (this.trailImage) {
        result.image = this.trailImage;
    } else {
        result.image = Cesium.Material.DynamicWallImage
    }

    if (this.duration) {
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    }
    viewer.scene.requestRender();
    return result;
};
DynamicWallMaterialProperty.prototype.equals = function(other) {
    return this === other ||
        (other instanceof DynamicWallMaterialProperty &&
            Cesium.Property.equals(this._color, other._color))
};
Cesium.DynamicWallMaterialProperty = DynamicWallMaterialProperty;
Cesium.Material.DynamicWallType = 'DynamicWall';
Cesium.Material.DynamicWallImage = "./colors.png";
Cesium.Material.DynamicWallSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                            {\n\
                                            czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                            vec2 st = materialInput.st;\n\
                                            vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n\
                                            vec4 fragColor;\n\
                                            fragColor.rgb = color.rgb / 1.0;\n\
                                            fragColor = czm_gammaCorrect(fragColor);\n\
                                            material.alpha = colorImage.a * color.a;\n\
                                            material.diffuse = color.rgb;\n\
                                            material.emission = fragColor.rgb;\n\
                                            return material;\n\
                                            }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.DynamicWallType, {
    fabric: {
        type: Cesium.Material.DynamicWallType,
        uniforms: {
            color: new Cesium.Color(1.0, 1.0, 1.0, 1),
            image: Cesium.Material.DynamicWallImage,
            time: 0
        },
        source: Cesium.Material.DynamicWallSource
    },
    translucent: function(material) {
        return true;
    }
});
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122907508


/**
 * @description:立体墙效果
 * @date：2022-02-12
 * @param：viewer
 * @positions: 墙体底部位置坐标
 */
function drawWall(viewer, positions) {
    // 绘制墙体
    this.viewer.entities.add({
        name: "立体墙效果",
        wall: {
            positions: positions,
            // 设置高度
            maximumHeights: new Array(positions.length).fill(100),
            minimunHeights: new Array(positions.length).fill(0),
            material: new Cesium.DynamicWallMaterialProperty({
                color: Cesium.Color.fromBytes(55, 96, 56).withAlpha(0.7),
                duration: 3000
            }),
        }
    })
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122907508

