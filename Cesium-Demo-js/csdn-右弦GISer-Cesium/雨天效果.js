// 下雨效果
new Cesium.RainEffect(viewer, {
    tiltAngle: -0.6, //倾斜角度
    rainSize: 0.6, // 雨大小
    rainSpeed: 120.0 // 雨速
})

/*
 * @description:下雨效果，参考简书上的代码
 * @date：2022-01-20
 */

class RainEffect {
    constructor(viewer, options) {
        if (!viewer) throw new Error('no viewer object!');
        options = options || {};
        //倾斜角度，负数向右，正数向左
        this.tiltAngle = Cesium.defaultValue(options.tiltAngle, -.6);
        this.rainSize = Cesium.defaultValue(options.rainSize, 0.3);
        this.rainSpeed = Cesium.defaultValue(options.rainSpeed, 60.0);
        this.viewer = viewer;
        this.init();
    }

    init() {
        this.rainStage = new Cesium.PostProcessStage({
            name: 'czm_rain',
            fragmentShader: this.rain(),
            uniforms: {
                tiltAngle: () => {
                    return this.tiltAngle;
                },
                rainSize: () => {
                    return this.rainSize;
                },
                rainSpeed: () => {
                    return this.rainSpeed;
                }
            }
        });
        this.viewer.scene.postProcessStages.add(this.rainStage);
    }

    destroy() {
        if (!this.viewer || !this.rainStage) return;
        this.viewer.scene.postProcessStages.remove(this.rainStage);
        this.rainStage.destroy();
        delete this.tiltAngle;
        delete this.rainSize;
        delete this.rainSpeed;
    }

    show(visible) {
        this.rainStage.enabled = visible;
    }

    rain() {
        return "uniform sampler2D colorTexture;\n\
                varying vec2 v_textureCoordinates;\n\
                uniform float tiltAngle;\n\
                uniform float rainSize;\n\
                uniform float rainSpeed;\n\
                float hash(float x) {\n\
                    return fract(sin(x * 133.3) * 13.13);\n\
                }\n\
                void main(void) {\n\
                    float time = czm_frameNumber / rainSpeed;\n\
                    vec2 resolution = czm_viewport.zw;\n\
                    vec2 uv = (gl_FragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);\n\
                    vec3 c = vec3(.6, .7, .8);\n\
                    float a = tiltAngle;\n\
                    float si = sin(a), co = cos(a);\n\
                    uv *= mat2(co, -si, si, co);\n\
                    uv *= length(uv + vec2(0, 4.9)) * rainSize + 1.;\n\
                    float v = 1. - sin(hash(floor(uv.x * 100.)) * 2.);\n\
                    float b = clamp(abs(sin(20. * time * v + uv.y * (5. / (2. + v)))) - .95, 0., 1.) * 20.;\n\
                    c *= v * b;\n\
                    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c, 1), .5);\n\
                }\n\
                ";
    }
}

Cesium.RainEffect = RainEffect;
————————————————
版权声明：本文为CSDN博主「右弦GISer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45782925/article/details/122609027