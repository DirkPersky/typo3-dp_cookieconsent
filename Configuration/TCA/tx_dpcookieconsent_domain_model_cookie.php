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

defined('TYPO3') or die();

return [
    'ctrl' => [
        'title' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie',
        'label' => 'name',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'cruser_id' => 'cruser_id',
        'sortby' => 'sorting',
        'delete' => 'deleted',
        'enablecolumns' => [
            'disabled' => 'hidden',
            'starttime' => 'starttime',
            'endtime' => 'endtime',
        ],
        'searchFields' => 'name,description,vendor,duration,category',
        'iconfile' => 'EXT:dp_cookieconsent/Resources/Public/Icons/ext-dp-cookie-icon.png'
    ],
    'palettes' => [
        'type' => [
            'showitem' => 'name, category'
        ],
        'dur' => [
            'showitem' => 'duration, duration_time'
        ],
        'vend' => [
            'showitem' => 'vendor, vendor_link'
        ]
    ],

    'types' => [
        '0' => [
            'showitem' => '
                hidden, 
                    --palette--;LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.name; type,
                    description, 
                    --palette--;LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.duration; dur,
                    --palette--;LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.vendor; vend, 
                --div--;LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.script, script_src, script,
                --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.access, starttime, endtime'
        ],
    ],
    'columns' => [
        'hidden' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.hidden',
            'config' => [
                'type' => 'check',
                'renderType' => 'checkboxToggle',
                'default' => 1,
                'items' => [
                    [
                        0 => '',
                        1 => '',
                        'invertStateDisplay' => true,
                    ],
                ],
            ],
        ],
        'starttime' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.starttime',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputDateTime',
                'eval' => 'datetime,int',
                'default' => 0,
                'behaviour' => [
                    'allowLanguageSynchronization' => true,
                ],
            ],
        ],
        'endtime' => [
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.endtime',
            'config' => [
                'type' => 'input',
                'renderType' => 'inputDateTime',
                'eval' => 'datetime,int',
                'default' => 0,
                'range' => [
                    'upper' => mktime(0, 0, 0, 1, 1, 2038),
                ],
                'behaviour' => [
                    'allowLanguageSynchronization' => true,
                ],
            ],
        ],

        'name' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.name',
            'config' => [
                'type' => 'input',
                'size' => 75,
                'eval' => 'trim,required'
            ],
        ],
        'category' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.category',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'default' => 0,
                'items' => [
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.category.0', 0],
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.category.1', 1],
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.category.2', 2],
                ],
            ],
            'onChange' => 'reload'
        ],
        'description' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.description',
            'description' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.description.info',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim'
            ],
        ],
        'duration' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.duration',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim,required'
            ],
        ],

        'duration_time' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.duration_time',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'default' => 0,
                'items' => [
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.duration_time.0', 0],
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.duration_time.1', 1],
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.duration_time.2', 2],
                ],
            ],
        ],

        'vendor' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.vendor',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim,required'
            ],
        ],
        'vendor_link' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.vendor_link',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim',
                'renderType' => 'inputLink',
                'fieldControl' => [
                    'linkPopup' => [
                        'options' => [
                            'blindLinkOptions' => 'file, folder, mail, spec, telephone'
                        ]
                    ]
                ]
            ],
        ],

        'script_src' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.script_src',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim',
                'renderType' => 'inputLink',
                'fieldControl' => [
                    'linkPopup' => [
                        'options' => [
                            'blindLinkOptions' => 'page, folder, mail, spec, telephone'
                        ]
                    ]
                ]
            ],
            'displayCond' => 'FIELD:category:>:0'
        ],

        'script' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dpcookieconsent_domain_model_cookie.script',
            'config' => [
                'type' => 'text',
                'cols' => 50,
                'rows' => 15,
                'eval' => 'trim',
                'renderType' => 't3editor',
                'format' => 'javascript'
            ],
            'displayCond' => 'FIELD:category:>:0'
        ],
    ]
];