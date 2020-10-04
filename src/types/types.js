"use strict";
exports.__esModule = true;
exports.KnowledgeFileFieldsCAPS = exports.Direction = exports.QueryType = exports.KnowledgeFileFields = exports.NClient = exports.NKnowledgeFile = void 0;
exports.NKnowledgeFile = 'knowledge_file';
exports.NClient = 'client';
var KnowledgeFileFields;
(function (KnowledgeFileFields) {
    KnowledgeFileFields["id"] = "id";
    KnowledgeFileFields["srcText"] = "srcText";
    KnowledgeFileFields["lastDateTimeModified"] = "lastDateTimeModified";
    KnowledgeFileFields["dateTimeCreated"] = "dateTimeCreated";
    KnowledgeFileFields["wordCount"] = "wordCount";
})(KnowledgeFileFields = exports.KnowledgeFileFields || (exports.KnowledgeFileFields = {}));
/* GraphQL Queries Types */
var QueryType;
(function (QueryType) {
    QueryType[QueryType["getKnowledgeFile"] = 0] = "getKnowledgeFile";
    QueryType[QueryType["getKnowledgeFiles"] = 1] = "getKnowledgeFiles";
    QueryType[QueryType["postKnowledgeFile"] = 2] = "postKnowledgeFile";
    QueryType[QueryType["putKnowledgeFile"] = 3] = "putKnowledgeFile";
    QueryType[QueryType["deleteKnowledgeFile"] = 4] = "deleteKnowledgeFile";
})(QueryType = exports.QueryType || (exports.QueryType = {}));
var Direction;
(function (Direction) {
    Direction["DESC"] = "DESC";
    Direction["ASC"] = "ASC";
})(Direction = exports.Direction || (exports.Direction = {}));
var KnowledgeFileFieldsCAPS;
(function (KnowledgeFileFieldsCAPS) {
    KnowledgeFileFieldsCAPS["LAST_DATE_TIME_MODIFIED"] = "LAST_DATE_TIME_MODIFIED";
    KnowledgeFileFieldsCAPS["DATE_TIME_CREATED"] = "DATE_TIME_CREATED";
})(KnowledgeFileFieldsCAPS = exports.KnowledgeFileFieldsCAPS || (exports.KnowledgeFileFieldsCAPS = {}));
