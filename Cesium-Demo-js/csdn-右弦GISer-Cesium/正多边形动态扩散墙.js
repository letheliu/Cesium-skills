function WallRegularDiffuse(options) {
    let _viewer = options.viewer;
    // 扩散中心点
    let _center = options.center;
    // 扩散半径半径
    let _radius = options.radius || 1000.0;
    // 扩散正多变形的边数
    let _edge = options.edge || 64;
    // 扩散速度
    let _speed = options.speed || 5.0;
    // 扩散高度
    let _height = options.height || 100.0;
    // 实时高度
    let _currentHeight = _height;
    // 最小半径
    let _minRadius = options.minRadius || 10;
    // 实时半径
    let _currentRadius = _minRadius;

    if (_edge < 3) {
        return false;
    }

    /**
     * @description: 获取当前多边形的节点位置和高度
     * @param {*} _center：多边形中心
     * @param {*} _edge：多边形边数
     * @param {*} _currentRadius：当前半径
     * @param {*} _currentHeight：当前高度
     * @return {*}
     */
    function _getPositions(_center, _edge, _currentRadius, _currentHeight) {
        let positions = [];
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(_center[0], _center[1], 0)
        );
        for (let i = 0; i < _edge; i++) {
            let angle = (i / _edge) * Cesium.Math.TWO_PI;
            let x = Math.cos(angle);
            let y = Math.sin(angle);
            let point = new Cesium.Cartesian3(
                x * _currentRadius,
                y * _currentRadius,
                _currentHeight
            )
            positions.push(Cesium.Matrix4.multiplyByPoint(modelMatrix, point, new Cesium.Cartesian3()));
        }
        // 封闭墙，首节点点需要存两次
        positions.push(positions[0]);
        return positions;
    }

    // 添加多边形
    _viewer.entities.add({
        wall: {
            // callbackProperty回调函数，实时更新
            positions: new Cesium.CallbackProperty(() => {
                let positions = [];
                _currentRadius += _radius * _speed / 1000.0;
                _currentHeight -= _height * _speed / 1000.0;

                // 判断扩散的实际半径和高度是否超出范围
                if (_currentRadius > _radius || _currentHeight < 0) {
                    _currentRadius = _minRadius;
                    _currentHeight = _height;
                }

                positions = _getPositions(_center, _edge, _currentRadius, _currentHeight);
                return positions;
            }, false),
            // 设置材质
            material: new Cesium.WallDiffuseMaterialProperty({
                color: new Cesium.Color(1.0, 1.0, 0.0, 1.0)
            })
        }
    })
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123334614



/*
 * @Description: 动态扩散墙的墙体效果（参考开源代码）（不同高度透明度不同）
 * @Version: 1.0
 * @Author: Julian
 * @Date: 2022-03-07 19:50:46
 * @LastEditors: Julian
 * @LastEditTime: 2022-03-07 19:56:30
 */
class WallDiffuseMaterialProperty {
    constructor(options) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this.color = options.color;
    };

    get isConstant() {
        return false;
    }

    get definitionChanged() {
        return this._definitionChanged;
    }

    getType(time) {
        return Cesium.Material.WallDiffuseMaterialType;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        
        result.color = Cesium.Property.getValueOrDefault(this._color, time, Cesium.Color.RED, result.color);
        return result
    }

    equals(other) {
        return (this === other ||
            (other instanceof WallDiffuseMaterialProperty &&
                Cesium.Property.equals(this._color, other._color))
        )
    }
}

Object.defineProperties(WallDiffuseMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor('color'),
})

Cesium.WallDiffuseMaterialProperty = WallDiffuseMaterialProperty;
Cesium.Material.WallDiffuseMaterialProperty = 'WallDiffuseMaterialProperty';
Cesium.Material.WallDiffuseMaterialType = 'WallDiffuseMaterialType';
Cesium.Material.WallDiffuseMaterialSource =
    `
    uniform vec4 color;
    czm_material czm_getMaterial(czm_materialInput materialInput){
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    material.diffuse = color.rgb * 2.0;
    material.alpha = color.a * (1.0-fract(st.t)) * 0.8;
    return material;
    }                                         
    `

Cesium.Material._materialCache.addMaterial(Cesium.Material.WallDiffuseMaterialType, {
    fabric: {
        type: Cesium.Material.WallDiffuseMaterialType,
        uniforms: {
            color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
        },
        source: Cesium.Material.WallDiffuseMaterialSource
    },
    translucent: function(material) {
        return true;
    }
})
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123334614


// 正多边形扩散
 WallRegularDiffuse({
     viewer: this.viewer,
     center: [113.9236839, 22.528061],
     radius: 1000.0,
     edge: 5,
     height: 200.0,
     speed: 15.0,
     minRadius: 50
 });
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123334614
