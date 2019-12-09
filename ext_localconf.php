<?php
defined('TYPO3_MODE') or die();

$boot = function(){
    // Register Plugin and name SPaces
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
        'DirkPersky.' . 'dp_cookieconsent',
        'CookieConsent',
        'CookieConsent'
    );
    // Register FE namespace
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
        'DirkPersky.' . 'dp_cookieconsent',
        'CookieConsent',
        []
    );
};

$boot();
unset($boot);
