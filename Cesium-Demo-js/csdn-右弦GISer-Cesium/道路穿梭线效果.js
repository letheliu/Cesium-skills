// 道路穿梭线
  Cesium.GeoJsonDataSource.load("./data/road1.geojson").then(function(dataSource) {
      this.viewer.dataSources.add(dataSource);
      const entities = dataSource.entities.values;
      for (let i = 0; i < entities.length; i++) {
          let entity = entities[i];
          entity.polyline.width = 1.7;
          entity.polyline.material = new Cesium.Spriteline1MaterialProperty(1000, './data/pictures/spriteline1.png');
      }
  });
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122559827

/**
 *  精灵穿梭路光效果，
 *  参考gitee开源
 *  entity的材质使用MaterialProperty,而primitive使用的是material。
 *  @Data：2022-01-11
 */

function Spriteline1MaterialProperty(duration, image) {
    this._definitionChanged = new Cesium.Event()
    this.duration = duration
    this.image = image
    this._time = performance.now()
}
Object.defineProperties(Spriteline1MaterialProperty.prototype, {
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
    duration: Cesium.createPropertyDescriptor('duration')
})
Spriteline1MaterialProperty.prototype.getType = function(time) {
    return 'Spriteline1'
}
Spriteline1MaterialProperty.prototype.getValue = function(
    time,
    result
) {
    if (!Cesium.defined(result)) {
        result = {}
    }
    result.image = this.image
    result.time =
        ((performance.now() - this._time) % this.duration) / this.duration
    return result
}
Spriteline1MaterialProperty.prototype.equals = function(e) {
    return (
        this === e ||
        (e instanceof Spriteline1MaterialProperty && this.duration === e.duration)
    )
}
Cesium.Spriteline1MaterialProperty = Spriteline1MaterialProperty
Cesium.Material.Spriteline1Type = 'Spriteline1'
Cesium.Material.Spriteline1Source = `
czm_material czm_getMaterial(czm_materialInput materialInput)
{
czm_material material = czm_getDefaultMaterial(materialInput);
vec2 st = materialInput.st;
vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
material.alpha = colorImage.a;
material.diffuse = colorImage.rgb * 1.5 ;
return material;
}
`
    // st :二维纹理坐标
    // czm_material：保存可用于照明的材质信息
Cesium.Material._materialCache.addMaterial(Cesium.Material.Spriteline1Type, {
    fabric: {
        type: Cesium.Material.Spriteline1Type,
        uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: '',
            transparent: true,
            time: 20,
        },
        source: Cesium.Material.Spriteline1Source,
    },
    translucent: function(material) {
        return true
    },
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122559827