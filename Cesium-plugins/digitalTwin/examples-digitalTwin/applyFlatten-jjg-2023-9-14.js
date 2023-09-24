H(259)
'boundingSphere'

H(254)
'center'

H(262)
'Transforms'

H(277)
'eastNorthUpToFixedFrame'

H(271)
'CustomShader'

H(280)
'UniformType'

H(268)
'MAT4'

H(284)
'Matrix4'

H(260)
'\n        // 所有isPointInPolygon函数\n        '
H(278)
'map'

H(259)
'boundingSphere'
H(254)
'center'
H(274)
'polygon'

H(276)
'\n        void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput){\n            vec3 modelMC = vsInput.attributes.positionMC;\n            vec4 model_local_position = vec4(modelMC.x, modelMC.y, modelMC.z, 1.0);\n            vec4 tileset_local_position = u_tileset_worldToLocalMatrix * czm_model * model_local_position;\n            vec2 position2D = vec2(tileset_local_position.x,tileset_local_position.y);\n            float ground_z = 0.0 + u_flatHeight;\n            // 多个多边形区域\n            '

X
t=>{const e=H;return t[e(278)]((t=>(t=>{const e=H,r=t[e(267)];return t[e(278)](((t,n)=>{const i=e;return i(275)+r+"["+n+i(251)+t[0]+", "+t[1]+");"}))[e(249)]("\n")+e(258)+r+"(position2D)){\n         …
Y
t=>{const e=H;return(t=>{const e=H;return t[e(270)]((function(t,r,n){return n[e(288)](t,0)===r}))})(t[e(278)]((t=>t[e(267)])))[e(278)](U)[e(249)]("\n")}

H(270)
'filter'

H(288)
'indexOf'

H(278)
'map'

H(267)
'length'

H(249)
'join'

H(282)
'\n        // '
H(273)
'个元素的数组\n        vec2 points_'
H(289)
'];\n        bool isPointInPolygon_'
H(285)
'(vec2 point){\n          int nCross = 0; // 交点数\n          const int n = '
H(287)
'[i];\n            vec2 p2 = points_'
H(290)
'[int(mod(float(i+1),float(n)))];\n            if(p1[1] == p2[1]){\n              continue;\n            }\n            if(point[1] < min(p1[1], p2[1])){\n              continue;\n            }\n            if(point[1] >= max(p1[1], p2[1])){\n              continue;\n            }\n            float x = p1[0] + ((point[1] - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]);\n            if(x > point[0]){\n              nCross++;\n            }\n          }\n          return int(mod(float(nCross), float(2))) == 1;\n        }'

H(286)
'log'
H(278)
'map'
H(265)
'Cartesian3'
H(256)
'fromDegrees'
H(272)
'apply'
H(266)
'values'
H(279)
'inverse'
H(262)
'Transforms'
H(284)
'Matrix4'
H(253)
'multiplyByPoint'
H(265)
v 本质为 Cesium

http://localhost:8090/examples-digitalTwin/BloomTarget.html 调试可查看代码

// 获取变换矩阵前两个元素值
const j = (t, e) => {
	return console.log("polygon", e),
		e.map((e => {
			i = Cesium.Cartesian3.fromDegrees.apply(null, e);
			return Object.values(((t, e) => {
					n = Cesium.Matrix4.inverse(Cesium.Transforms.eastNorthUpToFixedFrame(t), new(Cesium.Matrix4));
					return Cesium.Matrix4.multiplyByPoint(n, e, new(Cesium.Cartesian3))
				})(t, i)).splice(0, 2)
		}))
}
      ,U = t=>{
    return '\n        // ' + t 
           + '个元素的数组\n        vec2 points_' + t 
           + "[" + t 
           + '];\n        bool isPointInPolygon_' + t 
           + '(vec2 point){\n          int nCross = 0; // 交点数\n          const int n = ' + t 
           + ";\n          for(int i = 0; i < n; i++){\n            vec2 p1 = points_" + t 
           + '[i];\n            vec2 p2 = points_' + t 
           + '[int(mod(float(i+1),float(n)))];\n            if(p1[1] == p2[1]){\n              continue;\n            }\n            if(point[1] < min(p1[1], p2[1])){\n              continue;\n            }\n            if(point[1] >= max(p1[1], p2[1])){\n              continue;\n            }\n            float x = p1[0] + ((point[1] - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]);\n            if(x > point[0]){\n              nCross++;\n            }\n          }\n          return int(mod(float(nCross), float(2))) == 1;\n        }'
}
      , Y = t => {
            return (t => {
                return t.filter((function(t, r, n) {
                    return n.indexOf(t, 0) === r
                }))
            })(t.map((t => t.length))).map(U).join("\n")
        }
      , X = t => {
	    return t.map((t => (t => {
			const r = t.length;
			return t.map(((t, n) => {
					return 'points_' + r + "[" + n + '] = vec2(' + t[0] + ", " + t[1] + ");"
				})).join("\n") + '\n          if(isPointInPolygon_' + r +
				"(position2D)){\n            vec4 tileset_local_position_transformed = vec4(tileset_local_position.x, tileset_local_position.y, ground_z, 1.0);\n            vec4 model_local_position_transformed = czm_inverseModel * u_tileset_localToWorldMatrix * tileset_local_position_transformed;\n            vsOutput.positionMC.xy = model_local_position_transformed.xy;\n            vsOutput.positionMC.z = model_local_position_transformed.z+ modelMC.z*0.002;\n            return;\n          }"
		})(t.polygon))).join("\n")
};

http://8.130.10.148:3000/digitaltwin/index.html#/developer/cesium

let flatCustomShader = CesiumPlugin.applyFlat(palaceTileset, [
                                {
                                    polygon,//首尾需封闭 【[cartesian.lng, cartesian.lat, cartesian.h]】
                                    flatHeight: -33,
                                },
                            ]);
palaceTileset.customShader = flatCustomShader; 
var position = viewer.scene.pickPosition(movement.endPosition);
                if (position) {
                    var cartesian = transformCartesianToWGS84(position)


var n = palaceTileset.boundingSphere.center;
var i = Cesium.Transforms.eastNorthUpToFixedFrame(n);

let cs = new Cesium.CustomShader({
    uniforms: {
        u_tileset_localToWorldMatrix: {
            type: Cesium.UniformType.MAT4,
            value: i
        },
        u_tileset_worldToLocalMatrix: {
            type: Cesium.UniformType.MAT4,
            value: Cesium.Matrix4.inverse(i, new (Cesium.Matrix4))
        },
        u_flatHeight: {
            type: Cesium.UniformType.FLOAT,
            value: e[0].flatHeight
        }
    },
     vertexShaderText: '\n        // 所有isPointInPolygon函数\n        ' + Y(e.map((e=>{
                            return j(palaceTileset.boundingSphere.center, e.polygon)
                        }))) + '\n        void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput){\n            vec3 modelMC = vsInput.attributes.positionMC;\n            vec4 model_local_position = vec4(modelMC.x, modelMC.y, modelMC.z, 1.0);\n            vec4 tileset_local_position = u_tileset_worldToLocalMatrix * czm_model * model_local_position;\n            vec2 position2D = vec2(tileset_local_position.x,tileset_local_position.y);\n            float ground_z = 0.0 + u_flatHeight;\n            // 多个多边形区域\n            ' 
                        + X(e.map((e=>{
                            return {
                                polygon: j(palaceTileset.boundingSphere.center, e.polygon)
                        }}))) + "\n        }"
});