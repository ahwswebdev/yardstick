/*global casper, module */

'use strict';

var _ = require('lodash');

module.exports = function (options) {
    options = _.defaults(options, {
        url: null,
        sectionSelector: null,
        startWait: 500,
        sectionWait: 1000,
        classNames: {
            html: [
                'no-touch',
                'js'
            ]
        }
    });

    if (typeof options.url === 'undefined') {
        throw new Error('You must pass a url to open.');
    }

    return casper
        .start(options.url)
        .wait(options.startWait)
        .then(function () {
            if (options.sectionSelector) {
                this.click(options.sectionSelector);
                casper.wait(options.sectionWait);
            }
        })
        .then(function () {
            this.evaluate(function (options) {
                Object.keys(options.classNames).forEach(function (key) {
                    var element = document.querySelector(key),
                        classNames = options.classNames[key];

                    classNames.forEach(function (className) {
                        element.classList.add(className);
                    });
                });
            }, options);
        });
};
