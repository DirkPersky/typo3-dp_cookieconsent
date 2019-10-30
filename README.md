# DP Cookie Consent

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/dirkpersky)
[![Latest Stable Version](https://poser.pugx.org/dirkpersky/typo3-dp_cookieconsent/v/stable)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)
[![License](https://poser.pugx.org/dirkpersky/typo3-dp_cookieconsent/license)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)

This Plugin includes the most popular solution to the EU Cookie law JavaScript Plugin (Cookie Consent)[https://cookieconsent.insites.com/].
I extended it with Script and iFrame helper, so it works with the ePrivacy law.

Though don't care about the latest EU laws and handle you Cookies with this Plugins.

## Config
### TS-Constant
```
plugin.tx_cookieconsent.settings {
    # PID to Data Protection
    url =
    # Layout
    theme = edgeless
    # Position
    position = bottom-right
    # dismiss on scroll (in PX)
    dismissOnScroll =
    # Type (info, opt-out)
    type = opt-out
    # extend layout with checkboxes (basic,dpextend)
    layout = basic

    #  pre check statistics in checkboxes layout
    statistics = true
    # pre check statistics in checkboxes layout
    marketing = false

    # show Iframe overlay
    overlay {
        # Enable Iframe overlay
        notice = false

        box {
            # Overlay: Background
            background = rgba(0,0,0,.8)
            # Overlay: Text
            text = #fff
        }
        button {
            # Overlay Button: Background
            background = #b81839
            # Overlay Button: Text
            text = #fff
        }
    }

    # Cookiehint Style
    palette {
        popup {
            # Bar: Background color
            background = #2473be
            # Bar: text color
            text = #fff
        }
        button {
            # Button: Background color
            background = #f96332
            # Button: text color
            text = #fff
        }
    }
}
```

### TypoScript
set you own language values
```
plugin.tx_dp_cookieconsent._LOCAL_LANG {
    de {
        message = XXX
        dismiss = XXX
        link = XXX
        deny = XXX

        # Checkbox labels
        dpRequire = XXX
        dpStatistik = XXX
        dpMarketing = XXX

        # Iframe Overlay text
        media.notice = XXX
        media.desc = XXX
        media.btn = XXX
    }
}
```
**If you are from a country other than Germany, let me know your legal text and I will mark it for the next version**

## Features
### CS_SEO
This Plugin extends the Config from (CS_SEO)[https://extensions.typo3.org/extension/cs_seo/] so that the Google analytics script, tag manager and piwiki will fire after the Cookie is accepted.

### load scripts after accepting
**load script sources**
If you want to load JavaScript resources after the Cookie is accepted you can use this snipped
```
<script data-ignore="1" data-cookieconsent="statistics" type="text/plain" data-src="{YOUR_LINK_TO_JS}"></script>
```

**load inline script**
If you want to load Inline JavaScript after the Cookie is accepted use this snipped.
```
<script data-ignore="1" data-cookieconsent="statistics" type="text/plain">
{YOUT_DYN_JS_CODE}
</script>
```

The `data-ignore="1"` attribute ist to cover the (Scriptmerger)[https://extensions.typo3.org/extension/scriptmerger/] engine to not Combine this parts.

### load iframe after accepting
Since Version 9.7.0 you can handle iFrame's. 
If you want to load iFrame's (YouTube, GMap, ..) after the Cookie is accepted you can use this snipped
```
<iframe width="560" height="315" 
    data-cookieconsent="statistics" 
    data-src="https://www.youtube-nocookie.com/embed/XXXXXX?autoplay=1" 
    class="dp--iframe"
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreenn >
</iframe>
```
With the `class="dp--iframe"` the iFrame is hidden in default and would be shown after the cookie acceptioning.

# TODO
constant
plugin.tx_cookieconsent.settings.overlay.notice = true

data-cookieconsent-notice="YOUR TEXT"
data-cookieconsent-description="YOUR TEXT"
data-cookieconsent-btn="YOUR TEXT"
    
Since Version 9.8.0 you can handle iFrame's. 
```
<button 
    onclick="window.DPCookieConsent.forceAccept(this)" 
    data-cookieconsent="statistics" 
>allow cookies and play video</button>

```

window.DPCookieConsent.forceAccept(this)
window.DPCookieConsent.forceAccept(this)


#### Checkboxe mode
Since Version 9.5.3 you can extend the default cookie message with checkboxes.
Now your customer can choose what types of script he want to allow.
You can enable this option with the TYPO3 constant `plugin.tx_cookieconsent.settings.layout = dpextend`.

This 3 types are possible:

**required**: 
this checkbox cant be disabled
```
<script data-cookieconsent="required" ...
```

**statistics**:
this checkbox is enabled by default
```
<script data-cookieconsent="statistics"...
```

**marketing**:
this checkbox is disabled by default
```
<script data-cookieconsent="marketing"...
```

## Please give us feedback
We would appreciate any kind of feedback or ideas for further developments to keep improving the extension for your needs.

## Donate
This is a private project.
If you like it, please "Star" it in the right corner, or support me with a [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/dirkpersky)

### Contact us
- [E-Mail](mailto:info@dp-dvelop.de)
- [GitHub](https://github.com/DirkPersky/typo3-dp_cookieconsent)
- [Homepage](http:/dp-dvelop.de)
- [TYPO3.org](https://extensions.typo3.org/extension/dp_cookieconsent/)
- [Packagist.org (composer)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)
