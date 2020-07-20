<?php
/**
 * Copyright (c) 2020.
 *
 * @category   TYPO3
 *
 * @copyright  2020 Dirk Persky
 * @author     Dirk Persky <info@dp-dvelop.de>
 * @license    MIT
 */

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
