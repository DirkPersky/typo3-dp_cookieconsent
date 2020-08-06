<?php
/**
 * Copyright (c) 2020.
 *
 * @category   TYPO3
 *
 * @copyright  2020 Dirk Persky
 * @author     Dirk Persky <info@dp-dvelop.de>
 * @license    MIT
 */

$EM_CONF[$_EXTKEY] = [
    'title' => 'Cookie Consent',
    'description' => 'Include Cookie Consent, a lightweight JavaScript plugin for alerting users about the use of cookies on your website.',
    'category' => 'fe',
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 0,
    'author' => 'Dirk Persky',
    'author_email' => 'infoy@dp-dvelop.de',
    'version' => '10.5.5',
    'constraints' => [
        'depends' => [
            'typo3' => '6.2.0-10.4.99'
        ],
        'conflicts' => [],
        'suggests' => [
            'setup' => '',
        ],
    ],
];

