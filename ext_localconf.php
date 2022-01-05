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

use DirkPersky\DpCookieconsent\Controller\CookieController;
use DirkPersky\DpCookieconsent\Controller\ScriptController;
use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;
use TYPO3\CMS\Core\Imaging\IconRegistry;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Utility\ExtensionUtility;

defined('TYPO3_MODE') or die();

$boot = static function (): void {

    /**
     * Add Icons for BE Module
     */
    if (TYPO3_MODE === 'BE') {
        $icons = [
            'apps-cookie-folder-contains' => 'ext-dp-cookie-folder.svg',
            'apps-cookie-content-item' => 'ext-dp-cookie-content.svg'
        ];
        $iconRegistry = GeneralUtility::makeInstance(IconRegistry::class);
        foreach ($icons as $key => $file) {
            if (!$iconRegistry->isRegistered($key)) {
                $iconRegistry->registerIcon(
                    $key,
                    SvgIconProvider::class,
                    ['source' => 'EXT:dp_cookieconsent/Resources/Public/Icons/' . $file]
                );
            }
        }
    }
    // add Controller
    ExtensionUtility::configurePlugin(
        'DirkPersky.DpCookieconsent',
        'Pi1',
        [
            ScriptController::class => 'list,show',
        ],
        // non-cacheable actions
        [
            ScriptController::class => 'show',
        ]
    );
    // add Controller
    ExtensionUtility::configurePlugin(
        'DirkPersky.DpCookieconsent',
        'Pi2',
        [
            CookieController::class => 'list,ajax',
        ],
        // non-cacheable actions
        [
        ]
    );
    // wizards
    ExtensionManagementUtility::addPageTSConfig(
        'mod {
            wizards.newContentElement.wizardItems.plugins {
                elements {
                    dpcookieconsent_pi1 {
                        iconIdentifier = apps-cookie-content-item
                        title = LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_ajax.title
                        description = LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_ajax.description
                        tt_content_defValues {
                            CType = list
                            list_type = dpcookieconsent_pi1
                        }
                    }
                    
                    dpcookieconsent_pi2 {
                        iconIdentifier = apps-cookie-content-item
                        title = LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_cookie.title
                        description = LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_cookie.description
                        tt_content_defValues {
                            CType = list
                            list_type = dpcookieconsent_pi2
                        }
                    }
                }
                
                show := addToList(dpcookieconsent_pi1, dpcookieconsent_pi2)
            }
       }'
    );
};
$boot();
unset($boot);