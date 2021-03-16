<?php
/**
 * Copyright (c) 2020.
 *
 * @category   TYPO3
 *
 * @copyright  2020 Dirk Persky
 * @author     Dirk Persky <info@dp-wired.de>
 * @license    MIT
 */

defined('TYPO3_MODE') or die();
$boot = function () {
    // Register FE namespace
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
        'DpCookieconsent',
        'CookieConsent',
        []
    );
};

$boot();
unset($boot);
