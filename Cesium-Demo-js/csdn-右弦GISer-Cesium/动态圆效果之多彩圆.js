/*
 * @Description: 多彩圆效果（参考开源代码）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-03 18:09:33
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-03 18:32:18
 */

class CircleColorfulMaterialProperty {
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
        return Cesium.Material.CircleColorfulMaterialType;
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
            (other instanceof CircleColorfulMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed))
        )
    }
}

Object.defineProperties(CircleColorfulMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed')
})

Cesium.CircleColorfulMaterialProperty = CircleColorfulMaterialProperty;
Cesium.Material.CircleColorfulMaterialProperty = 'CircleColorfulMaterialProperty';
Cesium.Material.CircleColorfulMaterialType = 'CircleColorfulMaterialType';
Cesium.Material.CircleColorfulMaterialSource = `
                                                uniform vec4 color;
                                                uniform float speed;

                                                czm_material czm_getMaterial(czm_materialInput materialInput){
                                                czm_material material = czm_getDefaultMaterial(materialInput);
                                                vec2 st = materialInput.st  * 2.0 - 1.0;
                                                float time =czm_frameNumber * speed / 1000.0;
                                                float radius = length(st);
                                                float angle = atan(st.y/st.x);
                                                float radius1 = sin(time * 2.0) + sin(40.0*angle+time)*0.01;
                                                float radius2 = cos(time * 3.0);
                                                vec3 fragColor = 0.2 + 0.5 * cos( time + color.rgb + vec3(0,2,4));
                                                float inten1 = 1.0 - sqrt(abs(radius1 - radius));
                                                float inten2 = 1.0 - sqrt(abs(radius2 - radius));
                                                material.alpha = pow(inten1 + inten2 , 5.0) ;
                                                material.diffuse = fragColor * (inten1 + inten2);
                                                return material;
                                                }`

Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleColorfulMaterialType, {
    fabric: {
        type: Cesium.Material.CircleColorfulMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 10.0
        },
        source: Cesium.Material.CircleColorfulMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123267420

// 多彩圆特效
this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
        name: "多彩圆",
        ellipse: {
            semiMinorAxis: 1000.0,
            semiMajorAxis: 1000.0,
            material: new Cesium.CircleColorfulMaterialProperty({
                color: new Cesium.Color(1, 1, 0, 0.7),
                speed: 12.0,
            })
        }
    })
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123267420