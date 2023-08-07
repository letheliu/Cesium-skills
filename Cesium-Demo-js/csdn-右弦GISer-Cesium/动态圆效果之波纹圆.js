/*
 * @Description: 波纹圆效果（和水波纹扩散类似，参考开源代码）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-03 21:59:17
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-03 23:09:02
 */
class CircleRippleMaterialProperty {
    constructor(options) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._speed = undefined;
        this.color = options.color;
        this.speed = options.speed;
        this.count = options.count;
        this.gradient = options.gradient;
    };

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    getType(time) {
        return Cesium.Material.CircleRippleMaterialType;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        result.speed = Cesium.Property.getValueOrDefault(this._speed, time, 10, result.speed);
        result.count = this.count;
        result.gradient = this.gradient;
        return result
    }

    equals(other) {
        return (this === other ||
            (other instanceof CircleRippleMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed) &&
                Cesium.Property.equals(this.count, other.count) &&
                Cesium.Property.equals(this.gradient, other.gradient))
        )
    }
}

Object.defineProperties(CircleRippleMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed'),
    count: Cesium.createPropertyDescriptor('count'),
    gradient: Cesium.createPropertyDescriptor('gradient')
})

Cesium.CircleRippleMaterialProperty = CircleRippleMaterialProperty;
Cesium.Material.CircleRippleMaterialProperty = 'CircleRippleMaterialProperty';
Cesium.Material.CircleRippleMaterialType = 'CircleRippleMaterialType';
Cesium.Material.CircleRippleMaterialSource = `
                                            uniform vec4 color;
                                            uniform float speed;
                                            uniform float count;
                                            uniform float gradient;

                                            czm_material czm_getMaterial(czm_materialInput materialInput)
                                            {
                                            czm_material material = czm_getDefaultMaterial(materialInput);
                                            material.diffuse = 1.5 * color.rgb;
                                            vec2 st = materialInput.st;
                                            float dis = distance(st, vec2(0.5, 0.5));
                                            float per = fract(czm_frameNumber * speed / 1000.0);
                                            if(count == 1.0){
                                                if(dis > per * 0.5){
                                                discard;
                                                }else {
                                                material.alpha = color.a  * dis / per / 2.0;
                                                }
                                            } else {
                                                vec3 str = materialInput.str;
                                                if(abs(str.z)  > 0.001){
                                                discard;
                                                }
                                                if(dis > 0.5){
                                                discard;
                                                } else {
                                                float perDis = 0.5 / count;
                                                float disNum;
                                                float bl = 0.0;
                                                for(int i = 0; i <= 999; i++){
                                                    if(float(i) <= count){
                                                    disNum = perDis * float(i) - dis + per / count;
                                                    if(disNum > 0.0){
                                                        if(disNum < perDis){
                                                        bl = 1.0 - disNum / perDis;
                                                        }
                                                        else if(disNum - perDis < perDis){
                                                        bl = 1.0 - abs(1.0 - disNum / perDis);
                                                        }
                                                        material.alpha = pow(bl,(1.0 + 10.0 * (1.0 - gradient)));
                                                    }
                                                    }
                                                }
                                                }
                                            }
                                            return material;
                                            }
                                            `

Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleRippleMaterialType, {
    fabric: {
        type: Cesium.Material.CircleRippleMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 3.0,
            count: 4,
            gradient: 0.2
        },
        source: Cesium.Material.CircleRippleMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123270788

// 波纹圆特效
this.viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(113.9236839, 22.528061),
    name: "波纹圆",
    ellipse: {
        semiMinorAxis: 1000.0,
        semiMajorAxis: 1000.0,
        material: new Cesium.CircleRippleMaterialProperty({
            color: new Cesium.Color(1, 1, 0, 0.7),
            speed: 12.0,
            count: 4,
            gradient: 0.2
        })
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123270788