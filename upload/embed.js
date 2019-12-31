/* Get the Commentics URL from the script tag that called this file */
var scripts = document.getElementsByTagName('script');
var src = scripts[scripts.length-1].src;
var commentics_url = src.slice(0, -8); // remove 'embed.js' from the end

window.addEventListener('load', function(e) {

    /* If an element exists with the Commentics ID */
    if (document.getElementById('commentics')) {

        /* Display spinner */
        var spinner = document.createElement('img');
        spinner.setAttribute('src', commentics_url + 'frontend/view/default/image/misc/spinner.gif');
        spinner.setAttribute('id', 'cmtx_spinner');
        document.getElementById('commentics').appendChild(spinner);

        var identifier = reference = '';

        /* Get identifier */
        if (typeof commentics_config !== 'undefined' && typeof commentics_config.identifier !== 'undefined') {
            identifier = commentics_config.identifier;
        }

        /* Get reference */
        if (typeof commentics_config !== 'undefined' && typeof commentics_config.reference !== 'undefined') {
            reference = commentics_config.reference;
        } else if (typeof document.title !== 'undefined') {
            reference = document.title;
        }

        /* Get URL */
        var url = window.location.href;

        var parameters = 'identifier=' + encodeURIComponent(identifier) + '&reference=' + encodeURIComponent(reference) + '&url=' + encodeURIComponent(url);

        /* Get permalink */
        var permalink = url.match(/cmtx_perm=([0-9]+)/);

        if (permalink) { // append the permalink if present
            parameters += '&' + permalink[0];

            /* Get permalink hash */
            var hash = window.location.hash;

            if (hash && hash.match(/cmtx_perm_([0-9]+)/)) {
                anchor = hash;
            }
        }

        /* Append any extra config values */
        if (typeof commentics_config !== 'undefined') {
            var ignore = ['identifier', 'reference'];

            var extra_config = '&';

            Object.keys(commentics_config).forEach(function(key) {
                if (!ignore.includes(key)) {
                    // convert boolean to number
                    commentics_config[key] = (commentics_config[key] == true ? '1' : (commentics_config[key] == false ? '0' : commentics_config[key]));

                    extra_config += key + '=' + encodeURIComponent(commentics_config[key]) + '&'
                }
            });

            extra_config = extra_config.replace(/&$/, ''); // remove trailing ampersand

            parameters += extra_config;
        }

        /* Create the iFrame */
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', commentics_url + 'iframe.php?' + parameters);
        iframe.setAttribute('id', 'cmtx_iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('tabindex', '0');
        iframe.style.width = '1px';
        iframe.style.minWidth = '100%';
        iframe.style.visibility = 'hidden'; // don't show the iframe until it's fully loaded and re-sized
        document.getElementById('commentics').appendChild(iframe);

        /*! iFrame Resizer (iframeSizer.min.js ) - v4.0.4 - 2019-03-04
         *  Desc: Force cross domain iframes to size to content.
         *  Requires: iframeResizer.contentWindow.min.js to be loaded into the target frame.
         *  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
         *  License: MIT
         */

        !function(u){if("undefined"!=typeof window){var e,l=0,m=!1,n=!1,p="message".length,b="[iFrameSizer]",y=b.length,v=null,r=window.requestAnimationFrame,g={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},F={},i=null,h={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"bodyOffset",id:"iFrameResizer",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,warningTimeout:5e3,tolerance:0,widthCalculationMethod:"scroll",onClosed:function(){},onInit:function(){},onMessage:function(){O("onMessage function not defined")},onResized:function(){},onScroll:function(){return!0}},I={};window.jQuery&&((e=window.jQuery).fn?e.fn.iFrameResize||(e.fn.iFrameResize=function(i){return this.filter("iframe").each(function(e,n){d(n,i)}).end()}):z("","Unable to bind to jQuery, it is not fully loaded.")),"function"==typeof define&&define.amd?define([],B):"object"==typeof module&&"object"==typeof module.exports&&(module.exports=B()),window.iFrameResize=window.iFrameResize||B()}function w(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function M(e,n,i){e.addEventListener(n,i,!1)}function x(e,n,i){e.removeEventListener(n,i,!1)}function o(e){return b+"["+(i="Host page: "+(n=e),window.top!==window.self&&(i=window.parentIFrame&&window.parentIFrame.getId?window.parentIFrame.getId()+": "+n:"Nested host page: "+n),i)+"]";var n,i}function t(e){return F[e]?F[e].log:m}function k(e,n){a("log",e,n,t(e))}function z(e,n){a("info",e,n,t(e))}function O(e,n){a("warn",e,n,!0)}function a(e,n,i,t){!0===t&&"object"==typeof window.console&&console[e](o(n),i)}function s(n){function a(){e("Height"),e("Width"),P(function(){j(h),C(w),l("onResized",h)},h,"init")}function e(e){var n=Number(F[w]["max"+e]),i=Number(F[w]["min"+e]),t=e.toLowerCase(),o=Number(h[t]);k(w,"Checking "+t+" is in range "+i+"-"+n),o<i&&(o=i,k(w,"Set "+t+" to min value")),n<o&&(o=n,k(w,"Set "+t+" to max value")),h[t]=""+o}function s(e){return g.substr(g.indexOf(":")+p+e)}function d(i,t){var e,n,o;e=function(){var e,n;H("Send Page Info","pageInfo:"+(e=document.body.getBoundingClientRect(),n=h.iframe.getBoundingClientRect(),JSON.stringify({iframeHeight:n.height,iframeWidth:n.width,clientHeight:Math.max(document.documentElement.clientHeight,window.innerHeight||0),clientWidth:Math.max(document.documentElement.clientWidth,window.innerWidth||0),offsetTop:parseInt(n.top-e.top,10),offsetLeft:parseInt(n.left-e.left,10),scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset})),i,t)},n=32,I[o=t]||(I[o]=setTimeout(function(){I[o]=null,e()},n))}function c(e){var n=e.getBoundingClientRect();return N(w),{x:Math.floor(Number(n.left)+Number(v.x)),y:Math.floor(Number(n.top)+Number(v.y))}}function f(e){var n=e?c(h.iframe):{x:0,y:0},i={x:Number(h.width)+n.x,y:Number(h.height)+n.y};k(w,"Reposition requested from iFrame (offset x:"+n.x+" y:"+n.y+")"),window.top!==window.self?window.parentIFrame?window.parentIFrame["scrollTo"+(e?"Offset":"")](i.x,i.y):O(w,"Unable to scroll to requested position, window.parentIFrame not found"):(v=i,u(),k(w,"--"))}function u(){!1!==l("onScroll",v)?C(w):S()}function l(e,n){return R(w,e,n)}var i,t,o,r,m,g=n.data,h={},w=null;"[iFrameResizerChild]Ready"===g?function(){for(var e in F)H("iFrame requested init",A(e),document.getElementById(e),e)}():b===(""+g).substr(0,y)&&g.substr(y).split(":")[0]in F?(m=g.substr(y).split(":"),h={iframe:F[m[0]]&&F[m[0]].iframe,id:m[0],height:m[1],width:m[2],type:m[3]},w=h.id,F[w]&&(F[w].loaded=!0),(r=h.type in{true:1,false:1,undefined:1})&&k(w,"Ignoring init message from meta parent page"),!r&&(o=!0,F[t=w]||(o=!1,O(h.type+" No settings for "+t+". Message was: "+g)),o)&&(k(w,"Received: "+g),i=!0,null===h.iframe&&(O(w,"IFrame ("+h.id+") not found"),i=!1),i&&function(){var e,i=n.origin,t=F[w]&&F[w].checkOrigin;if(t&&""+i!="null"&&!(t.constructor===Array?function(){var e=0,n=!1;for(k(w,"Checking connection is from allowed list of origins: "+t);e<t.length;e++)if(t[e]===i){n=!0;break}return n}():(e=F[w]&&F[w].remoteHost,k(w,"Checking connection is from: "+e),i===e)))throw new Error("Unexpected message received from: "+i+" for "+h.iframe.id+". Message was: "+n.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}()&&function(){switch(F[w]&&F[w].firstRun&&F[w]&&(F[w].firstRun=!1),h.type){case"close":F[w].closeRequeston?R(w,"onCloseRequest",F[w].iframe):E(h.iframe);break;case"message":r=s(6),k(w,"onMessage passed: {iframe: "+h.iframe.id+", message: "+r+"}"),l("onMessage",{iframe:h.iframe,message:JSON.parse(r)}),k(w,"--");break;case"scrollTo":f(!1);break;case"scrollToOffset":f(!0);break;case"pageInfo":d(F[w]&&F[w].iframe,w),function(){function e(n,i){function t(){F[r]?d(F[r].iframe,r):o()}["scroll","resize"].forEach(function(e){k(r,n+e+" listener for sendPageInfo"),i(window,e,t)})}function o(){e("Remove ",x)}var r=w;e("Add ",M),F[r]&&(F[r].stopPageInfo=o)}();break;case"pageInfoStop":F[w]&&F[w].stopPageInfo&&(F[w].stopPageInfo(),delete F[w].stopPageInfo);break;case"inPageLink":e=s(9),i=e.split("#")[1]||"",t=decodeURIComponent(i),(o=document.getElementById(t)||document.getElementsByName(t)[0])?(n=c(o),k(w,"Moving to in page link (#"+i+") at x: "+n.x+" y: "+n.y),v={x:n.x,y:n.y},u(),k(w,"--")):window.top!==window.self?window.parentIFrame?window.parentIFrame.moveToAnchor(i):k(w,"In page link #"+i+" not found and window.parentIFrame not found"):k(w,"In page link #"+i+" not found");break;case"reset":W(h);break;case"init":a(),l("onInit",h.iframe);break;default:a()}var e,n,i,t,o,r}())):z(w,"Ignored: "+g)}function R(e,n,i){var t=null,o=null;if(F[e]){if("function"!=typeof(t=F[e][n]))throw new TypeError(n+" on iFrame["+e+"] is not a function");o=t(i)}return o}function T(e){var n=e.id;delete F[n]}function E(e){var n=e.id;k(n,"Removing iFrame: "+n);try{e.parentNode&&e.parentNode.removeChild(e)}catch(e){O(e)}R(n,"onClosed",n),k(n,"--"),T(e)}function N(e){null===v&&k(e,"Get page position: "+(v={x:window.pageXOffset!==u?window.pageXOffset:document.documentElement.scrollLeft,y:window.pageYOffset!==u?window.pageYOffset:document.documentElement.scrollTop}).x+","+v.y)}function C(e){null!==v&&(window.scrollTo(v.x,v.y),k(e,"Set page position: "+v.x+","+v.y),S())}function S(){v=null}function W(e){k(e.id,"Size reset requested by "+("init"===e.type?"host page":"iFrame")),N(e.id),P(function(){j(e),H("reset","reset",e.iframe,e.id)},e,"reset")}function j(i){function t(e){n||"0"!==i[e]||(n=!0,k(o,"Hidden iFrame detected, creating visibility listener"),function(){function n(){Object.values(F).forEach(function(n){function e(e){return"0px"===(F[n]&&F[n].iframe.style[e])}F[n]&&(i=F[n].iframe,null!==i.offsetParent)&&(e("height")||e("width"))&&H("Visibility change","resize",F[n].iframe,n);var i})}function e(e){k("window","Mutation observed: "+e[0].target+" "+e[0].type),c(n,16)}var i=w();i&&(t=document.querySelector("body"),o={attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0},new i(e).observe(t,o));var t,o}())}function e(e){var n;n=e,i.id?(i.iframe.style[n]=i[n]+"px",k(i.id,"IFrame ("+o+") "+n+" set to "+i[n]+"px")):k("undefined","messageData id not set"),t(e)}var o=i.iframe.id;F[o]&&(F[o].sizeHeight&&e("height"),F[o].sizeWidth&&e("width"))}function P(e,n,i){i!==n.type&&r?(k(n.id,"Requesting animation frame"),r(e)):e()}function H(e,n,i,t,o){var r,a=!1;t=t||i.id,F[t]&&(i&&"contentWindow"in i&&null!==i.contentWindow?(r=F[t]&&F[t].targetOrigin,k(t,"["+e+"] Sending msg to iframe["+t+"] ("+n+") targetOrigin: "+r),i.contentWindow.postMessage(b+n,r)):O(t,"["+e+"] IFrame("+t+") not found"),o&&F[t]&&F[t].warningTimeout&&(F[t].msgTimeout=setTimeout(function(){!F[t]||F[t].loaded||a||(a=!0,O(t,"IFrame has not responded within "+F[t].warningTimeout/1e3+" seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."))},F[t].warningTimeout)))}function A(e){return e+":"+F[e].bodyMarginV1+":"+F[e].sizeWidth+":"+F[e].log+":"+F[e].interval+":"+F[e].enablePublicMethods+":"+F[e].autoResize+":"+F[e].bodyMargin+":"+F[e].heightCalculationMethod+":"+F[e].bodyBackground+":"+F[e].bodyPadding+":"+F[e].tolerance+":"+F[e].inPageLinks+":"+F[e].resizeFrom+":"+F[e].widthCalculationMethod}function d(i,e){function n(e){var n=e.split("Callback");if(2===n.length){var i="on"+n[0].charAt(0).toUpperCase()+n[0].slice(1);this[i]=this[e],delete this[e],O(f,"Deprecated: '"+e+"' has been renamed '"+i+"'. The old method will be removed in the next major version.")}}var t,o,r,a,s,d,c,f=(""===(t=i.id)&&(i.id=(o=e&&e.id||h.id+l++,null!==document.getElementById(o)&&(o+=l++),t=o),m=(e||{}).log,k(t,"Added missing iframe ID: "+t+" ("+i.src+")")),t);f in F&&"iFrameResizer"in i?O(f,"Ignored iFrame, already setup."):(d=(d=e)||{},F[f]={firstRun:!0,iframe:i,remoteHost:i.src.split("/").slice(0,3).join("/")},function(e){if("object"!=typeof e)throw new TypeError("Options is not an object")}(d),Object.keys(d).forEach(n,d),function(e){for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&(F[f][n]=Object.prototype.hasOwnProperty.call(e,n)?e[n]:h[n])}(d),F[f]&&(F[f].targetOrigin=!0===F[f].checkOrigin?""===(c=F[f].remoteHost)||"file://"===c?"*":c:"*"),function(){switch(k(f,"IFrame scrolling "+(F[f]&&F[f].scrolling?"enabled":"disabled")+" for "+f),i.style.overflow=!1===(F[f]&&F[f].scrolling)?"hidden":"auto",F[f]&&F[f].scrolling){case"omit":break;case!0:i.scrolling="yes";break;case!1:i.scrolling="no";break;default:i.scrolling=F[f]?F[f].scrolling:"no"}}(),function(){function e(e){1/0!==F[f][e]&&0!==F[f][e]&&(i.style[e]=F[f][e]+"px",k(f,"Set "+e+" = "+F[f][e]+"px"))}function n(e){if(F[f]["min"+e]>F[f]["max"+e])throw new Error("Value for min"+e+" can not be greater than max"+e)}n("Height"),n("Width"),e("maxHeight"),e("minHeight"),e("maxWidth"),e("minWidth")}(),"number"!=typeof(F[f]&&F[f].bodyMargin)&&"0"!==(F[f]&&F[f].bodyMargin)||(F[f].bodyMarginV1=F[f].bodyMargin,F[f].bodyMargin=F[f].bodyMargin+"px"),r=A(f),(s=w())&&(a=s,i.parentNode&&new a(function(e){e.forEach(function(e){Array.prototype.slice.call(e.removedNodes).forEach(function(e){e===i&&E(i)})})}).observe(i.parentNode,{childList:!0})),M(i,"load",function(){var e,n;H("iFrame.onload",r,i,u,!0),e=F[f]&&F[f].firstRun,n=F[f]&&F[f].heightCalculationMethod in g,!e&&n&&W({iframe:i,height:0,width:0,type:"init"})}),H("init",r,i,u,!0),F[f]&&(F[f].iframe.iFrameResizer={close:E.bind(null,F[f].iframe),removeListeners:T.bind(null,F[f].iframe),resize:H.bind(null,"Window resize","resize",F[f].iframe),moveToAnchor:function(e){H("Move to anchor","moveToAnchor:"+e,F[f].iframe,f)},sendMessage:function(e){H("Send Message","message:"+(e=JSON.stringify(e)),F[f].iframe,f)}}))}function c(e,n){null===i&&(i=setTimeout(function(){i=null,e()},n))}function f(){"hidden"!==document.visibilityState&&(k("document","Trigger event: Visiblity change"),c(function(){q("Tab Visable","resize")},16))}function q(i,t){Object.keys(F).forEach(function(e){var n;F[n=e]&&"parent"===F[n].resizeFrom&&F[n].autoResize&&!F[n].firstRun&&H(i,t,document.getElementById(e),e)})}function L(){M(window,"message",s),M(window,"resize",function(){var e;k("window","Trigger event: "+(e="resize")),c(function(){q("Window "+e,"resize")},16)}),M(document,"visibilitychange",f),M(document,"-webkit-visibilitychange",f)}function B(){function t(e,n){n&&(!function(){if(!n.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==n.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+n.tagName+">")}(),d(n,e),o.push(n))}var o;return function(){var e,n=["moz","webkit","o","ms"];for(e=0;e<n.length&&!r;e+=1)r=window[n[e]+"RequestAnimationFrame"];r||k("setup","RequestAnimationFrame not supported")}(),L(),function(e,n){var i;switch(o=[],(i=e)&&i.enablePublicMethods&&O("enablePublicMethods option has been removed, public methods are now always available in the iFrame"),typeof n){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(n||"iframe"),t.bind(u,e));break;case"object":t(e,n);break;default:throw new TypeError("Unexpected data type ("+typeof n+")")}return o}}}();

        document.getElementById('cmtx_iframe').addEventListener('load', function() {

            iFrameResize({
                inPageLinks: true,
                onInit: function(iframe) {
                    /* Remove spinner */
                    var spinner = document.getElementById('cmtx_spinner');
                    spinner.parentNode.removeChild(spinner);

                    iframe.style.visibility = 'visible'; // show the iframe now that it's fully loaded and re-sized

                    if (typeof anchor !== 'undefined') {
                        iframe.iFrameResizer.moveToAnchor(anchor); // automatically scroll to permalink comment
                    }

                    /* Infinite scroll */
                    function cmtxInfiniteScroll() {
                        var rect = iframe.getBoundingClientRect(); // get the position of the iframe

                        // if the bottom of the iframe is in view
                        if (window.innerHeight + window.scrollY > rect.bottom + window.scrollY - 150) {
                            iframe.contentWindow.postMessage('infinite_scroll', '*'); // post message to iframe to load more comments
                        }
                    }

                    cmtxInfiniteScroll(); // call infinite scroll function on load in case bottom of iframe is already in view

                    if (window.addEventListener) { // add scroll and resize listeners to page
                        window.addEventListener('scroll', cmtxInfiniteScroll, false);
                        window.addEventListener('resize', cmtxInfiniteScroll, false);
                    }
                }
            }, '#cmtx_iframe');

        })

    } else {
        console.log('No element found with the ID commentics');
    }
});