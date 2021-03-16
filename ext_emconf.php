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

$EM_CONF[$_EXTKEY] = [
    'title' => 'Cookie Consent',
    'description' => 'Include Cookie Consent, a lightweight JavaScript plugin for alerting users about the use of cookies on your website.',
    'category' => 'fe',
    'clearCacheOnLoad' => true,
    'author' => 'Dirk Persky',
    'author_company' => '',
    'author_email' => 'infoy@dp-wired.de',
    'constraints' => [
        'depends' => [
            'typo3' => '6.2.0-11.1.99'
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
    'state' => 'stable',
    'version' => '11.0.0'
];

