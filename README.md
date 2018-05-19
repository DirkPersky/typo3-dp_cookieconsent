# DP Cookie Consent
This Plugin includes the most popilar solution to the EU Cookie law JavaScript Plugin (Cookie Consent)[https://cookieconsent.insites.com/].
I extend a Script helper, so work with the ePrivacy law.

Though don't care about the latest EU laws and handle you Cookies with this Plugins.

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
