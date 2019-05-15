// ==UserScript==
// @name         app.hbooker.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.ciweimao.com/chapter/*
// @grant GM_setClipboard
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// @grant GM_log
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_getResourceURL
// @grant GM_getResourceText
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_getValue
// @grant GM_deleteValue
// @grant GM_info
// @grant Metadata Block
// @require     https://code.jquery.com/jquery-2.2.4.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js
// ==/UserScript==
var hookAjax = '!function(t){function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var e={};return r.m=t,r.c=e,r.p="",r(0)}([function(t,r,e){e(1)(window)},function(t,r){t.exports=function(t){t.hookAjax=function(t){function r(r){return function(){var e=this.hasOwnProperty(r+"_")?this[r+"_"]:this.xhr[r],n=(t[r]||{}).getter;return n&&n(e,this)||e}}function e(r){return function(e){var n=this.xhr,o=this,i=t[r];if("function"==typeof i)n[r]=function(){t[r](o)||e.apply(n,arguments)};else{var a=(i||{}).setter;e=a&&a(e,o)||e;try{n[r]=e}catch(t){this[r+"_"]=e}}}}function n(r){return function(){var e=[].slice.call(arguments);if(!t[r]||!t[r].call(this,e,this.xhr))return this.xhr[r].apply(this.xhr,e)}}window._ahrealxhr=window._ahrealxhr||XMLHttpRequest,XMLHttpRequest=function(){var t=new window._ahrealxhr;Object.defineProperty(this,"xhr",{value:t})};var o=window._ahrealxhr.prototype;for(var i in o){var a="";try{a=typeof o[i]}catch(t){}"function"===a?XMLHttpRequest.prototype[i]=n(i):Object.defineProperty(XMLHttpRequest.prototype,i,{get:r(i),set:e(i),enumerable:!0})}return window._ahrealxhr},t.unHookAjax=function(){window._ahrealxhr&&(XMLHttpRequest=window._ahrealxhr),window._ahrealxhr=void 0},t.default=t}}]);';

(function() {
    'use strict';
    var account = "";
    var login_token = localStorage.getItem("Hlogin_Token");;
    fetch('https://www.ciweimao.com/reader/my_info')
        .then(function(response) {
        return response.text();
    })
        .then(function(text) {
        var vDom = document.createElement("html");;
        $(vDom).html(text);
        var uname = $(vDom).find("div.homepage-bd.info-bd > ul > li:nth-child(1) > div");
        account = uname.text();
    });
    var updateTokenDiv = document.createElement("div");
    $("body").append(updateTokenDiv);
    $(updateTokenDiv).html("更新Token").attr('style',"    position: absolute;    top: 0;    right: 0;    z-index: 100;    background: rgba(255,255,255,0.75);    border-radius: 4px;    box-shadow: 0 0 4px #000;    padding: 3px;    margin: 5px;").on('click',openTokenFile);
    function openTokenFile(){
        alert("请打开Token文件：\r\n 安卓客户端Token文件位置为: \r\n/sdcard/novelCiwei/LoginedUser\r\n或\r\n/手机存储/novelCiwei/LoginedUser\r\nIos暂不支持\r\n请勿分享Token文件给其他人！！明文密码也保存在里面！！！！");
        var fileOpener = document.createElement("input");
        fileOpener.type='file';
        fileOpener.addEventListener('change', readTokenFile, false);
        $(fileOpener).click();
        console.warn(fileOpener)
    }
    function readTokenFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            //window.fc = contents;
            //unsafeWindow.fc = fc;
            login_token = contents.split("userCode")[1].substr(10,32);
            localStorage.setItem("Hlogin_Token",login_token);
            alert("请检查是否为32位字母数字组合.\r\n若不是，则读取失败. \r\nToken："+login_token);
        };
        reader.readAsText(file);
    }
    //unsafeWindow.openTokenFile=openTokenFile;
    //unsafeWindow.readTokenFile=readTokenFile;
    function hbookerdecrypt(base64str){
        var Encrypt_Key = "zG2nSeEfSHfvTCHy5LCcqtBbQehKNLXn";
        var key = CryptoJS.enc.Utf8.parse(Encrypt_Key);
        var keySha256 = CryptoJS.SHA256(key);
        var iv = CryptoJS.enc.Utf8.parse("\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0");


        var options = {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv
        };

        var decryptedData = CryptoJS.AES.decrypt(base64str, keySha256, options);
        try{
            return decryptedData.toString(CryptoJS.enc.Utf8);
        }catch(e){
            console.warn(decryptedData.toString());
            return decryptedData.toString();
        }
    }
    function parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        // var a = new URL(url);
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function() {
                var params = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    p;
                for (var i = 0; i < len; i++) {
                    if (seg[i]) {
                        p = seg[i].split('=');
                        params[p[0]] = p[1];
                    }
                }
                return params;
            })(),
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1')
        };
    }
    //console.warn(JSON.parse(hbookerdecrypt(window.document.body.innerText.trim())))
    var xhrs = {};
    var xhrRep = {};
    function addthisXhr(xhr,method,url){
        xhrs[xhr] = {
            xhr:xhr,
            url: url,
            method:method
        }
    }
    function FixedresponseText(v,xhr){
        if(xhrRep[xhr.responseURL]){
            var i=1;
            return xhrRep[xhr.responseURL];
        }
        return v
    }
    function Fixedresponse(v,xhr){
        if(xhrRep[xhr.responseURL]){
            var i=1;
            return xhrRep[xhr.responseURL];
        }
        return v
    }
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }
    unsafeWindow.eval(hookAjax);
    var xhrA=null;

    unsafeWindow.hookAjax({
        open: function(arg, xhr) {
            if(arg[1].indexOf("get_paragraph_tsukkomi_list?") !=-1){
                addthisXhr(xhr,arg[0],arg[1]);
            }
            if(arg[1].indexOf("add_tsukkomi") !=-1){
                addthisXhr(xhr,arg[0],arg[1]);
            }
            //get_tsukkomi_list
            if(arg[1].indexOf("get_tsukkomi_list") !=-1){
                addthisXhr(xhr,arg[0],arg[1]);
            }
            return false;
        },
        send: function(arg,xhr){
            if(xhrs[xhr]){
                if(xhrs[xhr].responseDetails){
                    return false;
                }
                //console.warn("abort: ",xhr);
                var url = xhrs[xhr].url.replace(/www.ciweimao.com/, "app.hbooker.com");
                url = url.replace(/get_paragraph_tsukkomi_list\?/, "get_paragraph_tsukkomi_list_new?");
                if(url.indexOf("?") != -1){
                    url = url +"&app_version=2.1.032&account="+account+"&login_token="+login_token;
                }else{
                    url = url +"?app_version=2.1.032&account="+account+"&login_token="+login_token;
                }
                if(url.indexOf("add_tsukkomi")!= -1){
                    xhrs[xhr].method ="GET";
                    url=url+"&"+arg[0];
                }
                if(arg){
                    function procOnload(responseDetails){
                        xhrs[xhr].responseDetails = responseDetails;
                        if(responseDetails.responseText.trim() == responseDetails.responseText){
                            xhrRep[xhrs[xhr].url] = responseDetails.responseText;
                        }else{
                            xhrRep[xhrs[xhr].url] = hbookerdecrypt(responseDetails.responseText.trim());
                        }
                        try{
                            var jsonData = JSON.parse(xhrRep[xhrs[xhr].url]);
                            if(jsonData.code != 100000){
                                alert("Token可能失效,请点击右上角更新Token.\r\nInfo： "+jsonData.code + " : " + jsonData.tip);
                            }
                            console.warn(jsonData);
                        }catch(e){
                            console.warn(xhrRep[xhrs[xhr].url]);
                        }
                        var purl = parseURL(url);
                        if(xhrs[xhr].url.indexOf("add_tsukkomi")!=-1){
                            if($(".chapter-comment-wrap").length > 0){
                                $(".chapter-comment-wrap").remove();
                                $(".J_Num[data-pgid="+purl.params.paragraph_index+"]").click();
                                //if(purl.params.paragraph_index == "1"){return false;}
                                return true;
                            }
                        }
                        if(xhrs[xhr].url.indexOf("get_paragraph_tsukkomi_list")!=-1){
                            xhrRep[xhrs[xhr].url] = JSON.parse(xhrRep[xhrs[xhr].url]);
                            xhrRep[xhrs[xhr].url].data.paragraph_tsukkomi_amount = xhrRep[xhrs[xhr].url].data.paragraph_info.paragraph_tsukkomi_amount;
                            xhrRep[xhrs[xhr].url] = JSON.stringify(xhrRep[xhrs[xhr].url]);
                        }
                    }
                    console.warn("OriUrl: ", xhrs[xhr].url);
                    console.warn("NewUrl: ",url);
                    if(arg[0]){
                        GM_xmlhttpRequest ( {
                            method:     xhrs[xhr].method,
                            url:       url,
                            data:arg[0],
                            onload: function(responseDetails){
                                if(procOnload(responseDetails)){
                                    return;
                                }
                                xhrs[xhr].xhr.send(arg[0]);

                            }
                        } );
                    }else{
                        GM_xmlhttpRequest ( {
                            method:     xhrs[xhr].method,
                            url:       url,
                            onload: function(responseDetails){
                                if(procOnload(responseDetails)){
                                    return;
                                }
                                xhrs[xhr].xhr.send(arg[0]);
                            }
                        } );
                    }
                }
                return true;
            }
            return false;
        },
        responseText: {
            getter: FixedresponseText
        },
        response: {
            getter:Fixedresponse
        }
    });
})();
