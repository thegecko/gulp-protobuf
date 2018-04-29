"use strict";
/*
* gulp-protobuf
* Copyright (c) 2018 Rob Moran
*
* The MIT License (MIT)
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var pbjs_1 = require("protobufjs/cli/pbjs");
var pbts_1 = require("protobufjs/cli/pbts");
var path_1 = require("path");
var through2_1 = require("through2");
var PluginError = require("plugin-error");
var PLUGIN_NAME = "gulp-protobuf";
function task(fn, options, ext) {
    if (options === void 0) { options = {}; }
    var args = Object.keys(options).reduce(function (sequence, key) {
        sequence.push("--" + key);
        var value = options[key];
        if (value !== true) {
            sequence.push(value);
        }
        return sequence;
    }, []);
    return through2_1.obj(function (file, _enc, callback) {
        if (file.isNull()) {
            // return empty file
            callback(null, file);
        }
        if (file.isBuffer()) {
            fn(args.concat([file.path]), function (err, output) {
                if (err)
                    throw new PluginError(PLUGIN_NAME, err);
                file.contents = new Buffer(output);
                var fileName = "" + path_1.basename(file.path, path_1.extname(file.path)) + ext;
                file.path = path_1.join(path_1.dirname(file.path), fileName);
                callback(null, file);
                return {};
            });
        }
        else {
            callback(null, file);
        }
    });
}
function pbjs(options) {
    return task(pbjs_1.main, options, ".js");
}
exports.pbjs = pbjs;
function pbts(options) {
    return task(pbts_1.main, options, ".d.ts");
}
exports.pbts = pbts;
