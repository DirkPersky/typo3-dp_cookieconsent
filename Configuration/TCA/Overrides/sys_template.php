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

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3_MODE') || die();

// Add Plugin Configs
ExtensionManagementUtility::addStaticFile('dp_cookieconsent', 'Configuration/TypoScript', 'CookieConsent');