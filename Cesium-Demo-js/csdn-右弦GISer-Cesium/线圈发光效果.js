// 线圈发光扩散
let scanLine1 = new Scanline(viewer, "scanLine1");
scanLine1.add([113.923, 22.536, 0], "#CE1374", 1200, 15);
/**
 * 线圈发光效果
 * 包括发光材质scanlineMaterialProperty和类scanline.js
 */

// 线圈发光扩散效果
class Scanline extends Effect {
    constructor(viewer, id) {
        super(viewer, id)
    }
    change_duration(d) {
        super.change_duration(d)
        const curEntity = this.viewer.entities.getById(this.id)
        curEntity._ellipse._material.speed = d
    }
    add(position, color, maxRadius, speed, isedit = false) {
        super.add(position, color, maxRadius, speed, isedit)
        const _this = this
        this.viewer.entities.add({
            id: _this.id,
            position: Cesium.Cartesian3.fromDegrees(
                position[0],
                position[1],
                position[2]
            ),
            ellipse: {
                semiMinorAxis: new Cesium.CallbackProperty(function(n) {
                    return _this.maxRadius
                }, false),
                semiMajorAxis: new Cesium.CallbackProperty(function(n) {
                    return _this.maxRadius
                }, false),
                material: new Cesium.ScanlineMaterialProperty(
                    new Cesium.Color.fromCssColorString(color),
                    speed
                ),
                classificationType: Cesium.ClassificationType.BOTH,
            },
        })
    }
}


function ScanlineMaterialProperty(color, speed) {
    this._definitionChanged = new Cesium.Event()
    this.color = color || Cesium.Color.YELLOW
    this.speed = speed || 10
}

Object.defineProperties(ScanlineMaterialProperty.prototype, {
    isConstant: {
        get: function() {
            return false
        },
    },
    definitionChanged: {
        get: function() {
            return this._definitionChanged
        },
    },
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed'),
})

ScanlineMaterialProperty.prototype.getType = function(_time) {
    return Cesium.Material.ScanlineType
}
ScanlineMaterialProperty.prototype.getValue = function(
    time,
    result
) {
    if (!Cesium.defined(result)) {
        result = {}
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
        this._color,
        time,
        Cesium.Color.WHITE,
        result.color
    )
    result.speed = this.speed
    return result
}

ScanlineMaterialProperty.prototype.equals = function(other) {
    const reData =
        this === other ||
        (other instanceof ScanlineMaterialProperty &&
            Cesium.Property.equals(this.color, other.color) &&
            Cesium.Property.equals(this.speed, other.speed))
    return reData
}
Cesium.ScanlineMaterialProperty = ScanlineMaterialProperty
Cesium.Material.ScanlineType = 'Scanline'
Cesium.Material.ScanlineSource = `
  uniform vec4 color;
  uniform float speed;
  float circle(vec2 uv, float r, float blur) {
    float d = length(uv) * 1.0; /* 2.0 */
    float c = smoothstep(r+blur, r, d);
    return c;
  }
  czm_material czm_getMaterial(czm_materialInput materialInput)
  {
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st - 0.5;
    material.diffuse = 2.8 * color.rgb;
    material.emission = vec3(0);
    float t = fract(czm_frameNumber * (11000.0 - speed) / 500000.0);
    float s = 0.3;
    float radius1 = smoothstep(.0, s, t) * 0.5;
    float alpha1 = circle(st, radius1, 0.01) * circle(st, radius1, -0.01);
    float alpha2 = circle(st, radius1, 0.01 - radius1) * circle(st, radius1, 0.01);
    float radius2 = 0.5 + smoothstep(s, 1.0, t) * 0.5;
    float alpha3 = circle(st, radius1, radius2 + 0.01 - radius1) * circle(st, radius1, -0.01);
    material.alpha = smoothstep(1.0, s, t) * (alpha1 + alpha2*0.1 + alpha3*0.1);
    material.alpha *= color.a ;
    return material;
  }
  `
Cesium.Material._materialCache.addMaterial(Cesium.Material.ScanlineType, {
    fabric: {
        type: Cesium.Material.ScanlineType,
        uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            time: 0,
            speed: 10,
        },
        source: Cesium.Material.ScanlineSource,
    },
    translucent: function(t) {
        return true
    },
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122561852