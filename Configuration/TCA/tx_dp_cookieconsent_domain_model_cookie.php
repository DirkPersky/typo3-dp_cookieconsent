<?php

defined('TYPO3_MODE') or die();

return [
    'ctrl' => [
        'title' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie',
        'label' => 'name',
        'tstamp' => 'tstamp',
        'crdate' => 'crdate',
        'cruser_id' => 'cruser_id',
        'versioningWS' => true,
        'languageField' => 'sys_language_uid',
        'transOrigPointerField' => 'l10n_parent',
        'transOrigDiffSourceField' => 'l10n_diffsource',
        'delete' => 'deleted',
        'enablecolumns' => [
            'disabled' => 'hidden',
            'starttime' => 'starttime',
            'endtime' => 'endtime',
        ],
        'searchFields' => 'name,description,vendor,duration,category',
        'iconfile' => 'EXT:dp_cookieconsent/ext_icon.png'
    ],
    'types' => [
        '0' => [
            'showitem' => '
                sys_language_uid, l10n_parent, l10n_diffsource, hidden, name, category, description, duration, vendor, vendor_link, 
                --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.access, starttime, endtime'
        ],
    ],
    'columns' => [
        'sys_language_uid' => [
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.language',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'special' => 'languages',
                'items' => [
                    [
                        'LLL:EXT:lang/locallang_general.xlf:LGL.allLanguages',
                        -1,
                        'flags-multiple'
                    ]
                ],
                'default' => 0,
            ],
        ],
        'l10n_parent' => [
            'displayCond' => 'FIELD:sys_language_uid:>:0',
            'exclude' => true,
            'label' => 'LLL:EXT:core/Resources/Private/Language/locallang_general.xlf:LGL.l18n_parent',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'default' => 0,
                'items' => [
                    ['', 0],
                ],
                'foreign_table' => 'tx_dp_cookieconsent_domain_model_cookie',
                'foreign_table_where' => 'AND tx_dp_cookieconsent_domain_model_cookie.pid=###CURRENT_PID### AND tx_dp_cookieconsent_domain_model_cookie.sys_language_uid IN (-1,0)',
            ],
        ],
        'l10n_diffsource' => [
            'config' => [
                'type' => 'passthrough',
            ],
        ],
        't3ver_label' => [
            'label' => 'LLL:EXT:lang/Resources/Private/Language/locallang_general.xlf:LGL.versionLabel',
            'config' => [
                'type' => 'input',
                'size' => 30,
                'max' => 255,
            ],
        ],
        'hidden' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.hidden',
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
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.name',
            'config' => [
                'type' => 'input',
                'size' => 75,
                'eval' => 'trim,required'
            ],
        ],
        'category' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.category',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'default' => 0,
                'items' => [
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.category.required', 0],
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.category.statistics', 1],
                    ['LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.category.marketing', 2],
                ],
            ],
        ],
        'description' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.description',
            'config' => [
                'type' => 'text',
                'cols' => 50,
                'rows' => 15,
                'eval' => 'trim,required',
                'softref' => 'typolink_tag,email[subst],url',
                'enableRichtext' => true,
            ]
        ],
        'duration' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.duration',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim,required'
            ],
        ],
        'vendor' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.vendor',
            'config' => [
                'type' => 'input',
                'size' => 50,
                'eval' => 'trim,required'
            ],
        ],
        'vendor_link' => [
            'exclude' => true,
            'label' => 'LLL:EXT:dp_cookieconsent/Resources/Private/Language/locallang_db.xlf:tx_dp_cookieconsent_domain_model_cookie.vendor_link',
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
    ]
];