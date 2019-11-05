<?php
defined('TYPO3_MODE') or die();

(function () {
    // Register Plugin and name SPaces
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
        'DirkPersky.' . 'dp_cookieconsent',
        'CookieConsent',
        'CookieConsent'
    );
})();