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

return [
    'frontend' => [
        'dirkpersky/plain-rendering-handler' => [
            'target' => DirkPersky\DpCookieconsent\Middleware\PlainRenderingMiddleware::class,
            'description' => '',
            'after' => [
                'typo3/cms-frontend/prepare-tsfe-rendering',
            ],
        ],
    ],
];