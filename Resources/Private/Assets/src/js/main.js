// Compilance Templates
import optIn from './html/compilance/opt-in.html?raw';
// Element Templates
import selections from './html/elements/selection.html?raw';
import description from './html/elements/descripton.html?raw';
import allowAllBtn from './html/elements/allow-all.html?raw';
import allowBtn from './html/elements/allow.html?raw';
import dismissBtn from './html/elements/dismiss.html?raw';
import denyBtn from './html/elements/deny.html?raw';
// Other Templates
import revokebutton from './html/revoke.html?raw';
import iframeoverlay from './html/overlay.html?raw';
// wrap
import windowWrap from './html/window.html?raw';

/*!
  * Cookie Consent
  * Copyright 2021 Dirk Persky (https://github.com/DirkPersky/npm-dp_cookieconsent/issues)
  * Licensed under AGPL v3+ (https://github.com/DirkPersky/npm-dp_cookieconsent/blob/master/LICENSE)
  */
(function (cc, co) {
    // stop from running again, if accidently included more than once.
    if (cc.hasInitialised) return;
    /**
     * IE 11 POLYFILLS
     */
    // source: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
    (function() {
        if (typeof window.CustomEvent === "function") return false

        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined }
            var evt = document.createEvent("CustomEvent")
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
            return evt
        }

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })();
    // EVENT POLY
    (function() {
        if (typeof window.Event === "function") return false

        function Event(event, params) {
            params = params || { bubbles: true, cancelable: true, detail: undefined }
            var evt = document.createEvent('Event');
            evt.initEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt
        }

        Event.prototype = window.Event.prototype;
        window.Event = Event;
    })();
    /**
     * define helper functions
     */
    var util = {

        detectRobot : function(userAgent) {
            const robots = new RegExp([
                /Chrome-Lighthouse/,
                /bot/,/spider/,/crawl/,                            // GENERAL TERMS
                /APIs-Google/,/AdsBot/,/Googlebot/,                // GOOGLE ROBOTS
                /mediapartners/,/Google Favicon/,
                /FeedFetcher/,/Google-Read-Aloud/,
                /DuplexWeb-Google/,/googleweblight/,
                /bing/,/yandex/,/baidu/,/duckduck/,/yahoo/,        // OTHER ENGINES
                /ecosia/,/ia_archiver/,
                /semrush/,                                         // OTHER
            ].map((r) => r.source).join("|"),"i");               // BUILD REGEXP + "i" FLAG

            return robots.test(userAgent);
        },

        /**
         * reformat checkbox entries
         * @param options
         * @returns {{name: string, checked: boolean}[]}
         */
        reformatCheckboxOptions: function (options){
            var reformated = Object.entries(options).map( item => {
                var status = String(item[1]).toLowerCase() == 'true' ? true : false;
                return {
                    name: item[0],
                    checked: status
                }
            });

            return reformated;

        },
        /**
         * load Cookie
         * @param name
         * @returns {undefined|any}
         */
        getCookie: function (name) {
            var value = '; ' + document.cookie;
            var parts = value.split('; ' + name + '=');
            return parts.length < 2
                ? undefined
                : JSON.parse(
                    parts
                        .pop()
                        .split(';')
                        .shift()
                );
        },
        /**
         * save Cookie
         * @param name
         * @param value
         * @param expiryDays
         * @param domain
         * @param path
         * @param secure
         */
        setCookie: function (name, value, expiryDays, domain, path, secure) {
            var exdate = new Date();
            exdate.setHours(exdate.getHours() + ((expiryDays || 365) * 24));

            var cookie = [
                name + '=' + JSON.stringify(value),
                'expires=' + exdate.toUTCString(),
                'path=' + (path || '/'),
                'SameSite=Strict'
            ];

            if (domain) {
                cookie.push('domain=' + domain);
            }
            if (secure) {
                cookie.push('secure');
            }
            document.cookie = cookie.join(';');
        },
        /**
         * prepare object for cookie validation
         * @param obj
         * @param name
         * @returns {*}
         */
        prepareCookie: function (obj, name) {
            // init Cookie object
            var merged = {
                status: 'open',
            };
            // get cookie
            var cookie = this.getCookie(name);
            // merge Cookie into preset
            if (typeof cookie != 'undefined') {
                this.deepExtend(merged, cookie);
            }
            this.deepExtend(merged, obj);
            // merge with given values
            return {
                exists: (typeof cookie != 'undefined') ? true: false,
                config: merged
            };
        },

        getElementsByTag: function (tag, selector) {
            if (typeof selector == 'undefined') selector = 'data-cookieconsent';
            // get elements
            return document.querySelectorAll(tag + '[' + selector + ']');
        },
        /**
         * build Config object
         */
        deepExtend: function (target, source) {
            for (var prop in source) {
                if (source.hasOwnProperty(prop)) {
                    if (
                        prop in target &&
                        typeof target[prop] === 'object' &&
                        typeof source[prop] === 'object'
                    ) {
                        this.deepExtend(target[prop], source[prop]);
                    } else {
                        target[prop] = source[prop];
                    }
                }
            }
            return target;
        },
        /**
         * add HTML to DOM
         * @param markup
         * @param doc
         * @returns {Element}
         */
        appendElement: function (markup, doc) {
            var div = document.createElement('div');
            // target container
            var cont = doc ?? document.body;
            // add html
            div.innerHTML = this.replaceContent(markup);
            // get regular element
            var el = div.children[0];
            // add element to body
            cont.appendChild(el);
            // return element
            return el;
        },
        /**
         * add CSS Style to element
         * @param el
         * @param group
         * @param type
         */
        applyStyle: function (el, group, type) {
            // check if element exist
            if (el.length <= 0 || typeof this.options[group] == 'undefined' || typeof this.options[group][type] == 'undefined') return;
            // change style
            for (const [key, value] of Object.entries(this.options[group][type])) {
                switch (key) {
                    case 'background':
                        el.style.backgroundColor = value;
                        break;
                    case 'text':
                        el.style.color = value;
                        break;
                }
            }
        },
        /**
         * Event caller
         * @param name
         * @param element
         */
        fireEvent: function (name, element) {
            var event;
            if (element) {
                event = new CustomEvent(name, {detail: {$el: element}});
            } else {
                event = new Event(name);
            }
            // fire Event
            document.dispatchEvent(event);
        }
    };
    // bind to class
    cc.utils = util;
    /**
     * define popup
     */
    var Popup = (function () {
        // define default values
        var defaultOptions = {
            cookie: {
                // This is the name of this cookie - you can ignore this
                name: 'dp_cookieconsent_status',
                // This is the url path that the cookie 'name' belongs to. The cookie can only be read at this location
                path: '/',
                // This is the domain that the cookie 'name' belongs to. The cookie can only be read on this domain.
                domain: '',
                // The cookies expire date, specified in days (specify -1 for no expiry)
                expiryDays: 365,
                // If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS.
                secure: false,
            },
            // position of the consent window
            position: 'bottom-right',
            // each item defines the inner text for the element that it references
            content: (new window.DPCookieConsentL10N()).getLang(),
            // Available styles
            //    -edgeless
            theme: 'edgeless',
            // select your type of popup here
            type: 'opt-in', // refers to `compliance` (in other words, the buttons that are displayed)
            // Some countries REQUIRE that a user can change their mind. You can configure this yourself.
            revokable: true,
            // if the user changes his mind reload the page
            reloadOnRevoke: true,
            // checkbox default def
            checkboxes: [
                {
                    name: 'statistics',
                    checked: false
                },
                {
                    name: 'marketing',
                    checked: false
                }
            ],
            // only background needs to be defined for every element. if not set, other colors can be calculated from it
            palette: {
                popup: {
                    background: 'rgba(0,0,0,0.8)',
                    text: '#ffffff'
                },
                button: {
                    background: '#f96332',
                    text: '#ffffff'
                }
            },
            overlay: {
                notice: true,
                box: {
                    background: 'rgba(0,0,0,0.8)',
                    text: '#ffffff'
                },
                btn: {
                    background: '#f96332',
                    text: '#ffffff'
                }
            },
            // these callback hooks are called at certain points in the program execution
            onPopupOpen: function () {
            },
            onPopupClose: function () {
            },
            onInitialise: function () {
            },
            onStatusChange: function (status, chosenBefore) {
            },
            onRevokeChoice: function () {
            },
            // templates
            compilance: {
                'opt-in': optIn
            },
            // revoke button
            revokeBtn: revokebutton,
            // overlay
            overlayLayout: iframeoverlay,
            // wrap
            wrap: windowWrap,
            //  elements
            elements: {
                'allow-all': allowAllBtn,
                'allow': allowBtn,
                'dismiss': dismissBtn,
                'deny': denyBtn,
                'selection': selections,
                'description': description
            }
        };

        /**
         * Popup window class
         * @constructor
         */
        function CookiePopup() {
        }

        /**
         * Content Replacer
         * @param markup
         * @returns {*}
         */
        CookiePopup.prototype.replaceContent = function (markup) {
            var opts = this.options;
            var classes = [
                'cc-' + opts.position, // floating or banner
                'cc-type-' + opts.type, // add the compliance type
                'cc-theme-' + opts.theme, // add the theme
                'cc-hide' // hide as default
            ];
            // replace class
            markup = markup.replace('{{classes}}', classes.join(' '));
            // loop elements
            for (const [key, value] of Object.entries(opts.elements)) {
                // replace elemnts and go to Text replace
                markup = markup.replace('{{' + key + '}}', value);
            }
            // loop content
            for (const [key, value] of Object.entries(opts.content)) {
                markup = markup.replace('{{' + key + '}}', value);
            }
            // return content
            return markup;
        };
        /**
         * Template Overwrites
         */
        CookiePopup.prototype.templateOverwrites = function () {
            // has unique definition
            let revokeHTML = cc.utils.getElementsByTag('script', 'data-dp-cookieRevoke');
            if (revokeHTML.length > 0) {
                this.options.revokeBtn = revokeHTML[0].innerHTML;
            }
            // overwrite descriptions
            let cookieDesc = cc.utils.getElementsByTag('script', 'data-dp-cookieDesc');
            if (cookieDesc.length > 0) {
                this.options.elements.description = cookieDesc[0].innerHTML;
            }

            // overwrite descriptions
            let cookieSelect = cc.utils.getElementsByTag('script', 'data-dp-cookieSelect');
            if (cookieSelect.length > 0) {
                this.options.elements.selection = cookieSelect[0].innerHTML;
            }
        }
        /**
         * Initialise Popup
         * @param options
         */
        CookiePopup.prototype.initialise = function (options) {
            // set options back to default options
            util.deepExtend((this.options = {}), defaultOptions);
            // reformat checkboxes
            if(typeof options.checkboxes === 'object') options.checkboxes = util.reformatCheckboxOptions(options.checkboxes);
            // merge in user options
            if (typeof options === 'object') util.deepExtend(this.options, options);
            // bind callback function
            var complete = this.options.onInitialise.bind(this);
            // load content overwrites
            this.templateOverwrites();
            // create revoke
            if (this.options.revokable) {
                // generate template
                this.revokeBtn = cc.utils.appendElement.call(this, this.options.revokeBtn);
                // change styles
                cc.utils.applyStyle.call(this, this.revokeBtn, 'palette', 'popup');
            }
            // create window
            this.window = cc.utils.appendElement.call(this, this.options.wrap);
            // change style
            cc.utils.applyStyle.call(this, this.window, 'palette', 'popup');
            // add compilance
            this.addCompilance(this.window);
            // run callback
            complete(this);
            // run button bindings
            this.bindBtns();
            // set checkbox Preset
            this.presetCheckboxes();
        };
        /**
         * init mark checkboxes
         */
        CookiePopup.prototype.presetCheckboxes = function () {
            var currentCookie = cc.utils.getCookie(this.options.cookie.name);
            // overwrite from cookie
            if (typeof currentCookie != 'undefined') util.deepExtend(this.options.checkboxes, currentCookie.checkboxes);
            // get input
            var checkbox = this.compilance.querySelectorAll('input');
            if (checkbox.length > 0) {
                // loop and set checkbox
                checkbox.forEach(e => {
                    var id = e.id;
                    // get key
                    id = id.replace('dp--cookie-', '');
                    // is key in preset
                    this.options.checkboxes.map((preset, index) => {
                        if (preset.name == id) {
                            e.checked = preset.checked;
                        }
                    });
                });
            }
        }
        /**
         * Add Compilance Type to window
         * @param parent
         */
        CookiePopup.prototype.addCompilance = function (parent) {
            // get defaul Compilance type
            var compilance = this.options.compilance['opt-in'];
            // check for overwite mode
            if (typeof this.options.compilance[this.options.type] != 'undefined') {
                compilance = this.options.compilance[this.options.type];
            }
            // add to window
            this.compilance = cc.utils.appendElement.call(this, compilance, parent);
            // get buttons
            this.allowAllBtn = this.compilance.getElementsByClassName('cc-allow-all');
            this.allowBtn = this.compilance.getElementsByClassName('cc-allow');
            this.denyBtn = this.compilance.getElementsByClassName('cc-deny');
            this.dismissBtn = this.compilance.getElementsByClassName('cc-dismiss');
            // change button style
            if (this.allowAllBtn.length > 0) cc.utils.applyStyle.call(this, this.allowAllBtn[0], 'palette', 'button');
            else if (this.allowBtn.length > 0) cc.utils.applyStyle.call(this, this.allowBtn[0], 'palette', 'button');
        }
        /**
         * Button buttons to Click handler
         */
        CookiePopup.prototype.bindBtns = function () {
            // bind allow All Handler
            if (this.allowAllBtn.length > 0) this.allowAllBtn[0].onclick = () => this.allowAll.call(this);
            // bind save selection handler
            if (this.allowBtn.length > 0) this.allowBtn[0].onclick = () => this.allow.call(this);
            // bind save selection handler
            if (this.dismissBtn.length > 0) this.dismissBtn[0].onclick = () => this.allow.call(this);
            // bind deny all handler
            if (this.denyBtn.length > 0) this.denyBtn[0].onclick = () => this.denyAll.call(this);
            // bind revoke handler
            if (this.revokeBtn) this.revokeBtn.onclick = () => this.revoke.call(this);
        }
        /**
         * enable all checkboxes and save
         */
        CookiePopup.prototype.allowAll = function () {
            // get all checkboxes values
            var checkbox = this.compilance.querySelectorAll('input');
            // chackboxes found?
            if (checkbox.length > 0) {
                // set to true
                checkbox.forEach(e => {
                    var id = e.id;
                    // get key
                    id = id.replace('dp--cookie-', '');
                    // is key in preset
                    this.options.checkboxes.map((preset, index) => {
                        if (preset.name == id) {
                            e.checked = true;
                        }
                    });
                });
            }
            // event handling
            cc.utils.fireEvent('dp--cookie-accept');
            // close modal
            this.save();
        }
        /**
         * disable all checkboxes and save
         */
        CookiePopup.prototype.denyAll = function () {
            // get all checkboxes values
            var checkbox = this.compilance.querySelectorAll('input');
            // chackboxes found?
            if (checkbox.length > 0) {
                // set to false
                checkbox.forEach(e => {
                    var id = e.id;
                    // get key
                    id = id.replace('dp--cookie-', '');
                    // is key in preset
                    this.options.checkboxes.map((preset, index) => {
                        if (preset.name == id) {
                            e.checked = false;
                        }
                    });
                });
            }
            // event handling
            cc.utils.fireEvent('dp--cookie-deny');
            // run save handling
            this.save();
        }
        /**
         * cookie save click
         */
        CookiePopup.prototype.allow = function () {
            // event handling
            cc.utils.fireEvent('dp--cookie-accept');
            // close modal
            this.save();
        }
        /**
         * save Checkboxes to variables
         */
        CookiePopup.prototype.saveCheckboxes = function (id, value){
            this.options.checkboxes.map((preset, index) => {
                if (preset.name == id) {
                    this.options.checkboxes[index].checked = value;
                }
            });
        }
        /**
         * save checkboxes and start cookie loading
         */
        CookiePopup.prototype.save = function () {
            // get all checkboxes values
            var checkbox = this.compilance.querySelectorAll('input');
            // chackboxes found?
            if (checkbox.length > 0) {
                // loop checkboxes
                checkbox.forEach(e => {
                    var id = e.id;
                    // get key
                    id = id.replace('dp--cookie-', '');
                    // save key to preset
                    this.saveCheckboxes(id, e.checked);
                });
            }
            // close modal
            this.close();
        }
        /**
         *
         * @returns {boolean}
         */
        CookiePopup.prototype.hasChanged = function () {
            var hasDiffs = false;
            // has old cookie
            if (typeof this.originalCookie == 'undefined' || typeof this.originalCookie.checkboxes == 'undefined') return false;
            // detail check
            this.originalCookie.checkboxes.map((old, index) => {
                // has checked changed?
                var current = this.options.checkboxes[index];
                // is old cheked
                if (old.checked === true) {
                    // is current not allowed?
                    if (!current || current.checked == false) {
                        // set reload flag
                        hasDiffs = true;
                        // get change callback
                        var cbk = this.options.onStatusChange.bind(this);
                        // run callback
                        cbk(current, old);
                    }
                }
            });
            // retun diff state
            return hasDiffs;
        }
        /**
         * check if cookie has consent
         * @returns {boolean}
         */
        CookiePopup.prototype.hasConsent = function () {
            // check for cookie Selection and open needed window
            var cookie = cc.utils.getCookie(this.options.cookie.name);
            // no cookie is set, open popup
            if (typeof cookie == 'undefined' || cookie.status == 'open') {
                return false;
            }
            return true;
        }
        /**
         * save status to cookie
         * @param obj
         */
        CookiePopup.prototype.saveCookie = function (obj) {
            // prepare Cookie Options
            var cookieOptions = cc.utils.prepareCookie(obj, this.options.cookie.name);
            // check status for first init
            if(!cookieOptions.exists && cookieOptions.config.status == 'open') return;
            // save cookie
            cc.utils.setCookie(
                this.options.cookie.name,
                cookieOptions.config,
                this.options.cookie.expiryDays,
                this.options.cookie.domain,
                this.options.cookie.path,
                this.options.cookie.secure
            );
            // reload if needed
            if (this.hasConsent() && this.hasChanged()) {
                // reload page
                if (this.options.reloadOnRevoke) location.reload();
            }
        }
        /**
         * Revoke Clicke event
         */
        CookiePopup.prototype.revoke = function () {
            // bind callback function
            var cbk = this.options.onRevokeChoice.bind(this);
            // run callback
            cbk(this);
            // event handling
            cc.utils.fireEvent('dp--cookie-revoke');
            // open window
            this.open();
        }
        /**
         * open Modal handler
         */
        CookiePopup.prototype.open = function () {
            if (this.revokeBtn) this.revokeBtn.classList.add('cc-hide');
            this.window.classList.remove('cc-hide');
            // get current Cookie & save
            this.originalCookie = cc.utils.getCookie(this.options.cookie.name);
            // bind callback function
            var cbk = this.options.onPopupOpen.bind(this);
            // run callback
            cbk(this);
            // set cookie for opening
            this.saveCookie({
                status: 'open',
            });
            // add body class
            document.querySelector('body').classList.add('dp--cookie-consent');
        }
        /**
         * close Modal handler
         */
        CookiePopup.prototype.close = function () {
            this.window.classList.add('cc-hide');
            if (this.revokeBtn) this.revokeBtn.classList.remove('cc-hide');
            // bind callback function
            var cbk = this.options.onPopupClose.bind(this);
            // run callback
            cbk(this);
            // set status to closed
            this.saveCookie({
                status: 'approved',
                checkboxes: this.options.checkboxes,
            });
            // remove body class
            document.querySelector('body').classList.remove('dp--cookie-consent');
            // execute handlers
            this.execute();
        }
        /**
         * execute handler
         */
        CookiePopup.prototype.execute = function (){
            // call Cookie Handler do execute
            cc.Handler.execute(this.options.checkboxes);
            // call Contetn Handler
            cc.Overlay.execute(this.options.checkboxes);
        }
        // return popup
        return new CookiePopup();
    })();
    // bind to class
    cc.popup = Popup;
    /**
     * Overlay Creator
     */
    var Overlay = (function () {

        function CookieOverlay() {

        }

        /**
         * init function
         */
        CookieOverlay.prototype.overlays = function () {
            // abort if not set
            if (!cc.popup.options.overlay.notice) return;
            // get template overwrites
            this.templateOverwrites();
            // get overlays for types
            this.overlaysView('iframe');
            this.overlaysView('dp-content');
        };
        /**
         * get template overwrites
         */
        CookieOverlay.prototype.templateOverwrites = function () {
            // overwirte overlay Template
            let iframeoverlayHtml = cc.utils.getElementsByTag('script', 'data-dp-cookieIframe');
            if (iframeoverlayHtml.length > 0) {
                cc.popup.options.overlayLayout = iframeoverlayHtml[0].innerHTML;
            }
        }
        /**
         * create Overlays
         */
        CookieOverlay.prototype.overlaysView = function (tag) {
            // elements iFrame
            var elements = cc.utils.getElementsByTag(tag);
            // abort if no elements exists
            if (elements.length == 0) return;
            // loop elements and create overlay
            elements.forEach(element => {
                var notice = element.getAttribute('data-cookieconsent-notice') || cc.popup.options.content.media.notice,
                    desc = element.getAttribute('data-cookieconsent-description') || cc.popup.options.content.media.desc,
                    btn = element.getAttribute('data-cookieconsent-btn') || cc.popup.options.content.media.btn,
                    type = element.getAttribute('data-cookieconsent');
                // check if overlay is already done
                if (element.hasAttribute('data-cookieconsent-overlay-loaded')) return;
                // mark as done
                element.setAttribute('data-cookieconsent-overlay-loaded', 'loaded');
                // create overlay
                var div = document.createElement('div');
                div.classList.add("dp--overlay");
                // change box Styles
                cc.utils.applyStyle.call(cc.popup, div, 'overlay', 'box');
                // create HTML
                var iframeoverlayHtml = cc.popup.options.overlayLayout
                    .replace('{{notice}}', notice)
                    .replace('{{desc}}', desc)
                    .replace('{{type}}', type)
                    .replace('{{btn}}', btn);
                // add to div und replace default Popup elements
                iframeoverlayHtml = cc.utils.appendElement.call(cc.popup, iframeoverlayHtml, div);
                // get button and restyle
                var allowBtn = iframeoverlayHtml.getElementsByClassName('db--overlay-submit');
                if (allowBtn.length > 0) cc.utils.applyStyle.call(cc.popup, allowBtn[0], 'overlay', 'btn');
                // add Element to DOM
                element.parentNode.insertBefore(div, element.nextSibling);
            });
        }
        /**
         * Overlay execute
         */
        CookieOverlay.prototype.execute = function (options) {
            // iframe handler
            this.executeIframe(options);
            // content handler
            this.executeContent(options);
        }
        /**
         * ajax load of content
         * @param method
         * @param url
         * @param resolve
         * @param reject
         */
        CookieOverlay.prototype.ajax = function (method, url, resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(method, url);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request.setRequestHeader('Content-type', 'text/html');

            request.onload = function () {
                if (request.status < 200 || request.status >= 300) {
                    reject(request);
                } else {
                    resolve(request);
                }
            };
            request.onerror = function () {
                reject(request);
            };

            request.send();
        }
        /**
         * execute content overlays
         * @param options
         */
        CookieOverlay.prototype.executeContent = function (options) {
            var elements = cc.utils.getElementsByTag('dp-content');
            if (elements.length > 0) {
                elements.forEach(element => {
                    // abort if element is not allowed
                    if (!cc.Handler.typeAllowed(element, options)) return;
                    // add Loaded class
                    element.classList.add("dp--loaded");
                    // override attribute to only load once
                    element.setAttribute('data-cookieconsent-loaded', element.getAttribute('data-cookieconsent'));
                    element.removeAttribute('data-cookieconsent');
                    // run ajax Call
                    var src = element.getAttribute('data-src');
                    if (src && src.length > 0) {
                        this.ajax('GET', src, function (response) {
                            element.innerHTML = response.response;
                            cc.utils.fireEvent('dp--cookie-content', element);
                        }, function (error) {
                        });
                    } else {
                        /** call Inline Event **/
                        cc.utils.fireEvent('dp--cookie-content', element);
                    }
                })
            }
        }
        /**
         * execute Iframe overlays
         * @param options
         */
        CookieOverlay.prototype.executeIframe = function (options) {
            var elements = cc.utils.getElementsByTag('iframe');
            if (elements.length > 0) {
                elements.forEach(element => {
                    // abort if element is not allowed
                    if (!cc.Handler.typeAllowed(element, options)) return;
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
                    cc.utils.fireEvent('dp--cookie-iframe', iframe);
                });
            }
        }

        return new CookieOverlay();
    })();
    // bind to class
    cc.Overlay = Overlay;
    /**
     * Cookie Handler
     */
    var Handler = (function () {

        function CookieHandler() {

        }

        /**
         * execute Handler
         * @param options
         */
        CookieHandler.prototype.execute = function (options) {
            /** Get all Scripts to load **/
            var elements = cc.utils.getElementsByTag('script');
            if (elements.length > 0) {
                elements.forEach(element => {
                    // abort if element is not allowed
                    if (!this.typeAllowed(element, options)) return;
                    /** get HTML of Elements **/
                    var code = element.innerHTML;
                    /** trim Elements **/
                    if (code && code.length) code = code.trim();
                    /** run Code it something in in it **/
                    if (code && code.length) {
                        /** if Is Code Eval Code **/
                        eval.call(this, code);
                        /** call Inline Event **/
                        cc.utils.fireEvent('dp--cookie-fire', element);
                    } else {
                        /**
                         * If is SRC load that
                         * Dont use this src="", becouse some Browser will ignore the type=text/plain
                         * prefer use data-src=""
                         */
                        if (element.getAttribute('data-src')) {
                            this.asyncJS(element.getAttribute('data-src'), function (e) {
                                cc.utils.fireEvent('dp--cookie-fire', element);
                            });
                        } else if (element.src) {
                            this.asyncJS(element.src, function (e) {
                                cc.utils.fireEvent('dp--cookie-fire', element);
                            });
                        }
                    }
                    // override attribute to only load once
                    element.setAttribute('data-cookieconsent-loaded', element.getAttribute('data-cookieconsent'));
                    element.removeAttribute('data-cookieconsent');
                });
            }
        }
        /**
         * Async Content Load for Scripts
         * @param u
         * @param t
         * @param c
         */
        CookieHandler.prototype.asyncLoad = function (u, t, c) {
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
        }
        /**
         * Async Load Helper for JS
         */
        CookieHandler.prototype.asyncJS = function (u, c) {
            this.asyncLoad(u, 'script', c);
        };
        /**
         * check handler type
         * @param element
         * @param options
         * @returns {boolean}
         */
        CookieHandler.prototype.typeAllowed = function (element, options) {
            // get type
            var type = element.getAttribute('data-cookieconsent');
            // test
            var matched = options.map(e => {
                if (e.name == type && e.checked === true) return true;
            });
            // deep check
            return (matched.indexOf(true) !== -1);
        }
        // return handler
        return new CookieHandler();
    })();
    cc.Handler = Handler;
    /**
     * initilize
     */
    cc.initialise = function (options, complete) {
        if (!complete) complete = function () {
        };
        cc.popup.initialise(options);
        // init Overlay
        cc.Overlay.overlays();
        // init popup
        complete(cc.popup);
        // run event
        cc.utils.fireEvent('dp--cookie-init');
        // no cookie is set, open popup
        if (cc.popup.hasConsent() || util.detectRobot(navigator.userAgent)) {
            cc.popup.close();
            // run init event
            cc.utils.fireEvent('dp--cookie-accept-init');
            return;
        }
        // hide window an show revoke
        cc.popup.open();
    };
    /**
     * Allow Cookies
     */
    cc.forceAccept = function (e) {
        var type = e.getAttribute('data-cookieconsent');
        // get checkbox
        var checkbox = cc.popup.compilance.querySelectorAll('input');
        // chackboxes found?
        if (checkbox.length > 0) {
            checkbox.forEach(e => {
                var id = e.id;
                // get key
                id = id.replace('dp--cookie-', '');
                // has no consent unmark other
                if(!cc.popup.hasConsent()) e.checked = false;
                // set checkbox status
                if(id == type) e.checked = true;
            });
            // fire accept event
            cc.utils.fireEvent('dp--cookie-accept');
        }
        // run save method
        cc.popup.save();
    };
    /**
     * deny Cookies
     */
    cc.forceDeny = function (e) {
        var type = e.getAttribute('data-cookieconsent');
        // get checkbox
        var checkbox = cc.popup.compilance.querySelectorAll('input');
        // chackboxes found?
        if (checkbox.length > 0) {
            checkbox.forEach(e => {
                var id = e.id;
                // get key
                id = id.replace('dp--cookie-', '');
                // has no consent unmark other
                if(!cc.popup.hasConsent()) e.checked = false;
                // set checkbox status
                if(id == type) e.checked = false;
            });
        }
        // run save method
        cc.popup.save();
    }
    // prevent this code from being run twice
    cc.hasInitialised = true;
    // bind globals
    window.DPCookieConsent = cc;
    // init consent
    window.addEventListener("load", function () {
        window.DPCookieConsent.initialise(window.cookieconsent_options || {});
        window.DPCookieConsent.loaded = true;
    });
})(window.DPCookieConsent || {});
