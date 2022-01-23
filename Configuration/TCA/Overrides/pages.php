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

defined('TYPO3_MODE') or die();

// Override icon
$GLOBALS['TCA']['pages']['columns']['module']['config']['items'][] = [
    0 => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_be.xlf:cookie-folder',
    1 => 'dpcookie',
    2 => 'apps-cookie-folder-contains'
];

$GLOBALS['TCA']['pages']['ctrl']['typeicon_classes']['contains-dpcookie'] = 'apps-cookie-folder-contains';
