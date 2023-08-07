/*
 * @Description: 扫描圆效果（参考开源代码）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-04 17:22:05
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-04 17:23:52
 */
class CircleScanMaterialProperty {
    constructor(options) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._speed = undefined;
        this.color = options.color;
        this.speed = options.speed;
    };

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    getType(time) {
        return Cesium.Material.CircleScanMaterialType;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        result.speed = Cesium.Property.getValueOrDefault(this._speed, time, 10, result.speed);
        return result
    }

    equals(other) {
        return (this === other ||
            (other instanceof CircleScanMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed))
        )
    }
}

Object.defineProperties(CircleScanMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed')
})

Cesium.CircleScanMaterialProperty = CircleScanMaterialProperty;
Cesium.Material.CircleScanMaterialProperty = 'CircleScanMaterialProperty';
Cesium.Material.CircleScanMaterialType = 'CircleScanMaterialType';
Cesium.Material.CircleScanMaterialSource =
    `
    uniform vec4 color;
    uniform float speed;

    float circle(vec2 uv, float r, float blur) {
    float d = length(uv) * 2.0;
    float c = smoothstep(r+blur, r, d);
    return c;
    }

    czm_material czm_getMaterial(czm_materialInput materialInput)
    {
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st - .5;
    material.diffuse = color.rgb;
    material.emission = vec3(0);
    float t =fract(czm_frameNumber * speed / 1000.0);
    float s = 0.3;
    float radius1 = smoothstep(.0, s, t) * 0.5;
    float alpha1 = circle(st, radius1, 0.01) * circle(st, radius1, -0.01);
    float alpha2 = circle(st, radius1, 0.01 - radius1) * circle(st, radius1, 0.01);
    float radius2 = 0.5 + smoothstep(s, 1.0, t) * 0.5;
    float alpha3 = circle(st, radius1, radius2 + 0.01 - radius1) * circle(st, radius1, -0.01);
    material.alpha = smoothstep(1.0, s, t) * (alpha1 + alpha2*0.1 + alpha3*0.1);
    material.alpha *= color.a;
    return material;
    }

    `

Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleScanMaterialType, {
    fabric: {
        type: Cesium.Material.CircleScanMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 10.0
        },
        source: Cesium.Material.CircleScanMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123283410

// 扫描圆
this.viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
    name: '扫描圆',
    ellipse: {
        semiMajorAxis: 1000.0,
        semiMinorAxis: 1000.0,
        material: new Cesium.CircleScanMaterialProperty({
            color: new Cesium.Color(1.0, 1.0, 0.0, 0.7),
            speed: 20.0
        })
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123283410