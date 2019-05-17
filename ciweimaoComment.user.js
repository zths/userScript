// ==UserScript==
// @name         app.hbooker.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.ciweimao.com/chapter/*
// @match       https://www.ciweimao.com/book/*
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
var commentScript = "function change_review_page(page){var url1=HB.config.rootPath+\"book/get_review_list_all\";url1=url1+\"/?page=\"+page;loadComment(url1,{book_id:HB.book.book_id},1)}function change_comment_page(page,review_id){var url2=HB.config.rootPath+\"book/get_comment_list_all\";url2=url2+\"/?page=\"+page;$commentList2=$(\"#review_id\"+review_id);$commentList2.load(url2,{review_id:review_id},function(){showAll()});$(\"html,body\").animate({scrollTop:$commentList2.offset().top-400},800)}function change_reply_page(page,comment_id){var url3=HB.config.rootPath+\"book/get_reply_list_all\";url3=url3+\"/?page=\"+page;$replyList=$(\"#commentid_\"+comment_id);$replyList.load(url3,{comment_id:comment_id},function(){showAll()});$(\"html,body\").animate({scrollTop:$replyList.offset().top-400},800)}function loadComment(url,data,jump){$commentList.load(url,data,function(){showAll()});if(jump==1){$(\"html,body\").animate({scrollTop:$commentList.offset().top-400},800)}}function showAll(){var h=78;$(\".J_CommentList\").find(\".J_DescContent\").each(function(){var self=$(this);if(self.outerHeight()>h){var $btn=self.next(\".J_ShowAllBar\").find(\".J_ShowAllBtn\");self.css(\"height\",h+\"px\");$btn.show().one(\"click\",function(){self.css(\"height\",\"auto\");$btn.hide()})}})};";
$("body").append("<script>"+commentScript+"</script>");
(function() {
    'use strict';
    var account = localStorage.getItem("Hlogin_account");
    var login_token = localStorage.getItem("Hlogin_Token");
    function updateAccount(){
        fetch('https://www.ciweimao.com/reader/my_info')
            .then(function(response) {
            return response.text();
        })
            .then(function(text) {
            var vDom = document.createElement("html");;
            $(vDom).html(text);
            var uname = $(vDom).find("div.homepage-bd.info-bd > ul > li:nth-child(1) > div");
            account = uname.text();
            localStorage.setItem("Hlogin_account",account);
        });
    }
    if(!account){
        updateAccount();
    }
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
        updateAccount();
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
    var fixUrls = [
        "get_paragraph_tsukkomi_list",
        "add_tsukkomi",
        "get_tsukkomi_list",
        "get_review_list_all",
        "like_review",
        "unlike_review",
        "add_review_comment"
    ];
    unsafeWindow.hookAjax({
        open: function(arg, xhr) {
            for(var i=0;i<fixUrls.length;i++){
                if(arg[1].indexOf(fixUrls[i]) != -1){
                    addthisXhr(xhr,arg[0],arg[1]);
                }
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
                url = url.replace(/get_review_list_all/, "get_review_list");
                if(url.indexOf("?") != -1){
                    url = url +"&app_version=2.1.032&account="+account+"&login_token="+login_token+"&book_id="+HB.book.book_id;
                }else{
                    url = url +"?app_version=2.1.032&account="+account+"&login_token="+login_token+"&book_id="+HB.book.book_id;
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
                        if(xhrs[xhr].url.indexOf("get_review_list_all")!=-1){
                            var json = JSON.parse(xhrRep[xhrs[xhr].url]);
                            console.warn(json);
                            var page = 0;
                            if(xhrs[xhr].url.indexOf("page")==-1){
                                $("#J_CommentNum").text(json.data.book_info.review_amount);
                                unsafeWindow.commentPages = Math.ceil(json.data.book_info.review_amount / 10);
                            }else{
                                page =purl.params.page * 1;
                            }

                            var ret = "<ul class=\"comment-list\">";
                            for(var i=0;i<json.data.review_list.length;i++){
                                var thisr = json.data.review_list[i];
                                var vipn="v";
                                switch(thisr.reader_info.vip_lv){
                                    case "1":
                                        vipn="v";
                                        break;
                                    case "2":
                                        vipn="p";
                                        break;
                                    case "3":
                                        vipn="h";
                                        break;
                                    case "4":
                                        vipn="d";
                                        break;
                                    default:
                                        vipn="v";
                                }
                                ret= ret+"        <li class=\"J_Review\" data-reader-id=\"1\" data-review-id=\""+thisr.review_id+"\">\
<div class=\"img ly-fl\">\
<img alt=\"\" class=\"lazyload\" data-original=\""+thisr.reader_info.avatar_url+"\" src=\""+thisr.reader_info.avatar_url+"\">\
<span class='medal medal_3_80'></span>                    </div>\
<div class=\"bd\">\
<h3 class=\"name\"><a href=\"https://www.ciweimao.com/bookshelf/"+thisr.reader_info.reader_id+"\" target=\"_blank\" rel=\"nofollow\">"+thisr.reader_info.reader_name+"</a>\
<i class=\"\"></i>\
<span class=\"time\">"+thisr.ctime+"</span>\
</h3>\
<p class=\"level\"><i class=\"icon-level-"+vipn+"\"></i> LV."+thisr.reader_info.exp_lv+"</p>\
<div class=\"J_DescContent desc-content\">"+thisr.review_content+"</div>\
<div class=\"show-all-bar J_ShowAllBar\">\
<a class=\"J_ShowAllBtn show-all-btn\" href=\"javascript:;\">[显示全文]</a>\
</div>\
<div class=\"J_State J_CommentOpt state\">\
\
\
<a href=\"javascript:;\" class=\"J_Zan zan  "+(thisr.is_like?".done":"")+"\">点赞("+thisr.like_amount+")</a>\
\
<a href=\"javascript:;\" class=\"J_Hei hei  "+(thisr.is_unlike?".done":"")+"\">点黑("+thisr.unlike_amount+")</a>\
\
<a href=\"javascript:;\" class=\"J_FormReply reply\">回复</a>\
</div>\
<div id=\"review_id"+thisr.review_id+"\">\
<div class=\"comment-list-in\">\
<ul>\
</ul>\
</div>\
\
<div class=\"review-all-comment\">\
</div>\
</div>\
</div>\
</li>\
<div class=\"dialog-box dialog-forbid\" id=\"J_ForbidBox\" style=\"display: none;\">\
<p class=\"tips\">禁止此用户在当前板块发言，请选择禁言天数：</p>\
<div class=\"time-box\">\
<a class=\"select-time\" id=\"J_SelectTime\" href=\"javascript:;\" data-time=\"1\">禁言 1 天</a>\
<ul class=\"time-list\" id=\"J_TimeList\">\
<li data-value=\"1\">禁言 1 天</li>\
<li data-value=\"3\">禁言 3 天</li>\
<li data-value=\"7\">禁言 7 天</li>\
<li data-value=\"15\">禁言 15 天</li>\
</ul>\
</div>\
</div>";
                            }
                            ret = ret + "<ul class=\"pagination\">";
                            var startp = 0;
                            for(var p=0;p<commentPages;p++){
                                if(p==page){ret = ret+"<li class='selected'><a href='javascript:'>"+(p+1)+"</a></li>"; continue;}
                                ret = ret+"<li><a href=\"javascript:change_review_page("+p+")\" data-ci-pagination-page=\""+p+"\">"+(p+1)+"</a></li>";
                            }
                            ret = ret + "<input type=\"hidden\" value=\""+page+"\" name=\"curr_page\" id=\"curr_page\">\
<input type=\"hidden\" value=\"change_review_page("+page+")\" name=\"curr_url\" id=\"curr_url\">\
</ul>";
                            xhrRep[xhrs[xhr].url] = ret;
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
