/*
 * @Description: 模糊圆效果（参考开源代码）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-03 21:34:50
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-03 21:45:42
 */
class CircleBlurMaterialProperty {
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
        return Cesium.Material.CircleBlurMaterialType;
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
            (other instanceof CircleBlurMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed))
        )
    }
}

Object.defineProperties(CircleBlurMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed')
})

Cesium.CircleBlurMaterialProperty = CircleBlurMaterialProperty;
Cesium.Material.CircleBlurMaterialProperty = 'CircleBlurMaterialProperty';
Cesium.Material.CircleBlurMaterialType = 'CircleBlurMaterialType';
Cesium.Material.CircleBlurMaterialSource = `
                                            uniform vec4 color;
                                            uniform float speed;
                                            czm_material czm_getMaterial(czm_materialInput materialInput){
                                            czm_material material = czm_getDefaultMaterial(materialInput);
                                            vec2 st = materialInput.st ;
                                            vec2 center = vec2(0.5);
                                            float time = fract(czm_frameNumber * speed / 1000.0);
                                            float r = 0.5 + sin(time) / 3.0;
                                            float dis = distance(st, center);
                                            float a = 0.0;
                                            if(dis < r) {
                                                a = 1.0 - smoothstep(0.0, r, dis);
                                            }
                                            material.alpha = pow(a,10.0) ;
                                            material.diffuse = color.rgb * a * 3.0;
                                            return material;
                                            }
                                            `

Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleBlurMaterialType, {
    fabric: {
        type: Cesium.Material.CircleBlurMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 10.0
        },
        source: Cesium.Material.CircleBlurMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123270361

// 模糊圆特效
this.viewer.entities.add({
   position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
   name: "模糊圆",
   ellipse: {
       semiMinorAxis: 1000.0,
       semiMajorAxis: 1000.0,
       material: new Cesium.CircleBlurMaterialProperty({
           color: new Cesium.Color(1, 1, 0, 0.7),
           speed: 12.0,
       })
   }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123270361