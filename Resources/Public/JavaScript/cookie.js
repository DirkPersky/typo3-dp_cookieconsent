/*!
  * Cookie Consent Adapter
  * Copyright 2018 Dirk Persky (https://github.com/DirkPersky/typo3-dp_cookieconsent)
  * Licensed under GPL v3+ (https://github.com/DirkPersky/typo3-dp_cookieconsent/blob/master/LICENSE)
  */
window.addEventListener("load", function () {
    function CookieConsent(){}
    /** Async Load Ressources **/
    CookieConsent.prototype.asyncLoad = function(u, t, c){
        var d = document,
            o = d.createElement(t),
            s = d.getElementsByTagName(t)[0];

        switch (t){
            case 'script':
                o.src = u;
                o.setAttribute('defer','');
                break;
            case 'link':
                o.rel = 'stylesheet';
                o.type = 'text/css';
                o.setAttribute('defer','');
                o.href = u;
                break;
        }
        if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
        s.parentNode.insertBefore(o, s);
    };
    /** Async Load Helper for JS **/
    CookieConsent.prototype.asyncJS = function(u, c){
        this.asyncLoad(u, 'script', c);
    };
    /** Async Load Helper for CSS **/
    CookieConsent.prototype.asyncCSS = function(u){
        this.asyncLoad(u, 'link');
    };
    /** Callback after cookies are allowed **/
    CookieConsent.prototype.loadCookies = function(){
        /** Get all Scripts to load **/
        var elements = [];
        if(typeof document.querySelectorAll == 'undefined') {
            elements = document.querySelectorAll('script[data-cookieconsent]');
        } else {
            var temp = document.getElementsByTagName('script');
            for(var key in temp) {
                var element = temp[key];
                if(typeof element.getAttribute != 'undefined' && element.getAttribute('data-cookieconsent')) {
                    elements.push(element);
                }
            }
            temp = null;
        }
        if(elements.length > 0){
            /** Loop through elements and run Code **/
            for(var key in elements){
                /** get HTML of Elements **/
                var code = elements[key].innerHTML;
                /** trim Elements **/
                if(code && code.length) code = code.trim();
                /** run Code it something in in it **/
                if(code && code.length) {
                    /** if Is Code Eval Code **/
                    eval.call(this,code);
                } else {
                    /** If is SRC load that **/
                    var element = elements[key];
                    /**
                     * Load SRC
                     * Dont use this src="", becouse some Browser will ignore the type=text/plain
                     * prefer use data-src=""
                     */
                    if(element.getAttribute('data-src')) {
                        this.asyncJS(element.getAttribute('data-src'));
                    } else if(element.src) {
                        this.asyncJS(element.src);
                    }
                }
            }
        }

    };
    /** load Scripts **/
    CookieConsent.prototype.load = function(){
        /** Start Loading Scripts & CSS **/
        this.asyncCSS( window.cookieconsent_options.css);
        this.asyncJS( window.cookieconsent_options.js, this.init);
    };
    /** Init Cookie Plugin **/
    CookieConsent.prototype.init = function (){
        /** Bind Self to Handler Class Funktions **/
        window.cookieconsent.initialise({
            content: window.cookieconsent_options.content,
            theme: window.cookieconsent_options.theme,
            position: window.cookieconsent_options.position,
            palette: window.cookieconsent_options.palette,
            dismissOnScroll: window.cookieconsent_options.dismissOnScroll,
            type: window.cookieconsent_options.type,
            onInitialise: function(status) {
                if(this.hasConsented() && (status == 'dismiss' || status == 'allow')) (new CookieConsent()).loadCookies();
            },
            onStatusChange: function (status) {
                if(this.hasConsented() && (status == 'dismiss' || status == 'allow')) (new CookieConsent()).loadCookies();
                // Remove the Node from HTML
                if(window.cookieconsent_options.type == 'info') this.element.parentNode.removeChild(this.element);
            }
        });
    };
    /** Init Handler **/
    var cookieHandler = new CookieConsent();
    /** Start Script Handling **/
    cookieHandler.load();
});
