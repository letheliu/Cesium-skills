eval(function(n){"use strict";function r(n){var r=[];return r[n-1]=void 0,r}function u(n,r){return f(n[0]+r[0],n[1]+r[1])}function t(n,r){var u,t;return n[0]==r[0]&&n[1]==r[1]?0:(u=0>n[1],t=0>r[1],u&&!t?-1:!u&&t?1:a(n,r)[1]<0?-1:1)}function f(n,r){var u,t;for(r%=0x10000000000000000,n%=0x10000000000000000,u=r%un,t=Math.floor(n/un)*un,r=r-u+t,n=n-t+u;0>n;)n+=un,r-=un;for(;n>4294967295;)n-=un,r+=un;for(r%=0x10000000000000000;r>0x7fffffff00000000;)r-=0x10000000000000000;for(;-0x8000000000000000>r;)r+=0x10000000000000000;return[n,r]}function i(n){return n>=0?[n,0]:[n+un,-un]}function c(n){return n[0]>=2147483648?~~Math.max(Math.min(n[0]-un,2147483647),-2147483648):~~Math.max(Math.min(n[0],2147483647),-2147483648)}function a(n,r){return f(n[0]-r[0],n[1]-r[1])}function o(n,r){return n.ab=r,n.cb=0,n.O=r.length,n}function e(n){return n.cb>=n.O?-1:255&n.ab[n.cb++]}function v(n){return n.ab=r(32),n.O=0,n}function s(n){var r=n.ab;return r.length=n.O,r}function g(n,r,u,t){l(r,u,n.ab,n.O,t),n.O+=t}function l(n,r,u,t,f){for(var i=0;f>i;++i)u[t+i]=n[r+i]}function C(n,r,u){var t,f,c,a,o="",v=[];for(f=0;5>f;++f){if(c=e(r),-1==c)throw Error("truncated input");v[f]=c<<24>>24}if(t=F({}),!V(t,v))throw Error("corrupted input");for(f=0;64>f;f+=8){if(c=e(r),-1==c)throw Error("truncated input");c=c.toString(16),1==c.length&&(c="0"+c),o=c+""+o}/^0+$|^f+$/i.test(o)?n.M=tn:(a=parseInt(o,16),n.M=a>4294967295?tn:i(a)),n.S=M(t,r,u,n.M)}function z(n,r){return n.Y=v({}),C(n,o({},r),n.Y),n}function p(n,r,u){var t=n.y-r-1;for(0>t&&(t+=n.c);0!=u;--u)t>=n.c&&(t=0),n.x[n.y++]=n.x[t++],n.y>=n.c&&N(n)}function x(n,u){(null==n.x||n.c!=u)&&(n.x=r(u)),n.c=u,n.y=0,n.w=0}function N(n){var r=n.y-n.w;r&&(g(n.T,n.x,n.w,r),n.y>=n.c&&(n.y=0),n.w=n.y)}function d(n,r){var u=n.y-r-1;return 0>u&&(u+=n.c),n.x[u]}function J(n,r){n.x[n.y++]=r,n.y>=n.c&&N(n)}function L(n){N(n),n.T=null}function j(n){return n-=2,4>n?n:3}function B(n){return 4>n?0:10>n?n-3:n-6}function b(n,r){return n.h=r,n.bb=null,n.V=1,n}function k(n){if(!n.V)throw Error("bad state");if(n.bb)throw Error("No encoding");return h(n),n.V}function h(n){var r=U(n.h);if(-1==r)throw Error("corrupted input");n.$=tn,n.Z=n.h.d,(r||t(n.h.U,fn)>=0&&t(n.h.d,n.h.U)>=0)&&(N(n.h.b),L(n.h.b),n.h.a.K=null,n.V=0)}function M(n,r,u,t){return n.a.K=r,L(n.b),n.b.T=u,A(n),n.f=0,n.l=0,n.Q=0,n.R=0,n._=0,n.U=t,n.d=fn,n.G=0,b({},n)}function U(n){var r,f,a,o,e,v;if(v=c(n.d)&n.P,Q(n.a,n.t,(n.f<<4)+v)){if(Q(n.a,n.E,n.f))a=0,Q(n.a,n.r,n.f)?(Q(n.a,n.u,n.f)?(Q(n.a,n.s,n.f)?(f=n._,n._=n.R):f=n.R,n.R=n.Q):f=n.Q,n.Q=n.l,n.l=f):Q(n.a,n.o,(n.f<<4)+v)||(n.f=7>n.f?9:11,a=1),a||(a=q(n.n,n.a,v)+2,n.f=7>n.f?8:11);else if(n._=n.R,n.R=n.Q,n.Q=n.l,a=2+q(n.D,n.a,v),n.f=7>n.f?7:10,e=S(n.k[j(a)],n.a),e>=4){if(o=(e>>1)-1,n.l=(2|1&e)<<o,14>e)n.l+=X(n.J,n.l-e-1,n.a,o);else if(n.l+=T(n.a,o-4)<<4,n.l+=Y(n.q,n.a),0>n.l)return-1==n.l?1:-1}else n.l=e;if(t(i(n.l),n.d)>=0||n.l>=n.m)return-1;p(n.b,n.l,a),n.d=u(n.d,i(a)),n.G=d(n.b,0)}else r=D(n.j,c(n.d),n.G),n.G=7>n.f?E(r,n.a):R(r,n.a,d(n.b,n.l)),J(n.b,n.G),n.f=B(n.f),n.d=u(n.d,cn);return 0}function F(n){n.b={},n.a={},n.t=r(192),n.E=r(12),n.r=r(12),n.u=r(12),n.s=r(12),n.o=r(192),n.k=r(4),n.J=r(114),n.q=H({},4),n.D=m({}),n.n=m({}),n.j={};for(var u=0;4>u;++u)n.k[u]=H({},6);return n}function A(n){n.b.w=0,n.b.y=0,I(n.t),I(n.o),I(n.E),I(n.r),I(n.u),I(n.s),I(n.J),Z(n.j);for(var r=0;4>r;++r)I(n.k[r].z);w(n.D),w(n.n),I(n.q.z),K(n.a)}function V(n,r){var u,t,f,i,c,a,o;if(5>r.length)return 0;for(o=255&r[0],f=o%9,a=~~(o/9),i=a%5,c=~~(a/5),u=0,t=0;4>t;++t)u+=(255&r[1+t])<<8*t;return u>99999999||!W(n,f,i,c)?0:G(n,u)}function G(n,r){return 0>r?0:(n.A!=r&&(n.A=r,n.m=Math.max(n.A,1),x(n.b,Math.max(n.m,4096))),1)}function W(n,r,u,t){if(r>8||u>4||t>4)return 0;P(n.j,u,r);var f=1<<t;return O(n.D,f),O(n.n,f),n.P=f-1,1}function O(n,r){for(;r>n.e;++n.e)n.I[n.e]=H({},3),n.H[n.e]=H({},3)}function q(n,r,u){if(!Q(r,n.N,0))return S(n.I[u],r);var t=8;return t+=Q(r,n.N,1)?8+S(n.L,r):S(n.H[u],r)}function m(n){return n.N=r(2),n.I=r(16),n.H=r(16),n.L=H({},8),n.e=0,n}function w(n){I(n.N);for(var r=0;n.e>r;++r)I(n.I[r].z),I(n.H[r].z);I(n.L.z)}function P(n,u,t){var f,i;if(null==n.F||n.g!=t||n.B!=u)for(n.B=u,n.X=(1<<u)-1,n.g=t,i=1<<n.g+n.B,n.F=r(i),f=0;i>f;++f)n.F[f]=y({})}function D(n,r,u){return n.F[((r&n.X)<<n.g)+((255&u)>>>8-n.g)]}function Z(n){var r,u;for(u=1<<n.g+n.B,r=0;u>r;++r)I(n.F[r].v)}function E(n,r){var u=1;do u=u<<1|Q(r,n.v,u);while(256>u);return u<<24>>24}function R(n,r,u){var t,f,i=1;do if(f=u>>7&1,u<<=1,t=Q(r,n.v,(1+f<<8)+i),i=i<<1|t,f!=t){for(;256>i;)i=i<<1|Q(r,n.v,i);break}while(256>i);return i<<24>>24}function y(n){return n.v=r(768),n}function H(n,u){return n.C=u,n.z=r(1<<u),n}function S(n,r){var u,t=1;for(u=n.C;0!=u;--u)t=(t<<1)+Q(r,n.z,t);return t-(1<<n.C)}function Y(n,r){var u,t,f=1,i=0;for(t=0;n.C>t;++t)u=Q(r,n.z,f),f<<=1,f+=u,i|=u<<t;return i}function X(n,r,u,t){var f,i,c=1,a=0;for(i=0;t>i;++i)f=Q(u,n,r+c),c<<=1,c+=f,a|=f<<i;return a}function Q(n,r,u){var t,f=r[u];return t=(n.i>>>11)*f,(-2147483648^t)>(-2147483648^n.p)?(n.i=t,r[u]=f+(2048-f>>>5)<<16>>16,-16777216&n.i||(n.p=n.p<<8|e(n.K),n.i<<=8),0):(n.i-=t,n.p-=t,r[u]=f-(f>>>5)<<16>>16,-16777216&n.i||(n.p=n.p<<8|e(n.K),n.i<<=8),1)}function T(n,r){var u,t,f=0;for(u=r;0!=u;--u)n.i>>>=1,t=n.p-n.i>>>31,n.p-=n.i&t-1,f=f<<1|1-t,-16777216&n.i||(n.p=n.p<<8|e(n.K),n.i<<=8);return f}function K(n){n.p=0,n.i=-1;for(var r=0;5>r;++r)n.p=n.p<<8|e(n.K)}function I(n){for(var r=n.length-1;r>=0;--r)n[r]=1024}function _(n){for(var r,u,t,f=0,i=0,c=n.length,a=[],o=[];c>f;++f,++i){if(r=255&n[f],128&r)if(192==(224&r)){if(f+1>=n.length)return n;if(u=255&n[++f],128!=(192&u))return n;o[i]=(31&r)<<6|63&u}else{if(224!=(240&r))return n;if(f+2>=n.length)return n;if(u=255&n[++f],128!=(192&u))return n;if(t=255&n[++f],128!=(192&t))return n;o[i]=(15&r)<<12|(63&u)<<6|63&t}else{if(!r)return n;o[i]=r}65535==i&&(a.push(String.fromCharCode.apply(String,o)),i=-1)}return i>0&&(o.length=i,a.push(String.fromCharCode.apply(String,o))),a.join("")}function $(n){return n>64&&91>n?n-65:n>96&&123>n?n-71:n>47&&58>n?n+4:43===n?62:47===n?63:0}function nn(r){for(var u,t,f=r.length,i=3*f+1>>>2,c=new Array(i),a=0,o=0,e=0;f>e;e++)if(t=3&e,a|=$(r.charCodeAt(e))<<18-6*t,3===t||f-e===1){for(u=0;3>u&&i>o;u++,o++)c[o]=a>>>(16>>>u&24)&255;a=0}return c}function rn(n){n=nn(n);var r={};for(r.d=z({},n);k(r.d.S););return _(s(r.d.Y))}var un=4294967296,tn=[4294967295,-un],fn=[0,0],cn=[1,0];return rn}(this)("XQAAAQBuDQAAAAAAAAAxm8oZxjYXLR4ei/2WPxG2z1Ow1iYwCx1IOY90Pe2icXEMHSurWkmHvnO/NWzmGrE4+/728ISnTGFPVHZ82BWriJ5b7GwtYbSFNtU43AT9jRWW4t0mtUuEDjoRCMaA3GVwq/0OGzk1PK//AQGuK/HM9qHRFu1hGiaFYRGqv728kBNtOC5WpzsZrE/OKb24zJYbF/nOlIlODILccBSxt0I4q9DfFmeQmqFhCwMJkiL3P6r7El7IXy09kLAKB//xzaqYCJE6PXbVXgC1UOOqmWJpS9sMJw1SDwAwtgvXCspQVhsCKlA98hZziY2MgbUMpBohqRUCX2Qgvy4ZbZro1d7BVM4m6Q5jj396CJAJPSLXRuGUq/BPFiK9tdhD5Dr8hOLwmJ3zPRq5aalpDgvkkY1SsEgLArlNaPfyoK0iVzhkQ+RIRKWJQuLWcIx60wofBhenEGyCZ9cwgeA0JM+ze/PRnZou3YuvneIquXW7O9Qy890rFDUcoeIESmOGrlC9MnbaGmEs6f2mPmHa3ILUyM9d04KLVm77jNGTR5mXSFsGfJkimQQ08LKA5GgR0ryQhatVSqG+wTBeAA+v3yfCZxymxyG9qsth4EWfOGl09F9vfeEkcJuQFAsEe7q83KvLBwE9/WTQRwFyAt21tigNeV/QyVQBZoQ2O1D4WgO0xixb5H1CQVRdKQubVKtzGcQ3rMowmb3nNCMUG7QgchxPsi3ZtjDcgURI/iln3A6Hwg7P4xhJYiLdfF6o3Hlv9Ig360XENKeo2kWxjpXMJ7N1SdTuqiSp1UIGOhElFf7Ekl43gBpzNgi29pEYg1VBNxSaNv5eQ55fUvaeb+JKuWuSz4xmfarg6AvCmBqxo8x+OYesqqibFT3hqMuThknuooxVUea9YG3q0l/OEwlUCivbGR+a7euzCKRRAebEyS+yvxGywv71XDNt0eFPAFXdqpFeoMHQr4iAgQ8OewNW+R90q8+bawaJT5cr+y6VsoXt19liLg+NczJ0kF4WgKbRH8zKn/K4VwOyNXXJGG/VaF5kuYbeQOY0/GdN3uqaBZETM67iB/kgov/0cbqmUJNkIVJ9ejH57+j1qAZyUYnmHKHVSQOwWXHB5zrL9flJjKeEqPZv3+VbRytLKOc/ysP0XLmQzvLU9tiOLHAPegN11TkTiKWppZpvHy6Y8m8ArLttHcgEI9V7GQy1yM28FnJlw8TVSh+dimuz52CqJf12R1YysWf9sNSF44vcbBZOFZTdOtPVlM7pSbSlq6c9nfdUTmA64OhrngK8ZgpJtLANQjE8KQH6cKTIcWBxFLHpmzIs5lC9G91l8jG5kEoVGae8q0wDMsz6H73n/n5/kZ1MI1wcwIUmbCVqGeLF4pfAjaosQTOVlccR5EO3kW9FW+vUmwi8ZHziwxdDI6q/ri2Q4OwCx8A63uPA7bvQusMOdAE/YSHvfa8ebbV3SKVIbm7NpyOuhV8P5rHT5qxlurisXpgAT0JmH+Kydup/mDmwk4yVda9nk0u3GsOktUyR41FCC702ZOYgTToE+v089daAxcv7I1gMaLR8NebT1tmc1gk0fRkicie53l8TGjpVayBshhnpPKPF0EwOjWWtBFLrB6Nl/SNC4WF4ml9ggbBvzOOQ0Cth7cHdn86ExLPGCMw2hxdgSK56gYyRp4/58dicis04XopeYlEal3pF/9iCZ5U="));