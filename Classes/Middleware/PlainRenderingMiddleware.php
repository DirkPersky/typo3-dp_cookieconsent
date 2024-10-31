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
use TYPO3\CMS\Core\Information\Typo3Version;

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

        // get frontend typoscript
        $frontendTyposcript = $request->getAttribute('frontend.typoscript');
        // prepare rendering overwrite
        // set UID
        $uid = $request->getQueryParams()[self::namespace]['content'];
        // get current typo3 version
        $version = GeneralUtility::makeInstance(Typo3Version::class)->getMajorVersion();
        // prepare page rendering
        $pageArray = [
            '10' => 'COA',
            '10.' => [
                '10' => 'RECORDS',
                '10.' => [
                    'tables' => 'tt_content',
                    'source' => "tt_content_{$uid}"
                ]
            ]
        ];
        // get frontend typoscript
        $setup = $frontendTyposcript->getSetupArray();
        // change fluid Layout to remove Wrap
        if (isset($setup['lib.']['contentElement.'])) $setup['lib.']['contentElement.']['layoutRootPaths.'][999] = 'EXT:dp_cookieconsent/Resources/Private/Overwrite/Layouts/';
        // TODO Check: Working T3 v 13?
        if ($version >= 13) {
            $configArray = $frontendTyposcript->getConfigArray();
            $configArray = array_merge($configArray, [
                'debug' => 0,
                'disableAllHeaderCode' => 1,
                'disableCharsetHeader' => 0
            ]);
            // disable svgstore
            if (isset($configArray['svgstore.'])) $configArray['svgstore.']['enabled'] = 0;
            $frontendTyposcript->setSetupArray($setup);
            $frontendTyposcript->setConfigArray($configArray);
            $frontendTyposcript->setPageArray($pageArray);
        } else {
            // fallback to older TYPO3 versions
            $setup['config.'] = array_merge($setup['config.'], [
                'debug' => 0,
                'disableAllHeaderCode' => 1,
                'disableCharsetHeader' => 0
            ]);
            // disable svgstore
            if (isset($setup['config.']['svgstore.'])) $setup['config.']['svgstore.']['enabled'] = 0;
            // set TypoScript updates
            $frontendTyposcript->setSetupArray($setup);
            $controller->pSetup = $pageArray;
        }

        $request = $request->withAttribute('frontend.typoscript', $frontendTyposcript);
        return $handler->handle($request);
    }
}