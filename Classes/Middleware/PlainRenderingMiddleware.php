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

namespace DirkPersky\DpCookieconsent\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Database\ConnectionPool;

class PlainRenderingMiddleware implements MiddlewareInterface
{
    private const namespace = 'tx_dpcookieconsent_pi1';

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $frontendController = $GLOBALS['TSFE'];
        // check for default handling
        if (!$frontendController->isGeneratePage() || !isset($request->getQueryParams()[self::namespace])) {
            return $handler->handle($request);
        }
        // prepare rendering overwrite
        $frontendController->config['config']['debug'] = 0;
        $frontendController->config['config']['disableAllHeaderCode'] = 1;
        $frontendController->config['config']['disableCharsetHeader'] = 0;
        // disable svgstore
        if (isset($frontendController->config['config']['svgstore.'])) $frontendController->config['config']['svgstore.']['enabled'] = 0;
        // set UID
        $uid = $request->getQueryParams()[self::namespace]['content'];
        // prepare typoscript
        $frontendController->pSetup = [
            '10' => 'COA',
            '10.' => [
                '10' => 'RECORDS',
                '10.' => [
                    'tables' => 'tt_content',
                    'source' => "tt_content_{$uid}"
                ]
            ],
        ];
        // change fluid Layout to remove Wrap
        if (isset($frontendController->tmpl->setup['lib.']['contentElement.'])) $frontendController->tmpl->setup['lib.']['contentElement.']['layoutRootPaths.'][999] = 'EXT:dp_cookieconsent/Resources/Private/Overwrite/Layouts/';
        // handle result
        return $handler->handle($request);
    }

}