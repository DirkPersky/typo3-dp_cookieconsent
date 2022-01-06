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
            'typo3' => '10.4.0-11.5.99'
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
    'state' => 'stable', // stable
    'version' => '11.5.0'
];

