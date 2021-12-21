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

use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;
use TYPO3\CMS\Core\Imaging\IconRegistry;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3_MODE') or die();

$boot = static function (): void {

    /**
     * Add Icons for BE Module
     */
    if (TYPO3_MODE === 'BE') {
        $icons = [
            'apps-cookie-folder-contains' => 'ext-dp-cookie-folder.svg',
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

    // wizards
    ExtensionManagementUtility::addPageTSConfig(
        'mod {
            wizards.newContentElement.wizardItems.plugins {
                elements {
                    dpcookieconsent_pi1 {
                        iconIdentifier = apps-cookie-folder-contains
                        title = LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_ajax.title
                        description = LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_ajax.description
                        tt_content_defValues {
                            CType = list
                            list_type = dpcookieconsent_pi1
                        }
                    }
                }
                show := addToList(dpcookieconsent_pi1)
            }
       }'
    );

};
$boot();
unset($boot);