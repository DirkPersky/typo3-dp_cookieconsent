<?php
defined('TYPO3_MODE') or die();

call_user_func(function () {
    // Register Plugin and name SPaces
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
        'DirkPersky.' . 'dp_cookieconsent',
        'CookieConsent',
        'CookieConsent'
    );

    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
        'DirkPersky.' . 'dp_cookieconsent',
        'CookieConsent',
        []
    );
});