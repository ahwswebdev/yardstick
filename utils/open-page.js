/*global casper, module */

'use strict';

var _ = require('lodash');

module.exports = function (options) {
    options = _.defaults(options, {
        url: null,
        sectionSelector: null,
        startWait: 0,
        startWaitSelector: null,
        sectionWait: 0,
        sectionWaitSelector: null,
        imagesLoadedWait: 0,
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
        .then(function () {
            if (options.startWaitSelector) {
                casper.waitForSelector(options.startWaitSelector);
            } else if (options.startWait > 0) {
                casper.wait(options.startWait);
            }
        })
        .then(function () {
            if (options.sectionSelector) {
                this.click(options.sectionSelector);

                if (options.sectionWaitSelector) {
                    casper.waitForSelector(options.sectionWaitSelector);
                } else if (options.sectionWait > 0) {
                    casper.wait(options.sectionWait);
                }
            }
        })
        .then(function () {
            if (options.imagesLoadedWait > 0) {
                casper.wait(options.imagesLoadedWait);
            }
        })
        .then(function () {
            this.evaluate(function (options) {
                Object.keys(options.classNames).forEach(function (key) {
                    var element = document.querySelector(key),
                        classNames = options.classNames[key];

                    if (element) {
                        classNames.forEach(function (className) {
                            element.classList.add(className);
                        });
                    }
                });
            }, options);
        });
};
