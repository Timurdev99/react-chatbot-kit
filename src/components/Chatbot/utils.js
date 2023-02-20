"use strict";
exports.__esModule = true;
exports.isConstructor = exports.validateProps = exports.getCustomMessages = exports.getObject = exports.getBotName = exports.getCustomComponents = exports.getWidgets = exports.getInitialState = exports.getCustomStyles = void 0;
var getCustomStyles = function (config) {
    if (config.customStyles) {
        return config.customStyles;
    }
    return {};
};
exports.getCustomStyles = getCustomStyles;
var getInitialState = function (config) {
    if (config.state) {
        return config.state;
    }
    return {};
};
exports.getInitialState = getInitialState;
var getWidgets = function (config) {
    if (config.widgets) {
        return config.widgets;
    }
    return [];
};
exports.getWidgets = getWidgets;
var getCustomComponents = function (config) {
    if (config.customComponents) {
        return config.customComponents;
    }
    return {};
};
exports.getCustomComponents = getCustomComponents;
var getBotName = function (config) {
    if (config.botName) {
        return config.botName;
    }
    return 'Bot';
};
exports.getBotName = getBotName;
var getObject = function (object) {
    if (typeof object === 'object')
        return object;
    return {};
};
exports.getObject = getObject;
var getCustomMessages = function (config) {
    if (config.customMessages) {
        return config.customMessages;
    }
    return {};
};
exports.getCustomMessages = getCustomMessages;
var validateProps = function (config, MessageParser) {
    var errors = [];
    if (!config.initialMessages) {
        errors.push("Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages.");
    }
    // const messageParser = new MessageParser();
    // if (!messageParser['parse']) {
    //   errors.push(
    //     "Messageparser must implement the method 'parse', please add this method to your object. The signature is parse(message: string)."
    //   );
    // }
    return errors;
};
exports.validateProps = validateProps;
var isConstructor = function (func) {
    try {
        new func();
    }
    catch (err) {
        return false;
    }
    return true;
};
exports.isConstructor = isConstructor;
