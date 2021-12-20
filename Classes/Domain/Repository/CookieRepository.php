<?php

namespace DirkPersky\DpCookieconsent\Domain\Repository;

use TYPO3\CMS\Extbase\Persistence\QueryInterface;
use TYPO3\CMS\Extbase\Persistence\Repository;

class CookieRepository extends Repository
{

    // Order by BE sorting
    protected $defaultOrderings = array(
        'sorting' => QueryInterface::ORDER_ASCENDING
    );


}