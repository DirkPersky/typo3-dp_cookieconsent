# DP Cookie Consent

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/dirkpersky/9.99)
[![Latest Stable Version](https://poser.pugx.org/dirkpersky/typo3-dp_cookieconsent/v/stable)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)
[![License](https://poser.pugx.org/dirkpersky/typo3-dp_cookieconsent/license)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)

This Plugin includes the most popular solution to the EU Cookie law JavaScript Plugin (Cookie Consent)[https://cookieconsent.insites.com/].
I extend a Script helper, so work with the ePrivacy law.

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
    }
}
```
**If you are from a country other than Germany, let me know your legal text and I will mark it for the next version**

## Features
### CS_SEO
This Plugin extends the Config from (CS_SEO)[https://extensions.typo3.org/extension/cs_seo/] so that the Google analytics script and tag manager will fire after the Cookie is accepted.

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


## Please give us feedback
We would appreciate any kind of feedback or ideas for further developments to keep improving the extension for your needs.

### Contact us
- [E-Mail](mailto:info@dp-dvelop.de)
- [GitHub](https://github.com/DirkPersky/typo3-dp_cookieconsent)
- [Homepage](http:/dp-dvelop.de)
- [TYPO3.org](https://extensions.typo3.org/extension/dp_cookieconsent/)
- [Packagist.org (composer)](https://packagist.org/packages/dirkpersky/typo3-dp_cookieconsent)
