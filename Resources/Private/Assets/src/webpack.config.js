/*
 * Copyright (c) 2021.
 *
 * @category   TYPO3
 *
 * @copyright  2021 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <info@dp-wired.de>
 * @license    MIT
 */

const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'js/main.js'),
    output: {
        path: path.resolve(__dirname,'../../../Public/JavaScript'),
        filename: 'dp_cookieconsent.js',
        clean: true,
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            { test: /\.html$/, use: 'raw-loader' },
        ],
    },
};