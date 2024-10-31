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
use TYPO3\CMS\Core\TypoScript\AST\Node\ChildNode;
use TYPO3\CMS\Core\TypoScript\AST\Node\RootNode;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Database\ConnectionPool;

class PlainRenderingMiddleware implements MiddlewareInterface
{
    private const namespace = 'tx_dpcookieconsent_pi1';

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        // check for default handling
        $controller = $request->getAttribute('frontend.controller');
        if (!isset($request->getQueryParams()[self::namespace]) || !$controller->isGeneratePage()) {
            return $handler->handle($request);
        }

        $frontendTyposcript = $request->getAttribute('frontend.typoscript');

        $configArray = $frontendTyposcript->getConfigArray();
        $configArray['debug'] = 0;
        $configArray['disableAllHeaderCode'] = 1;
        $configArray['disableCharsetHeader'] = 0;
        $frontendTyposcript->setConfigArray($configArray);

        // prepare rendering overwrite
        // set UID
        $uid = $request->getQueryParams()[self::namespace]['content'];

        $pageArray = $frontendTyposcript->getPageArray();
        $pageArray['10'] = 'COA';
        $pageArray['10.'] = [
            '10' => 'RECORDS',
            '10.' => [
                'tables' => 'tt_content',
                'source' => "tt_content_{$uid}"
            ]
        ];
        $frontendTyposcript->setPageArray($pageArray);

        $request = $request->withAttribute('frontend.typoscript', $frontendTyposcript);

        return $handler->handle($request);
    }
}