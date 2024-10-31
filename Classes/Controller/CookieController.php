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

namespace DirkPersky\DpCookieconsent\Controller;

use ArrayObject;
use DirkPersky\DpCookieconsent\Domain\Repository\CookieRepository;
use TYPO3\CMS\Core\Service\FlexFormService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController;
use Psr\Http\Message\ResponseInterface;

class CookieController extends ActionController
{

    /**
     * @var CookieRepository
     */
    protected $cookieRepository;

    /**
     * @param CookieRepository
     */
    public function injectCookieRepository(CookieRepository $cookieRepository)
    {
        $this->cookieRepository = $cookieRepository;
    }

    /**
     * @return void
     */
    public function listAction(): ResponseInterface
    {
        $cObj = $this->request->getAttribute('currentContentObject');
        // parse Flexform
        $flexFormData = GeneralUtility::makeInstance(FlexFormService::class)->convertFlexFormContentToArray($cObj->data['pi_flexform']);
        // get Cookies
        $cookies = $this->cookieRepository->findByPid($flexFormData['settings']['startingpoint'], $flexFormData['settings']['recursive']);
        // group cookies
        $grouped = [];
        foreach ($cookies as $cookie) {
            $category = \TYPO3\CMS\Extbase\Utility\LocalizationUtility::translate('cookie.category.' . $cookie->getCategory(), 'dp_cookieconsent');
            if ($cookie->getCategory() == 3) $category = $cookie->getCategoryName();

            if (!isset($grouped[$category])) {
                $grouped[$category] = new ArrayObject([
                    'category' => $category,
                    'items' => new ArrayObject([])
                ]);
            }
            $grouped[$category]['items'][] = $cookie;
        }

        usort($grouped, function ($a, $b){
            if(strtolower($a['category']) == 'required') return -1;
            if(strtolower($b['category']) == 'required') return 1;
            return $a['category'] <=> $b['category'];
        });

        $grouped = new ArrayObject($grouped);

        // update settings
        $this->settings['base_uri'] = parse_url($this->request->getAttribute('normalizedParams')->getSiteUrl());
        $this->view->assign('settings', $this->settings);
        // add data to view
        $this->view->assign('data', $cObj->data);
        $this->view->assign('cookies', $cookies);
        $this->view->assign('grouped', $grouped);

        return $this->htmlResponse();
    }
}
