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
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\QueryHelper;
use TYPO3\CMS\Core\Database\Query\Restriction\DeletedRestriction;
use TYPO3\CMS\Core\Database\Connection;


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

    public function getTreeList($id, $depth, $begin = 0, $permClause = '')
    {
        $depth = (int)$depth;
        $begin = (int)$begin;
        $id = (int)$id;
        if ($id < 0) {
            $id = abs($id);
        }
        if ($begin === 0) {
            $theList = $id;
        } else {
            $theList = '';
        }
        if ($id && $depth > 0) {
            $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)->getQueryBuilderForTable('pages');
            $queryBuilder->getRestrictions()->removeAll()->add(GeneralUtility::makeInstance(DeletedRestriction::class));
            $queryBuilder->select('uid')
                ->from('pages')
                ->where(
                    $queryBuilder->expr()->eq('pid', $queryBuilder->createNamedParameter($id, Connection::PARAM_INT)),
                    $queryBuilder->expr()->eq('sys_language_uid', 0)
                )
                ->orderBy('uid');
            if ($permClause !== '') {
                $queryBuilder->andWhere(QueryHelper::stripLogicalOperatorPrefix($permClause));
            }
            $statement = $queryBuilder->executeQuery();
            while ($row = $statement->fetchAssociative()) {
                if ($begin <= 0) {
                    $theList .= ',' . $row['uid'];
                }
                if ($depth > 1) {
                    $theSubList = $this->getTreeList($row['uid'], $depth - 1, $begin - 1, $permClause);
                    if (!empty($theList) && !empty($theSubList) && ($theSubList[0] !== ',')) {
                        $theList .= ',';
                    }
                    $theList .= $theSubList;
                }
            }
        }
        return $theList;
    }

    protected function getPidList($pidList, $recursive = '')
    {
        $recursive = (int)$recursive;
        // if no recursiv return pidList
        if ($recursive <= 0) return GeneralUtility::intExplode(',', $pidList);
        // explode list
        $storagePids = GeneralUtility::intExplode(',', (string)$pidList);
        // build PID list
        $recursiveStoragePids = $storagePids;
        // loop pids and get tree
        foreach ($storagePids as $startPid) {
            if ($startPid >= 0) {
                // get DB query for getting pids
                $pids = $this->getTreeList($startPid, $recursive);
                // explode to array
                $pids = GeneralUtility::intExplode(',', (string)$pids);
                // if not empty add to list
                if (!empty($pids)) $recursiveStoragePids = array_merge($recursiveStoragePids, $pids);
            }
        }
        // return array
        return array_unique($recursiveStoragePids);
    }

    /**
     * @param integer $pid
     * @return mixed
     */
    public function findByPid($pid, $recursive = '')
    {
        $query = $this->createQuery();
        // set new storage PIDs
        $query->getQuerySettings()->setStoragePageIds($this->getPidList($pid, $recursive));
        // execute statement
        return $query->execute();
    }

    public function findActiveScripts($pid, $recursive = 250)
    {
        $query = $this->createQuery();
        // set new storage PIDs
        $query->getQuerySettings()->setStoragePageIds($this->getPidList($pid, $recursive));
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