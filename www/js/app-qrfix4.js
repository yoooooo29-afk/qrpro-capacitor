/* Embedded qrcodejs library - QR Pro qrfix4 */
var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();
/* End embedded qrcodejs library */

/* ========================================
   QR Pro - Main Application JavaScript
   Fixed QR Generation
   ======================================== */

const AppState = {
  currentScreen: 'home-screen',
  currentQRType: 'url',
  scanner: null,
  isScanning: false,
  currentCamera: 'environment',
  flashOn: false,
  history: [],
  favorites: [],
  settings: {
    darkMode: true,
    scanSound: true,
    vibrate: true,
    autoCopy: false,
    urlConfirm: true,
    saveImages: false,
    autoSave: true,
    defaultFormat: 'png',
    saveHistory: true,
    incognito: false,
    showAds: true
  },
  lastGeneratedQR: null,
  lastScanResult: null
};

const DOM = {};

function initApp() {
  cacheDOM();
  loadSettings();
  loadHistory();
  setupNavigation();
  setupScanner();
  setupGenerator();
  setupHistory();
  setupSettings();
  setupResultActions();
  setupUtilities();
  renderRecentActivity();

  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
  }, 1500);

  applyTheme();
  console.log('QR Pro initialized! Version: qrfix4-embedded-qr UNIQUE FILE');
}

function cacheDOM() {
  DOM.screens = document.querySelectorAll('.screen');
  DOM.navItems = document.querySelectorAll('.nav-item');
  DOM.typeBtns = document.querySelectorAll('.type-btn');
  DOM.formPanels = document.querySelectorAll('.form-panel');
}

function setupNavigation() {
  DOM.navItems.forEach(item => item.addEventListener('click', () => navigateTo(item.dataset.screen)));
  document.getElementById('scanner-back').addEventListener('click', () => navigateTo('home-screen'));
  document.getElementById('result-back').addEventListener('click', () => navigateTo('home-screen'));
  document.getElementById('generator-back').addEventListener('click', () => navigateTo('home-screen'));
  document.getElementById('generated-back').addEventListener('click', () => navigateTo('generator-screen'));
  document.getElementById('history-back').addEventListener('click', () => navigateTo('home-screen'));
  document.getElementById('settings-back').addEventListener('click', () => navigateTo('home-screen'));
  document.getElementById('quick-scan').addEventListener('click', () => { navigateTo('scanner-screen'); startCamera(); });
  document.getElementById('quick-generate').addEventListener('click', () => navigateTo('generator-screen'));
  document.getElementById('quick-image-scan').addEventListener('click', () => document.getElementById('scan-file-input').click());
  document.getElementById('quick-paste-scan').addEventListener('click', scanFromClipboard);
  document.getElementById('quick-upi').addEventListener('click', () => { navigateTo('generator-screen'); switchQRType('upi'); });
  document.getElementById('quick-wifi').addEventListener('click', () => { navigateTo('generator-screen'); switchQRType('wifi'); });
  document.getElementById('view-all-history').addEventListener('click', () => navigateTo('history-screen'));
}

function navigateTo(screenId) {
  if (AppState.currentScreen === 'scanner-screen' && screenId !== 'scanner-screen') stopCamera();
  DOM.screens.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    AppState.currentScreen = screenId;
  }
  DOM.navItems.forEach(item => item.classList.toggle('active', item.dataset.screen === screenId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupScanner() {
  document.getElementById('camera-toggle').addEventListener('click', () => {
    if (AppState.isScanning) stopCamera();
    else startCamera();
  });
  document.getElementById('camera-switch').addEventListener('click', switchCamera);
  document.getElementById('flash-toggle').addEventListener('click', toggleFlash);
  document.getElementById('scan-from-file').addEventListener('click', () => document.getElementById('scan-file-input').click());
  document.getElementById('file-input').addEventListener('change', handleFileScan);
  document.getElementById('scan-file-input').addEventListener('change', handleFileScan);
  document.getElementById('scan-from-clipboard').addEventListener('click', scanFromClipboard);
  document.getElementById('wifi-pass-toggle').addEventListener('click', function () {
    const input = document.getElementById('wifi-password');
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    this.querySelector('.material-icons-round').textContent = isPassword ? 'visibility' : 'visibility_off';
  });
}

async function startCamera() {
  const toggleBtn = document.getElementById('camera-toggle');
  try {
    if (typeof Html5Qrcode === 'undefined') {
      showToast('Scanner library loading...', 'warning');
      return;
    }
    AppState.scanner = new Html5Qrcode('reader');
    await AppState.scanner.start(
      { facingMode: AppState.currentCamera },
      { fps: 15, qrbox: { width: 250, height: 250 } },
      onScanSuccess,
      () => {}
    );
    AppState.isScanning = true;
    toggleBtn.classList.add('active');
    toggleBtn.querySelector('.material-icons-round').textContent = 'stop';
  } catch (err) {
    console.error('Camera failed:', err);
    showToast('Could not access camera. Try uploading an image.', 'error');
    document.getElementById('scan-from-file').click();
  }
}

async function stopCamera() {
  if (AppState.scanner && AppState.isScanning) {
    try {
      await AppState.scanner.stop();
      AppState.scanner.clear();
    } catch (e) {}
    AppState.isScanning = false;
    const toggleBtn = document.getElementById('camera-toggle');
    toggleBtn.classList.remove('active');
    toggleBtn.querySelector('.material-icons-round').textContent = 'photo_camera';
  }
}

async function switchCamera() {
  const wasScanning = AppState.isScanning;
  if (wasScanning) await stopCamera();
  AppState.currentCamera = AppState.currentCamera === 'environment' ? 'user' : 'environment';
  if (wasScanning) await startCamera();
}

async function toggleFlash() {
  const flashBtn = document.getElementById('flash-toggle');
  AppState.flashOn = !AppState.flashOn;
  flashBtn.classList.toggle('active', AppState.flashOn);
  flashBtn.querySelector('.material-icons-round').textContent = AppState.flashOn ? 'flash_on' : 'flash_off';
  try {
    if (AppState.scanner) await AppState.scanner.applyVideoConstraints({ advanced: [{ torch: AppState.flashOn }] });
  } catch (e) {
    showToast('Flash not supported', 'warning');
  }
}

async function handleFileScan(e) {
  const file = e.target.files[0];
  if (!file) return;
  showToast('Scanning image...', 'info');
  try {
    if (typeof Html5Qrcode === 'undefined') {
      showToast('Scanner not loaded', 'error');
      return;
    }
    const tempScanner = new Html5Qrcode('reader');
    const result = await tempScanner.scanFile(file, true);
    onScanSuccess(result);
    tempScanner.clear();
  } catch (err) {
    showToast('No QR code found in this image.', 'error');
  }
  e.target.value = '';
}

async function scanFromClipboard() {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      if (item.types.some(t => t.startsWith('image/'))) {
        const blob = await item.getType(item.types.find(t => t.startsWith('image/')));
        const file = new File([blob], 'clipboard.png', { type: blob.type });
        if (typeof Html5Qrcode === 'undefined') {
          showToast('Scanner not loaded', 'error');
          return;
        }
        const tempScanner = new Html5Qrcode('reader');
        const result = await tempScanner.scanFile(file, true);
        onScanSuccess(result);
        tempScanner.clear();
        return;
      }
    }
    const text = await navigator.clipboard.readText();
    if (text && text.trim()) {
      showToast('Pasted text from clipboard', 'info');
      document.getElementById('url-input').value = text.trim();
      navigateTo('generator-screen');
      switchQRType('url');
    }
  } catch (err) {
    showToast('Could not read clipboard.', 'warning');
  }
}

function onScanSuccess(decodedText) {
  if (AppState.settings.vibrate && navigator.vibrate) navigator.vibrate(100);
  if (AppState.settings.scanSound) playBeep();
  if (AppState.isScanning) stopCamera();
  AppState.lastScanResult = decodedText;
  const contentType = analyzeContentType(decodedText);
  showResultScreen(decodedText, contentType);
  if (AppState.settings.autoCopy) navigator.clipboard.writeText(decodedText).catch(() => {});
  if (AppState.settings.saveHistory && !AppState.settings.incognito) addToHistory('scan', decodedText, contentType);
  showToast('QR Code scanned successfully!', 'success');
}

function analyzeContentType(text) {
  text = text.trim();
  if (text.startsWith('WIFI:')) return 'wifi';
  if (text.startsWith('BEGIN:VCARD')) return 'vcard';
  if (text.startsWith('mailto:') || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'email';
  if (text.startsWith('tel:') || /^\+?\d[\d\s-]{6,}$/.test(text)) return 'phone';
  if (text.startsWith('smsto:') || text.startsWith('sms:')) return 'sms';
  if (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('www.')) return 'url';
  if (text.startsWith('upi://')) return 'upi';
  if (text.startsWith('geo:') || text.startsWith('https://maps.')) return 'location';
  if (text.startsWith('BEGIN:VEVENT')) return 'event';
  return 'text';
}

function showResultScreen(text, type) {
  navigateTo('result-screen');
  const iconEl = document.getElementById('result-type-icon');
  const textEl = document.getElementById('result-type-text');
  const dataEl = document.getElementById('result-data');
  const actionsEl = document.getElementById('result-actions');
  const metaEl = document.getElementById('result-meta');
  const typeConfig = getTypeConfig(type);

  iconEl.textContent = typeConfig.icon;
  textEl.textContent = typeConfig.label;
  dataEl.className = 'result-data' + (type === 'wifi' ? ' fmt-wifi' : '');

  if (type === 'wifi') dataEl.innerHTML = formatWifiDisplay(parseWiFi(text));
  else if (type === 'vcard') dataEl.innerHTML = formatVCardDisplay(parseVCard(text));
  else if (type === 'email') dataEl.innerHTML = formatEmailDisplay(parseEmail(text));
  else dataEl.textContent = text;

  actionsEl.innerHTML = typeConfig.actions.map(a =>
    '<button class="result-action-btn ' + (a.primary ? 'primary' : '') + '" onclick="' + a.handler + '(\'' + escapeForAttr(text) + '\')">' +
    '<span class="material-icons-round">' + a.icon + '</span>' + a.label + '</button>'
  ).join('');

  metaEl.innerHTML = '<div class="meta-item"><span class="material-icons-round">data_object</span>' + text.length + ' characters</div>' +
    '<div class="meta-item"><span class="material-icons-round">schedule</span>' + formatDate(new Date()) + '</div>' +
    '<div class="meta-item"><span class="material-icons-round">qr_code_scanner</span>Camera scan</div>';
}

function getTypeConfig(type) {
  const configs = {
    url: { icon: 'link', label: 'URL', actions: [
      { icon: 'open_in_new', label: 'Open', handler: 'openURL', primary: true },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' },
      { icon: 'share', label: 'Share', handler: 'shareContent' }
    ]},
    text: { icon: 'text_fields', label: 'Text', actions: [
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent', primary: true },
      { icon: 'search', label: 'Search', handler: 'searchWeb' },
      { icon: 'translate', label: 'Translate', handler: 'translateText' },
      { icon: 'share', label: 'Share', handler: 'shareContent' }
    ]},
    wifi: { icon: 'wifi', label: 'WiFi', actions: [
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent', primary: true },
      { icon: 'share', label: 'Share', handler: 'shareContent' }
    ]},
    vcard: { icon: 'person', label: 'Contact', actions: [
      { icon: 'person_add', label: 'Add Contact', handler: 'addContact', primary: true },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' },
      { icon: 'share', label: 'Share', handler: 'shareContent' }
    ]},
    email: { icon: 'email', label: 'Email', actions: [
      { icon: 'send', label: 'Send Email', handler: 'openEmail', primary: true },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' }
    ]},
    phone: { icon: 'phone', label: 'Phone', actions: [
      { icon: 'phone', label: 'Call', handler: 'openPhone', primary: true },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' }
    ]},
    sms: { icon: 'sms', label: 'SMS', actions: [
      { icon: 'sms', label: 'Send SMS', handler: 'openSMS', primary: true },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' }
    ]},
    upi: { icon: 'payments', label: 'UPI Payment', actions: [
      { icon: 'payments', label: 'Pay Now', handler: 'openUPI', primary: true },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' }
    ]},
    location: { icon: 'location_on', label: 'Location', actions: [
      { icon: 'map', label: 'Open Maps', handler: 'openMaps', primary: true },
      { icon: 'directions', label: 'Directions', handler: 'openDirections' },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' }
    ]},
    event: { icon: 'event', label: 'Calendar Event', actions: [
      { icon: 'event', label: 'Add Calendar', handler: 'addEvent', primary: true },
      { icon: 'content_copy', label: 'Copy', handler: 'copyContent' }
    ]}
  };
  return configs[type] || configs.text;
}

function parseWiFi(text) {
  const r = { ssid: '', password: '', encryption: 'WPA', hidden: false };
  const m = p => (text.match(p) || [])[1] || '';
  r.ssid = m(/S:([^;]*)/);
  r.password = m(/P:([^;]*)/);
  r.encryption = m(/T:([^;]*)/) || 'WPA';
  r.hidden = m(/H:(true|false)/) === 'true';
  return r;
}

function formatWifiDisplay(wifi) {
  let h = '<div style="margin-bottom:8px"><strong>Network:</strong> ' + escapeHtml(wifi.ssid) + '</div>';
  if (wifi.password) h += '<div style="margin-bottom:8px"><strong>Password:</strong> <code style="background:var(--bg-card);padding:2px 6px;border-radius:4px;user-select:all;">' + escapeHtml(wifi.password) + '</code></div>';
  h += '<div><strong>Encryption:</strong> ' + (wifi.encryption === 'nopass' ? 'Open' : wifi.encryption) + '</div>';
  if (wifi.hidden) h += '<div><strong>Hidden:</strong> Yes</div>';
  return h;
}

function parseVCard(text) {
  const r = { name: '', phone: '', email: '', org: '', url: '' };
  const m = p => ((text.match(p) || [])[1] || '').trim();
  r.name = m(/FN:([^\r\n]*)/);
  r.phone = m(/TEL[^:]*:([^\r\n]*)/);
  r.email = m(/EMAIL[^:]*:([^\r\n]*)/);
  r.org = m(/ORG:([^\r\n]*)/);
  r.url = m(/URL:([^\r\n]*)/);
  return r;
}

function formatVCardDisplay(v) {
  let h = '';
  if (v.name) h += '<div style="margin-bottom:6px"><strong>Name:</strong> ' + escapeHtml(v.name) + '</div>';
  if (v.phone) h += '<div style="margin-bottom:6px"><strong>Phone:</strong> ' + escapeHtml(v.phone) + '</div>';
  if (v.email) h += '<div style="margin-bottom:6px"><strong>Email:</strong> ' + escapeHtml(v.email) + '</div>';
  if (v.org) h += '<div style="margin-bottom:6px"><strong>Organization:</strong> ' + escapeHtml(v.org) + '</div>';
  if (v.url) h += '<div><strong>Website:</strong> ' + escapeHtml(v.url) + '</div>';
  return h || 'Empty vCard';
}

function parseEmail(text) {
  const c = text.replace('mailto:', '');
  const [email, query] = c.split('?');
  const r = { to: email, subject: '', body: '' };
  if (query) {
    const p = new URLSearchParams(query);
    r.subject = p.get('subject') || '';
    r.body = p.get('body') || '';
  }
  return r;
}

function formatEmailDisplay(e) {
  let h = '<div style="margin-bottom:6px"><strong>To:</strong> ' + escapeHtml(e.to) + '</div>';
  if (e.subject) h += '<div style="margin-bottom:6px"><strong>Subject:</strong> ' + escapeHtml(e.subject) + '</div>';
  if (e.body) h += '<div><strong>Body:</strong> ' + escapeHtml(e.body) + '</div>';
  return h;
}

function openURL(url) {
  if (AppState.settings.urlConfirm) {
    document.getElementById('confirm-url').textContent = url;
    document.getElementById('url-confirm-dialog').classList.remove('hidden');
    document.getElementById('confirm-open').onclick = () => {
      window.open(url, '_blank');
      document.getElementById('url-confirm-dialog').classList.add('hidden');
    };
    document.getElementById('confirm-cancel').onclick = () => document.getElementById('url-confirm-dialog').classList.add('hidden');
  } else {
    window.open(url, '_blank');
  }
}

function copyContent(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied!', 'success')).catch(() => showToast('Copy failed', 'error'));
}

async function shareContent(text) {
  if (navigator.share) {
    try { await navigator.share({ title: 'QR Pro', text }); } catch (e) {}
  } else copyContent(text);
}

function searchWeb(text) { window.open('https://www.google.com/search?q=' + encodeURIComponent(text), '_blank'); }
function translateText(text) { window.open('https://translate.google.com/?text=' + encodeURIComponent(text), '_blank'); }
function openEmail(text) { window.open(text, '_self'); }
function openPhone(text) { window.open('tel:' + text.replace('tel:', ''), '_self'); }
function openSMS(text) { window.open('sms:' + text.replace(/sms:|smsto:/, ''), '_self'); }
function openUPI(text) { window.open(text, '_self'); }
function openMaps(text) { window.open('https://www.google.com/maps?q=' + encodeURIComponent(text.replace('geo:', '')), '_blank'); }
function openDirections(text) { window.open('https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(text.replace('geo:', '')), '_blank'); }

function addContact(text) {
  const blob = new Blob([text], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'contact.vcf';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Contact file downloaded!', 'success');
}

function addEvent(text) {
  const ics = generateICS(text);
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'event.ics';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Calendar event downloaded!', 'success');
}

function generateICS(text) {
  const lines = text.split(/\r?\n/);
  let s = '', ds = '', de = '', l = '', d = '';
  for (const line of lines) {
    if (line.startsWith('SUMMARY')) s = line.split(':').slice(1).join(':');
    if (line.startsWith('DTSTART')) ds = line.split(':').slice(1).join(':');
    if (line.startsWith('DTEND')) de = line.split(':').slice(1).join(':');
    if (line.startsWith('LOCATION')) l = line.split(':').slice(1).join(':');
    if (line.startsWith('DESCRIPTION')) d = line.split(':').slice(1).join(':');
  }
  return 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:' + (s || 'Event') + '\nDTSTART:' + ds + '\nDTEND:' + de + '\nLOCATION:' + (l || '') + '\nDESCRIPTION:' + (d || '') + '\nEND:VEVENT\nEND:VCALENDAR';
}

function setupGenerator() {
  DOM.typeBtns.forEach(btn => btn.addEventListener('click', () => switchQRType(btn.dataset.type)));
  setupCharCounter('url-input', 'url-count');
  setupCharCounter('text-input', 'text-count');
  document.getElementById('btn-generate').addEventListener('click', generateQR);
  setupDesignControls();
  document.getElementById('get-location-btn').addEventListener('click', getCurrentLocation);
}

function switchQRType(type) {
  AppState.currentQRType = type;
  DOM.typeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.type === type));
  DOM.formPanels.forEach(panel => panel.classList.toggle('active', panel.id === 'form-' + type));
}

function setupCharCounter(inputId, countId) {
  const input = document.getElementById(inputId);
  const count = document.getElementById(countId);
  if (input && count) input.addEventListener('input', () => count.textContent = input.value.length);
}

function setupDesignControls() {
  const fgColor = document.getElementById('fg-color');
  const fgText = document.getElementById('fg-color-text');
  const bgColor = document.getElementById('bg-color');
  const bgText = document.getElementById('bg-color-text');
  const marginSlider = document.getElementById('qr-margin');
  const marginValue = document.getElementById('margin-value');

  fgColor.addEventListener('input', () => { fgText.value = fgColor.value; updateLivePreview(); });
  fgText.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(fgText.value)) { fgColor.value = fgText.value; updateLivePreview(); } });
  bgColor.addEventListener('input', () => { bgText.value = bgColor.value; updateLivePreview(); });
  bgText.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(bgText.value)) { bgColor.value = bgText.value; updateLivePreview(); } });
  marginSlider.addEventListener('input', () => { marginValue.textContent = marginSlider.value; updateLivePreview(); });
  document.getElementById('error-correction').addEventListener('change', updateLivePreview);
  document.getElementById('qr-size').addEventListener('change', updateLivePreview);
}

function updateLivePreview() {
  const content = getCurrentQRContent();
  if (!content) return;
  generateQRCode(content, 'qr-preview-canvas');
  document.getElementById('qr-preview-canvas').style.display = 'block';
  document.getElementById('preview-placeholder').style.display = 'none';
}

function getCurrentQRContent() {
  const type = AppState.currentQRType;
  switch (type) {
    case 'url': {
      let u = document.getElementById('url-input').value.trim();
      if (u && !u.match(/^https?:\/\//i)) u = 'https://' + u;
      return u || null;
    }
    case 'text':
      return document.getElementById('text-input').value.trim() || null;
    case 'wifi': {
      const ssid = document.getElementById('wifi-ssid').value.trim();
      if (!ssid) return null;
      const enc = document.getElementById('wifi-encryption').value;
      const pass = document.getElementById('wifi-password').value;
      const hidden = document.getElementById('wifi-hidden').checked;
      return 'WIFI:T:' + enc + ';S:' + escapeWifiValue(ssid) + ';P:' + escapeWifiValue(pass) + ';H:' + hidden + ';;';
    }
    case 'vcard': {
      const name = document.getElementById('vcard-name').value.trim();
      if (!name) return null;
      return 'BEGIN:VCARD\nVERSION:3.0\nFN:' + name + '\n' +
        (document.getElementById('vcard-phone').value ? 'TEL:' + document.getElementById('vcard-phone').value + '\n' : '') +
        (document.getElementById('vcard-email').value ? 'EMAIL:' + document.getElementById('vcard-email').value + '\n' : '') +
        (document.getElementById('vcard-org').value ? 'ORG:' + document.getElementById('vcard-org').value + '\n' : '') +
        (document.getElementById('vcard-url').value ? 'URL:' + document.getElementById('vcard-url').value + '\n' : '') +
        (document.getElementById('vcard-address').value ? 'ADR:' + document.getElementById('vcard-address').value + '\n' : '') +
        'END:VCARD';
    }
    case 'email': {
      const to = document.getElementById('email-to').value.trim();
      if (!to) return null;
      const subject = document.getElementById('email-subject').value.trim();
      const body = document.getElementById('email-body').value.trim();
      return 'mailto:' + to + (subject || body ? '?' : '') +
        (subject ? 'subject=' + encodeURIComponent(subject) : '') +
        (subject && body ? '&' : '') +
        (body ? 'body=' + encodeURIComponent(body) : '');
    }
    case 'phone': {
      const p = document.getElementById('phone-number').value.trim();
      return p ? 'tel:' + p : null;
    }
    case 'sms': {
      const p = document.getElementById('sms-phone').value.trim();
      if (!p) return null;
      const b = document.getElementById('sms-body').value.trim();
      return 'smsto:' + p + (b ? '?body=' + encodeURIComponent(b) : '');
    }
    case 'location': {
      const lat = document.getElementById('loc-lat').value.trim();
      const lng = document.getElementById('loc-lng').value.trim();
      if (!lat || !lng) return null;
      const name = document.getElementById('loc-name').value.trim();
      return 'geo:' + lat + ',' + lng + (name ? '(' + name + ')' : '');
    }
    case 'upi': {
      const id = document.getElementById('upi-id').value.trim();
      if (!id) return null;
      const name = document.getElementById('upi-name').value.trim();
      const amount = document.getElementById('upi-amount').value.trim();
      const note = document.getElementById('upi-note').value.trim();
      return 'upi://pay?pa=' + encodeURIComponent(id) +
        (name ? '&pn=' + encodeURIComponent(name) : '') +
        (amount ? '&am=' + encodeURIComponent(amount) : '') +
        (note ? '&tn=' + encodeURIComponent(note) : '');
    }
    case 'event': {
      const title = document.getElementById('event-title').value.trim();
      if (!title) return null;
      const start = document.getElementById('event-start').value;
      const end = document.getElementById('event-end').value;
      const loc = document.getElementById('event-location').value.trim();
      const desc = document.getElementById('event-desc').value.trim();
      return 'BEGIN:VEVENT\nSUMMARY:' + title + '\n' +
        (start ? 'DTSTART:' + start.replace(/[-:]/g, '') + '00\n' : '') +
        (end ? 'DTEND:' + end.replace(/[-:]/g, '') + '00\n' : '') +
        (loc ? 'LOCATION:' + loc + '\n' : '') +
        (desc ? 'DESCRIPTION:' + desc + '\n' : '') +
        'END:VEVENT';
    }
    default:
      return null;
  }
}

function escapeWifiValue(value) {
  return String(value).replace(/([\\;,:"])/g, '\\$1');
}

async function generateQR() {
  const content = getCurrentQRContent();
  if (!content) {
    showToast('Please fill in required fields', 'error');
    return;
  }

  const canvas = document.getElementById('generated-canvas');
  if (!canvas) {
    showToast('QR canvas not found', 'error');
    console.error('Element with id "generated-canvas" not found.');
    return;
  }

  const size = parseInt(document.getElementById('qr-size').value, 10) || 256;
  const margin = parseInt(document.getElementById('qr-margin').value, 10) || 4;
  const fgColor = document.getElementById('fg-color').value || '#000000';
  const bgColor = document.getElementById('bg-color').value || '#ffffff';
  const errorCorrection = document.getElementById('error-correction').value || 'M';

  try {
    await drawQRToCanvas(canvas, content, {
      size,
      margin,
      fgColor,
      bgColor,
      errorCorrection
    });

    AppState.lastGeneratedQR = { content, type: AppState.currentQRType };
    navigateTo('generated-screen');

    const info = document.getElementById('generated-info');
    if (info) info.textContent = content;

    if (AppState.settings.autoSave && AppState.settings.saveHistory && !AppState.settings.incognito) {
      addToHistory('generate', content, AppState.currentQRType);
    }

    showToast('QR Code generated successfully!', 'success');
  } catch (err) {
    console.error('QR generation failed:', err);
    showToast(err.message || 'Failed to generate QR code.', 'error');
  }
}

function generateQRCode(content, canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !content) return;

  const size = Math.min(parseInt(document.getElementById('qr-size').value, 10) || 256, 200);
  const margin = parseInt(document.getElementById('qr-margin').value, 10) || 4;
  const fgColor = document.getElementById('fg-color').value || '#000000';
  const bgColor = document.getElementById('bg-color').value || '#ffffff';
  const errorCorrection = document.getElementById('error-correction').value || 'M';

  drawQRToCanvas(canvas, content, {
    size,
    margin,
    fgColor,
    bgColor,
    errorCorrection
  }).catch(err => console.log('Preview error:', err));
}

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="' + src + '"]');
    if (existing) {
      if (typeof QRCode !== 'undefined') resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Failed to load ' + src)), { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load ' + src));
    document.head.appendChild(script);
  });
}

async function loadQRCodeLibrary() {
  if (typeof QRCode !== 'undefined') return;

  const sources = [
    'js/qrcode.min.js?v=20260611-local',
    './js/qrcode.min.js?v=20260611-local',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
    'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
  ];

  for (const src of sources) {
    try {
      await loadScriptOnce(src);
      if (typeof QRCode !== 'undefined') {
        console.log('QRCode library loaded from:', src);
        return;
      }
    } catch (err) {
      console.warn(err.message);
    }
  }
}

async function drawQRToCanvas(canvas, content, options = {}) {
  const size = options.size || 256;
  const margin = options.margin ?? 4;
  const fgColor = options.fgColor || '#000000';
  const bgColor = options.bgColor || '#ffffff';
  const errorCorrection = String(options.errorCorrection || 'M').toUpperCase();

  if (typeof QRCode === 'undefined') {
    await loadQRCodeLibrary();
  }

  if (typeof QRCode === 'undefined') {
    throw new Error('QR library not loaded. Upload js/qrcode.min.js or check script path.');
  }

  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Library: https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js
  if (typeof QRCode.toCanvas === 'function') {
    await QRCode.toCanvas(canvas, content, {
      width: size,
      margin,
      color: { dark: fgColor, light: bgColor },
      errorCorrectionLevel: errorCorrection
    });
    return;
  }

  // Library: https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js
  if (typeof QRCode === 'function') {
    await new Promise((resolve, reject) => {
      let temp;
      try {
        temp = document.createElement('div');
        temp.style.position = 'fixed';
        temp.style.left = '-99999px';
        temp.style.top = '-99999px';
        temp.style.width = size + 'px';
        temp.style.height = size + 'px';
        document.body.appendChild(temp);

        const correctLevelMap = QRCode.CorrectLevel ? {
          L: QRCode.CorrectLevel.L,
          M: QRCode.CorrectLevel.M,
          Q: QRCode.CorrectLevel.Q,
          H: QRCode.CorrectLevel.H
        } : {};

        new QRCode(temp, {
          text: content,
          width: size,
          height: size,
          colorDark: fgColor,
          colorLight: bgColor,
          correctLevel: correctLevelMap[errorCorrection] || correctLevelMap.M
        });

        setTimeout(() => {
          const generatedCanvas = temp.querySelector('canvas');
          const generatedImg = temp.querySelector('img');

          ctx.clearRect(0, 0, size, size);
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, size, size);

          if (generatedCanvas) {
            ctx.drawImage(generatedCanvas, 0, 0, size, size);
            temp.remove();
            resolve();
            return;
          }

          if (generatedImg) {
            const drawImage = () => {
              ctx.drawImage(generatedImg, 0, 0, size, size);
              temp.remove();
              resolve();
            };
            if (generatedImg.complete) drawImage();
            else generatedImg.onload = drawImage;
            generatedImg.onerror = () => {
              temp.remove();
              reject(new Error('QR image could not be loaded.'));
            };
            return;
          }

          temp.remove();
          reject(new Error('QR image was not created.'));
        }, 100);
      } catch (err) {
        if (temp) temp.remove();
        reject(err);
      }
    });
    return;
  }

  throw new Error('Unsupported QRCode library.');
}

function setupResultActions() {
  document.querySelectorAll('.dl-btn').forEach(btn => btn.addEventListener('click', () => downloadQR(btn.dataset.format)));
  document.getElementById('btn-share-qr').addEventListener('click', shareQR);
  document.getElementById('btn-download-all').addEventListener('click', () => downloadQR('png'));
}

async function downloadQR(format) {
  const canvas = document.getElementById('generated-canvas');
  if (!canvas || !canvas.toDataURL) {
    showToast('No QR code to download', 'error');
    return;
  }
  try {
    let dataUrl, filename;
    if (format === 'svg') {
      const svgData = canvasToSVG(canvas);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      dataUrl = URL.createObjectURL(blob);
      filename = 'qrcode-' + Date.now() + '.svg';
    } else if (format === 'jpeg') {
      dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      filename = 'qrcode-' + Date.now() + '.jpg';
    } else {
      dataUrl = canvas.toDataURL('image/png');
      filename = 'qrcode-' + Date.now() + '.png';
    }
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    if (format === 'svg') URL.revokeObjectURL(dataUrl);
    showToast('Downloaded as ' + format.toUpperCase() + '!', 'success');
  } catch (err) {
    showToast('Download failed', 'error');
  }
}

function canvasToSVG(canvas) {
  const size = canvas.width;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, size, size);
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">';
  svg += '<rect width="' + size + '" height="' + size + '" fill="white"/>';
  const ms = Math.max(1, Math.ceil(size / 100));
  for (let y = 0; y < size; y += ms) {
    for (let x = 0; x < size; x += ms) {
      const idx = (y * size + x) * 4;
      if (imageData.data[idx] < 128) svg += '<rect x="' + x + '" y="' + y + '" width="' + ms + '" height="' + ms + '" fill="black"/>';
    }
  }
  svg += '</svg>';
  return svg;
}

async function shareQR() {
  const canvas = document.getElementById('generated-canvas');
  if (!canvas) return;
  if (navigator.share) {
    try {
      canvas.toBlob(async blob => {
        const file = new File([blob], 'qrcode.png', { type: 'image/png' });
        await navigator.share({ title: 'QR Pro', files: [file] });
      });
    } catch (e) {
      if (e.name !== 'AbortError') downloadQR('png');
    }
  } else downloadQR('png');
}

function setupHistory() {
  document.getElementById('history-search').addEventListener('input', filterHistory);
  document.getElementById('history-filter').addEventListener('change', filterHistory);
  document.getElementById('history-sort').addEventListener('change', filterHistory);
  document.getElementById('clear-history').addEventListener('click', clearHistory);
  document.getElementById('export-history').addEventListener('click', exportHistory);
}

function addToHistory(action, content, type) {
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    action,
    content,
    type: type || analyzeContentType(content),
    timestamp: new Date().toISOString(),
    favorite: false
  };
  AppState.history.unshift(entry);
  saveHistory();
  renderRecentActivity();
  if (AppState.currentScreen === 'history-screen') filterHistory();
}

function saveHistory() {
  try { localStorage.setItem('qrpro_history', JSON.stringify(AppState.history)); } catch (e) {}
}

function loadHistory() {
  try {
    const s = localStorage.getItem('qrpro_history');
    if (s) AppState.history = JSON.parse(s);
  } catch (e) {
    AppState.history = [];
  }
}

function renderRecentActivity() {
  const container = document.getElementById('recent-list');
  const recent = AppState.history.slice(0, 5);
  if (recent.length === 0) {
    container.innerHTML = '<div class="empty-state"><span class="material-icons-round empty-icon">history</span><p>No recent activity</p><span class="empty-hint">Your scans and generations will appear here</span></div>';
    return;
  }
  container.innerHTML = recent.map(item => {
    const tc = getTypeConfig(item.type);
    return '<div class="recent-item" onclick="viewHistoryItem(\'' + item.id + '\')">' +
      '<div class="recent-icon"><span class="material-icons-round">' + tc.icon + '</span></div>' +
      '<div class="recent-info"><div class="recent-title">' + escapeHtml(truncate(item.content, 50)) + '</div>' +
      '<div class="recent-meta"><span>' + (item.action === 'scan' ? 'Scanned' : 'Generated') + '</span><span>' + formatDate(new Date(item.timestamp)) + '</span></div></div>' +
      '<button class="recent-fav ' + (item.favorite ? 'active' : '') + '" onclick="event.stopPropagation();toggleFavorite(\'' + item.id + '\')">' +
      '<span class="material-icons-round">' + (item.favorite ? 'star' : 'star_border') + '</span></button></div>';
  }).join('');
}

function filterHistory() {
  const search = document.getElementById('history-search').value.toLowerCase();
  const filterType = document.getElementById('history-filter').value;
  const sortOrder = document.getElementById('history-sort').value;
  let filtered = [...AppState.history];

  if (search) filtered = filtered.filter(item => item.content.toLowerCase().includes(search) || item.type.toLowerCase().includes(search));
  if (filterType !== 'all') {
    if (filterType === 'scan') filtered = filtered.filter(item => item.action === 'scan');
    else if (filterType === 'generate') filtered = filtered.filter(item => item.action === 'generate');
    else filtered = filtered.filter(item => item.type === filterType);
  }
  filtered.sort((a, b) => sortOrder === 'newest' ? new Date(b.timestamp) - new Date(a.timestamp) : new Date(a.timestamp) - new Date(b.timestamp));

  const container = document.getElementById('history-list');
  const actionsContainer = document.getElementById('history-actions');
  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state"><span class="material-icons-round empty-icon">search_off</span><p>No matching history</p><span class="empty-hint">Try changing your search or filters</span></div>';
    actionsContainer.hidden = true;
  } else {
    actionsContainer.hidden = false;
    container.innerHTML = filtered.map(item => renderHistoryItem(item)).join('');
  }
}

function renderHistoryItem(item) {
  const tc = getTypeConfig(item.type);
  return '<div class="history-item" onclick="viewHistoryItem(\'' + item.id + '\')">' +
    '<div class="history-icon"><span class="material-icons-round">' + tc.icon + '</span>' +
    '<span class="history-badge ' + item.action + '">' + (item.action === 'scan' ? 'S' : 'G') + '</span></div>' +
    '<div class="history-info"><div class="history-title">' + escapeHtml(truncate(item.content, 60)) + '</div>' +
    '<div class="history-type">' + tc.label + '</div><div class="history-date">' + formatDate(new Date(item.timestamp)) + '</div></div>' +
    '<div class="history-actions-row">' +
    '<button class="history-action-btn fav ' + (item.favorite ? 'active' : '') + '" onclick="event.stopPropagation();toggleFavorite(\'' + item.id + '\')">' +
    '<span class="material-icons-round">' + (item.favorite ? 'star' : 'star_border') + '</span></button>' +
    '<button class="history-action-btn" onclick="event.stopPropagation();deleteHistoryItem(\'' + item.id + '\')">' +
    '<span class="material-icons-round">delete</span></button></div></div>';
}

function viewHistoryItem(id) {
  const item = AppState.history.find(h => h.id === id);
  if (!item) return;
  AppState.lastScanResult = item.content;
  showResultScreen(item.content, item.type);
}

function toggleFavorite(id) {
  const item = AppState.history.find(h => h.id === id);
  if (item) {
    item.favorite = !item.favorite;
    saveHistory();
    renderRecentActivity();
    filterHistory();
    showToast(item.favorite ? 'Added to favorites' : 'Removed from favorites', 'success');
  }
}

function deleteHistoryItem(id) {
  AppState.history = AppState.history.filter(h => h.id !== id);
  saveHistory();
  filterHistory();
  renderRecentActivity();
  showToast('Item deleted', 'success');
}

function clearHistory() {
  if (confirm('Clear all history? This cannot be undone.')) {
    AppState.history = [];
    saveHistory();
    filterHistory();
    renderRecentActivity();
    showToast('History cleared', 'success');
  }
}

function exportHistory() {
  if (AppState.history.length === 0) {
    showToast('No history to export', 'warning');
    return;
  }
  const csv = ['Action,Type,Content,Timestamp,Favorite'].concat(
    AppState.history.map(item => item.action + ',' + item.type + ',"' + item.content.replace(/"/g, '""') + '",' + item.timestamp + ',' + (item.favorite ? 'Yes' : 'No'))
  ).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'qrpro-history-' + new Date().toISOString().split('T')[0] + '.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('History exported as CSV!', 'success');
}

function setupSettings() {
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('settings-btn').addEventListener('click', () => navigateTo('settings-screen'));
  document.getElementById('setting-dark-mode').addEventListener('change', e => { AppState.settings.darkMode = e.target.checked; applyTheme(); saveSettings(); });
  document.getElementById('setting-scan-sound').addEventListener('change', e => { AppState.settings.scanSound = e.target.checked; saveSettings(); });
  document.getElementById('setting-vibrate').addEventListener('change', e => { AppState.settings.vibrate = e.target.checked; saveSettings(); });
  document.getElementById('setting-auto-copy').addEventListener('change', e => { AppState.settings.autoCopy = e.target.checked; saveSettings(); });
  document.getElementById('setting-url-confirm').addEventListener('change', e => { AppState.settings.urlConfirm = e.target.checked; saveSettings(); });
  document.getElementById('setting-auto-save').addEventListener('change', e => { AppState.settings.autoSave = e.target.checked; saveSettings(); });
  document.getElementById('setting-default-format').addEventListener('change', e => { AppState.settings.defaultFormat = e.target.value; saveSettings(); });
  document.getElementById('setting-save-history').addEventListener('change', e => { AppState.settings.saveHistory = e.target.checked; saveSettings(); });
  document.getElementById('setting-incognito').addEventListener('change', e => { AppState.settings.incognito = e.target.checked; saveSettings(); });
  document.getElementById('setting-show-ads').addEventListener('change', e => { AppState.settings.showAds = e.target.checked; updateAdBanner(); saveSettings(); });
  document.getElementById('export-all-data').addEventListener('click', exportAllData);
  document.getElementById('clear-all-data').addEventListener('click', clearAllData);
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('qrpro_settings');
    if (saved) AppState.settings = { ...AppState.settings, ...JSON.parse(saved) };
    const el = id => document.getElementById(id);
    if (el('setting-dark-mode')) el('setting-dark-mode').checked = AppState.settings.darkMode;
    if (el('setting-scan-sound')) el('setting-scan-sound').checked = AppState.settings.scanSound;
    if (el('setting-vibrate')) el('setting-vibrate').checked = AppState.settings.vibrate;
    if (el('setting-auto-copy')) el('setting-auto-copy').checked = AppState.settings.autoCopy;
    if (el('setting-url-confirm')) el('setting-url-confirm').checked = AppState.settings.urlConfirm;
    if (el('setting-auto-save')) el('setting-auto-save').checked = AppState.settings.autoSave;
    if (el('setting-default-format')) el('setting-default-format').value = AppState.settings.defaultFormat;
    if (el('setting-save-history')) el('setting-save-history').checked = AppState.settings.saveHistory;
    if (el('setting-incognito')) el('setting-incognito').checked = AppState.settings.incognito;
    if (el('setting-show-ads')) el('setting-show-ads').checked = AppState.settings.showAds;
  } catch (e) {}
}

function saveSettings() {
  try { localStorage.setItem('qrpro_settings', JSON.stringify(AppState.settings)); } catch (e) {}
}

function applyTheme() {
  const root = document.documentElement;
  root.setAttribute('data-theme', AppState.settings.darkMode ? 'dark' : 'light');
  const icon = document.querySelector('#theme-toggle .material-icons-round');
  if (icon) icon.textContent = AppState.settings.darkMode ? 'light_mode' : 'dark_mode';
}

function toggleTheme() {
  AppState.settings.darkMode = !AppState.settings.darkMode;
  applyTheme();
  saveSettings();
  showToast('Switched to ' + (AppState.settings.darkMode ? 'Dark' : 'Light') + ' mode', 'success');
}

function updateAdBanner() {
  const adBanner = document.getElementById('admob-banner');
  if (adBanner) adBanner.classList.toggle('active', AppState.settings.showAds);
}

function setupUtilities() {
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case '1': e.preventDefault(); navigateTo('home-screen'); break;
        case '2': e.preventDefault(); navigateTo('scanner-screen'); startCamera(); break;
        case '3': e.preventDefault(); navigateTo('generator-screen'); break;
        case '4': e.preventDefault(); navigateTo('history-screen'); break;
      }
    }
    if (e.key === 'Escape' && AppState.currentScreen !== 'home-screen') navigateTo('home-screen');
  });

  document.addEventListener('paste', e => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) handlePasteFile(file);
        break;
      }
    }
  });
}

async function handlePasteFile(file) {
  showToast('Scanning pasted image...', 'info');
  try {
    if (typeof Html5Qrcode === 'undefined') {
      showToast('Scanner not loaded', 'error');
      return;
    }
    const tempScanner = new Html5Qrcode('reader');
    const result = await tempScanner.scanFile(file, true);
    onScanSuccess(result);
    tempScanner.clear();
  } catch (err) {
    showToast('No QR code found in pasted image', 'error');
  }
}

function getCurrentLocation() {
  if (!navigator.geolocation) {
    showToast('Geolocation not supported', 'error');
    return;
  }
  showToast('Getting location...', 'info');
  navigator.geolocation.getCurrentPosition(
    pos => {
      document.getElementById('loc-lat').value = pos.coords.latitude.toFixed(6);
      document.getElementById('loc-lng').value = pos.coords.longitude.toFixed(6);
      showToast('Location captured!', 'success');
    },
    () => showToast('Could not get location. Enter manually.', 'error'),
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 1200;
    osc.type = 'sine';
    gain.gain.value = 0.1;
    osc.start();
    setTimeout(() => { osc.stop(); ctx.close(); }, 150);
  } catch (e) {}
}

function exportAllData() {
  const data = {
    history: AppState.history,
    favorites: AppState.favorites,
    settings: AppState.settings,
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'qrpro-backup-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('All data exported!', 'success');
}

function clearAllData() {
  if (confirm('Delete ALL data? This cannot be undone!')) {
    localStorage.removeItem('qrpro_history');
    localStorage.removeItem('qrpro_favorites');
    localStorage.removeItem('qrpro_settings');
    AppState.history = [];
    AppState.favorites = [];
    renderRecentActivity();
    loadSettings();
    applyTheme();
    showToast('All data cleared', 'success');
  }
}

function showToast(message, type) {
  type = type || 'success';
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toast-icon');
  const msg = document.getElementById('toast-message');
  toast.className = 'toast ' + type;
  const icons = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
  icon.textContent = icons[type] || 'info';
  msg.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeForAttr(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, '\\n').replace(/\r/g, '');
}

function truncate(str, max) {
  return str.length > max ? str.substring(0, max) + '...' : str;
}

function formatDate(date) {
  const diff = Date.now() - date;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
  if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function registerServiceWorker() {
  // QR fix: remove old service worker/cache so Netlify serves fresh files.
  if ('caches' in window) {
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))).catch(() => {});
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(regs => Promise.all(regs.map(reg => reg.unregister())))
      .catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  registerServiceWorker();
});

window.openURL = openURL;
window.copyContent = copyContent;
window.shareContent = shareContent;
window.searchWeb = searchWeb;
window.translateText = translateText;
window.openEmail = openEmail;
window.openPhone = openPhone;
window.openSMS = openSMS;
window.openUPI = openUPI;
window.openMaps = openMaps;
window.openDirections = openDirections;
window.addContact = addContact;
window.addEvent = addEvent;
window.viewHistoryItem = viewHistoryItem;
window.toggleFavorite = toggleFavorite;
window.deleteHistoryItem = deleteHistoryItem;
