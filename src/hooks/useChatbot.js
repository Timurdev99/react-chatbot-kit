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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var react_1 = require("react");
var chatUtils_1 = require("../components/Chat/chatUtils");
var utils_1 = require("../components/Chatbot/utils");
var WidgetRegistry_1 = require("../components/WidgetRegistry/WidgetRegistry");
var useChatbot = function (_a) {
    var config = _a.config, actionProvider = _a.actionProvider, messageParser = _a.messageParser, messageHistory = _a.messageHistory, runInitialMessagesWithHistory = _a.runInitialMessagesWithHistory, saveMessages = _a.saveMessages, rest = __rest(_a, ["config", "actionProvider", "messageParser", "messageHistory", "runInitialMessagesWithHistory", "saveMessages"]);
    var configurationError = '';
    var invalidPropsError = '';
    if (!config || !actionProvider || !messageParser) {
        configurationError =
            'I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?';
        return { configurationError: configurationError };
    }
    var propsErrors = (0, utils_1.validateProps)(config, messageParser);
    if (propsErrors.length) {
        invalidPropsError = propsErrors.reduce(function (prev, cur) {
            prev += cur;
            return prev;
        }, '');
        return { invalidPropsError: invalidPropsError };
    }
    var _b = (0, react_1.useState)({}), messageContainerRef = _b[0], setMessageContainerRef = _b[1];
    var initialState = (0, utils_1.getInitialState)(config);
    if (messageHistory && Array.isArray(messageHistory)) {
        config.initialMessages = __spreadArray([], messageHistory, true);
    }
    else if (typeof messageHistory === 'string' && Boolean(messageHistory)) {
        if (!runInitialMessagesWithHistory) {
            config.initialMessages = [];
        }
    }
    var _c = react_1["default"].useState(__assign({ messages: __spreadArray([], config.initialMessages, true) }, initialState)), state = _c[0], setState = _c[1];
    var messagesRef = react_1["default"].useRef(state.messages);
    var stateRef = react_1["default"].useRef();
    (0, react_1.useEffect)(function () {
        messagesRef.current = state.messages;
    });
    (0, react_1.useEffect)(function () {
        if (messageHistory && Array.isArray(messageHistory)) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { messages: messageHistory })); });
        }
    }, []);
    (0, react_1.useEffect)(function () {
        return function () {
            var _a;
            if (saveMessages && typeof saveMessages === 'function') {
                var HTML = (_a = messageContainerRef === null || messageContainerRef === void 0 ? void 0 : messageContainerRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML.toString();
                if (!messageContainerRef.current)
                    return;
                saveMessages(messagesRef.current, HTML);
            }
        };
    }, [messageContainerRef.current]);
    (0, react_1.useEffect)(function () {
        stateRef.current = state;
    }, [state]);
    var actionProv;
    var widgetRegistry;
    var messagePars;
    var widgets;
    var ActionProvider = actionProvider;
    var MessageParser = messageParser;
    if ((0, utils_1.isConstructor)(ActionProvider) && (0, utils_1.isConstructor)(MessageParser)) {
        actionProv = new actionProvider(chatUtils_1.createChatBotMessage, setState, chatUtils_1.createClientMessage, stateRef.current, chatUtils_1.createCustomMessage, rest);
        widgetRegistry = new WidgetRegistry_1["default"](setState, actionProv);
        messagePars = new messageParser(actionProv, stateRef.current);
        widgets = (0, utils_1.getWidgets)(config);
        widgets.forEach(function (widget) {
            return widgetRegistry === null || widgetRegistry === void 0 ? void 0 : widgetRegistry.addWidget(widget, rest);
        });
    }
    else {
        actionProv = actionProvider;
        messagePars = messageParser;
        widgetRegistry = new WidgetRegistry_1["default"](setState, null);
        widgets = (0, utils_1.getWidgets)(config);
        widgets.forEach(function (widget) {
            return widgetRegistry === null || widgetRegistry === void 0 ? void 0 : widgetRegistry.addWidget(widget, rest);
        });
    }
    return {
        widgetRegistry: widgetRegistry,
        actionProv: actionProv,
        messagePars: messagePars,
        configurationError: configurationError,
        invalidPropsError: invalidPropsError,
        state: state,
        setState: setState,
        setMessageContainerRef: setMessageContainerRef,
        ActionProvider: ActionProvider,
        MessageParser: MessageParser
    };
};
exports["default"] = useChatbot;
