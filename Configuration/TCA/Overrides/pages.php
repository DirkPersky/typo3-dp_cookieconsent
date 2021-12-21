<?php

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3_MODE') or die();

// Override news icon
$GLOBALS['TCA']['pages']['columns']['module']['config']['items'][] = [
    0 => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_be.xlf:cookie-folder',
    1 => 'dpcookie',
    2 => 'apps-cookie-folder-contains'
];

$GLOBALS['TCA']['pages']['ctrl']['typeicon_classes']['contains-dpcookie'] = 'apps-cookie-folder-contains';

ExtensionManagementUtility::registerPageTSConfigFile(
    'news',
    'Configuration/TSconfig/Page/news_only.tsconfig',
    'EXT:news :: Restrict pages to news records'
);