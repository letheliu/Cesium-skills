// 添加地形
 viewer.terrainProvider = Cesium.createWorldTerrain();
 // 设置相机初始位置
 viewer.camera.setView({
     destination: {
         x: -1154857.1266542252,
         y: 5658626.115702861,
         z: 2858953.297578074
     },
     orientation: {
         heading: 5.956966657617478,
         pitch: -0.060339944171832416,
         roll: 6.283013919534514
     }
 });
 // 地形夸张
 viewer.scene.globe.terrainExaggeration = 8.0;
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123515549