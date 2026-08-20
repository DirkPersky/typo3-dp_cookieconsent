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

// NOTE: TYPO3 v14 removed the tt_content "list_type" field and the classic
// "General Plugin" (CType=list) subtype mechanism entirely. Plugins must be
// registered with their own dedicated CType. This also keeps compatibility
// with TYPO3 v12/v13, since ExtensionUtility::registerPlugin() has created
// CType-based plugins as the recommended approach since v12.4.
// See: https://docs.typo3.org/m/typo3/reference-tca/13.4/en-us/Types/SubtypeMigration.html

/**
 * add Content Loading obj
 */
$pluginSignaturePi1 = \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'dp_cookieconsent',
    'Pi1',
    'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_ajax.title'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'tt_content',
    'pi_flexform',
    $pluginSignaturePi1,
    'after:subheader'
);
// set Flexform for content loading
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:dp_cookieconsent/Configuration/FlexForms/ConsentAjax.xml',
    $pluginSignaturePi1
);

/**
 * add Cookie list ob
 */
$pluginSignaturePi2 = \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'dp_cookieconsent',
    'Pi2',
    'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_cookie.title'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'tt_content',
    'pi_flexform',
    $pluginSignaturePi2,
    'after:subheader'
);
// set Flexform for Cookie List
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:dp_cookieconsent/Configuration/FlexForms/ConsentCookies.xml',
    $pluginSignaturePi2
);
