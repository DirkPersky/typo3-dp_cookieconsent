/*
 * Copyright (c) 2021.
 *
 * @category   TYPO3
 *
 * @copyright  2021 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <info@dp-wired.de>
 * @license    MIT
 */

CREATE TABLE tx_dpcookieconsent_domain_model_cookie
(
    uid              int(11) NOT NULL auto_increment,
    pid              int(11) DEFAULT '0' NOT NULL,

    category         varchar(255) DEFAULT '' NOT NULL,
    name             varchar(255) DEFAULT '' NOT NULL,
    description      varchar(255) DEFAULT '' NOT NULL,
    duration         varchar(255) DEFAULT '' NOT NULL,
    duration_time    varchar(255) DEFAULT '' NOT NULL,
    vendor           varchar(255) DEFAULT '' NOT NULL,
    vendor_link      varchar(255) DEFAULT '' NOT NULL,

    script_src       varchar(255) DEFAULT '' NOT NULL,
    script           text,

    tstamp           int(11) unsigned DEFAULT '0' NOT NULL,
    crdate           int(11) unsigned DEFAULT '0' NOT NULL,
    cruser_id        int(11) unsigned DEFAULT '0' NOT NULL,
    deleted          tinyint(4) DEFAULT '0' NOT NULL,
    hidden           tinyint(4) DEFAULT '0' NOT NULL,
    starttime        int(11) unsigned DEFAULT '0' NOT NULL,
    endtime          int(11) unsigned DEFAULT '0' NOT NULL,
    sorting          int(11) DEFAULT '0' NOT NULL,

    PRIMARY KEY (uid),
    KEY              parent (pid),
);
