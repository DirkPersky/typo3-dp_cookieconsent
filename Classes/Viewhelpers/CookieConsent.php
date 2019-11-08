<?php

namespace DirkPersky\CookieConsent\Viewhelpers;

use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * @package my_extension
 * @subpackage ViewHelpers
 * @author Name
 */
class CookieConsent extends AbstractViewHelper
{

    public static function renderStatic(
        array $arguments,
        \Closure $renderChildrenClosure,
        RenderingContextInterface $renderingContext
    )
    {
        return 'console.log("test");';
    }
}