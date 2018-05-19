# CKEditor Add-On "Fontawesome" for TYPO3
This repository provides the add-on "Fontawesome" as a extension for TYPO3.

## TSConfig
### Switch back to Fontawesome 4
For the default template ot the CKE-Editor
```
RTE.default.preset = defaultFA4
```
For the full template of CKE-Editor
```
RTE.default.preset = fullFA4
```

## Typo3 Constants:
Disable CDN Integration in Frontend
```
plugin.tx_ckeditor_fontawesome.loadCSS = 
```
Set alternativ CDN reference File
```
plugin.tx_ckeditor_fontawesome.css = {$path}
```

### Switch back Fontawesome 4
```
# Include Fontawesome 4 from CDN
plugin.tx_ckeditor_fontawesome.css = https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css
```

## ToDo:
- Add FA-Icon in Content Headline Definition.

## Please give us feedback
We would appreciate any kind of feedback or ideas for further developments to keep improving the extension for your needs.

### Contact us
- [E-Mail](mailto:d.persky@gutenberghaus.de)
- [GitHub](https://github.com/DirkPersky/rte-ckeditor-fontawesome)
- [Homepage](https://web-kon.de)
- [TYPO3.org](https://extensions.typo3.org/extension/rte_ckeditor_fontawesome/)
- [Packagist.org (composer)](https://packagist.org/packages/dirkpersky/typo3-rte-ckeditor-fontawesome)
- [Font Awesome](https://fontawesome.com)
