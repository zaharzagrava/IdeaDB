"use strict";
exports.__esModule = true;
exports.worker = void 0;
var msw_1 = require("msw");
var handlers_1 = require("./handlers");
// Export the worker instance, so we can await the activation on Storybook's runtime.
// You can use this reference to start the worker for local development as well.
exports.worker = msw_1.setupWorker.apply(void 0, handlers_1.handlers);
