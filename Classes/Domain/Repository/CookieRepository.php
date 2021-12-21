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

namespace DirkPersky\DpCookieconsent\Domain\Repository;

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Persistence\Generic\Typo3QuerySettings;
use TYPO3\CMS\Extbase\Persistence\QueryInterface;
use TYPO3\CMS\Extbase\Persistence\Repository;

class CookieRepository extends Repository
{
    // Order by BE sorting
    protected $defaultOrderings = array(
        'sorting' => QueryInterface::ORDER_ASCENDING
    );

    public function initializeObject()
    {
        /** @var Typo3QuerySettings $querySettings */
        $querySettings = GeneralUtility::makeInstance(Typo3QuerySettings::class);
        // don't add sys_language_uid constraint
        $querySettings->setRespectSysLanguage(FALSE);
        // save default Settings
        $this->setDefaultQuerySettings($querySettings);
    }

    /**
     * @param integer $pid
     * @return mixed
     */
    public function findByPid(int $pid)
    {
        $query = $this->createQuery();
        // set new storage PIDs
        $query->getQuerySettings()->setStoragePageIds([$pid]);
        // execute statement
        return $query->execute();
    }

    public function findActiveScripts(int $pid)
    {
        $query = $this->createQuery();
        // set new storage PIDs
        $query->getQuerySettings()->setStoragePageIds([$pid]);
        // set filter
        $query->matching(
            $query->logicalAnd(
                $query->logicalNot(
                    $query->logicalAnd(
                        $query->equals('script', ''),
                        $query->equals('script_src', '')
                    )
                ),
                $query->greaterThan('category', 0)
            )
        );
        // execute statement
        return $query->execute();
    }

}