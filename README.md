# Gulp Protobuf
Yet another gulp task for protobufs!

[![Circle CI](https://circleci.com/gh/thegecko/gulp-protobuf.svg?style=shield)](https://circleci.com/gh/thegecko/gulp-protobuf/)
[![npm](https://img.shields.io/npm/dm/gulp-protobuf.svg)](https://www.npmjs.com/package/gulp-protobuf)
[![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](http://opensource.org/licenses/MIT)

This gulp task wraps the [protobufjs](http://dcode.io/protobuf.js) `pbjs` and `pbts` tools to allow generation of JavaScript code and TypeScript definitions without the need for the `protoc` binary.

## Prerequisites

[Node.js > v6.12.0](https://nodejs.org), which includes `npm`.

## Installation

```bash
$ npm install gulp-protobuf
```

## Usage

Two tasks are exposed from this package, `pbjs` and `pbts`.

`pbjs` is used to translate between file formats and generate static code.

`pbts` is used to generate TypeScript definitions from annotated JavaScript files output from `pbjs`.

First, import this package into your gulpfile:

```javascript
let protobuf = require("gulp-protobuf");
```

Then you can use either task in your gulp tasks individually:

```javascript
gulp.task("protobuf-gen", () => {
    return gulp.src(protoFiles)
    .pipe(protobuf.pbjs({
        target: "static-module",
        wrap: "commonjs"
    }))
    .pipe(gulp.dest(distDir));
});
```

```javascript
gulp.task("protobuf-types", ["protobuf-gen"], () => {
    return gulp.src(jsFiles)
    .pipe(protobuf.pbts())
    .pipe(gulp.dest(typesDir));
});
```

Alternatively, pipe both together to output just TypeScript definitions:

```javascript
gulp.task("protobuf", () => {
    return gulp.src(protoFiles)
    .pipe(protobuf.pbjs({
        target: "static-module",
        wrap: "commonjs"
    }))
    .pipe(protobuf.pbts())
    .pipe(gulp.dest(typesDir));
});
```

Refer to the protobufjs documentation to see the options available for each command:

[pbjs options](https://github.com/dcodeIO/protobuf.js#pbjs-for-javascript)
[pbts options](https://github.com/dcodeIO/protobuf.js#pbts-for-typescript)
