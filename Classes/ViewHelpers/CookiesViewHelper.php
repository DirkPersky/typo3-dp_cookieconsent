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

namespace DirkPersky\DpCookieconsent\ViewHelpers;

use DirkPersky\DpCookieconsent\Domain\Repository\CookieRepository;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;

/**
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
class CookiesViewHelper extends AbstractViewHelper
{
    /**
     * Replaces newline characters by HTML line breaks.
     *
     * @return string the altered string.
     * @api
     */
    public function render()
    {
        $value = $this->renderChildren();
        $options = JSON_HEX_TAG;
        $data = [];

        if (!isset($value['storagePid']) || empty($value['storagePid'])) return json_encode($data, $options);
        $cookieRepository = GeneralUtility::makeInstance(CookieRepository::class);
        // get Cookies
        $cookies = $cookieRepository->findByPid($value['storagePid'], 99);

        $cobj = GeneralUtility::makeInstance(ContentObjectRenderer::class);

        foreach ($cookies as $cookie) {
            $category = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('cookie.category.'.$cookie->getCategory(), 'dp_cookieconsent');


            if (!isset($data[$category])) $data[$category] = ['name' => $category, 'cookies' => []];

            $durationTime = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('cookie.duration_time.'.$cookie->getDurationTime(), 'dp_cookieconsent');


            $data[$category]['cookies'][] = [
                'cookie_name' => $cookie->getName(),
                'cookie_description_short' => $cookie->getDescription(),
                'cookie_description' => $cookie->getDescriptionLong(),

                'cookie_duration' => $cookie->getDuration(),
                'cookie_duration_time'  => $durationTime,

                'cookie_vendor' => $cookie->getVendor(),
                'cookie_vendor_link' => $cobj->typoLink_URL(['parameter' => $cookie->getVendorLink()]),
            ];
        }

        return json_encode(array_values($data), $options);
    }
}
