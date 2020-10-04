"use strict";
exports.__esModule = true;
exports.AuthActionCreators = exports.REGEX_LIST_UPDATED = exports.LOGGED_OUT = exports.LOGGED_IN = void 0;
var immer_1 = require("immer");
var types_1 = require("../types/types");
// Action Types
exports.LOGGED_IN = 'LOGGED_IN';
exports.LOGGED_OUT = 'LOGGED_OUT';
exports.REGEX_LIST_UPDATED = 'REGEX_LIST_UPDATED';
var initialState = {
    loginStatus: false,
    knowledgeFileList: {
        querySettings: {
            regexList: [''],
            knowledgeFileOrderSettings: [
                {
                    orderDirection: types_1.Direction.DESC,
                    orderField: types_1.KnowledgeFileFieldsCAPS.LAST_DATE_TIME_MODIFIED
                },
            ],
            limit: 5,
            offset: 0,
            idToken: ''
        },
        fields: [
            types_1.KnowledgeFileFields.id,
            types_1.KnowledgeFileFields.srcText,
            types_1.KnowledgeFileFields.lastDateTimeModified,
        ]
    }
};
exports["default"] = immer_1["default"](function (draft, action) {
    switch (action.type) {
        case exports.LOGGED_IN:
            draft.loginStatus = true;
            return;
        case exports.LOGGED_OUT:
            draft.loginStatus = false;
            return;
        case exports.REGEX_LIST_UPDATED:
            draft.knowledgeFileList.querySettings.regexList = action.payload;
        default:
            return;
    }
}, initialState);
exports.AuthActionCreators = {
    loggedIn: function () {
        return {
            type: exports.LOGGED_IN
        };
    },
    loggedOut: function () {
        return {
            type: exports.LOGGED_OUT
        };
    },
    regexListUpdated: function (regexList) {
        return {
            type: exports.REGEX_LIST_UPDATED,
            payload: regexList
        };
    }
};
