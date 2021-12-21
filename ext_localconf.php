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

use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;
use TYPO3\CMS\Core\Imaging\IconRegistry;
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

};
$boot();
unset($boot);