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

namespace DirkPersky\DpCookieconsent\Domain\Model;

use DateTime;
use TYPO3\CMS\Extbase\DomainObject\AbstractEntity;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * This file is part of the "dp_cookieconsent" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.md file that was distributed with this source code.
 */
class Cookie extends AbstractEntity
{
    /**
     * @var string
     */
    protected $durationTime;

    /**
     * @var string
     */
    protected $scriptSrc;

    /**
     * @var string
     */
    protected $script;

    /**
     * @var string
     */
    protected $category = '';
    /**
     * @var string
     */
    protected $categoryName;
    /**
     * @var string
     */
    protected $name = '';

    /**
     * @var string
     */
    protected $description = '';

    /**
     * @var string
     */
    protected $descriptionLong;


    /**
     * @var string
     */
    protected $duration = '';

    /**
     * @var string
     */
    protected $vendor = '';

    /**
     * @var string
     */
    protected $vendorLink = '';

    /**
     * @var DateTime
     */
    protected $crdate;

    /**
     * @var DateTime
     */
    protected $tstamp;

    /**
     * @var DateTime
     */
    protected $starttime;

    /**
     * @var DateTime
     */
    protected $endtime;
    /**
     * @var bool
     */
    protected $hidden = false;

    /**
     * @var bool
     */
    protected $deleted = false;

    /**
     * @var int
     */
    protected $sorting = 0;


    /**
     * @return bool
     */
    public function getHidden(): bool
    {
        return $this->hidden;
    }

    /**
     * @param bool $hidden
     */
    public function setHidden(bool $hidden): void
    {
        $this->hidden = $hidden;
    }

    /**
     * @return bool
     */
    public function getDeleted(): bool
    {
        return $this->deleted;
    }

    /**
     * @param bool $deleted
     */
    public function setDeleted(bool $deleted): void
    {
        $this->deleted = $deleted;
    }

    /**
     * @return string
     */
    public function getDurationTime(): string
    {
        return $this->durationTime;
    }

    /**
     * @param string $durationTime
     */
    public function setDurationTime(string $durationTime): void
    {
        $this->durationTime = $durationTime;
    }

    /**
     * @return string
     */
    public function getScriptSrc(): string
    {
        return $this->scriptSrc;
    }

    /**
     * @param string $scriptSrc
     */
    public function setScriptSrc(string $scriptSrc): void
    {
        $this->scriptSrc = $scriptSrc;
    }

    /**
     * @return string
     */
    public function getScript(): string
    {
        return $this->script;
    }

    /**
     * @param string $script
     */
    public function setScript(string $script): void
    {
        $this->script = $script;
    }

    /**
     * @return string
     */
    public function getCategory(): string
    {
        return $this->category;
    }

    /**
     * @param string $category
     */
    public function setCategory(string $category): void
    {
        $this->category = $category;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }


    /**
     * @return string
     */
    public function getDescriptionLong(): mixed
    {
        return $this->descriptionLong;
    }

    /**
     * @param string $descriptionLong
     */
    public function setDescriptionLong(string $descriptionLong): void
    {
        $this->descriptionLong = $descriptionLong;
    }

    /**
     * @return mixed
     */
    public function getCategoryName(): mixed
    {
        return $this->categoryName;
    }

    /**
     * @param string $categoryName
     * @return void
     */
    public function setCategoryName(string $categoryName): void
    {
        $this->categoryName = $categoryName;
    }



    /**
     * @return string
     */
    public function getDuration(): string
    {
        return $this->duration;
    }

    /**
     * @param string $duration
     */
    public function setDuration(string $duration): void
    {
        $this->duration = $duration;
    }

    /**
     * @return string
     */
    public function getVendor(): string
    {
        return $this->vendor;
    }

    /**
     * @param string $vendor
     */
    public function setVendor(string $vendor): void
    {
        $this->vendor = $vendor;
    }

    /**
     * @return string
     */
    public function getVendorLink(): string
    {
        return $this->vendorLink;
    }

    /**
     * @param string $vendorLink
     */
    public function setVendorLink(string $vendorLink): void
    {
        $this->vendorLink = $vendorLink;
    }

    /**
     * @return DateTime
     */
    public function getCrdate(): DateTime
    {
        return $this->crdate;
    }

    /**
     * @param DateTime $crdate
     */
    public function setCrdate(DateTime $crdate): void
    {
        $this->crdate = $crdate;
    }

    /**
     * @return DateTime
     */
    public function getTstamp(): DateTime
    {
        return $this->tstamp;
    }

    /**
     * @param DateTime $tstamp
     */
    public function setTstamp(DateTime $tstamp): void
    {
        $this->tstamp = $tstamp;
    }

    /**
     * @return DateTime
     */
    public function getStarttime(): DateTime
    {
        return $this->starttime;
    }

    /**
     * @param DateTime $starttime
     */
    public function setStarttime(DateTime $starttime): void
    {
        $this->starttime = $starttime;
    }

    /**
     * @return DateTime
     */
    public function getEndtime(): DateTime
    {
        return $this->endtime;
    }

    /**
     * @param DateTime $endtime
     */
    public function setEndtime(DateTime $endtime): void
    {
        $this->endtime = $endtime;
    }

    /**
     * @return int
     */
    public function getSorting(): int
    {
        return $this->sorting;
    }

    /**
     * @param int $sorting
     */
    public function setSorting(int $sorting): void
    {
        $this->sorting = $sorting;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        switch ($this->category) {
            case '3':
                $type = strtolower($this->categoryName);
                break;
            case '1':
                $type = 'statistics';
                break;
            case '2':
                $type = 'marketing';
                break;
            default:
                $type = 'required';
        }

        return $type;
    }

}
