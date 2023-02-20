"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.callIfExists = exports.createClientMessage = exports.createCustomMessage = exports.createChatBotMessage = exports.createChatMessage = exports.customMessage = exports.userMessage = exports.botMessage = exports.uniqueId = void 0;
var uniqueId = function () {
    return Math.round(Date.now() * Math.random());
};
exports.uniqueId = uniqueId;
var botMessage = function (message) {
    if (message.type === 'bot') {
        return true;
    }
    return false;
};
exports.botMessage = botMessage;
var userMessage = function (message) {
    if (message.type === 'user') {
        return true;
    }
    return false;
};
exports.userMessage = userMessage;
var customMessage = function (message, customMessages) {
    var customMessage = customMessages[message.type];
    if (customMessage) {
        return true;
    }
    return false;
};
exports.customMessage = customMessage;
var createChatMessage = function (message, type) {
    return {
        message: message,
        type: type,
        id: (0, exports.uniqueId)()
    };
};
exports.createChatMessage = createChatMessage;
var createChatBotMessage = function (message, options) {
    return __assign(__assign(__assign({}, (0, exports.createChatMessage)(message, 'bot')), options), { loading: true });
};
exports.createChatBotMessage = createChatBotMessage;
var createCustomMessage = function (message, type, options) {
    return __assign(__assign({}, (0, exports.createChatMessage)(message, type)), options);
};
exports.createCustomMessage = createCustomMessage;
var createClientMessage = function (message, options) {
    return __assign(__assign({}, (0, exports.createChatMessage)(message, 'user')), options);
};
exports.createClientMessage = createClientMessage;
var callIfExists = function (func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (func) {
        return func.apply(void 0, args);
    }
};
exports.callIfExists = callIfExists;
