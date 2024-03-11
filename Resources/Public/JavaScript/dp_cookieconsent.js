(function(d){typeof define=="function"&&define.amd?define(d):d()})(function(){"use strict";const d=`<div class="cc-body" id="cookieconsent:body">\r
    <span class="cc-message" id="cookieconsent:desc">\r
        {{description}}\r
        {{selection}}\r
    </span>\r
    <div class="cc-compliance cc-highlight">\r
        {{allow-all}}\r
        {{allow}}\r
        {{deny}}\r
    </div>\r
</div>`,f=`<div class="cc-body" id="cookieconsent:body">\r
    <span class="cc-message" id="cookieconsent:desc">\r
        {{description}}\r
    </span>\r
    <div class="cc-compliance cc-highlight">\r
        {{allow-all}}\r
        {{config}}\r
        {{deny}}\r
    </div>\r
</div>`,h=`<div class="dp--cookie-check">\r
    <label for="dp--cookie-require">\r
        <input type="checkbox" id="dp--cookie-require" class="dp--check-box" checked="checked" disabled="disabled"  />\r
        {{dpRequire}}\r
    </label>\r
    <label for="dp--cookie-statistics">\r
        <input type="checkbox" id="dp--cookie-statistics" class="dp--check-box" {{checked.statistics}} value="" />\r
        {{dpStatistik}}\r
    </label>\r
    <label for="dp--cookie-marketing">\r
        <input type="checkbox" id="dp--cookie-marketing" class="dp--check-box" {{checked.marketing}} value=""  />\r
        {{dpMarketing}}\r
    </label>\r
</div>\r
`,v=`{{message}}\r
\r
<a class="cc-link"\r
   role=button\r
   href="{{href}}"\r
   rel="noopener noreferrer nofollow"\r
   target="{{target}}"\r
>\r
    {{link}}\r
</a>\r
`,k=`<button class="cc-btn cc-allow-all cc-w-100">\r
    {{allow-all}}\r
</button>\r
`,b=`<button class="cc-btn cc-allow">\r
    {{allow}}\r
</button>\r
`,y=`<button class="cc-btn cc-dismiss">\r
    {{dismiss}}\r
</button>\r
`,g=`<button class="cc-btn cc-deny">\r
    {{deny}}\r
</button>\r
`,w=`<button class="cc-btn cc-config" >\r
    {{config}}\r
</button>\r
`,m=`<div class="dp--revoke {{classes}}">\r
    <i class="dp--icon-fingerprint"></i>\r
    <span class="dp--hover">{{policy}}</span>\r
</div>\r
`,C=`<div class="dp--overlay-inner">\r
    <div class="dp--overlay-header">{{notice}}</div>\r
    <div class="dp--overlay-description">{{desc}}</div>\r
    <div class="dp--overlay-button">\r
        <button class="db--overlay-submit" onclick="window.DPCookieConsent.forceAccept(this)" data-cookieconsent="{{type}}">\r
            {{btn}}\r
        </button>\r
    </div>\r
</div>\r
`,x='<div aria-describedby="cookieconsent:desc" aria-label="cookieconsent" aria-live="polite" class="cc-window {{classes}}" id="cookieconsent:window" role="dialog"></div>',E=`<div aria-describedby="cookieconsent:config" aria-label="cookieconsent" aria-live="polite" class="cc-window-config cc-type-extend" id="cookieconsent:config" role="dialog">\r
    <div class="cc-config" >\r
        <div class="cc-config-header">\r
            <span>{{config-header}}</span>\r
            <button class="cc-btn-close">\r
                <i class="dp--icon-x"></i>\r
            </button>\r
        </div>\r
        <div class="cc-config-body">\r
            <div class="cc-message">{{message}}</div>\r
            <div>\r
                {{cookie-group}}\r
            </div>\r
        </div>\r
        <div class="cc-config-footer">\r
            {{deny}}\r
            {{allow}}\r
            {{allow-all}}\r
        </div>\r
    </div>\r
</div>\r
`,B=`<div class="cc-config-group">\r
    <div class="cc-config-group-name">\r
        <button class="cc-btn cc-btn-collapse">\r
            <i class="dp--icon-chevron"></i>\r
            {{group}}\r
        </button>\r
\r
        <div class="cc-form-switch">\r
            <input class="dp--check-box" id="dp--cookie-{{group-lower}}" type="checkbox" name="" value="">\r
            <label class="cc-check-label" for="dp--cookie-{{group-lower}}">\r
                <div class="cc-sr-only">{{group}}</div>\r
            </label>\r
        </div>\r
    </div>\r
\r
    <div class="cc-config-cookies">\r
        {{config-cookie}}\r
    </div>\r
</div>`,A=`<ul class="cc-config-group-cookie">\r
    <li>\r
        <div class="cc-label">{{cookie}}</div>\r
        <div>\r
            {{cookie_name}}\r
            <div class="cc-cookie-description cc-pt-2">{{cookie_description}}</div>\r
        </div>\r
    </li>\r
    <li class="cc-pt-2">\r
        <div class="cc-label">{{duration}}</div>\r
        <div>{{cookie_duration}} {{cookie_duration_time}}</div>\r
    </li>\r
    <li class="cc-pt-2">\r
        <div class="cc-label">{{vendor}}</div>\r
        <div><a href="{{cookie_vendor_link}}" target="_blank">{{cookie_vendor}}</a></div>\r
    </li>\r
</ul>\r
`;/*!
  * Cookie Consent
  * Copyright 2021 Dirk Persky (https://github.com/DirkPersky/npm-dp_cookieconsent/issues)
  * Licensed under AGPL v3+ (https://github.com/DirkPersky/npm-dp_cookieconsent/blob/master/LICENSE)
  */(function(i,q){if(!i.hasInitialised){(function(){if(typeof window.CustomEvent=="function")return!1;function s(o,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var t=document.createEvent("CustomEvent");return t.initCustomEvent(o,e.bubbles,e.cancelable,e.detail),t}s.prototype=window.Event.prototype,window.CustomEvent=s})(),function(){if(typeof window.Event=="function")return!1;function s(o,e){e=e||{bubbles:!0,cancelable:!0,detail:void 0};var t=document.createEvent("Event");return t.initEvent(o,e.bubbles,e.cancelable,e.detail),t}s.prototype=window.Event.prototype,window.Event=s}();var l={detectRobot:function(s){return new RegExp([/Chrome-Lighthouse/,/bot/,/spider/,/crawl/,/APIs-Google/,/AdsBot/,/Googlebot/,/mediapartners/,/Google Favicon/,/FeedFetcher/,/Google-Read-Aloud/,/DuplexWeb-Google/,/googleweblight/,/bing/,/yandex/,/baidu/,/duckduck/,/yahoo/,/ecosia/,/ia_archiver/,/semrush/].map(e=>e.source).join("|"),"i").test(s)},reformatCheckboxOptions:function(s){var o=Object.entries(s).map(e=>{var t=String(e[1]).toLowerCase()=="true";return{name:e[0],checked:t}});return o},getCookie:function(s){var o="; "+document.cookie,e=o.split("; "+s+"=");return e.length<2?void 0:JSON.parse(e.pop().split(";").shift())},setCookie:function(s,o,e,t,n,c){var r=new Date;r.setHours(r.getHours()+(e||365)*24);var a=[s+"="+JSON.stringify(o),"expires="+r.toUTCString(),"path="+(n||"/"),"SameSite=Strict"];t&&a.push("domain="+t),c&&a.push("secure"),document.cookie=a.join(";")},prepareCookie:function(s,o){var e={status:"open"},t=this.getCookie(o);return typeof t!="undefined"&&this.deepExtend(e,t),this.deepExtend(e,s),{exists:typeof t!="undefined",config:e}},getElementsByTag:function(s,o){return typeof o=="undefined"&&(o="data-cookieconsent"),document.querySelectorAll(s+"["+o+"]")},deepExtend:function(s,o){for(var e in o)o.hasOwnProperty(e)&&(e in s&&typeof s[e]=="object"&&typeof o[e]=="object"?this.deepExtend(s[e],o[e]):s[e]=o[e]);return s},appendElement:function(s,o){var e=document.createElement("div"),t=o!=null?o:document.body;e.innerHTML=this.replaceContent(s);var n=e.children[0];return t.appendChild(n),n},applyStyle:function(s){if(typeof this.options[s]!="undefined")for(const[o,e]of Object.entries(this.options[s]))for(const[t,n]of Object.entries(e))document.documentElement.style.setProperty(`--dp-cookie-${s}-${o}-${t}`,n)},fireEvent:function(s,o){var e;o?e=new CustomEvent(s,{detail:{$el:o}}):e=new Event(s),document.dispatchEvent(e)}};i.utils=l;var L=function(){var s={cookie:{name:"dp_cookieconsent_status",path:"/",domain:"",expiryDays:365,secure:!1},position:"bottom-right",content:{},theme:"edgeless",type:"opt-in",revokable:!0,reloadOnRevoke:!0,checkboxes:[{name:"statistics",checked:!1},{name:"marketing",checked:!1}],palette:{popup:{background:"rgba(0,0,0,0.8)",text:"#ffffff"},button:{background:"#f96332",text:"#ffffff"}},overlay:{notice:!0,box:{background:"rgba(0,0,0,0.8)",text:"#ffffff"},btn:{background:"#f96332",text:"#ffffff"}},onPopupOpen:function(){},onPopupClose:function(){},onInitialise:function(){},onStatusChange:function(e,t){},onRevokeChoice:function(){},compilance:{"opt-in":d,extend:f},revokeBtn:m,overlayLayout:C,wrap:{consent:x,config:E},elements:{"allow-all":k,allow:b,dismiss:y,deny:g,config:w,selection:h,description:v}};function o(){}return o.prototype.replaceContent=function(e){var t=this.options,n=["cc-"+t.position,"cc-type-"+t.type,"cc-theme-"+t.theme,"cc-hide"];e=e.replaceAll("{{classes}}",n.join(" "));for(const[c,r]of Object.entries(t.elements))e=e.replaceAll("{{"+c+"}}",r||"");for(const[c,r]of Object.entries(t.content))e=e.replaceAll("{{"+c+"}}",r||"");return e},o.prototype.templateOverwrites=function(){let e=i.utils.getElementsByTag("script","data-dp-cookieRevoke");e.length>0&&(this.options.revokeBtn=e[0].innerHTML);let t=i.utils.getElementsByTag("script","data-dp-cookieDesc");t.length>0&&(this.options.elements.description=t[0].innerHTML);let n=i.utils.getElementsByTag("script","data-dp-cookieSelect");n.length>0&&(this.options.elements.selection=n[0].innerHTML)},o.prototype.initialise=function(e){l.deepExtend(this.options={},s),typeof e.checkboxes=="object"&&(e.checkboxes=l.reformatCheckboxOptions(e.checkboxes)),typeof e=="object"&&l.deepExtend(this.options,e);var t=this.options.onInitialise.bind(this);this.templateOverwrites(),this.options.revokable&&(this.revokeBtn=i.utils.appendElement.call(this,this.options.revokeBtn)),this.window=i.utils.appendElement.call(this,this.options.wrap.consent),this.options.type=="extend"&&i.configWindow.initialise(this.options.wrap.config),i.utils.applyStyle.call(this,"palette"),i.utils.applyStyle.call(this,"overlay"),this.addCompilance(this.window),t(this),this.bindBtns(),this.presetCheckboxes()},o.prototype.presetCheckboxes=function(){var e=i.utils.getCookie(this.options.cookie.name);typeof e!="undefined"&&l.deepExtend(this.options.checkboxes,e.checkboxes);var t=this.getCheckboxInputs(!0);t.length>0&&t.forEach(n=>{var c=n.id;c=c.replace("dp--cookie-",""),this.options.checkboxes.map((r,a)=>{r.name==c&&(n.checked=r.checked)}),c=="required"&&(n.checked=!0,n.disabled=!0)})},o.prototype.addCompilance=function(e){var t=this.options.compilance["opt-in"];typeof this.options.compilance[this.options.type]!="undefined"&&(t=this.options.compilance[this.options.type]),this.compilance=i.utils.appendElement.call(this,t,e),this.allowAllBtn=this.compilance.getElementsByClassName("cc-allow-all"),this.allowBtn=this.compilance.getElementsByClassName("cc-allow"),this.denyBtn=this.compilance.getElementsByClassName("cc-deny"),this.dismissBtn=this.compilance.getElementsByClassName("cc-dismiss"),this.configBtn=this.compilance.querySelector("button.cc-config")},o.prototype.bindBtns=function(){this.allowAllBtn.length>0&&(this.allowAllBtn[0].onclick=()=>this.allowAll.call(this)),this.allowBtn.length>0&&(this.allowBtn[0].onclick=()=>this.allow.call(this)),this.dismissBtn.length>0&&(this.dismissBtn[0].onclick=()=>this.allow.call(this)),this.denyBtn.length>0&&(this.denyBtn[0].onclick=()=>this.denyAll.call(this)),this.revokeBtn&&(this.revokeBtn.onclick=()=>this.revoke.call(this)),this.configBtn&&(this.configBtn.onclick=()=>i.configWindow.showConfig())},o.prototype.allowAll=function(){this.saveCheckboxes(!0),i.utils.fireEvent("dp--cookie-accept"),this.save()},o.prototype.denyAll=function(){this.saveCheckboxes(!1),i.utils.fireEvent("dp--cookie-deny"),this.save()},o.prototype.allow=function(){i.utils.fireEvent("dp--cookie-accept"),this.save()},o.prototype.getCheckboxInputs=function(e){var t=document.querySelectorAll('input[id^="dp--cookie-"]');if(e)return t;var n=[];return t.forEach(c=>{var r=c.id;switch(r=r.replace("dp--cookie-",""),r){case"required":break;default:n.push(c)}}),n},o.prototype.saveCheckboxes=function(e){var t=this.getCheckboxInputs();t.length>0&&t.forEach(n=>{var c=n.id;c=c.replace("dp--cookie-",""),typeof e!="undefined"&&(n.checked=e);var r=this.options.checkboxes.map((a,p)=>{if(a.name==c)return this.options.checkboxes[p].checked=n.checked,!0}).filter(a=>a);r.length||this.options.checkboxes.push({name:c,checked:n.checked})})},o.prototype.save=function(){this.saveCheckboxes(),this.close()},o.prototype.hasChanged=function(){var e=!1;return typeof this.originalCookie=="undefined"||typeof this.originalCookie.checkboxes=="undefined"?!1:(this.originalCookie.checkboxes.map((t,n)=>{var c=this.options.checkboxes[n];if(t.checked===!0&&(!c||c.checked==!1)){e=!0;var r=this.options.onStatusChange.bind(this);r(c,t)}}),e)},o.prototype.hasConsent=function(){var e=i.utils.getCookie(this.options.cookie.name);return!(typeof e=="undefined"||e.status=="open")},o.prototype.saveCookie=function(e){var t=i.utils.prepareCookie(e,this.options.cookie.name);!t.exists&&t.config.status=="open"||(i.utils.setCookie(this.options.cookie.name,t.config,this.options.cookie.expiryDays,this.options.cookie.domain,this.options.cookie.path,this.options.cookie.secure),this.hasConsent()&&this.hasChanged()&&this.options.reloadOnRevoke&&location.reload())},o.prototype.revoke=function(){var e=this.options.onRevokeChoice.bind(this);e(this),i.utils.fireEvent("dp--cookie-revoke"),this.open()},o.prototype.open=function(){this.revokeBtn&&this.revokeBtn.classList.add("cc-hide"),this.showPopup(),this.originalCookie=i.utils.getCookie(this.options.cookie.name);var e=this.options.onPopupOpen.bind(this);e(this),this.saveCookie({status:"open"}),document.querySelector("body").classList.add("dp--cookie-consent")},o.prototype.hidePopup=function(){this.window.classList.add("cc-hide")},o.prototype.showPopup=function(){this.window.classList.remove("cc-hide")},o.prototype.close=function(){this.hidePopup(),i.configWindow.closeConfig(),this.revokeBtn&&this.revokeBtn.classList.remove("cc-hide");var e=this.options.onPopupClose.bind(this);e(this),this.saveCookie({status:"approved",checkboxes:this.options.checkboxes}),document.querySelector("body").classList.remove("dp--cookie-consent"),this.execute()},o.prototype.execute=function(){i.Handler.execute(this.options.checkboxes),i.Overlay.execute(this.options.checkboxes)},new o}();i.popup=L;var S=function(){function s(){}return s.prototype.overlays=function(){i.popup.options.overlay.notice&&(this.templateOverwrites(),this.overlaysView("iframe"),this.overlaysView("dp-content"))},s.prototype.templateOverwrites=function(){let o=i.utils.getElementsByTag("script","data-dp-cookieIframe");o.length>0&&(i.popup.options.overlayLayout=o[0].innerHTML)},s.prototype.overlaysView=function(o){var e=i.utils.getElementsByTag(o);e.length!=0&&e.forEach(t=>{var n=t.getAttribute("data-cookieconsent-notice")||i.popup.options.content.media.notice,c=t.getAttribute("data-cookieconsent-description")||i.popup.options.content.media.desc,r=t.getAttribute("data-cookieconsent-btn")||i.popup.options.content.media.btn,a=t.getAttribute("data-cookieconsent");if(!t.hasAttribute("data-cookieconsent-overlay-loaded")){t.setAttribute("data-cookieconsent-overlay-loaded","loaded");var p=document.createElement("div");p.classList.add("dp--overlay");var u=i.popup.options.overlayLayout.replace("{{notice}}",n).replace("{{desc}}",c).replace("{{type}}",a).replace("{{btn}}",r);u=i.utils.appendElement.call(i.popup,u,p),u.getElementsByClassName("db--overlay-submit"),t.parentNode.insertBefore(p,t.nextSibling)}})},s.prototype.execute=function(o){this.executeIframe(o),this.executeContent(o)},s.prototype.ajax=function(o,e,t,n){var c=new XMLHttpRequest;c.open(o,e),c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("Content-type","text/html"),c.onload=function(){c.status<200||c.status>=300?n(c):t(c)},c.onerror=function(){n(c)},c.send()},s.prototype.executeContent=function(o){var e=i.utils.getElementsByTag("dp-content");e.length>0&&e.forEach(t=>{if(i.Handler.typeAllowed(t,o)){t.classList.add("dp--loaded"),t.setAttribute("data-cookieconsent-loaded",t.getAttribute("data-cookieconsent")),t.removeAttribute("data-cookieconsent");var n=t.getAttribute("data-src");n&&n.length>0?this.ajax("GET",n,function(c){t.innerHTML=c.response,i.utils.fireEvent("dp--cookie-content",t)},function(c){}):i.utils.fireEvent("dp--cookie-content",t)}})},s.prototype.executeIframe=function(o){var e=i.utils.getElementsByTag("iframe");e.length>0&&e.forEach(t=>{if(i.Handler.typeAllowed(t,o)){var n=t.cloneNode(!0);n.getAttribute("data-src")&&(n.src=n.getAttribute("data-src")),t.parentNode.replaceChild(n,t),n.classList.add("dp--loaded"),n.setAttribute("data-cookieconsent-loaded",n.getAttribute("data-cookieconsent")),n.removeAttribute("data-cookieconsent"),i.utils.fireEvent("dp--cookie-iframe",n)}})},new s}();i.Overlay=S;var O=function(){function s(){}return s.prototype.execute=function(o){var e=i.utils.getElementsByTag("script");e.length>0&&e.forEach(t=>{if(this.typeAllowed(t,o)){var n=t.innerHTML;n&&n.length&&(n=n.trim()),n&&n.length?(eval.call(this,n),i.utils.fireEvent("dp--cookie-fire",t)):t.getAttribute("data-src")?this.asyncJS(t.getAttribute("data-src"),function(c){i.utils.fireEvent("dp--cookie-fire",t)}):t.src&&this.asyncJS(t.src,function(c){i.utils.fireEvent("dp--cookie-fire",t)}),t.setAttribute("data-cookieconsent-loaded",t.getAttribute("data-cookieconsent")),t.removeAttribute("data-cookieconsent")}})},s.prototype.asyncLoad=function(o,e,t){var n=document,c=n.createElement(e),r=n.getElementsByTagName(e)[0];switch(e){case"script":c.src=o,c.setAttribute("defer","");break;case"link":c.rel="stylesheet",c.type="text/css",c.setAttribute("defer",""),c.href=o;break}t&&c.addEventListener("load",function(a){t(null,a)},!1),r.parentNode.insertBefore(c,r)},s.prototype.asyncJS=function(o,e){this.asyncLoad(o,"script",e)},s.prototype.typeAllowed=function(o,e){var t=o.getAttribute("data-cookieconsent"),n=e.map(c=>{if(c.name==t&&c.checked===!0)return!0});return n.indexOf(!0)!==-1},new s}();i.Handler=O,i.initialise=function(s,o){if(o||(o=function(){}),i.popup.initialise(s),i.Overlay.overlays(),o(i.popup),i.utils.fireEvent("dp--cookie-init"),i.popup.hasConsent()||l.detectRobot(navigator.userAgent)){i.popup.close(),i.utils.fireEvent("dp--cookie-accept-init");return}i.popup.open()};var H=function(){function s(){}return s.prototype.initialise=function(o){this.prepareConfig(),this.configWrap=i.utils.appendElement.call(i.popup,o),this.getElements(),this.bindBtns()},s.prototype.prepareConfig=function(){var o=i.popup.options,e=o.cookies.map(t=>{var n=t.cookies.map(c=>(this.options=i.utils.deepExtend({elements:{},content:c},o),i.popup.replaceContent.call(this,A))).join("");return this.options=i.utils.deepExtend({elements:{"config-cookie":n},content:{group:t.name,"group-lower":t.field}},o),i.popup.replaceContent.call(this,B)}).join("");i.popup.options.elements["cookie-group"]=e},s.prototype.getElements=function(){this.closeBtn=this.configWrap.querySelector("button.cc-btn-close"),this.allowAllBtn=this.configWrap.querySelector("button.cc-allow-all"),this.allowBtn=this.configWrap.querySelector("button.cc-allow"),this.denyBtn=this.configWrap.querySelector("button.cc-deny"),this.configGroups=this.configWrap.querySelectorAll(".cc-config-group")},s.prototype.bindBtns=function(){this.allowAllBtn&&(this.allowAllBtn.onclick=()=>i.popup.allowAll(this)),this.allowBtn&&(this.allowBtn.onclick=()=>i.popup.allow(this)),this.denyBtn&&(this.denyBtn.onclick=()=>i.popup.denyAll(this)),this.closeBtn&&(this.closeBtn.onclick=()=>this.hideConfig.call(this)),this.configGroups&&this.configGroups.forEach(o=>{o.querySelector(".cc-btn-collapse").onclick=()=>{var e=!o.classList.contains("cc-show");this.configGroups.forEach(t=>t.classList.remove("cc-show")),e&&o.classList.add("cc-show")}})},s.prototype.closeConfig=function(){this.configWrap&&this.configWrap.classList.remove("cc-show")},s.prototype.hideConfig=function(){i.popup.showPopup(),this.configWrap&&this.closeConfig()},s.prototype.showConfig=function(){this.configWrap&&this.configWrap.classList.add("cc-show"),i.popup.hidePopup()},new s}();i.configWindow=H,i.forceAccept=function(s){var o=s.getAttribute("data-cookieconsent"),e=i.popup.getCheckboxInputs();console.log(e),e.length>0&&(e.forEach(t=>{var n=t.id;n=n.replace("dp--cookie-",""),i.popup.hasConsent()||(t.checked=!1),n==o&&(t.checked=!0)}),i.utils.fireEvent("dp--cookie-accept")),i.popup.save()},i.forceDeny=function(s){var o=s.getAttribute("data-cookieconsent"),e=i.popup.getCheckboxInputs();e.length>0&&e.forEach(t=>{var n=t.id;n=n.replace("dp--cookie-",""),i.popup.hasConsent()||(t.checked=!1),n==o&&(t.checked=!1)}),i.popup.save()},i.hasInitialised=!0,window.DPCookieConsent=i,window.addEventListener("load",function(){window.DPCookieConsent.initialise(window.cookieconsent_options||{}),window.DPCookieConsent.loaded=!0})}})(window.DPCookieConsent||{})});
