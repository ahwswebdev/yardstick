/*global module, phantomcss*/
'use strict';

var _ = require('lodash');
var OpenPage = require('../utils/open-page');

module.exports = function (options) {
    options = _.defaults(options || {}, {
        url: '',
        name: '',
        sectionSelector: '',
        testSelectors: [],
        hover: true,
        hoverWait: 500
    });

    OpenPage(options)
        .then(function () {
            //Move mouse off screen
            this.mouse.move(-10, -10);
        })
        .then(function () {
            options.testSelectors.forEach(function (selector) {
                phantomcss.screenshot(selector, options.name + selector);
            });
        })
        .then(function () {
            if (options.hover) {
                options.testSelectors.forEach(function (selector) {
                    casper
                        .then(function () {
                            this.mouse.move(selector);
                        })
                        .wait(options.hoverWait)
                        .then(function () {
                            phantomcss.screenshot(selector, options.name + selector + '-hover');
                        });
                }.bind(this));
            }
        });


};
