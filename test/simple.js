/*global module, phantomcss*/
'use strict';

var _ = require('lodash');
var OpenPage = require('../utils/open-page');

module.exports = function (options) {
    options = _.defaults(options || {}, {
        url: '',
        sectionSelector: '',
        testSelectors: {},
        hover: true,
        hoverWait: 500
    });

    OpenPage(options)
        .then(function () {
            //Move mouse off screen
            this.mouse.move(-10, -10);
        })
        .then(function () {
            _.each(options.testSelectors, function (selector, name) {
                casper.waitForSelector(selector, function () {
                    phantomcss.screenshot(selector, name);
                });
            });
        })
        .then(function () {
            if (options.hover) {
                _.each(options.testSelectors, function (selector, name) {
                    casper
                        .then(function () {
                            this.mouse.move(selector);
                        })
                        .wait(options.hoverWait)
                        .then(function () {
                            phantomcss.screenshot(selector, name + '-hover');
                        });
                }.bind(this));
            }
        });


};
