/*!
  * Cookie Consent Adapter
  * Copyright 2018 Dirk Persky (https://github.com/DirkPersky/typo3-dp_cookieconsent)
  * Licensed under GPL v3+ (https://github.com/DirkPersky/typo3-dp_cookieconsent/blob/master/LICENSE)
  */
window.addEventListener("load", function () {
    function CookieConsent() {
        this.cookie_name = 'dp_cookieconsent_status';
        this.cookie = {
            // This is the url path that the cookie 'name' belongs to. The cookie can only be read at this location
            path: '/',
            // This is the domain that the cookie 'name' belongs to. The cookie can only be read on this domain.
            //  - Guide to cookie domains - https://www.mxsasha.eu/blog/2014/03/04/definitive-guide-to-cookie-domains/
            domain: '',
            // The cookies expire date, specified in days (specify -1 for no expiry)
            expiryDays: 365,
            // If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS.
            secure: false
        };
    }

    /** Async Load Ressources **/
    CookieConsent.prototype.asyncLoad = function (u, t, c) {
        var d = document,
            o = d.createElement(t),
            s = d.getElementsByTagName(t)[0];

        switch (t) {
            case 'script':
                o.src = u;
                o.setAttribute('defer', '');
                break;
            case 'link':
                o.rel = 'stylesheet';
                o.type = 'text/css';
                o.setAttribute('defer', '');
                o.href = u;
                break;
        }
        if (c) {
            o.addEventListener('load', function (e) {
                c(null, e);
            }, false);
        }
        s.parentNode.insertBefore(o, s);
    };
    /** Async Load Helper for JS **/
    CookieConsent.prototype.asyncJS = function (u, c) {
        this.asyncLoad(u, 'script', c);
    };
    /** Async Load Helper for CSS **/
    CookieConsent.prototype.asyncCSS = function (u) {
        this.asyncLoad(u, 'link');
    };
    /** Callback after cookies are allowed **/
    CookieConsent.prototype.loadCookies = function () {
        /** Get all Scripts to load **/
        var elements = [];
        if (typeof document.querySelectorAll == 'undefined') {
            elements = document.querySelectorAll('script[data-cookieconsent]');
        } else {
            var temp = document.getElementsByTagName('script');
            for (var key in temp) {
                var element = temp[key];
                if (typeof element.getAttribute != 'undefined' && element.getAttribute('data-cookieconsent')) {
                    elements.push(element);
                }
            }
            temp = null;
        }
        if (elements.length > 0) {
            /** Loop through elements and run Code **/
            for (var key in elements) {
                /** get HTML of Elements **/
                var code = elements[key].innerHTML;
                /** trim Elements **/
                if (code && code.length) code = code.trim();
                /** Chekbox Access check **/
                if (window.cookieconsent_options.layout === 'dpextend') {
                    var group = elements[key].dataset.cookieconsent;
                    if(group != 'rquired') {
                        // load cookies
                        this.loadCookiesPreset();
                        // check if value exist
                        if( !this.dpCookies.hasOwnProperty('dp--cookie-'+group) || this.dpCookies['dp--cookie-'+group] !== true) {
                            // abort script
                            continue;
                        }
                    }
                }
                /** run Code it something in in it **/
                if (code && code.length) {
                    /** if Is Code Eval Code **/
                    eval.call(this, code);
                } else {
                    /** If is SRC load that **/
                    var element = elements[key];
                    /**
                     * Load SRC
                     * Dont use this src="", becouse some Browser will ignore the type=text/plain
                     * prefer use data-src=""
                     */
                    if (element.getAttribute('data-src')) {
                        this.asyncJS(element.getAttribute('data-src'));
                    } else if (element.src) {
                        this.asyncJS(element.src);
                    }
                }
            }
        }

    };
    /** load Scripts **/
    CookieConsent.prototype.load = function () {
        /** Start Loading Scripts & CSS **/
        this.asyncCSS(window.cookieconsent_options.css);
        /** Lood own CSS extends **/
        if (window.cookieconsent_options.layout == 'dpextend') this.asyncCSS(window.cookieconsent_options.dpCSS);
        /** Load Javascript **/
        this.asyncJS(window.cookieconsent_options.js, this.init);
    };
    /** Toogle Body Class **/
    CookieConsent.prototype.setClass = function (remove) {
        if (remove === true) {
            document.querySelector('body').classList.remove('dp--cookie-consent');
        } else {
            document.querySelector('body').classList.add('dp--cookie-consent');
        }
    };
    /** Checkbox Handling **/
    CookieConsent.prototype.setCheckboxes = function () {
        if (window.cookieconsent_options.layout != 'dpextend') return;
        // load checkboxes
        var statistik = this.loadCheckbox('dp--cookie-statistics'),
            marketing = this.loadCheckbox('dp--cookie-marketing');
        // save Cookie Values
        this.saveCookie([statistik, marketing]);
    };
    CookieConsent.prototype.loadCheckboxes = function () {
        if (window.cookieconsent_options.layout != 'dpextend') return;
        // load cookies
        this.loadCookiesPreset();
        // load Checkboxes and set default values
        var statistik = this.loadCheckbox('dp--cookie-statistics', true),
            marketing = this.loadCheckbox('dp--cookie-marketing', true);

    };
    /** Save checkbox values to Cookie**/
    CookieConsent.prototype.saveCookie = function (values) {
        var object = {};
        // build Store object
        values.map(function (e) {
            object[e.id] = e.checked;
        });
        // save script selection
        window.cookieconsent.utils.setCookie(
            this.cookie_name,
            JSON.stringify(object),
            this.cookie.expiryDays,
            this.cookie.domain,
            this.cookie.path,
            this.cookie.secure
        );

    };
    /** Load Cookies **/
    CookieConsent.prototype.loadCookiesPreset = function(){
        if( this.dpCookies != false) this.dpCookies = window.cookieconsent.utils.getCookie(this.cookie_name);
        if (typeof this.dpCookies != 'undefined') {
            try {
                this.dpCookies = JSON.parse(this.dpCookies);
            } catch(error) {
                this.dpCookies = false;
            }
        } else {
            this.dpCookies = false;
        }
    };
    /** Load Checkboxes by name and fill Cookie value**/
    CookieConsent.prototype.loadCheckbox = function (id, cookieLoad) {
        var checkbox = document.getElementById(id);
        // load Cookie Value
        if (cookieLoad === true) {
            // get checkbox Value
            if(this.dpCookies && this.dpCookies.hasOwnProperty(id)) {
                checkbox.checked = this.dpCookies[id];
            }
        }
        // return element
        return checkbox;
    };
    /** Init Cookie Plugin **/
    CookieConsent.prototype.init = function () {
        /** Bind Self to Handler Class Funktions **/
        window.cookieconsent.initialise({
            content: window.cookieconsent_options.content,
            theme: window.cookieconsent_options.theme,
            position: window.cookieconsent_options.position,
            palette: window.cookieconsent_options.palette,
            dismissOnScroll: window.cookieconsent_options.dismissOnScroll,
            type: window.cookieconsent_options.type,
            layout: window.cookieconsent_options.layout,
            revokable: window.cookieconsent_options.revokable,
            cookie: (new CookieConsent()).cookie,
            layouts: {
                dpextend: "{{dpmessagelink}}{{compliance}}",
            },
            elements: {
                dpmessagelink: '<span id="cookieconsent:desc" class="cc-message">' +
                    '{{message}} ' +
                    '<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a>' +
                    '<div class="dp--cookie-check">' +
                        '<label for="dp--cookie-require"><input type="checkbox" id="dp--cookie-require" class="dp--check-box" disabled="disabled" checked="checked"> {{dpRequire}}</label>' +
                        '<label for="dp--cookie-statistics"><input type="checkbox" id="dp--cookie-statistics" class="dp--check-box" checked="checked"> {{dpStatistik}}</label>' +
                        '<label for="dp--cookie-marketing"><input type="checkbox" id="dp--cookie-marketing" class="dp--check-box" > {{dpMarketing}}</label>' +
                    '</div>' +
                    '</span>',
            },

            onPopupOpen: function () {
                // set Body Class
                (new CookieConsent()).setClass();
                // load Checkboxes
                (new CookieConsent()).loadCheckboxes();
            },
            onPopupClose: function () {
                // remove Body Class
                (new CookieConsent()).setClass(true);
            },
            onInitialise: function (status) {
                if (this.hasConsented() && (status == 'dismiss' || status == 'allow')) (new CookieConsent()).loadCookies();
            },
            onStatusChange: function (status) {
                // save checkboxes?
                (new CookieConsent()).setCheckboxes();
                // load cookies
                if (this.hasConsented() && (status == 'dismiss' || status == 'allow')) (new CookieConsent()).loadCookies();
                // Remove the Node from HTML
                //if (window.cookieconsent_options.type == 'info' && !window.cookieconsent_options.revokable) this.element.parentNode.removeChild(this.element);
            },
            onRevokeChoice: function () {
            }
        });
    };
    /** Init Handler **/
    var cookieHandler = new CookieConsent();
    /** Start Script Handling **/
    cookieHandler.load();
});
