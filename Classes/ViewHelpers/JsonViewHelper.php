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

use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

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
class JsonViewHelper extends AbstractViewHelper {
    /**
     * Replaces newline characters by HTML line breaks.
     *
     * @return string the altered string.
     * @api
     */
    public function render() {
        $value = $this->renderChildren();

        $options = JSON_HEX_TAG;
        return json_encode($value, $options);
    }
}
