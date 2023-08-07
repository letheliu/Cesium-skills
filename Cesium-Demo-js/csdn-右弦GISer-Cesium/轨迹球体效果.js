/*
 * @Description: 轨迹球体效果（参考开源代码）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-04 16:50:58
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-04 17:06:56
 */
class EllipsoidTrailMaterialProperty {
    constructor(options) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._speed = undefined;
        this.color = options.color;
        this.speed = options.speed;
    }

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    getType(time) {
        return Cesium.Material.EllipsoidTrailMaterialType;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        result.speed = Cesium.Property.getValueOrDefault(this._speed, time, 10, result.speed);
        return result;
    }

    equals(other) {
        return (this === other ||
            (other instanceof EllipsoidTrailMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed)))
    }
}

Object.defineProperties(EllipsoidTrailMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed')
})

Cesium.EllipsoidTrailMaterialProperty = EllipsoidTrailMaterialProperty;
Cesium.Material.EllipsoidTrailMaterialProperty = 'EllipsoidTrailMaterialProperty';
Cesium.Material.EllipsoidTrailMaterialType = 'EllipsoidTrailMaterialType';
Cesium.Material.EllipsoidTrailMaterialSource =
    `
    uniform vec4 color;
    uniform float speed;
    czm_material czm_getMaterial(czm_materialInput materialInput){
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    float time = fract(czm_frameNumber * speed / 1000.0);
    float alpha = abs(smoothstep(0.5,1.,fract( -st.t - time)));
    alpha += .1;
    material.alpha = alpha;
    material.diffuse = color.rgb;
    return material;
}
`

Cesium.Material._materialCache.addMaterial(Cesium.Material.EllipsoidTrailMaterialType, {
    fabric: {
        type: Cesium.Material.EllipsoidTrailMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 10.0
        },
        source: Cesium.Material.EllipsoidTrailMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123281149

// 轨迹球体
this.viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
    name: '轨迹球体',
    ellipsoid: {
        radii: new Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
        material: new Cesium.EllipsoidTrailMaterialProperty({
            color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
            speed: 10.0
        })
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123281149