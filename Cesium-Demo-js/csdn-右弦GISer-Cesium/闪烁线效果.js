/*
 * @Description: 闪烁线材质
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-30 16:40:09
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-30 17:22:04
 */
class LineFlickerMaterialProperty {
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
        return Cesium.Material.LineFlickerMaterialType;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        result.speed = Cesium.Property.getValueOrDefault(this._speed, time, 5.0, result.speed);
        return result
    }

    equals(other) {
        return (this === other ||
            (other instanceof LineFlickerMaterialProperty &&
                Cesium.Property.equals(this._color, other._color) &&
                Cesium.Property.equals(this._speed, other._speed))
        )
    }
}

Object.defineProperties(LineFlickerMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
    speed: Cesium.createPropertyDescriptor('speed'),
})

Cesium.LineFlickerMaterialProperty = LineFlickerMaterialProperty;
Cesium.Material.LineFlickerMaterialProperty = 'LineFlickerMaterialProperty';
Cesium.Material.LineFlickerMaterialType = 'LineFlickerMaterialType';
Cesium.Material.LineFlickerMaterialSource =
    `
uniform vec4 color;
uniform float speed;
czm_material czm_getMaterial(czm_materialInput materialInput){
  czm_material material = czm_getDefaultMaterial(materialInput);
  float time = fract( czm_frameNumber  *  speed / 1000.0);
  vec2 st = materialInput.st;
  float scalar = smoothstep(0.0,1.0,time);
  material.diffuse = color.rgb * scalar;
  material.alpha = color.a * scalar ;
  return material;
}
`

Cesium.Material._materialCache.addMaterial(Cesium.Material.LineFlickerMaterialType, {
    fabric: {
        type: Cesium.Material.LineFlickerMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
            speed: 5.0,
        },
        source: Cesium.Material.LineFlickerMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123571988


// 道路闪烁线
Cesium.GeoJsonDataSource.load("../data/road_railway.geojson").then(function(dataSource) {
    viewer.dataSources.add(dataSource);
    const entities = dataSource.entities.values;
    // 聚焦
    viewer.zoomTo(entities);
    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        entity.polyline.width = 3.0;
        // 设置材质
        entity.polyline.material = new Cesium.LineFlickerMaterialProperty({
            color: Cesium.Color.YELLOW,
            // 设置随机变化速度
            speed: 20 * Math.random(),
        })
    }
});
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123571988