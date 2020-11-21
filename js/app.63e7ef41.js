(function(e){function t(t){for(var o,i,a=t[0],c=t[1],u=t[2],d=0,f=[];d<a.length;d++)i=a[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&f.push(r[i][0]),r[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(t);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(o=!1)}o&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},s=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/iotgame/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},17:function(e,t){},18:function(e,t){},2:function(e,t){},3:function(e,t){},"3d6d":function(e,t,n){"use strict";n("f244")},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"app"}},[o("img",{attrs:{alt:"humanIT",width:"30%",src:n("961b")}}),o("HelloWorld",{attrs:{msg:"Welcome to ShakeIT!"}}),e._m(0)],1)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",{staticStyle:{color:"#999","font-size":"small","font-weight":"normal"}},[e._v("ShakeIT is a simple and fun Internet of Things game, used for the development of an IoT showcase in purpose of a thesis."),n("br"),e._v(" © Stefanie Motzokan, 2020 "),n("br"),e._v("This work is licensed under a "),n("a",{attrs:{href:"http://creativecommons.org/licenses/by-sa/3.0/"}},[e._v("Creative Commons Attribution-ShareAlike 3.0 License")])])}],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))]),n("p",[e._v("Your current session is identified with "),n("b",[e._v(e._s(e.sessionID))]),e._v(".")]),e._m(0),n("form",{attrs:{id:"login"}},[n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],staticClass:"start",attrs:{id:"username",placeholder:"Create Your username",disabled:e.clicked},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}})]),n("div",{attrs:{id:"StartButton"}},[n("button",{staticClass:"start",attrs:{disabled:e.clicked},on:{click:e.startDataTransfer}},[e._v("Go for IT")])])]),n("div",{staticClass:"output-info"},[n("ul",[n("li",{staticClass:"x_axis"},[n("b",[e._v("x")]),e._v(" "+e._s(e.xValue))]),n("li",{staticClass:"y_axis"},[n("b",[e._v("y")]),e._v(" "+e._s(e.yValue))]),n("li",{staticClass:"z_axis"},[n("b",[e._v("z")]),e._v(" "+e._s(e.zValue))])])]),e.over?n("div",{attrs:{id:"timeover"}},[n("p",[e._v("Time is over!")])]):e._e()])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("So first, create your username."),n("br"),e._v(' Second, press the button "Go for IT". '),n("br"),e._v(" After pressing the button, explore your smartphones accelerometer data - but be ready to shake your device for 10 seconds to win the game after starting the countdown ;)")])}],c=n("8374"),u=c["a"],l=(n("3d6d"),n("2877")),d=Object(l["a"])(u,i,a,!1,null,"72781d19",null),f=d.exports,v={name:"app",components:{HelloWorld:f}},h=v,p=(n("034f"),Object(l["a"])(h,r,s,!1,null,null,null)),m=p.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(m)}}).$mount("#app")},6:function(e,t){},7:function(e,t){},8:function(e,t){},8374:function(e,t,n){"use strict";(function(e){n("d3b7"),n("ac1f"),n("3ca3"),n("841c"),n("ddb0"),n("2b3d"),n("96cf");var o=n("1da1"),r=n("bc3a").default;t["a"]={name:"HelloWorld",props:{msg:String},data:function(){return{deviceID:String,sharedAccessKey:String,clicked:!1,xValue:"to shake",yValue:"to shake",zValue:"to shake",username:null,sessionID:String,lastMessageTime:0,timePeriod:200,topic:String,client:void 0,over:!1}},created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getDeviceID();case 2:n=window.location.search.substring(1),o=new URLSearchParams(n),e.sessionID=o.get("session"),e.createMQTTConnection();case 6:case"end":return t.stop()}}),t)})))()},methods:{getDeviceID:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.get("https://iotShowcaseFunctions.azurewebsites.net/api/GetDeviceID");case 3:n=t.sent,console.log(n.data),e.deviceID=n.data.deviceID,e.sharedAccessKey=n.data.sharedAccessKey,t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log("Error getting data: "+t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},releaseDevice:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.post("https://iotShowcaseFunctions.azurewebsites.net/api/ResetDeviceID?deviceID="+e.deviceID);case 3:console.log("Device reset"),t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log("Error resetting device: "+t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},startDataTransfer:function(){var e=this;null!=this.username&&""!==this.username?null!=this.sessionID?(this.clicked=!0,"function"===typeof DeviceMotionEvent.requestPermission?DeviceMotionEvent.requestPermission().then((function(t){"granted"===t&&(window.addEventListener("devicemotion",e.motion,!0),e.showTime())})).catch(Window.console.error):(this.showTime(),window.addEventListener("devicemotion",this.motion,!0))):window.alert("No session! Scann again!"):window.alert("No username!")},motion:function(e){var t=Date.now();console.log("Engage"),console.log(e);var n=e.acceleration;this.xValue=Math.round(100*n.x)/100,this.yValue=Math.round(100*n.y)/100,this.zValue=Math.round(100*n.z)/100,(0===this.lastMessageTime||this.lastMessageTime+this.timePeriod<t)&&(console.log("New Message now on sending status"),this.sendMessage(this.topic),this.lastMessageTime=Date.now())},createMQTTConnection:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var o,r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:o=n("e7fc"),console.log("MQTT "+o),r="ShowcaseHubMW.azure-devices.net",console.log("Ist da "+e.deviceID+" "+e.sharedAccessKey),s=e.generateSAS(r+"/devices/"+e.deviceID,e.sharedAccessKey,null,2),e.topic="devices/"+e.deviceID+"/messages/events/",console.log("Topic "+e.topic),e.client=o.connect({host:r,port:443,path:"/$iothub/websocket?iothub-no-client-cert=true",protocol:"mqtts",protocolId:"MQTT",protocolVersion:4,clientId:e.deviceID,username:r+"/"+e.deviceID+"/api-version=2018-06-30",password:s,keepalive:3e4}),e.client.on("connect",(function(e){console.log("mqtt connected at the beginning",e)})),e.client.on("reconnect",(function(){console.log("mqtt reconnected!")})),e.client.on("message",(function(e,t){var n=new TextDecoder("utf-8").decode(t);console.log("receive!",n)})),e.client.on("close",(function(e){console.log("mqtt closed!",e)}));case 12:case"end":return t.stop()}}),t)})))()},sendMessage:function(e){var t=JSON.stringify({sessionID:this.sessionID,deviceID:this.username,deviceCoordinateX:this.xValue,deviceCoordinateY:this.yValue,deviceCoordinateZ:this.zValue,sendingTimestamp:Date.now()});console.log("Sending message: "+t),this.client.publish(e,t)},showTime:function(){var e=this;setTimeout((function(){window.removeEventListener("devicemotion",e.motion,!0),e.over=!0,e.releaseDevice(),e.client.end()}),6e4)},generateSAS:function(t,o,r,s){console.log("Generating");var i=n("1c46");t=encodeURIComponent(t);var a=Date.now()/1e3+60*s;a=Math.ceil(a);var c=t+"\n"+a,u=i.createHmac("sha256",e.from(o,"base64"));u.update(c);var l=encodeURIComponent(u.digest("base64")),d="SharedAccessSignature sr="+t+"&sig="+l+"&se="+a;return r&&(d+="&skn="+r),console.log("Generating end"),d}}}}).call(this,n("1c35").Buffer)},"85ec":function(e,t,n){},9:function(e,t){},"961b":function(e,t,n){e.exports=n.p+"img/hands.945c91af.png"},f244:function(e,t,n){}});
//# sourceMappingURL=app.63e7ef41.js.map