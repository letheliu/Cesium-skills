// 开启等高线效果
 contourLine();
 
 /**
  * @description: 等高线
  * @param {*}
  * @return {*}
  */        
 function contourLine() {
     let globe = viewer.scene.globe;

     let contourUniforms = {};

     // 使用等高线材质
     let material = Cesium.Material.fromType("ElevationContour");
     contourUniforms = material.uniforms;

     // 线宽2.0px
     contourUniforms.width = 2.0;
     // 高度间隔为150米
     contourUniforms.spacing = 150;
     
     contourUniforms.color = Cesium.Color.RED;

     // 设置材质
     globe.material = material;
 }
