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

defined('TYPO3') or die('Access denied.');

$boot = static function (): void {
    // add Controller
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
        'DpCookieconsent',
        'Pi1',
        [
            \DirkPersky\DpCookieconsent\Controller\ScriptController::class => 'list,show',
        ],
        // non-cacheable actions
        [
            \DirkPersky\DpCookieconsent\Controller\ScriptController::class => 'show',
        ]
    );
    // add Controller
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
        'DpCookieconsent',
        'Pi2',
        [
            \DirkPersky\DpCookieconsent\Controller\CookieController::class => 'list',
        ],
        // non-cacheable actions
        [
        ]
    );
    // wizards
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
    @import \'EXT:dp_cookieconsent/Configuration/TSconfig/ContentElementWizard.tsconfig\'
    ');
};
$boot();
unset($boot);