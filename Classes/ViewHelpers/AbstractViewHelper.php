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

namespace DirkPersky\DpCookieconsent\ViewHelpers;

use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper AS FluidAbstractViewHelper;
use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper AS LegacyAbstractViewHelper;

/*
 * https://docs.typo3.org/c/typo3/cms-core/master/en-us/Changelog/9.5.x/Deprecation-87277-FluidClassAliases.html
 *
 * TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper is deprecated since 9.5 and is removed in 10.3
 * But the new Class only exists since 8.6 LTS
 *
 * Support Older TYPO3 Versions
 */
if(class_exists(FluidAbstractViewHelper::class) === true) {
    /**
     * TYPO3 8.6+
     * Class TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper
     * @package DirkPersky\DpCookieconsent\ViewHelpers
     */
    abstract class AbstractViewHelper extends FluidAbstractViewHelper
    {
    }

} else {
    /**
     * TYPO3 6.2 - 7.6
     * Class TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
     * @package DirkPersky\DpCookieconsent\ViewHelpers
     */
    abstract class AbstractViewHelper extends LegacyAbstractViewHelper
    {
    }
}
