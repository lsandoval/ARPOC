/*!************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2013 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
if(typeof s7viewers=="undefined"){s7viewers={}}else{if(typeof s7viewers!="object"){throw new Error("Cannot initialize a root 's7viewers' package. s7viewers is not an object")}}if(!s7viewers.BasicZoomViewer){(function(){var a;s7viewers.BasicZoomViewer=function(b){this.sdkBasePath="../../s7viewersdk/3.5/BasicZoomViewer/";this.containerId=null;this.params={};this.handlers=[];this.onInitFail=null;this.initializationComplete=false;this.initCalled=false;this.firstMediasetParsed=false;this.isDisposed=false;this.utilsScriptElm=null;this.fixinputmarker=null;this.sdkProvided=false;if(typeof b=="object"){if(b.containerId){this.setContainerId(b.containerId)}if(b.params){for(var c in b.params){if(b.params.hasOwnProperty(c)&&b.params.propertyIsEnumerable(c)){this.setParam(c,b.params[c])}}}if(b.handlers){this.setHandlers(b.handlers)}if(b.localizedTexts){this.setLocalizedTexts(b.localizedTexts)}}};s7viewers.BasicZoomViewer.cssClassName="s7basiczoomviewer";s7viewers.BasicZoomViewer.prototype.modifiers={};s7viewers.BasicZoomViewer.prototype.setContainerId=function(b){if(this.isDisposed){return}this.containerId=b||null};s7viewers.BasicZoomViewer.getCodeBase=function(){var h="";var c="";var f=null;if(document.scripts){f=document.scripts}else{f=document.getElementsByTagName("script")}for(var e=0;e<f.length;e++){var g=f[e].src;var b=/^\s*(http[s]?:\/\/[^\/]*)?(.*)(\/(js|js_orig)\/BasicZoomViewer\.js)/.exec(g);if(b&&b.length==5){if(typeof b[1]!=="undefined"){h=b[1]}h+=b[2];c=g;break}}if((h!="")&&(h.lastIndexOf("/")!=h.length-1)){h+="/"}var d=/\/etc\/dam\/viewers\//;s7viewers.BasicZoomViewer.codebase={contentUrl:h,isDAM:d.test(c)}};s7viewers.BasicZoomViewer.getCodeBase();s7viewers.BasicZoomViewer.prototype.getContentUrl=function(){return s7viewers.BasicZoomViewer.codebase.contentUrl};s7viewers.BasicZoomViewer.prototype.includeViewer=function(){a.Util.lib.include("s7sdk.set.MediaSet");a.Util.lib.include("s7sdk.image.ZoomView");a.Util.lib.include("s7sdk.common.Button");a.Util.lib.include("s7sdk.common.Container");this.trackingManager=new a.TrackingManager();this.s7params=new a.ParameterManager(null,null,{asset:"MediaSet.asset"},this.getContentUrl()+"BasicZoomViewer_light.css");var e="";if(this.s7params.params.config&&(typeof(this.s7params.params.config)=="string")){e=",";if(this.s7params.params.config.indexOf("/")>-1){e+=this.s7params.params.config.split("/")[1]}else{e+=this.s7params.params.config}}this.s7params.setViewer("501,5.10.2"+e);for(var b in this.params){if(b!="localizedtexts"){this.s7params.push(b,this.params[b])}else{this.s7params.setLocalizedTexts(this.params[b])}}this.container=null;this.zoomView=null;this.zoomInButton=null;this.zoomOutButton=null;this.zoomResetButton=null;this.closeButton=null;this.mediaSet=null;this.fullScreenButton=null;this.visibilityManagerZoom=null;this.isOrientationMarkerForcedChanged=false;var c=this;function f(){c.s7params.push("aemmode",s7viewers.BasicZoomViewer.codebase.isDAM?"1":"0");if(a.browser.device.name=="desktop"){c.s7params.push("ZoomView.singleclick","zoomReset")}if(a.browser.device.name=="desktop"){c.s7params.push("ZoomView.doubleclick","reset")}var h=c.getParam("fixinputmarker");if(h){c.fixinputmarker=(h=="s7touchinput"||h=="s7mouseinput")?c.fixinputmarker=h:null}var g=c.getURLParameter("fixinputmarker");if(g){c.fixinputmarker=(g=="s7touchinput"||g=="s7mouseinput")?c.fixinputmarker=g:null}if(c.fixinputmarker){if(c.fixinputmarker==="s7mouseinput"){c.addClass(c.containerId,"s7mouseinput")}else{if(c.fixinputmarker==="s7touchinput"){c.addClass(c.containerId,"s7touchinput")}}}else{if(a.browser.supportsTouch()){c.addClass(c.containerId,"s7touchinput")}else{c.addClass(c.containerId,"s7mouseinput")}}c.parseMods();c.container=new a.common.Container(c.containerId,c.s7params,c.containerId+"_container");if(c.container.isInLayout()){d()}else{c.container.addEventListener(a.event.ResizeEvent.ADDED_TO_LAYOUT,d,false)}}function d(){c.container.removeEventListener(a.event.ResizeEvent.ADDED_TO_LAYOUT,d,false);var q=document.getElementById(c.containerId);var j=q.style.minHeight;q.style.minHeight="1px";var r=document.createElement("div");r.style.position="relative";r.style.width="100%";r.style.height="100%";q.appendChild(r);var i=r.offsetHeight;if(r.offsetHeight<=1){q.style.height="100%";i=r.offsetHeight}q.removeChild(r);q.style.minHeight=j;var k=false;switch(c.s7params.get("responsive","auto")){case"fit":k=false;break;case"constrain":k=true;break;default:k=i==0;break}c.updateCSSMarkers();c.updateOrientationMarkers();if(c.container.isFixedSize()){c.viewerMode="fixed"}else{if(k){c.viewerMode="ratio"}else{c.viewerMode="free"}}c.mediaSet=new a.set.MediaSet(null,c.s7params,c.containerId+"_mediaSet");c.trackingManager.attach(c.mediaSet);c.mediaSet.addEventListener(a.event.AssetEvent.NOTF_SET_PARSED,s,false);c.container.addEventListener(a.event.ResizeEvent.COMPONENT_RESIZE,o,false);c.container.addEventListener(a.event.ResizeEvent.FULLSCREEN_RESIZE,m,false);c.container.addEventListener(a.event.ResizeEvent.SIZE_MARKER_CHANGE,g,false);c.zoomView=new a.image.ZoomView(c.container,c.s7params,c.containerId+"_zoomView");c.trackingManager.attach(c.zoomView);if((c.s7params.get("closeButton","0")=="1")||(c.s7params.get("closeButton","0").toLowerCase()=="true")){c.closeButton=new a.common.CloseButton(c.container,c.s7params,c.containerId+"_closeButton");c.closeButton.addEventListener("click",l)}c.zoomInButton=new a.common.ZoomInButton(c.container,c.s7params,c.containerId+"_zoomInButton");c.zoomOutButton=new a.common.ZoomOutButton(c.container,c.s7params,c.containerId+"_zoomOutButton");c.zoomResetButton=new a.common.ZoomResetButton(c.container,c.s7params,c.containerId+"_zoomResetButton");c.fullScreenButton=new a.common.FullScreenButton(c.container,c.s7params,c.containerId+"_fullScreenButton");if(c.container.isPopup()&&!c.container.isFixedSize()&&!c.container.supportsNativeFullScreen()){c.fullScreenButton.setCSS(".s7fullscreenbutton","display","none")}if(c.viewerMode=="ratio"){q.style.height="auto"}p(c.container.getWidth(),c.container.getHeight());c.zoomInButton.addEventListener("click",function(){c.zoomView.zoomIn()});c.zoomOutButton.addEventListener("click",function(){c.zoomView.zoomOut()});c.fullScreenButton.addEventListener("click",h);c.zoomView.addEventListener(a.event.CapabilityStateEvent.NOTF_ZOOM_CAPABILITY_STATE,function(t){if(t.s7event.state.hasCapability(a.ZoomCapabilityState.ZOOM_IN)){c.zoomInButton.activate()}else{c.zoomInButton.deactivate()}if(t.s7event.state.hasCapability(a.ZoomCapabilityState.ZOOM_OUT)){c.zoomOutButton.activate()}else{c.zoomOutButton.deactivate()}if(t.s7event.state.hasCapability(a.ZoomCapabilityState.ZOOM_RESET)){c.zoomResetButton.activate()}else{c.zoomResetButton.deactivate()}});c.zoomResetButton.addEventListener("click",function(){c.zoomView.zoomReset()});c.trackingManager.setCallback(n);if((typeof(AppMeasurementBridge)=="function")&&(c.isConfig2Exist==true)){c.appMeasurementBridge=new AppMeasurementBridge(c.trackingParams)}if(a.browser.device.name!="desktop"){c.visibilityManagerZoom=new a.VisibilityManager();c.visibilityManagerZoom.reference(c.zoomView);c.visibilityManagerZoom.attach(c.closeButton);c.visibilityManagerZoom.attach(c.zoomInButton);c.visibilityManagerZoom.attach(c.zoomOutButton);c.visibilityManagerZoom.attach(c.zoomResetButton);if(!c.notCustomSize||c.container.supportsNativeFullScreen()){c.visibilityManagerZoom.attach(c.fullScreenButton)}}function s(v){var t=v.s7event.asset;if(c.viewerMode=="ratio"){var w=t.items[0];var u=w.width/w.height;c.container.setModifier({aspect:u})}p(c.container.getWidth(),c.container.getHeight());c.zoomView.setItem(t.items[0]);if((c.handlers.initComplete!=null)&&(typeof c.handlers.initComplete=="function")&&!c.firstMediasetParsed){if(typeof window.s7sdk=="undefined"){window.s7sdk=a}c.handlers.initComplete()}c.firstMediasetParsed=true}function h(){if(!c.container.isFullScreen()){if(c.closeButton){c.closeButton.setCSS(".s7closebutton","display","none")}c.container.requestFullScreen()}else{if(c.closeButton){c.closeButton.setCSS(".s7closebutton","display","block")}c.container.cancelFullScreen()}}function o(t){if((typeof(t.target)=="undefined")||(t.target==document.getElementById(c.containerId+"_container"))){if(!c.container.isInLayout()){return}if(c.closeButton){if(c.container.isFullScreen()){c.closeButton.setCSS(".s7closebutton","display","none")}else{c.closeButton.setCSS(".s7closebutton","display","block")}}p(t.s7event.w,t.s7event.h)}}function m(t){if(c.closeButton){if(c.container.isFullScreen()){c.closeButton.setCSS(".s7closebutton","display","none")}else{c.closeButton.setCSS(".s7closebutton","display","block")}}p(t.s7event.w,t.s7event.h);c.fullScreenButton.setSelected(c.container.isFullScreen())}function g(t){c.updateCSSMarkers()}function p(t,u){c.updateOrientationMarkers();c.zoomView.resize(t,u)}function l(){try{if(a.browser.name!="firefox"){window.open(c.getContentUrl()+"s7sdkclose.html","_self")}else{window.close()}}catch(t){a.Logger.log(a.Logger.WARN,"Cannot close the window")}}function n(v,u,x,t,w){if(c.appMeasurementBridge){c.appMeasurementBridge.track(v,u,x,t,w)}if(c.handlers.trackEvent){if(typeof window.s7sdk=="undefined"){window.s7sdk=a}c.handlers.trackEvent(v,u,x,t,w)}if("s7ComponentEvent" in window){s7ComponentEvent(v,u,x,t,w)}}}this.s7params.addEventListener(a.Event.SDK_READY,function(){c.initSiteCatalyst(c.s7params,f)},false);this.s7params.setProvidedSdk(this.sdkProvided);this.s7params.init()};s7viewers.BasicZoomViewer.prototype.setParam=function(b,c){if(this.isDisposed){return}this.params[b]=c};s7viewers.BasicZoomViewer.prototype.getParam=function(c){var d=c.toLowerCase();for(var b in this.params){if(b.toLowerCase()==d){return this.params[b]}}return null};s7viewers.BasicZoomViewer.prototype.setParams=function(b){if(this.isDisposed){return}var e=b.split("&");for(var c=0;c<e.length;c++){var d=e[c].split("=");if(d.length>1){this.setParam(d[0],decodeURIComponent(e[c].split("=")[1]))}}};s7viewers.BasicZoomViewer.prototype.s7sdkUtilsAvailable=function(){if(s7viewers.BasicZoomViewer.codebase.isDAM){return typeof(s7viewers.s7sdk)!="undefined"}else{return(typeof(s7classic)!="undefined")&&(typeof(s7classic.s7sdk)!="undefined")}};s7viewers.BasicZoomViewer.prototype.init=function(){if(this.isDisposed){return}if(this.initCalled){return}this.initCalled=true;if(this.initializationComplete){return this}var i=document.getElementById(this.containerId);if(i.className!=""){if(i.className.indexOf(s7viewers.BasicZoomViewer.cssClassName)!=-1){}else{i.className+=" "+s7viewers.BasicZoomViewer.cssClassName}}else{i.className=s7viewers.BasicZoomViewer.cssClassName}this.s7sdkNamespace=s7viewers.BasicZoomViewer.codebase.isDAM?"s7viewers":"s7classic";var d=this.getContentUrl()+this.sdkBasePath+"js/s7sdk/utils/Utils.js?namespace="+this.s7sdkNamespace;var f=null;if(document.scripts){f=document.scripts}else{f=document.getElementsByTagName("script")}if(this.s7sdkUtilsAvailable()){a=(s7viewers.BasicZoomViewer.codebase.isDAM?s7viewers.s7sdk:s7classic.s7sdk);this.sdkProvided=true;if(this.isDisposed){return}a.Util.init();this.includeViewer();this.initializationComplete=true}else{if(!this.s7sdkUtilsAvailable()&&(s7viewers.BasicZoomViewer.codebase.isDAM?s7viewers.S7SDK_S7VIEWERS_LOAD_STARTED:s7viewers.S7SDK_S7CLASSIC_LOAD_STARTED)){this.sdkProvided=true;var h=this;var g=setInterval(function(){if(h.s7sdkUtilsAvailable()){clearInterval(g);a=(s7viewers.BasicZoomViewer.codebase.isDAM?s7viewers.s7sdk:s7classic.s7sdk);if(h.isDisposed){return}a.Util.init();h.includeViewer();h.initializationComplete=true}},100)}else{this.utilsScriptElm=document.createElement("script");this.utilsScriptElm.setAttribute("language","javascript");this.utilsScriptElm.setAttribute("type","text/javascript");var e=document.getElementsByTagName("head")[0];var c=this;function b(){if(!c.utilsScriptElm.executed){c.utilsScriptElm.executed=true;a=(s7viewers.BasicZoomViewer.codebase.isDAM?s7viewers.s7sdk:s7classic.s7sdk);if(c.s7sdkUtilsAvailable()&&a.Util){if(c.isDisposed){return}a.Util.init();c.includeViewer();c.initializationComplete=true;c.utilsScriptElm.onreadystatechange=null;c.utilsScriptElm.onload=null;c.utilsScriptElm.onerror=null}}}if(typeof(c.utilsScriptElm.readyState)!="undefined"){c.utilsScriptElm.onreadystatechange=function(){if(c.utilsScriptElm.readyState=="loaded"){e.appendChild(c.utilsScriptElm)}else{if(c.utilsScriptElm.readyState=="complete"){b()}}};c.utilsScriptElm.setAttribute("src",d)}else{c.utilsScriptElm.onload=function(){b()};c.utilsScriptElm.onerror=function(){};c.utilsScriptElm.setAttribute("src",d);e.appendChild(c.utilsScriptElm);c.utilsScriptElm.setAttribute("data-src",c.utilsScriptElm.getAttribute("src"));c.utilsScriptElm.setAttribute("src","?namespace="+this.s7sdkNamespace)}if(s7viewers.BasicZoomViewer.codebase.isDAM){s7viewers.S7SDK_S7VIEWERS_LOAD_STARTED=true}else{s7viewers.S7SDK_S7CLASSIC_LOAD_STARTED=true}}}return this};s7viewers.BasicZoomViewer.prototype.getDomain=function(b){var c=/(^http[s]?:\/\/[^\/]+)/i.exec(b);if(c==null){return""}else{return c[1]}};s7viewers.BasicZoomViewer.prototype.setAsset=function(b){if(this.isDisposed){return}if(this.mediaSet){this.mediaSet.setAsset(b)}else{this.setParam("asset",b)}};s7viewers.BasicZoomViewer.prototype.setLocalizedTexts=function(b){if(this.isDisposed){return}if(this.s7params){this.s7params.setLocalizedTexts(b)}else{this.setParam("localizedtexts",b)}};s7viewers.BasicZoomViewer.prototype.initSiteCatalyst=function(i,c){var f=i.get("asset",null,"MediaSet").split(",")[0].split(":")[0];this.isConfig2Exist=false;if(f.indexOf("/")!=-1){var d=a.MediaSetParser.findCompanyNameInAsset(f);var h=i.get("config2");this.isConfig2Exist=(h!=""&&typeof h!="undefined");if(this.isConfig2Exist){this.trackingParams={siteCatalystCompany:d,config2:h,isRoot:i.get("serverurl")};var b=this.getContentUrl()+"../AppMeasurementBridge.jsp?company="+d+(h==""?"":"&preset="+h);if(i.get("serverurl",null)){b+="&isRoot="+i.get("serverurl")}var g=document.createElement("script");g.setAttribute("language","javascript");g.setAttribute("type","text/javascript");g.setAttribute("src",b);var e=document.getElementsByTagName("head");g.onload=g.onerror=function(){if(!g.executed){g.executed=true;if(typeof c=="function"){c()}g.onreadystatechange=null;g.onload=null;g.onerror=null}};g.onreadystatechange=function(){if(g.readyState=="complete"||g.readyState=="loaded"){setTimeout(function(){if(!g.executed){g.executed=true;if(typeof c=="function"){c()}}g.onreadystatechange=null;g.onload=null;g.onerror=null},0)}};e[0].appendChild(g)}else{if(typeof c=="function"){c()}}}};s7viewers.BasicZoomViewer.prototype.getComponent=function(b){if(this.isDisposed){return null}switch(b){case"container":return this.container||null;case"mediaSet":return this.mediaSet||null;case"zoomView":return this.zoomView||null;case"zoomInButton":return this.zoomInButton||null;case"zoomOutButton":return this.zoomOutButton||null;case"zoomResetButton":return this.zoomResetButton||null;case"fullScreenButton":return this.fullScreenButton||null;case"closeButton":return this.closeButton||null;case"parameterManager":return this.s7params||null;default:return null}};s7viewers.BasicZoomViewer.prototype.setHandlers=function(c){if(this.isDisposed){return}if(this.initCalled){return}this.handlers=[];for(var b in c){if(!c.hasOwnProperty(b)){continue}if(typeof c[b]!="function"){continue}this.handlers[b]=c[b]}};s7viewers.BasicZoomViewer.prototype.getModifiers=function(){return this.modifiers};s7viewers.BasicZoomViewer.prototype.setModifier=function(f){if(this.isDisposed){return}var h,c,j,b,g,e;for(h in f){if(!this.modifiers.hasOwnProperty(h)){continue}c=this.modifiers[h];try{b=f[h];if(c.parseParams===false){g=new a.Modifier([b!=""?b:c.defaults[0]])}else{g=a.Modifier.parse(b,c.defaults,c.ranges)}if(g.values.length==1){this[h]=g.values[0];this.setModifierInternal(h)}else{if(g.values.length>1){j={};for(e=0;e<g.values.length;e++){j[c.params[e]]=g.values[e]}this[h]=j;this.setModifierInternal(h)}}}catch(d){throw new Error("Unable to process modifier: '"+h+"'. "+d)}}};s7viewers.BasicZoomViewer.prototype.setModifierInternal=function(b){switch(b){default:break}};s7viewers.BasicZoomViewer.prototype.parseMods=function(){var g,c,h,b,f,e;for(g in this.modifiers){if(!this.modifiers.hasOwnProperty(g)){continue}c=this.modifiers[g];try{b=this.s7params.get(g,"");if(c.parseParams===false){f=new a.Modifier([b!=""?b:c.defaults[0]])}else{f=a.Modifier.parse(b,c.defaults,c.ranges)}if(f.values.length==1){this[g]=f.values[0]}else{if(f.values.length>1){h={};for(e=0;e<f.values.length;e++){h[c.params[e]]=f.values[e]}this[g]=h}}}catch(d){throw new Error("Unable to process modifier: '"+g+"'. "+d)}}};s7viewers.BasicZoomViewer.prototype.updateCSSMarkers=function(){var c=this.container.getSizeMarker();var b;if(c==a.common.Container.SIZE_MARKER_NONE){return}if(c==a.common.Container.SIZE_MARKER_LARGE){b="s7size_large"}else{if(c==a.common.Container.SIZE_MARKER_SMALL){b="s7size_small"}else{if(c==a.common.Container.SIZE_MARKER_MEDIUM){b="s7size_medium"}}}if(this.containerId){this.setNewSizeMarker(this.containerId,b)}this.reloadInnerComponents()};s7viewers.BasicZoomViewer.prototype.reloadInnerComponents=function(){var c=this.s7params.getRegisteredComponents();for(var b=0;b<c.length;b++){if(c[b]&&c[b].restrictedStylesInvalidated()){c[b].reload()}}};s7viewers.BasicZoomViewer.prototype.setNewSizeMarker=function(f,c){var b=document.getElementById(f).className;var d=/^(.*)(s7size_small|s7size_medium|s7size_large)(.*)$/gi;var e;if(b.match(d)){e=b.replace(d,"$1"+c+"$3")}else{e=b+" "+c}if(b!=e){document.getElementById(f).className=e}};s7viewers.BasicZoomViewer.prototype.dispose=function(){if(this.appMeasurementBridge){this.appMeasurementBridge.dispose();this.appMeasurementBridge=null}if(this.trackingManager){this.trackingManager.dispose();this.trackingManager=null}if(this.visibilityManagerZoom){this.visibilityManagerZoom.dispose();this.visibilityManagerZoom=null}if(this.zoomView){this.zoomView.dispose();this.zoomView=null}if(this.zoomInButton){this.zoomInButton.dispose();this.zoomInButton=null}if(this.zoomOutButton){this.zoomOutButton.dispose();this.zoomOutButton=null}if(this.zoomResetButton){this.zoomResetButton.dispose();this.zoomResetButton=null}if(this.fullScreenButton){this.fullScreenButton.dispose();this.fullScreenButton=null}if(this.closeButton){this.closeButton.dispose();this.closeButton=null}if(this.mediaSet){this.mediaSet.dispose();this.mediaSet=null}if(this.s7params){this.s7params.dispose();this.s7params=null}if(this.container){var e=[s7viewers.BasicZoomViewer.cssClassName,"s7touchinput","s7mouseinput","s7size_large","s7size_small","s7size_medium"];var c=document.getElementById(this.containerId).className.split(" ");for(var d=0;d<e.length;d++){var b=c.indexOf(e[d]);if(b!=-1){c.splice(b,1)}}document.getElementById(this.containerId).className=c.join(" ");this.container.dispose();this.container=null}this.handlers=[];this.isDisposed=true};s7viewers.BasicZoomViewer.prototype.updateOrientationMarkers=function(){if(!this.isOrientationMarkerForcedChanged){var b;if(window.innerWidth>window.innerHeight){b="s7device_landscape"}else{b="s7device_portrait"}if(document.getElementById(this.containerId).className.indexOf(b)==-1){this.setNewOrientationMarker(this.containerId,b);this.reloadInnerComponents()}}};s7viewers.BasicZoomViewer.prototype.setNewOrientationMarker=function(f,c){var b=document.getElementById(f).className;var d=/^(.*)(s7device_landscape|s7device_portrait)(.*)$/gi;var e;if(b.match(d)){e=b.replace(d,"$1"+c+"$3")}else{e=b+" "+c}if(b!=e){document.getElementById(f).className=e}};s7viewers.BasicZoomViewer.prototype.forceDeviceOrientationMarker=function(b){switch(b){case"s7device_portrait":case"s7device_landscape":this.isOrientationMarkerForcedChanged=true;if(this.containerId){this.setNewOrientationMarker(this.containerId,b)}this.reloadInnerComponents();break;case null:this.isOrientationMarkerForcedChanged=false;this.updateOrientationMarkers();break;default:break}};s7viewers.BasicZoomViewer.prototype.getURLParameter=function(b){return decodeURIComponent((new RegExp("[?|&]"+b+"=([^&;]+?)(&|#|;|$)","gi").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null};s7viewers.BasicZoomViewer.prototype.addClass=function(d,c){var b=document.getElementById(d).className.split(" ");if(b.indexOf(c)==-1){b[b.length]=c;document.getElementById(d).className=b.join(" ")}}})()};