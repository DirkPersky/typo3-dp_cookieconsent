<?php
/*
 * Copyright (c) 2021.
 *
 * @category   TYPO3
 *
 * @copyright  2021 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <info@dp-wired.de>
 * @license    MIT
 */

defined('TYPO3') || die();

// Add Plugin Configs
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile('dp_cookieconsent', 'Configuration/TypoScript', 'CookieConsent');