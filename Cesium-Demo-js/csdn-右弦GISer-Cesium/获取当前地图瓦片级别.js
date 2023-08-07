// 获取当前地图瓦片级别
function tileLevel(){
	let tiles = new Set();
	let tilesToRender = viewer.scene.globe._surface._tilesToRender;
	if (Cesium.defined(tilesToRender)) {
	    for (let i = 0; i < tilesToRender.length; i++) {
	        tiles.add(tilesToRender[i].level);
	    }
	    console.log("当前地图瓦片级别为:");
	    console.log(tiles);
	}
}
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/123751718