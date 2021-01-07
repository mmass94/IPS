"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var parser_1 = require("./src/parser");
var normalize_1 = require("./src/normalize");
__exportStar(require("./src/types"), exports);
__exportStar(require("./src/parser"), exports);
__exportStar(require("./src/skeleton"), exports);
function parse(input, opts) {
    var els = parser_1.pegParse(input, opts);
    if (!opts || opts.normalizeHashtagInPlural !== false) {
        normalize_1.normalizeHashtagInPlural(els);
    }
    return els;
}
exports.parse = parse;
