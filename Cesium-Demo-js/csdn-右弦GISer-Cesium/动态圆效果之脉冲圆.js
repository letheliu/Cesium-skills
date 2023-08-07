/*
 * @Description: 脉冲圆扩展效果（参考开源代码）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-02-28 19:28:52
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-03 18:17:09
 */
class CirclePulseMaterialProperty {
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
        return Cesium.Material.CirclePulseMaterialType;
    }

    getValue(time, result) {
        result = Cesium.defaultValue(result, {});
        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        result.speed = Cesium.Property.getValueOrDefault(this._speed, time, 10, result.speed);
        return result;
    }

    equals(other) {
        return (this === other ||
            (other instanceof CirclePulseMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed))
        )
    }
}


// 设置属性
Object.defineProperties(CirclePulseMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed')
})

Cesium.CirclePulseMaterialProperty = CirclePulseMaterialProperty;
Cesium.Material.CirclePulseMaterialProperty = 'CirclePulseMaterialProperty';
Cesium.Material.CirclePulseMaterialType = 'CirclePulseMaterialType';
Cesium.Material.CirclePulseMaterialSource = `
                                            uniform vec4 color;
                                            uniform float speed;
                                            czm_material czm_getMaterial(czm_materialInput materialInput) {
                                                czm_material material = czm_getDefaultMaterial(materialInput);
                                                vec2 st = materialInput.st * 2.0 - 1.0;
                                                float time = fract(czm_frameNumber * speed / 1000.0);
                                                float r = length(st) * 1.2;
                                                float a = pow(r, 2.0);
                                                float b = sin(r * 0.8 - 1.6);
                                                float c = sin(r - 0.010);
                                                float s = sin(a - time * 2.0 + b) * c;
                                                float d = abs(1.0 / (s * 10.8)) - 0.01;
                                                material.alpha = pow(d, 10.0);
                                                material.diffuse = color.rgb * d;
                                                return material;
                                            }
                                            `;
Cesium.Material._materialCache.addMaterial(Cesium.Material.CirclePulseMaterialType, {
    fabric: {
        type: Cesium.Material.CirclePulseMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 10.0
        },
        source: Cesium.Material.CirclePulseMaterialSource
    },
    translucent: function(material) {
        return true
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123266936

// 脉冲圆特效
this.viewer.entities.add({
     position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
     name: "脉冲圆",
     ellipse: {
         semiMinorAxis: 1000.0,
         semiMajorAxis: 1000.0,
         material: new Cesium.CirclePulseMaterialProperty({
             color: new Cesium.Color(1, 1, 0, 0.7),
             speed: 12.0,
         })
     }
 })
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123266936