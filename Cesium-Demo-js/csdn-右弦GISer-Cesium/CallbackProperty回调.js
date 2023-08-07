/ 添加多边形
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
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123340902