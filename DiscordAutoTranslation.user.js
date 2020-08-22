// ==UserScript==
// @name         Discord 发送消息翻译
// @name:en      Discord Send msg auto translation
// @namespace    http://cirno.biz/
// @version      0.1
// @description  Discord 自动翻译你发出的消息
// @description:en  Discord automatic translate msg you send
// @author       zths
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
// @require      https://cdn.jsdelivr.net/gh/zths/userScript@d54a414c0135925f968fa0ee0e6db5dbc8eccc3d/s2tt2sJs.js
// @require      https://cdn.jsdelivr.net/gh/zths/userScript@2418e537294dd35f32e89fd7705027cca09ab2b4/md5.js
// ==/UserScript==
// https://github.com/wendux/Ajax-hook
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
GMDiscordTrsOpt.GMDiscordTrsEngineLast = GMDiscordTrsOpt.GMDiscordTrsEngine;
(function() {
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
            if (!GMDiscordTrsOpt.GMDiscordTrsOn || GMDiscordTrsOpt.GMDiscordTrsToLang === GMDiscordTrsOpt.GMDiscordTrsFromLang) {
                return false;
            }
            if (xhr.url.match(/https:\/\/discord.com\/api\/v\d+\/channels\/\d+\/messages/)) {
                if (args[0]) {
                    if (xhr.fixed) {
                        return false;
                    }
                    xhr.fixed = true;
                    try{
                        //debugger;
                        var msg = JSON.parse(args[0]);
                        if (msg.content && msg.content.length > 1) {
                            var cb = (function(msg, xhr) {
                                return function(text) {
                                    if(GMDiscordTrsOpt.GMDiscordTrsShowEngine){
                                        text = GMDiscordTrsOpt.GMDiscordTrsEngine + ": " + text;
                                    }
                                    if(GMDiscordTrsOpt.GMDiscordTrsToLang === 5){
                                        text = s2t(text);
                                    }
                                    if(GMDiscordTrsOpt.GMDiscordTrsToLang === 1){
                                        text = t2s(text);
                                    }
                                    if(msg.content && msg.content !== text){
                                        if (GMDiscordTrsOpt.GMDiscordTrsOnlyDist) {
                                            msg.content = text;
                                        } else {
                                            msg.content = msg.content + GMDiscordTrsOpt.GMDiscordTrssplitStrDef + text;
                                        }
                                    }
                                    xhr.send(JSON.stringify(msg));
                                }
                            })(msg, xhr);
                            if((GMDiscordTrsOpt.GMDiscordTrsToLang === 5 && GMDiscordTrsOpt.GMDiscordTrsFromLang === 1) || (GMDiscordTrsOpt.GMDiscordTrsToLang === 1 && GMDiscordTrsOpt.GMDiscordTrsFromLang === 5)){
                                setTimeout((function(cb,text){
                                    cb(text);
                                })(cb,msg.content),10);
                                return true;
                            }
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
        //var computedStyleAppMount = document.defaultView.getComputedStyle(document.getElementById('app-mount'));
        //var computedStyleHeader = document.defaultView.getComputedStyle(document.querySelector('header[class^=header]'));

        var wrap = document.createElement("div");
        wrap.id = "CHackDiscordTrsToolOptionDiv";
        wrap.style = "position: fixed;display: inline-block;background-color: var(--background-secondary);color: var(--interactive-active);z-index: 999999999;right: 1em;top: 3em;padding: 1em;border-radius: 1em;box-shadow: 0 0 4px #000;";

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
