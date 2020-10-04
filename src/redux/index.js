"use strict";
exports.__esModule = true;
exports.rootReducer = void 0;
var redux_1 = require("redux");
var client_1 = require("./client");
exports.rootReducer = redux_1.combineReducers({
    client: client_1["default"]
});
exports["default"] = exports.rootReducer;
