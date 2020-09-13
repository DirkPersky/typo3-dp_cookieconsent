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

use TYPO3\CMS\Extbase\Utility\ExtensionUtility;

defined('TYPO3_MODE') or die();

$boot = function () {
    // Register FE namespace
    ExtensionUtility::configurePlugin(
        'DirkPersky.' . 'dp_cookieconsent',
        'CookieConsent',
        []
    );
};

$boot();
unset($boot);
