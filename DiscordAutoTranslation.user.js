// ==UserScript==
// @name         Discord web auto machine translation
// @namespace    http://cirno.biz/
// @version      0.1
// @description  Discord web automatic machine translation
// @author       AdventCirno
// @match        https://discordapp.com/*
// @match        https://discord.com/*
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      api.deepl.com
// @connect      api.interpreter.caiyunai.com
// @connect      translate.google.com
// @connect      api.fanyi.baidu.com
// ==/UserScript==

//md5
function safeAdd(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&65535)}function bitRotateLeft(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}function md5cmn(q,a,b,x,s,t){return safeAdd(bitRotateLeft(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b)}function md5ff(a,b,c,d,x,s,t){return md5cmn((b&c)|(~b&d),a,b,x,s,t)}function md5gg(a,b,c,d,x,s,t){return md5cmn((b&d)|(c&~d),a,b,x,s,t)}function md5hh(a,b,c,d,x,s,t){return md5cmn(b^c^d,a,b,x,s,t)}function md5ii(a,b,c,d,x,s,t){return md5cmn(c^(b|~d),a,b,x,s,t)}function binlMD5(x,len){x[len>>5]|=128<<len%32;x[(((len+64)>>>9)<<4)+14]=len;var i;var olda;var oldb;var oldc;var oldd;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(i=0;i<x.length;i+=16){olda=a;oldb=b;oldc=c;oldd=d;a=md5ff(a,b,c,d,x[i],7,-680876936);d=md5ff(d,a,b,c,x[i+1],12,-389564586);c=md5ff(c,d,a,b,x[i+2],17,606105819);b=md5ff(b,c,d,a,x[i+3],22,-1044525330);a=md5ff(a,b,c,d,x[i+4],7,-176418897);d=md5ff(d,a,b,c,x[i+5],12,1200080426);c=md5ff(c,d,a,b,x[i+6],17,-1473231341);b=md5ff(b,c,d,a,x[i+7],22,-45705983);a=md5ff(a,b,c,d,x[i+8],7,1770035416);d=md5ff(d,a,b,c,x[i+9],12,-1958414417);c=md5ff(c,d,a,b,x[i+10],17,-42063);b=md5ff(b,c,d,a,x[i+11],22,-1990404162);a=md5ff(a,b,c,d,x[i+12],7,1804603682);d=md5ff(d,a,b,c,x[i+13],12,-40341101);c=md5ff(c,d,a,b,x[i+14],17,-1502002290);b=md5ff(b,c,d,a,x[i+15],22,1236535329);a=md5gg(a,b,c,d,x[i+1],5,-165796510);d=md5gg(d,a,b,c,x[i+6],9,-1069501632);c=md5gg(c,d,a,b,x[i+11],14,643717713);b=md5gg(b,c,d,a,x[i],20,-373897302);a=md5gg(a,b,c,d,x[i+5],5,-701558691);d=md5gg(d,a,b,c,x[i+10],9,38016083);c=md5gg(c,d,a,b,x[i+15],14,-660478335);b=md5gg(b,c,d,a,x[i+4],20,-405537848);a=md5gg(a,b,c,d,x[i+9],5,568446438);d=md5gg(d,a,b,c,x[i+14],9,-1019803690);c=md5gg(c,d,a,b,x[i+3],14,-187363961);b=md5gg(b,c,d,a,x[i+8],20,1163531501);a=md5gg(a,b,c,d,x[i+13],5,-1444681467);d=md5gg(d,a,b,c,x[i+2],9,-51403784);c=md5gg(c,d,a,b,x[i+7],14,1735328473);b=md5gg(b,c,d,a,x[i+12],20,-1926607734);a=md5hh(a,b,c,d,x[i+5],4,-378558);d=md5hh(d,a,b,c,x[i+8],11,-2022574463);c=md5hh(c,d,a,b,x[i+11],16,1839030562);b=md5hh(b,c,d,a,x[i+14],23,-35309556);a=md5hh(a,b,c,d,x[i+1],4,-1530992060);d=md5hh(d,a,b,c,x[i+4],11,1272893353);c=md5hh(c,d,a,b,x[i+7],16,-155497632);b=md5hh(b,c,d,a,x[i+10],23,-1094730640);a=md5hh(a,b,c,d,x[i+13],4,681279174);d=md5hh(d,a,b,c,x[i],11,-358537222);c=md5hh(c,d,a,b,x[i+3],16,-722521979);b=md5hh(b,c,d,a,x[i+6],23,76029189);a=md5hh(a,b,c,d,x[i+9],4,-640364487);d=md5hh(d,a,b,c,x[i+12],11,-421815835);c=md5hh(c,d,a,b,x[i+15],16,530742520);b=md5hh(b,c,d,a,x[i+2],23,-995338651);a=md5ii(a,b,c,d,x[i],6,-198630844);d=md5ii(d,a,b,c,x[i+7],10,1126891415);c=md5ii(c,d,a,b,x[i+14],15,-1416354905);b=md5ii(b,c,d,a,x[i+5],21,-57434055);a=md5ii(a,b,c,d,x[i+12],6,1700485571);d=md5ii(d,a,b,c,x[i+3],10,-1894986606);c=md5ii(c,d,a,b,x[i+10],15,-1051523);b=md5ii(b,c,d,a,x[i+1],21,-2054922799);a=md5ii(a,b,c,d,x[i+8],6,1873313359);d=md5ii(d,a,b,c,x[i+15],10,-30611744);c=md5ii(c,d,a,b,x[i+6],15,-1560198380);b=md5ii(b,c,d,a,x[i+13],21,1309151649);a=md5ii(a,b,c,d,x[i+4],6,-145523070);d=md5ii(d,a,b,c,x[i+11],10,-1120210379);c=md5ii(c,d,a,b,x[i+2],15,718787259);b=md5ii(b,c,d,a,x[i+9],21,-343485551);a=safeAdd(a,olda);b=safeAdd(b,oldb);c=safeAdd(c,oldc);d=safeAdd(d,oldd)}return[a,b,c,d]}function binl2rstr(input){var i;var output="";var length32=input.length*32;for(i=0;i<length32;i+=8){output+=String.fromCharCode((input[i>>5]>>>i%32)&255)}return output}function rstr2binl(input){var i;var output=[];output[(input.length>>2)-1]=undefined;for(i=0;i<output.length;i+=1){output[i]=0}var length8=input.length*8;for(i=0;i<length8;i+=8){output[i>>5]|=(input.charCodeAt(i/8)&255)<<i%32}return output}function rstrMD5(s){return binl2rstr(binlMD5(rstr2binl(s),s.length*8))}function rstrHMACMD5(key,data){var i;var bkey=rstr2binl(key);var ipad=[];var opad=[];var hash;ipad[15]=opad[15]=undefined;if(bkey.length>16){bkey=binlMD5(bkey,key.length*8)}for(i=0;i<16;i+=1){ipad[i]=bkey[i]^909522486;opad[i]=bkey[i]^1549556828}hash=binlMD5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binlMD5(opad.concat(hash),512+128))}function rstr2hex(input){var hexTab="0123456789abcdef";var output="";var x;var i;for(i=0;i<input.length;i+=1){x=input.charCodeAt(i);output+=hexTab.charAt((x>>>4)&15)+hexTab.charAt(x&15)}return output}function str2rstrUTF8(input){return unescape(encodeURIComponent(input))}function rawMD5(s){return rstrMD5(str2rstrUTF8(s))}function hexMD5(s){return rstr2hex(rawMD5(s))}function rawHMACMD5(k,d){return rstrHMACMD5(str2rstrUTF8(k),str2rstrUTF8(d))}function hexHMACMD5(k,d){return rstr2hex(rawHMACMD5(k,d))}function md5(string,key,raw){if(!key){if(!raw){return hexMD5(string)}return rawMD5(string)}if(!raw){return hexHMACMD5(key,string)}return rawHMACMD5(key,string)}if(typeof define==="function"&&define.amd){define(function(){return md5})}else{if(typeof module==="object"&&module.exports){module.exports=md5}else{}};
var hookAjax = '!function(t){function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var e={};return r.m=t,r.c=e,r.p="",r(0)}([function(t,r,e){e(1)(window)},function(t,r){t.exports=function(t){t.hookAjax=function(t){function r(r){return function(){var e=this.hasOwnProperty(r+"_")?this[r+"_"]:this.xhr[r],n=(t[r]||{}).getter;return n&&n(e,this)||e}}function e(r){return function(e){var n=this.xhr,o=this,i=t[r];if("function"==typeof i)n[r]=function(){t[r](o)||e.apply(n,arguments)};else{var a=(i||{}).setter;e=a&&a(e,o)||e;try{n[r]=e}catch(t){this[r+"_"]=e}}}}function n(r){return function(){var e=[].slice.call(arguments);if(!t[r]||!t[r].call(this,e,this.xhr))return this.xhr[r].apply(this.xhr,e)}}window._ahrealxhr=window._ahrealxhr||XMLHttpRequest,XMLHttpRequest=function(){var t=new window._ahrealxhr;Object.defineProperty(this,"xhr",{value:t})};var o=window._ahrealxhr.prototype;for(var i in o){var a="";try{a=typeof o[i]}catch(t){}"function"===a?XMLHttpRequest.prototype[i]=n(i):Object.defineProperty(XMLHttpRequest.prototype,i,{get:r(i),set:e(i),enumerable:!0})}return window._ahrealxhr},t.unHookAjax=function(){window._ahrealxhr&&(XMLHttpRequest=window._ahrealxhr),window._ahrealxhr=void 0},t.default=t}}]);';
var langCodes = ["ja-JP(日本語)", "zh-CHS(简中)", "en-US(English)", "自动检测/AutoDetect", "Spanish(Español)", "zh-CHT(繁中)", 'portuguese(Português)'];
var GMDiscordTrsOpt = {};
GMDiscordTrsOpt.GMDiscordTrsOn = GM_getValue(['GMDiscordTrsOn']) === true ? true: false;
GMDiscordTrsOpt.GMDiscordTrssplitStrDef = GM_getValue('GMDiscordTrssplitStrDef') ? GM_getValue('GMDiscordTrssplitStrDef') : "\r\n";
GMDiscordTrsOpt.GMDiscordTrsOnlyDist = GM_getValue(['GMDiscordTrsOnlyDist']) === true ? true: false;
GMDiscordTrsOpt.GMDiscordTrsApiKey = GM_getValue('GMDiscordTrsApiKey') ? GM_getValue('GMDiscordTrsApiKey') : "";
GMDiscordTrsOpt.GMDiscordTrsAppId = GM_getValue('GMDiscordTrsAppId') ? GM_getValue('GMDiscordTrsAppId') : "";
GMDiscordTrsOpt.GMDiscordTrsFromLang = !GM_getValue('GMDiscordTrsFromLang') ? 0 : GM_getValue('GMDiscordTrsFromLang');
GMDiscordTrsOpt.GMDiscordTrsToLang = !GM_getValue('GMDiscordTrsToLang') ? 0 : GM_getValue('GMDiscordTrsToLang');
GMDiscordTrsOpt.GMDiscordTrsShowEngine = !GM_getValue('GMDiscordTrsShowEngine') ? false : GM_getValue('GMDiscordTrsShowEngine');
var engineFuncs = {
    Google: function(text, callback) {
        var langPars = ['ja', 'zh-CN', 'en', 'auto', 'es', 'zh-CN', 'pt'];
        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://translate.google.com/translate_a/single?client=at&sl=" + langPars[GMDiscordTrsOpt.GMDiscordTrsFromLang] + "&tl=" + langPars[GMDiscordTrsOpt.GMDiscordTrsToLang] + "&dt=t&q=" + encodeURIComponent(text),
            onload: function(responseDetails) {
                //console.warn(responseDetails);
                try {
                    var result = JSON.parse(responseDetails.response);
                    var tt = "";
                    result[0].forEach(function(a) {
                        tt += a[0]
                    });
                    callback(tt);
                } catch(e) {
                    callback("");
                    console.error(e);
                }
            },
            "headers": {
                "User-Agent": "memoQ",
                "Accept": "*/*",
                "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2"
            },
            onerror: function(error) {
                console.error(error);
            }
        });
    },
    Caiyun: function(text, callback) {
        var langPars = ['ja', 'zh', 'en', 'auto', 'es', 'zh', 'pt'];
        GM_xmlhttpRequest({
            method: 'POST',
            url: "http://api.interpreter.caiyunai.com/v1/translator",
            data: JSON.stringify({
                "source": text,
                "trans_type": langPars[GMDiscordTrsOpt.GMDiscordTrsFromLang] + "2" + langPars[GMDiscordTrsOpt.GMDiscordTrsToLang],
                "request_id": "demo",
                "detect": false,
            }),
            onload: function(responseDetails) {
                try {
                    console.warn(responseDetails);
                    var result = JSON.parse(responseDetails.response);
                    callback(result.target);
                } catch(e) {
                    callback("");
                    console.error(e);
                }
            },
            "headers": {
                "Content-type": "application/json",
                'x-authorization': "token " + GMDiscordTrsOpt.GMDiscordTrsApiKey
            },
            onerror: function(error) {
                console.error(error);
            }
        });
    },
    DeepL: function(text, callback) {
        var langPars = ['JA', 'ZH', 'EN', 'AUTO', 'ES', 'ZH', 'PT'];
        var preArg = "ignore_tags=trsIgnoretag&tag_handling=xml&source_lang=" + langPars[GMDiscordTrsOpt.GMDiscordTrsFromLang] + "&target_lang=" + langPars[GMDiscordTrsOpt.GMDiscordTrsToLang] + "&preserve_formatting=0&auth_key=" + GMDiscordTrsOpt.GMDiscordTrsApiKey;
        GM_xmlhttpRequest({
            method: 'POST',
            url: "https://api.deepl.com/v1/translate",
            data: preArg + "&text=" + encodeURIComponent(text),
            onload: function(responseDetails) {
                try {
                    //console.warn(responseDetails);
                    var result = JSON.parse(responseDetails.response);
                    callback(result.translations[0].text);
                } catch(e) {
                    callback("");
                    console.error(e);
                }
            },
            "headers": {
                "User-Agent": "memoQ",
                "Accept": "*/*",
                "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
                "Content-type": "application/x-www-form-urlencoded",
                "X-Instance": "QzBDQTdCRjNGODREQAAZ0VBNzTTXTRCRUFFMTgwMEUyMDMAAfxQTlBMTIyQjA0MDgwRTM5ODxxsazQTdGRA=="
            },
            onerror: function(error) {
                console.error(error);
            }
        });
    },
    Baidu: function(text, callback) {
        var langPars = ['jp', 'zh', 'en', 'auto', 'spa', 'zh', 'pt'];
        var appid = GMDiscordTrsOpt.GMDiscordTrsAppId;
        var key = GMDiscordTrsOpt.GMDiscordTrsApiKey;
        var salt = "125637";
        var str1 = appid + text + salt + key;
        var sign = md5(str1).toLowerCase();
        var query = "q=" + encodeURIComponent(text) + "&appid=" + encodeURIComponent(appid) + "&salt=" + encodeURIComponent(salt) + "&from=" + encodeURIComponent(langPars[GMDiscordTrsOpt.GMDiscordTrsFromLang]) + "&to=" + encodeURIComponent(langPars[GMDiscordTrsOpt.GMDiscordTrsToLang]) + "&sign=" + encodeURIComponent(sign);
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
            data: query,
            onload: function(responseDetails) {
                try {
                    //console.warn(responseDetails);
                    var result = JSON.parse(responseDetails.response);
                    var rText = "";
                    for (var i = 0; i < result.trans_result.length; i++) {
                        if (i > 0) {
                            rText += "\r\n";
                        }
                        rText += result.trans_result[i].dst;
                    }
                    callback(rText);
                } catch(e) {
                    callback("");
                    console.error(e);
                }
            },
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,en;q=0.6,eo;q=0.5",
                "cache-control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onerror: function(error) {
                console.error(error);
            }
        });
    }
};
GMDiscordTrsOpt.GMDiscordTrsEngine = (Object.keys(engineFuncs).indexOf(GM_getValue('GMDiscordTrsEngine')) !== -1) ? GM_getValue('GMDiscordTrsEngine') : "Google";
GMDiscordTrsOpt.GMDiscordTrsEngineLast = GMDiscordTrsOpt.GMDiscordTrsEngine; (function() {
    'use strict';
    unsafeWindow.eval(hookAjax);

    unsafeWindow.hookAjax({
        setRequestHeader: function(arg, xhr) {
            if (arg[0] == "Authorization") {
                //为其他脚本设置的这个....你可以干掉它.
                unsafeWindow.userToken = arg[1];
            }
        },
        open: function(args, xhr) {
            xhr.url = args[1]
            return false;
        },
        send: function(args, xhr) {
            if (!GMDiscordTrsOpt.GMDiscordTrsOn) {
                return false;
            }
            if (xhr.url.match(/https:\/\/discord.com\/api\/v\d+\/channels\/\d+\/messages/)) {
                if (args[0]) {
                    if (xhr.fixed) {
                        return false;
                    }
                    xhr.fixed = true;
                    try {
                        //debugger;
                        var msg = JSON.parse(args[0]);
                        if (msg.content && msg.content.length > 1) {
                            var cb = (function(msg, xhr) {
                                return function(text) {
                                    if(GMDiscordTrsOpt.GMDiscordTrsShowEngine){
                                        text = GMDiscordTrsOpt.GMDiscordTrsEngine + ": " + text;
                                    }
                                    if (GMDiscordTrsOpt.GMDiscordTrsOnlyDist && msg.content) {
                                        msg.content = text;
                                    } else {
                                        if (msg.content !== text && msg.content) {
                                            msg.content = msg.content + GMDiscordTrsOpt.GMDiscordTrssplitStrDef + text;
                                        }
                                    }
                                    xhr.send(JSON.stringify(msg));
                                }
                            })(msg, xhr);
                            engineFuncs[GMDiscordTrsOpt.GMDiscordTrsEngine](msg.content, cb);
                            return true;
                        }
                    } catch(e) {
                        console.error(e);
                    }
                    return false;
                }
            }
            return false;
        }
    });

    function appendLangTrsSelect(fromSelAppendTo, toSelAppendTo) {
        var fromSel = document.createElement('Select');
        var toSel = document.createElement('Select');
        for (var i = 0; i < langCodes.length; i++) {
            if (i === 3) {
                continue;
            }
            var fromOpt = document.createElement('Option');
            var toOpt = document.createElement('Option');
            fromOpt.innerText = langCodes[i];
            fromOpt.value = i.toString();
            fromSel.appendChild(fromOpt);
            if (i !== 3) { //"自动检测/AutoDetect"
                toOpt.innerText = langCodes[i];
                toOpt.value = i.toString();
                toSel.appendChild(toOpt);
            }
        }
        fromSel.value = GMDiscordTrsOpt.GMDiscordTrsFromLang.toString();
        toSel.value = GMDiscordTrsOpt.GMDiscordTrsToLang.toString();
        fromSel.onchange = function(ev) {
            GMDiscordTrsOpt.GMDiscordTrsFromLang = this.value * 1;
            GM_setValue('GMDiscordTrsFromLang', this.value * 1);
        }
        toSel.onchange = function(ev) {
            GMDiscordTrsOpt.GMDiscordTrsToLang = this.value * 1;
            GM_setValue('GMDiscordTrsToLang', this.value * 1);
        }
        fromSelAppendTo.appendChild(fromSel);
        toSelAppendTo.appendChild(toSel);
    }

    function addTextInputGMSet(name, getValWrapFunc, setValWrapFunc, hide) {
        var inputTrs = document.createElement("input");
        inputTrs.type = "text";
        if (hide) {
            inputTrs.style.backgroundColor = "#fff";
            inputTrs.style.color = "#fff";
        }
        var gvar = GMDiscordTrsOpt[name];
        if (getValWrapFunc) {
            gvar = getValWrapFunc(gvar);
        }
        inputTrs.value = gvar;
        var EvFunc = (function(name, getValWrapFunc, setValWrapFunc) {
            return function() {
                var val = this.value;
                if (setValWrapFunc) {
                    val = setValWrapFunc(val);
                }
                GMDiscordTrsOpt[name] = val;
                GM_setValue(name, val);
            }
        })(name, getValWrapFunc, setValWrapFunc);
        inputTrs.onchange = EvFunc;
        inputTrs.onkeydown = EvFunc;
        if (hide) {
            inputTrs.onfocus = function() {
                this.style.color = "#000";
            }
            inputTrs.onblur = function() {
                this.style.color = "#fff";
            }
        }
        return inputTrs;
    }
    function addCheckBoxInputGMSet(name, getValWrapFunc, setValWrapFunc) {
        var inputTrs = document.createElement("input");
        inputTrs.type = "checkbox";
        var gvar = GMDiscordTrsOpt[name];
        if (getValWrapFunc) {
            gvar = getValWrapFunc(gvar);
        }
        inputTrs.checked = gvar;
        var EvFunc = (function(name) {
            return function() {
                var val = this.checked;
                if (getValWrapFunc) {
                    val = setValWrapFunc(val);
                }
                GMDiscordTrsOpt[name] = val;
                GM_setValue(name, val);
            }
        })(name);
        inputTrs.onchange = EvFunc;
        return inputTrs;
    }
    function toggleOptions() {
        var CHackDiscordTrsToolOptionDiv = document.getElementById('CHackDiscordTrsToolOptionDiv');
        if (CHackDiscordTrsToolOptionDiv) {
            CHackDiscordTrsToolOptionDiv.remove();
            return;
        }
        var wrap = document.createElement("div");
        wrap.id = "CHackDiscordTrsToolOptionDiv";
        wrap.style = "position: fixed;display: inline-block;background-color: rgba(255, 255, 255, 0.75);z-index: 999999999;right: 1em;top: 3em;padding: 1em;border-radius: 1em;box-shadow: 0 0 4px #000;";

        wrap.insertAdjacentHTML('beforeend', "<br>Global Switch: ");
        wrap.insertAdjacentElement('beforeend', addCheckBoxInputGMSet('GMDiscordTrsOn'));

        wrap.insertAdjacentHTML('beforeend', "<br>Only Send Dest Lang: ");
        wrap.insertAdjacentElement('beforeend', addCheckBoxInputGMSet('GMDiscordTrsOnlyDist'));

        wrap.insertAdjacentHTML('beforeend', "<br>Show Engine In Msg: ");
        wrap.insertAdjacentElement('beforeend', addCheckBoxInputGMSet('GMDiscordTrsShowEngine'));
        var inputSplit = addTextInputGMSet("GMDiscordTrssplitStrDef",
                                           function(val) {
            val = JSON.stringify(val);
            val = val.substr(1, val.length - 2);
            return val;
        },
                                           function(val) {
            return JSON.parse('"' + val.replace(/"/g, '\"') + '"');
        });

        wrap.insertAdjacentHTML('beforeend', "<br>Split for Src / Dst text: ");
        wrap.insertAdjacentElement('beforeend', inputSplit);

        wrap.insertAdjacentHTML('beforeend', "<br>ApiKey: ");
        wrap.insertAdjacentElement('beforeend', addTextInputGMSet("GMDiscordTrsApiKey", undefined, undefined, true));

        wrap.insertAdjacentHTML('beforeend', "<br>AppId: ");
        wrap.insertAdjacentElement('beforeend', addTextInputGMSet("GMDiscordTrsAppId", undefined, undefined, true));
        wrap.insertAdjacentHTML('beforeend', "(If needed)");

        wrap.insertAdjacentHTML('beforeend', "<br> Engine: ");
        Object.keys(engineFuncs).forEach(function(e) {
            var inputTrsEngine = document.createElement("input");
            inputTrsEngine.type = "radio";
            inputTrsEngine.name = "TrsEnging";
            inputTrsEngine.checked = GMDiscordTrsOpt.GMDiscordTrsEngine === e;
            inputTrsEngine.onchange = (function(e) {
                return function() {
                    GMDiscordTrsOpt.GMDiscordTrsEngine = e;
                    GM_setValue('GMDiscordTrsEngine', e);
                    GM_setValue('GMDiscordTrsEngineAppKey_' + GMDiscordTrsOpt.GMDiscordTrsEngineLast, GMDiscordTrsOpt.GMDiscordTrsApiKey);
                    GM_setValue('GMDiscordTrsEngineAppId_' + GMDiscordTrsOpt.GMDiscordTrsEngineLast, GMDiscordTrsOpt.GMDiscordTrsAppId);
                    var appk = GM_getValue('GMDiscordTrsEngineAppKey_' + e);
                    var appi = GM_getValue('GMDiscordTrsEngineAppId_' + e);
                    if (appk) {
                        GM_setValue('GMDiscordTrsApiKey', appk);
                        GMDiscordTrsOpt.GMDiscordTrsApiKey = appk;
                    } else {
                        GM_setValue('GMDiscordTrsApiKey', "");
                        GMDiscordTrsOpt.GMDiscordTrsApiKey = "";
                    }
                    if (appi) {
                        GM_setValue('GMDiscordTrsAppId', appi);
                        GMDiscordTrsOpt.GMDiscordTrsAppId = appi;
                    } else {
                        GM_setValue('GMDiscordTrsAppId', "");
                        GMDiscordTrsOpt.GMDiscordTrsAppId = "";
                    }
                    GMDiscordTrsOpt.GMDiscordTrsEngineLast = e;
                    toggleOptions();
                    toggleOptions();
                }
            })(e);
            wrap.insertAdjacentElement('beforeend', inputTrsEngine);
            wrap.insertAdjacentHTML('beforeend', " " + e + " ");
        });

        wrap.insertAdjacentHTML('beforeend', "<br> ");
        var fromSpan = document.createElement("span");
        var toSpan = document.createElement("span");
        fromSpan.innerText = "Src Lang: ";
        toSpan.innerText = "Dst Lang: ";
        appendLangTrsSelect(fromSpan, toSpan);
        wrap.insertAdjacentElement('beforeend', fromSpan);
        wrap.insertAdjacentElement('beforeend', toSpan);
        document.body.insertAdjacentElement('beforeend', wrap);
    }

    setInterval(function() {
        var target = document.querySelector('a[href="https://support.discord.com"]');
        if (target) {
            target.onclick = function(ev) {
                ev.preventDefault();
                ev.stopImmediatePropagation();
                ev.stopPropagation();
                toggleOptions();
            }
        }
    },
                100);
})();
