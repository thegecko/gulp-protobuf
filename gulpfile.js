let path        = require("path");
let del         = require("del");
let merge       = require('merge2');
let gulp        = require("gulp");
let tslint      = require("gulp-tslint");
let typescript  = require("gulp-typescript");

let configPath = "tsconfig.json";
let srcDir = "src";
let srcFiles = srcDir + "/**/*.ts";
let nodeDir = "dist";
let typesDir = "types";
let watching = false;

function handleError() {
    if (watching) this.emit("end");
    else process.exit(1);
}

// Set watching
gulp.task("setWatch", () => {
    watching = true;
});

// Clear built directories
gulp.task("clean", () => {
    if (!watching) del([nodeDir, typesDir]);
});

// Lint the source
gulp.task("lint", () => {
    gulp.src(srcFiles)
    .pipe(tslint({
        formatter: "stylish"
    }))
    .pipe(tslint.report({
        emitError: !watching
    }))
});

// Build TypeScript source into CommonJS Node modules
gulp.task("compile", ["clean"], () => {
    return merge([
        gulp.src(srcFiles)
        .pipe(typescript.createProject(configPath)())
        .on("error", handleError).js
        .pipe(gulp.dest(nodeDir)),
        gulp.src(srcFiles)
        .pipe(typescript.createProject(configPath)())
        .on("error", handleError).dts
        .pipe(gulp.dest(typesDir))
    ]);
});

gulp.task("watch", ["setWatch", "default"], () => {
    gulp.watch(srcFiles, ["default"]);
});

gulp.task("default", ["lint", "compile"]);
