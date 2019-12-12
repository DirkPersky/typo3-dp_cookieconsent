/*!
  * Cookie Consent Adapter
  * Copyright 2019 Dirk Persky (https://github.com/DirkPersky/typo3-dp_cookieconsent)
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
        // checkboxes
        this.checkboxes = [
            'statistics',
            'marketing'
        ];
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
    /** fallback: getElementsByTagName **/
    CookieConsent.prototype.getCookieElementsByTag = function (tag, selector) {
        if(typeof selector == 'undefined') selector = 'data-cookieconsent';
        // element holder
        var elements = [];
        // check browser function
        if (typeof document.querySelectorAll == 'undefined') {
            elements = document.querySelectorAll(tag + '['+selector+']');
        } else {
            // fallback
            var temp = document.getElementsByTagName(tag);
            for (var key in temp) {
                var element = temp[key];
                if (typeof element.getAttribute != 'undefined' && element.getAttribute(selector)) {
                    elements.push(element);
                }
            }
        }
        // return elements
        return elements;
    };
    /**
     * Load Iframes
     * @param element
     */
    CookieConsent.prototype.callIframeHandler = function (element) {
        /**
         * Create Element Copy
         * @type {ActiveX.IXMLDOMNode | Node}
         */
        var iframe = element.cloneNode(true);
        // replace src with data-src
        if (iframe.getAttribute('data-src')) {
            iframe.src = iframe.getAttribute('data-src');
        }
        // add Element to DOM
        element.parentNode.replaceChild(iframe, element);
        // add Loaded class
        iframe.classList.add("dp--loaded");
        // override attribute to only load once
        iframe.setAttribute('data-cookieconsent-loaded', iframe.getAttribute('data-cookieconsent'));
        iframe.removeAttribute('data-cookieconsent');
        /** call Inline Event **/
        window.DPCookieConsent.fireEvent('dp--cookie-iframe', iframe);
    };
    /**
     * Load Script codes
     * @param element
     */
    CookieConsent.prototype.callScriptHandler = function (element) {
        /** get HTML of Elements **/
        var code = element.innerHTML;
        /** trim Elements **/
        if (code && code.length) code = code.trim();
        /** run Code it something in in it **/
        if (code && code.length) {
            /** if Is Code Eval Code **/
            eval.call(this, code);
            /** call Inline Event **/
            window.DPCookieConsent.fireEvent('dp--cookie-fire', element);
        } else {
            /**
             * If is SRC load that
             * Dont use this src="", becouse some Browser will ignore the type=text/plain
             * prefer use data-src=""
             */
            if (element.getAttribute('data-src')) {
                this.asyncJS(element.getAttribute('data-src'), function(e){
                    window.DPCookieConsent.fireEvent('dp--cookie-fire', element);
                });
            } else if (element.src) {
                this.asyncJS(element.src, function(e){
                    window.DPCookieConsent.fireEvent('dp--cookie-fire', element);
                });
            }
        }
        // override attribute to only load once
        element.setAttribute('data-cookieconsent-loaded', element.getAttribute('data-cookieconsent'));
        element.removeAttribute('data-cookieconsent');
    };
    /** Callback after cookies are allowed **/
    CookieConsent.prototype.loadCookies = function () {
        /** Get all Scripts to load **/
        var elements = this.getCookieElementsByTag('script');
        // load Iframes
        elements = elements.concat(this.getCookieElementsByTag('iframe'));
        // elements exist?
        if (elements.length > 0) {
            var key;
            /** Loop through elements and run Code **/
            for (key = 0; key < elements.length; key++) {
                /** Chekbox Access check **/
                if (window.cookieconsent_options.layout === 'dpextend') {
                    var group = elements[key].getAttribute('data-cookieconsent');
                    if (group != 'required') {
                        // load cookies
                        this.loadCookiesPreset();
                        // check if value exist
                        if (!this.dpCookies.hasOwnProperty('dp--cookie-' + group) || this.dpCookies['dp--cookie-' + group] !== true) {
                            // abort script
                            continue;
                        }
                    }
                }
                /**
                 * check tag name
                 */
                if (typeof elements[key].tagName != 'undefined') {
                    /**
                     * Call Handler based on type
                     */
                    switch (elements[key].tagName.toUpperCase()) {
                        case 'IFRAME':
                            this.callIframeHandler(elements[key]);
                            break;
                        default:
                            this.callScriptHandler(elements[key]);
                    }
                }
            }
        }
    };
    /** load Scripts **/
    CookieConsent.prototype.load = function () {
        /** Start Loading Scripts & CSS **/
        this.asyncCSS(window.cookieconsent_options.css);
        /** Load own CSS extends **/
        if (window.cookieconsent_options.layout == 'dpextend' || window.cookieconsent_options.overlay.notice) {
            this.asyncCSS(window.cookieconsent_options.dpCSS);
        }
        /** init checkbox configuration **/
        if (window.cookieconsent_options.layout == 'dpextend') {
            this.initCheckboxes();
        }
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

    /** Load initial checkbox types from configuration **/
    CookieConsent.prototype.initCheckboxes = function () {
        if (typeof window.cookieconsent_options.checkboxes !== "object") return;

        var me = this;

        me.checkboxes = [];
        for (var key in window.cookieconsent_options.checkboxes) {
            me.checkboxes.push(key)
        }
    };

    /** Checkbox Handling **/
    CookieConsent.prototype.setCheckboxes = function () {
        if (window.cookieconsent_options.layout != 'dpextend') return;
        var me = this;
        // load checkboxes
        var checkboxes = me.checkboxes.map(function (checkbox) {
            return me.loadCheckbox('dp--cookie-' + checkbox);
        });
        +
            // save Cookie Values
            this.saveCookie(checkboxes);
    };
    /** load checkboyes from cookie **/
    CookieConsent.prototype.loadCheckboxes = function () {
        if (window.cookieconsent_options.layout != 'dpextend') return;
        var me = this;
        // load cookies
        me.loadCookiesPreset();
        // load Checkboxes and set default values
        me.checkboxes.map(function (checkbox) {
            me.loadCheckbox('dp--cookie-' + checkbox, true);
        });
    };
    /** Save checkbox values to Cookie **/
    CookieConsent.prototype.saveCookie = function (values) {
        var object = {};
        // build Store object
        values.map(function (e) {
            object[e.id] = e.checked;
        });
        // save value to local
        this.dpCookies = values;
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
    CookieConsent.prototype.loadCookiesPreset = function () {
        if (this.dpCookies != false) this.dpCookies = window.cookieconsent.utils.getCookie(this.cookie_name);
        if (typeof this.dpCookies != 'undefined') {
            try {
                this.dpCookies = JSON.parse(this.dpCookies);
            } catch (error) {
                this.dpCookies = false;
            }
        } else {
            this.dpCookies = false;
        }
    };
    /** Load Checkboxes by name and fill Cookie value**/
    CookieConsent.prototype.loadCheckbox = function (id, cookieLoad, override) {
        var checkbox = document.getElementById(id);
        // load Cookie Value
        if (cookieLoad === true) {
            // get checkbox Value
            if (this.dpCookies && this.dpCookies.hasOwnProperty(id)) {
                checkbox.checked = this.dpCookies[id];
            }
        } else if (typeof override != "undefined") {
            checkbox.checked = override;
        }
        // return element
        return checkbox;
    };
    /** Init Cookie Plugin **/
    CookieConsent.prototype.init = function () {
        var me = this;
        /**
         * Add Content HTML
         */
        window.cookieconsent_options.content.cookieDesc = DPCookieConsent.getCookieElementsByTag('script', 'data-dp-cookieDesc')[0].innerHTML;
        window.cookieconsent_options.content.cookieSelect = DPCookieConsent.getCookieElementsByTag('script', 'data-dp-cookieSelect')[0].innerHTML;
        window.cookieconsent_options.content.revokeBtn = DPCookieConsent.getCookieElementsByTag('script', 'data-dp-cookieRevoke')[0].innerHTML;
        /** Bind Self to Handler Class Funktions **/
        var options = {
            autoOpen: window.cookieconsent_options.autoOpen,
            content: window.cookieconsent_options.content,
            theme: window.cookieconsent_options.theme,
            position: window.cookieconsent_options.position,
            palette: window.cookieconsent_options.palette,
            dismissOnScroll: window.cookieconsent_options.dismissOnScroll,
            type: window.cookieconsent_options.type,
            layout: window.cookieconsent_options.layout,
            revokable: window.cookieconsent_options.revokable,
            cookie: window.DPCookieConsent.cookie,
            layouts: {
                dpextend: "{{dpmessagelink}}{{compliance}}",
            },
            elements: {
                messagelink: '<span id="cookieconsent:desc" class="cc-message">{{cookieDesc}}</span>',
                dpmessagelink: '<span id="cookieconsent:desc" class="cc-message">' +
                    '{{cookieDesc}}' +
                    '{{cookieSelect}}' +
                    '</span>',
                'allow-all': '<a aria-label="dismiss cookies" role=button tabindex="0"  class="cc-btn cc-dismiss">{{allow-all}}</a>',
            },
            revokeBtn: window.cookieconsent_options.content.revokeBtn,
            compliance: {
                'opt-in':
                    '<div class="cc-compliance cc-highlight">{{allow}}{{allow-all}}</div>',
            },

            onPopupOpen: function () {
                // set Body Class
                window.DPCookieConsent.setClass();
                // load Checkboxes
                window.DPCookieConsent.loadCheckboxes();
            },
            onPopupClose: function () {
                // remove Body Class
                window.DPCookieConsent.setClass(true);
            },
            onInitialise: function (status) {
                if (this.hasConsented() && (status == 'dismiss' || status == 'allow')){
                    window.DPCookieConsent.loadCookies();
                    window.DPCookieConsent.fireEvent('dp--cookie-accept-init');
                }
            },
            onStatusChange: function (status) {
                // set all checkboxes
                if (window.cookieconsent_options.type == 'opt-in' &&
                    window.cookieconsent_options.layout === 'dpextend' &&
                    status == 'dismiss'
                ) {
                    var checkboxes = window.DPCookieConsent.checkboxes;
                    // loop checkboxes
                    checkboxes.map(function (checkbox) {
                        // set checkboxes to true
                        window.DPCookieConsent.loadCheckbox('dp--cookie-' + checkbox, false, true);
                    })
                }
                // save checkboxes?
                window.DPCookieConsent.setCheckboxes();
                // load cookies
                if (this.hasConsented() && (status == 'dismiss' || status == 'allow')) {
                    window.DPCookieConsent.loadCookies();
                    window.DPCookieConsent.fireEvent('dp--cookie-accept');
                } else {
                    window.DPCookieConsent.fireEvent('dp--cookie-deny');
                }
            },
            onRevokeChoice: function () {
                window.DPCookieConsent.fireEvent('dp--cookie-revoke');
            }
        };
        // Bind Popup Event
        var complete = function (popup) {
            // store popup
            window.DPCookieConsent.setPopup(popup);
            // init overlays
            window.DPCookieConsent.overlays();
            // fire event when the initialization process is completed
            window.DPCookieConsent.fireEvent('dp--cookie-init');
        };
        // init Consent
        window.cookieconsent.initialise(options, complete);
    };
    /**
     * Set Popup window of CookieConsent
     * @param popup
     */
    CookieConsent.prototype.setPopup = function (popup) {
        this.popup = popup;
    };
    /**
     * Hook Allow Cookies
     */
    CookieConsent.prototype.forceAccept = function (element) {
        var me = this;
        if (typeof me.popup != "undefined") {
            setTimeout(function () {
                if (window.cookieconsent_options.layout === 'dpextend') {
                    var type = element.getAttribute('data-cookieconsent');
                    if (me.checkboxes.indexOf(type) != -1) {
                        me.loadCheckbox('dp--cookie-' + type, false, true);
                    }
                }
                // accept consent and Close overlay
                me.popup.setStatus(window.cookieconsent.status.allow);
                me.popup.close(true);
            }, 250);
        }
    };
    /**
     * Hook deny Cookies
     */
    CookieConsent.prototype.forceDeny = function (element) {
        var me = this;
        if (typeof me.popup != "undefined") {
            setTimeout(function () {
                if (window.cookieconsent_options.layout === 'dpextend') {
                    var type = element.getAttribute('data-cookieconsent');
                    if (me.checkboxes.indexOf(type) != -1) {
                        me.loadCheckbox('dp--cookie-' + type, false, false);
                    }
                }
                // deny consent and Close overlay
                me.popup.setStatus(window.cookieconsent.status.deny);
                me.popup.close(true);
            }, 250);
        }
    };
    /**
     *  create event
     */
    CookieConsent.prototype.fireEvent = function (name, element) {
        var event;
        if(element){
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(name, true, true, {
                $el: element
            });
        } else {
            event = document.createEvent('Event');
            event.initEvent(name, true, true);
        }
        // fire Event
        document.dispatchEvent(event);
    };
    /**
     * create Overlays
     */
    CookieConsent.prototype.overlays = function () {
        // check if active
        if (!window.cookieconsent_options.overlay.notice) return;
        // elements iFrame
        var elements = this.getCookieElementsByTag('iframe');
        // loop elements and create overlay
        if (elements.length > 0) {
            var key;
            /** Loop through elements and run Code **/
            for (key = 0; key < elements.length; key++) {
                var element = elements[key],
                    notice = element.getAttribute('data-cookieconsent-notice') || window.cookieconsent_options.content.media.notice,
                    desc = element.getAttribute('data-cookieconsent-description') || window.cookieconsent_options.content.media.desc,
                    btn = element.getAttribute('data-cookieconsent-btn') || window.cookieconsent_options.content.media.btn,
                    type = element.getAttribute('data-cookieconsent');
                // create overlay
                var div = document.createElement('div');
                div.classList.add("dp--overlay");
                // Button Style
                var style = '';
                if (window.cookieconsent_options.overlay.btn.background) {
                    style += 'background:' + window.cookieconsent_options.overlay.btn.background + ';';
                }
                if (window.cookieconsent_options.overlay.btn.text) {
                    style += 'color:' + window.cookieconsent_options.overlay.btn.text + ';';
                }
                // create HTML
                div.innerHTML = "<div class=\"dp--overlay-inner\">" +
                    "<div class='dp--overlay-header'>" + notice + "</div>" +
                    "<div class='dp--overlay-description'>" + desc + "</div>" +
                    "<div class='dp--overlay-button'><button class='db--overlay-submit' onclick='window.DPCookieConsent.forceAccept(this)' data-cookieconsent='" + type + "' style='" + style + "'>" + btn + "</button></div>" +
                    "</div>";
                // add background color
                if (window.cookieconsent_options.overlay.box.background) {
                    div.style.background = window.cookieconsent_options.overlay.box.background;
                }
                // add Text Color
                if (window.cookieconsent_options.overlay.box.text) {
                    div.style.color = window.cookieconsent_options.overlay.box.text;
                }
                // add Element to DOM
                element.parentNode.appendChild(div);
            }
        }
    };
    /** Init Handler **/
    window.DPCookieConsent = new CookieConsent();
    /** Start Script Handling **/
    window.DPCookieConsent.load();
});


