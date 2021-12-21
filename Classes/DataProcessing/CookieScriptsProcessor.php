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

namespace DirkPersky\DpCookieconsent\DataProcessing;

use DirkPersky\DpCookieconsent\Domain\Repository\CookieRepository;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

class CookieScriptsProcessor implements DataProcessorInterface
{
    public function process(
        ContentObjectRenderer $cObj,
        array                 $contentObjectConfiguration,
        array                 $processorConfiguration,
        array                 $processedData
    ): array
    {
        if (isset($processorConfiguration['if.']) && !$cObj->checkIf($processorConfiguration['if.'])) {
            // leave $processedData unchanged in case there were previous other processors
            return $processedData;
        }
        /** @var CookieRepository $cookieRepository */
        $cookieRepository = GeneralUtility::makeInstance(CookieRepository::class);
        /** find all Cookies for site */
        $cookies = $cookieRepository->findActiveScripts((int)$processorConfiguration['pid']);
        // set the storage into a variable, default "dp_cookie_scripts"
        $targetVariableName = $cObj->stdWrapValue('as', $processorConfiguration, 'dp_cookie_scripts');
        // store result
        $processedData[$targetVariableName] = $cookies;
        return $processedData;
    }
}