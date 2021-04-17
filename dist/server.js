"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var logRequest = function (req, res, next) {
    var method = req.method, url = req.url;
    var logLabel = "[" + method.toUpperCase() + "] - " + url;
    console.log(logLabel);
    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
};
app.use(logRequest);
app.get('/', function (req, res) {
    return res.json({ message: 'Hello World!' });
});
app.listen(3333, function () {
    console.log('🚀 server started on port 3333!');
});
