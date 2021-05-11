# DP Cookie Consent

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg?style=for-the-badge)](https://www.paypal.me/dirkpersky)
[![Latest Stable Version](https://img.shields.io/packagist/v/dirkpersky/typo3-dp_cookieconsent?style=for-the-badge)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)
[![TYPO3](https://img.shields.io/badge/TYPO3-dp__cookieconsent-%23f49700?style=for-the-badge)](https://extensions.typo3.org/extension/dp_cookieconsent/)
[![License](https://img.shields.io/packagist/l/dirkpersky/typo3-dp_cookieconsent?style=for-the-badge)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)

This Plugin includes the most popular solution to the EU Cookie law JavaScript Plugin [Cookie Consent](https://cookieconsent.insites.com/).
I extended it with Script and iFrame helper, so it works with the ePrivacy law.

Though don't care about the latest EU laws and handle your Cookies with this Plugins.

## F.A.Q.
Some F.A.Q. can be found [here](https://github.com/DirkPersky/typo3-dp_cookieconsent/wiki)

## Config
### TS-Constant 

**plugin.tx_cookieconsent.settings.** *([example config](Documentation/constant.md))*

| Property                  | Description                                   | Options                                   | Default |
| ------------------------- | --------------------------------------------- | ----------------------------------------- | -------:|
| url                       | PID to Data Protection                        | PID                                       | |
| target                    | Link target of read more link                 |                                           | _blank |
| theme                     | Layout of the consent                         | edgeless, block, wire, classic            | edgeless |
| position                  | position of the consent                       | bottom, top, bottom-left, bottom-right    | bottom-right |
| dismissOnScroll           | auto accept consent on scroll after XX px     |                                           | | 
| autoOpen                  | The application automatically decides whether the popup should open | true, false          | true | 
| revokable                 | Some countries REQUIRE that users can change their mind | true, false                    | true | 
| reloadOnRevoke            | force page reload after revoke                | true, false                            | false |
| type                      | consent types *([screenshot](#types))*        | info, opt-out, opt-in                     | info |
| layout                    | consent layout                                | basic, dpextend                           | basic |
| statistics                | pre check statistics in checkboxes layout     | true, false                               | false |
| marketing                 | pre check marketing in checkboxes layout      | true, false                               | false |
| overlay.notice            | enable or disable overlay                     | true, false                               | false |
| overlay.box.background    | Overlay: Background color                     | rgba(), #hexa                             | rgba(0,0,0,.8) |
| overlay.box.text          | Overlay: text color                           | rgb(), #hexa                              | #fff |
| overlay.button.background | Overlay: Button Background color              | rgba(), #hexa                             | #b81839 |
| overlay.button.text       | Overlay: Button text color                    | rgb(), #hexa                              | #fff |
| palette.popup.background  | Consent Background color                      | rgba(), #hexa                             | #2473be |
| palette.popup.text        | Consent Text color                            | rgb(), #hexa                              | #fff |
| palette.button.background | Consent Button Background color               | rgba(), #hexa                             | #f96332 |
| palette.button.text       | Consent Button Text color                     | rgb(), #hexa                              | #fff |

#### types
the screenshots are based one the `plugin.tx_cookieconsent.settings.layout = dpextend`

| info                                 | opt-out                                 | opt-in                                 |
| ------------------------------------ | --------------------------------------- | -------------------------------------- |
| ![info](Documentation/type_info.png) | ![info](Documentation/type_opt-out.png) | ![info](Documentation/type_opt-in.png) |

### TypoScript
set you own language values
**plugin.tx_dp_cookieconsent._LOCAL_LANG.{lng}.** *([example](Documentation/translation.md))*

| Property      | Description                   |
| ------------- | ----------------------------- |
| message       | the default consent message   |
| dismiss       | allow cookie button           |
| link          | read more link                |
| deny          | decline button                |
| allowall      | allow all cookie button       |
| dpRequire     | checkbox required label       |
| dpStatistik   | checkbox statistic label      |
| dpMarketing   | checkbox marketing label      |
| media.notice  | overlay notice headline       |
| media.desc    | overlay notice text           |
| media.btn     | overlay button text           |

**If you are from a country other than Germany, let me know your legal text and I will mark it for the next version**

## Features
### CS_SEO
This Plugin extends the Config from [CS_SEO](https://extensions.typo3.org/extension/cs_seo/) so that the Google analytics script, tag manager and piwiki will fire after the Cookie is accepted.

### load scripts after accepting
**load script sources**
If you want to load JavaScript resources after the Cookie is accepted you can use this snippet
```
<script data-ignore="1" data-cookieconsent="statistics" type="text/plain" data-src="{YOUR_LINK_TO_JS}"></script>
```

**load inline script**
If you want to load Inline JavaScript after the Cookie is accepted use this snippet.
```
<script data-ignore="1" data-cookieconsent="statistics" type="text/plain">
{YOUT_DYN_JS_CODE}
</script>
```

The `data-ignore="1"` attribute is to cover the [Scriptmerger](https://extensions.typo3.org/extension/scriptmerger/) engine to not combine these parts.

### Checkbox mode
You can extend the default cookie message with checkboxes, by activating the layout in the TYPO3 constants  `plugin.tx_cookieconsent.settings.layout = dpextend`.
Now your customer can choose what types of scripts/cookies he wants to allow.

These 3 types are possible and handled by the consent:

| Type       | Description                                          | example | 
| ---------- | ---------------------------------------------------- | --------- |
| required   | all normal scripts, will always called                | `<script type="text/javascript" ...`
| statistics | scripts that will only run after consent handling    | `<script data-cookieconsent="statistics" type="text/plain"...`
| marketing  | scripts that will only run after consent handling    | `<script data-cookieconsent="marketing" type="text/plain"...`

### load iframe after accepting
If you want to load iFrames (YouTube, GMap, ..) after the Cookie is accepted you can use this snippet
```
<iframe width="560" height="315" 
    data-cookieconsent="statistics" 
    data-src="https://www.youtube-nocookie.com/embed/XXXXXX?autoplay=1" 
    class="dp--iframe"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreenn >
</iframe>
```
With the `class="dp--iframe"` the iFrame is hidden by default and would be shown after accepting of the cookie.

#### iframe overlay
**if you want to add an overlay to accept Cookies outside of the cookie hint**
![iframe overlay](Documentation/iframe-overlay.png)
you can enable this feature in the TYPO3-constants<br/>
`plugin.tx_cookieconsent.settings.overlay.notice = true`

you also can modify the text in this hint individually per iframe
```
<iframe
    data-cookieconsent="statistics" 
    data-src="https://www.youtube-nocookie.com/embed/XXXXXX?autoplay=1" 
    class="dp--iframe"

    data-cookieconsent-notice="Cookie Notice"
    data-cookieconsent-description="Loading this...."
    data-cookieconsent-btn="allow cookies and load this ...."
>
</iframe>
```

#### build your own overlay
or accept/deny cookies outside of the cookie hint, you can use the followed example
```
<button 
    onclick="window.DPCookieConsent.forceAccept(this)" 
    data-cookieconsent="statistics" 
>allow cookies and play video</button>

```
**allow cookies**<br/>
`window.DPCookieConsent.forceAccept(this)`

**deny cookies**<br/>
`window.DPCookieConsent.forceDeny(this)`

### Events
| Event                     | Description                                   | Options                                   |
| ------------------------- | --------------------------------------------- | ----------------------------------------- |
| dp--cookie-init           | fire event when initialize process is done    |                                           |
| dp--cookie-fire           | fire after a consent script/iframe is loaded  | event.detail.$el                          |
| dp--cookie-accept         | fire when the consent is accepted             |                                           |
| dp--cookie-accept-init    | fire accepted event on revisited              |                                           |
| dp--cookie-deny           | fire when the consend is denied               |                                           |
| dp--cookie-revoke         | fire when the consent is revoked              |                                           |

```javascript
document.addEventListener('dp--cookie-fire', function (e) {
    console.log('dp--cookie-fire', e.detail.$el);
});
document.addEventListener('dp--cookie-accept', function (e) {
    console.log('dp--cookie-accept', e);
});
document.addEventListener('dp--cookie-deny', function (e) {
    console.log('dp--cookie-deny', e);
});
document.addEventListener('dp--cookie-revoke', function (e) {
    console.log('dp--cookie-deny', e);
});
```

### Dynamic Checkboxes
With this feature you can add or modify the checkbox types by configuration.
All you have to do is setting your new checkbox in TS and add it to the partial template:

Configuration/TypoScript/setup.txt:
```
page.footerData.998.20.settings.checkboxes.thirdparty = {$plugin.tx_cookieconsent.settings.thirdparty}
```

Resources/Private/Partials/CookieSelection.html:
```
<label for="dp--cookie-thirdparty">
    <f:form.checkbox id="dp--cookie-thirdparty" class="dp--check-box" checked="{settings.checkboxes.thirdparty}" value="" />
    <f:translate key="dpThirdparty" extensionName="dp_cookieconsent" />
</label>
```

[F.A.Q. How to remove unneccesary checkboxes](https://github.com/DirkPersky/typo3-dp_cookieconsent/wiki/How-to-remove-unneccesary-checkboxes)

## Please give me feedback
I would appreciate any kind of feedback or ideas for further developments to keep improving the extension for your needs.

## Say thanks! and support me
You like this extension? Get something for me (surprise!) from my wishlist on [Amazon](https://www.amazon.de/hz/wishlist/ls/15L17XDFBEYFL/r) or [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/dirkpersky) the next pizza. Thanks a lot!

### Contact us
- [E-Mail](mailto:info@dp-wired.de)
- [GitHub](https://github.com/DirkPersky/typo3-dp_cookieconsent)
- [Homepage](http:/dp-wired.de)
- [TYPO3.org](https://extensions.typo3.org/extension/dp_cookieconsent/)
- [Packagist.org (composer)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)
- [NPM - Version](https://github.com/DirkPersky/npm-dp_cookieconsent)
