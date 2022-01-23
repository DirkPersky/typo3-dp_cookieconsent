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

defined('TYPO3_MODE') || die();

/**
 * add Content Loading obj
 */
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'dp_cookieconsent',
    'Pi1',
    'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_ajax.title'
);
$GLOBALS['TCA']['tt_content']['types']['list']['subtypes_excludelist']['dpcookieconsent_pi1'] = 'recursive,select_key,pages';
$GLOBALS['TCA']['tt_content']['types']['list']['subtypes_addlist']['dpcookieconsent_pi1'] = 'pi_flexform';
// set Flexform for content loading
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    'dpcookieconsent_pi1',
    'FILE:EXT:dp_cookieconsent/Configuration/FlexForms/ConsentAjax.xml'
);
/**
 * add Cookie list ob
 */
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    'dp_cookieconsent',
    'Pi2',
    'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_cookie.title'
);
$GLOBALS['TCA']['tt_content']['types']['list']['subtypes_excludelist']['dpcookieconsent_pi2'] = 'recursive,select_key,pages';
$GLOBALS['TCA']['tt_content']['types']['list']['subtypes_addlist']['dpcookieconsent_pi2'] = 'pi_flexform';
// set Flexform for Cookie List
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    'dpcookieconsent_pi2',
    'FILE:EXT:dp_cookieconsent/Configuration/FlexForms/ConsentCookies.xml'
);
