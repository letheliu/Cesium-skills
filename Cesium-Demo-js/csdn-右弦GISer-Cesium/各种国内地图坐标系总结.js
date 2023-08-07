一、国内的常用坐标系

1、WGS-84坐标系：地心坐标系，GPS原始坐标体系

在中国，任何一个地图产品都不允许使用GPS坐标，据说是为了保密。

2、GCJ-02 坐标系：国测局坐标，火星坐标系

1）国测局02年发布的坐标体系，它是一种对经纬度数据的加密算法，即加入随机的偏差。

2）互联网地图在国内必须至少使用GCJ-02进行首次加密，不允许直接使用WGS-84坐标下的地理数据，同时任何坐标系均不可转换为WGS-84坐标。

3）是国内最广泛使用的坐标体系，高德、腾讯、Google中国地图都使用它。

3、CGCS2000坐标系：国家大地坐标系

该坐标系是通过中国GPS 连续运行基准站、 空间大地控制网以及天文大地网与空间地网联合平差建立的地心大地坐标系统。

4、BD-09坐标系

百度中国地图所采用的坐标系，由GCJ-02进行进一步的偏移算法得到。

5、搜狗坐标系

搜狗地图所采用的坐标系，由GCJ-02进行进一步的偏移算法得到。

6、图吧坐标系

图吧地图所采用的坐标系，由GCJ-02进行进一步的偏移算法得到。

二、国内地图软件所采用的坐标系简介

1、百度地图

1）境内（包括港澳台）：BD09

a、在GCJ-02坐标系基础上再次加密

b、支持WGS-84、GCJ-02转换成BD09，反向不支持，并且批量转换一次有条数限制

2）境外：WGS-84

2、高德地图:

1）境内：GCJ-02

a、WGS-84——>GCJ-02（高德有接口提供，反过来没有）

2）境外：暂不支持

3）AMap 就是高德地图，是高德地图在纳斯达克上市用的名字，主要面向互联网企业或个人提供免费API服务

4）MapABC 是高德集团底下的图盟公司，主要面向大众型企业或政府机关，并提供付费的有偿服务

5）Amap和MapABC，数据和服务都是共享的，所以Mapabc用Amap的API是正常的

3、google地图

1）境内：GCJ-02

a、数据来源于高德，两者互通

2）境外：WGS-84

4、天地图

全球统一：CGCS2000

5、腾讯地图：soso地图

境内：GCJ02

6、微软bing地图：BingMap

全球统一：WGS-84

7、搜狗地图

境内：搜狗坐标系

a、在GCJ-02坐标系基础上再次加密

b、支持WGS-84、GCJ-02、BD09转换成搜狗坐标，反向不支持

8、图吧地图: MapBar

境内：图吧坐标系

a、在GCJ-02坐标系基础上再次加密

9、阿里云地图

境内：GCJ-02

10、灵图地图：51ditu

境内：GCJ-02

三、各个坐标系之间的转换

1、以下代码，提供的转换算法如下：

1）WGS-84 ——> GCJ02

2）GCJ02 ——> WGS-84

3）GCJ02 ——> BD09

4）BD09 ——> GCJ02

5）BD09 ——> WGS-84

1.   package com.xy;  

2.     

3.   /** 

4.    * 各地图API坐标系统比较与转换; 

5.    * WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系, 

6.    * 谷歌地图采用的是WGS84地理坐标系（中国范围除外）; 

7.    * GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。 

8.    * 谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系; 

9.    * 搜狗坐标系、图吧坐标系等，估计也是在GCJ02基础上加密而成的。  

10.  */  

11. public class PositionUtil {  

12.       

13.     public static final String BAIDU_LBS_TYPE = "bd09ll";  

14.       

15.     public static double pi = 3.1415926535897932384626;  

16.     public static double a = 6378245.0;  

17.     public static double ee = 0.00669342162296594323;  

18.   

19.     /** 

20.      * 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System 

21.      *  

22.      * @param lat 

23.      * @param lon 

24.      * @return 

25.      */  

26.     public static Gps gps84_To_Gcj02(double lat, double lon) {  

27.         if (outOfChina(lat, lon)) {  

28.             return null;  

29.         }  

30.         double dLat = transformLat(lon - 105.0, lat - 35.0);  

31.         double dLon = transformLon(lon - 105.0, lat - 35.0);  

32.         double radLat = lat / 180.0 * pi;  

33.         double magic = Math.sin(radLat);  

34.         magic = 1 - ee * magic * magic;  

35.         double sqrtMagic = Math.sqrt(magic);  

36.         dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);  

37.         dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);  

38.         double mgLat = lat + dLat;  

39.         double mgLon = lon + dLon;  

40.         return new Gps(mgLat, mgLon);  

41.     }  

42.   

43.     /** 

44.      * * 火星坐标系 (GCJ-02) to 84 * * @param lon * @param lat * @return 

45.      * */  

46.     public static Gps gcj_To_Gps84(double lat, double lon) {  

47.         Gps gps = transform(lat, lon);  

48.         double lontitude = lon * 2 - gps.getWgLon();  

49.         double latitude = lat * 2 - gps.getWgLat();  

50.         return new Gps(latitude, lontitude);  

51.     }  

52.   

53.     /** 

54.      * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标 

55.      *  

56.      * @param gg_lat 

57.      * @param gg_lon 

58.      */  

59.     public static Gps gcj02_To_Bd09(double gg_lat, double gg_lon) {  

60.         double x = gg_lon, y = gg_lat;  

61.         double z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);  

62.         double theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);  

63.         double bd_lon = z * Math.cos(theta) + 0.0065;  

64.         double bd_lat = z * Math.sin(theta) + 0.006;  

65.         return new Gps(bd_lat, bd_lon);  

66.     }  

67.   

68.     /** 

69.      * * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param 

70.      * bd_lat * @param bd_lon * @return 

71.      */  

72.     public static Gps bd09_To_Gcj02(double bd_lat, double bd_lon) {  

73.         double x = bd_lon - 0.0065, y = bd_lat - 0.006;  

74.         double z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);  

75.         double theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);  

76.         double gg_lon = z * Math.cos(theta);  

77.         double gg_lat = z * Math.sin(theta);  

78.         return new Gps(gg_lat, gg_lon);  

79.     }  

80.   

81.     /** 

82.      * (BD-09)-->84 

83.      * @param bd_lat 

84.      * @param bd_lon 

85.      * @return 

86.      */  

87.     public static Gps bd09_To_Gps84(double bd_lat, double bd_lon) {  

88.   

89.         Gps gcj02 = PositionUtil.bd09_To_Gcj02(bd_lat, bd_lon);  

90.         Gps map84 = PositionUtil.gcj_To_Gps84(gcj02.getWgLat(),  

91.                 gcj02.getWgLon());  

92.         return map84;  

93.   

94.     }  

95.   

96.     public static boolean outOfChina(double lat, double lon) {  

97.         if (lon < 72.004 || lon > 137.8347)  

98.             return true;  

99.         if (lat < 0.8293 || lat > 55.8271)  

100.              return true;  

101.          return false;  

102.      }  

103.    

104.      public static Gps transform(double lat, double lon) {  

105.          if (outOfChina(lat, lon)) {  

106.              return new Gps(lat, lon);  

107.          }  

108.          double dLat = transformLat(lon - 105.0, lat - 35.0);  

109.          double dLon = transformLon(lon - 105.0, lat - 35.0);  

110.          double radLat = lat / 180.0 * pi;  

111.          double magic = Math.sin(radLat);  

112.          magic = 1 - ee * magic * magic;  

113.          double sqrtMagic = Math.sqrt(magic);  

114.          dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);  

115.          dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);  

116.          double mgLat = lat + dLat;  

117.          double mgLon = lon + dLon;  

118.          return new Gps(mgLat, mgLon);  

119.      }  

120.    

121.      public static double transformLat(double x, double y) {  

122.          double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y  

123.                  + 0.2 * Math.sqrt(Math.abs(x));  

124.          ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;  

125.          ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;  

126.          ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;  

127.          return ret;  

128.      }  

129.    

130.      public static double transformLon(double x, double y) {  

131.          double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1  

132.                  * Math.sqrt(Math.abs(x));  

133.          ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;  

134.          ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;  

135.          ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0  

136.                  * pi)) * 2.0 / 3.0;  

137.          return ret;  

138.      }  

139.    

140.      public static void main(String[] args) {  

141.    

142.          // 北斗芯片获取的经纬度为WGS84地理坐标 31.426896,119.496145  

143.          Gps gps = new Gps(31.426896, 119.496145);  

144.          System.out.println("gps :" + gps);  

145.          Gps gcj = gps84_To_Gcj02(gps.getWgLat(), gps.getWgLon());  

146.          System.out.println("gcj :" + gcj);  

147.          Gps star = gcj_To_Gps84(gcj.getWgLat(), gcj.getWgLon());  

148.          System.out.println("star:" + star);  

149.          Gps bd = gcj02_To_Bd09(gcj.getWgLat(), gcj.getWgLon());  

150.          System.out.println("bd  :" + bd);  

151.          Gps gcj2 = bd09_To_Gcj02(bd.getWgLat(), bd.getWgLon());  

152.          System.out.println("gcj :" + gcj2);  

153.      }  

154.  }  

2、百度在线转换API

1.   http://api.map.baidu.com/ag/coord/convert?from=0&to=4&x=longitude&y=latitude   

2.   from: 来源坐标系   （0表示WGS-84坐标，2表示GCJ-02坐标）  

3.   to: 转换后的坐标  (4就是百度自己啦，这个必须是4才行）  

4.   x: 精度  

5.   y: 纬度

得到的经纬度需要进一步转换才能得到BD-09坐标

1.   import java.io.BufferedReader;  

2.   import java.io.IOException;  

3.   import java.io.InputStream;  

4.   import java.io.InputStreamReader;  

5.   import java.io.OutputStreamWriter;  

6.   import java.net.URL;  

7.   import java.net.URLConnection;  

8.   import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;  

9.   public class BaiduAPIConverter extends Thread {  

10.   public static void testPost(String x, String y) throws IOException {  

11.     try {  

12.       URL url = new URL("http://api.map.baidu.com/ag/coord/convert?from=2&to=4&x="+ 

13.                                        x + "&y=" + y);  

14.       URLConnection connection = url.openConnection();  

15.       connection.setDoOutput(true);  

16.       OutputStreamWriter out = new OutputStreamWriter(connection.getOutputStream(), "utf-8");  

17.       // remember to clean up   

18.       out.flush();  

19.       out.close();  

20.       // 一旦发送成功，用以下方法就可以得到服务器的回应：   

21.       String sCurrentLine, sTotalString;  

22.       sCurrentLine = sTotalString = "";  

23.       InputStream l_urlStream;  

24.       l_urlStream = connection.getInputStream();  

25.       BufferedReader l_reader = new BufferedReader(new InputStreamReader(l_urlStream));  

26.       while ((sCurrentLine = l_reader.readLine()) != null) {  

27.         if (!sCurrentLine.equals(""))  

28.           sTotalString += sCurrentLine;  

29.       }  

30.       sTotalString = sTotalString.substring(1, sTotalString.length() - 1);  

31.       String[] results = sTotalString.split("\\,");  

32.       if (results.length == 3) {  

33.         if (results[0].split("\\:")[1].equals("0")) {  

34.           String mapX = results[1].split("\\:")[1];  

35.           String mapY = results[2].split("\\:")[1];  

36.           mapX = mapX.substring(1, mapX.length() - 1);  

37.           mapY = mapY.substring(1, mapY.length() - 1);  

38.           mapX = new String(Base64.decode(mapX));  

39.           mapY = new String(Base64.decode(mapY));  

40.           System.out.println("\t" + mapX + "\t" + mapY);  

41.         }  

42.       }  

43.      sleep(10000);  

44.     } catch (InterruptedException e) {  

45.       // TODO Auto-generated catch block   

46.       e.printStackTrace();  

47.     }  

48.   }  

49.   /** 

50.    * @param args 

51.    * @throws IOException 

52.    */  

53.   public static void main(String[] args) throws IOException {  

54.     testPost("120.151379", "30.184678");  

55.     System.out.println("ok");  

56.   }  

57. }  

3、百度地图获取WGS-84坐标

在百度地图中取得WGS-84坐标，调用如下方法：
BMapManager.getLocationManager().setLocationCoordinateType(

MKLocationManager.MK_COORDINATE_WGS84);
这样从百度api中取得的坐标就是WGS-84了，可是这种坐标如果显示到百度地图上就会偏移，也就是说取出一个坐标，原封不动的显示上去就偏移了，所以为了显示也是正常就需要在绘制到百度地图上之前转换成BD-09。
转换成BD-09，调用方法：
  GeoPoint wgs84;
GeoPoint bd09 = CoordinateConvert.bundleDecode(CoordinateConvert.fromWgs84ToBaidu(wgs84))；
这里实在不明白为何要设计成CoordinateConvert.fromWgs84ToBaidu(wgs84)返回了一个Bundle，所以还需要CoordinateConvert.bundleDecode()再转成GeoPoint。

4、CGCS2000坐标与WGS-84坐标的转换

CGCS2000与WGS84的基本定义是一致的，采用的参考椭球非常相近，椭球常数中仅扁率有细微差别，虽然因此会造成同一点在两个坐标系中的值会有微小差异，但是，在当前测量精度水平下这种微小差值是可以忽略的，因此，可以认为CGCS2000和WGS84是相容的，在坐标系的实现精度范围内两种坐标系下的坐标是一致的。

另一方面，由于两者本身就不是由彼此加密或者解密就可以得到的关系，所以转换的算法十分复杂。通常采用工具软件来进行转换，如ArcGIS、BIGEMAP等。

四、取自一段大神的总结

采用自家坐标体系，而不采用国内通用的火星坐标体系，实在是自寻短处。当然，百度是因为做的足够大、足够好，所以很霸道，也为以后一统天下而不让别人瓜分之而做准备吧。搜狗虽然用自家坐标体系，但能将地球坐标直接导入，此举也属唯一。而图吧地图不知道学什么加密方式，以前用地球坐标用的好好的，现在用图吧自己的坐标，难道是因为给百度做过所以也来了这么一招？或者沿用百度？不得而知。

本文的目的在于：做地图开发的时候，不希望被一家地图API迁就，所以采用火星坐标GCJ-02是正确的选择，希望本文能够对选择使用谁家API的开发者提供一点帮助吧。就我个人而言，我绝不会使用非火星坐标系统的地图API，虽然百度地图API很好很强大确实很吸引我。
————————————————
版权声明：本文为CSDN博主「我有明珠一颗」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_37738114/article/details/80452485