<?php

$iconList = [];
foreach ([
     'apps-cookie-folder-contains' => 'ext-dp-cookie-folder.svg',
     'apps-cookie-content-item' => 'ext-dp-cookie-content.svg'
] as $identifier => $path) {
    $iconList[$identifier] = [
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        'source' => 'EXT:dp_cookieconsent/Resources/Public/Icons/' . $path,
    ];
}

return $iconList;
