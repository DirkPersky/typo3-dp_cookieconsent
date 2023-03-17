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

    /**
     * Add Icons for BE Module
     */
    if (TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('adminpanel')) {
        $icons = [
            'apps-cookie-folder-contains' => 'ext-dp-cookie-folder.svg',
            'apps-cookie-content-item' => 'ext-dp-cookie-content.svg'
        ];
        $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
        foreach ($icons as $key => $file) {
            if (!$iconRegistry->isRegistered($key)) {
                $iconRegistry->registerIcon(
                    $key,
                    \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
                    ['source' => 'EXT:dp_cookieconsent/Resources/Public/Icons/' . $file]
                );
            }
        }
    }
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
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
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