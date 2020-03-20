let gulp = require("gulp"),
    fs = require("fs"),
    readline = require("readline"),
    rimraf = require("rimraf"),
    EventEmitter = require("events").EventEmitter,
    eventHub = new EventEmitter(),
    cssClean = require("gulp-clean-css"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    clean = require("gulp-clean"),
    gutil = require('gulp-util'),
    rev = require("gulp-rev"),
    revAppend = require('gulp-rev-append'),
    revCollector = require("gulp-rev-collector"),
    processHtml = require("gulp-processhtml"),
    cssUseref = require("gulp-css-useref"),
    gulpIgnore = require("gulp-ignore"),
    flatMap = require("gulp-flatmap"),
    styleLint = require("gulp-stylelint"),
    esLint = require("gulp-eslint");


const CSS_BASE_PATH = "./static/css",
      JS_BASE_PATH = "./static/js",
      DEST_PATH = "./dist",
      TEMP_PATH = "./temp",
      RESOURCE_FILE_NAME = "pack-js-css-resource",
      CHECK_RESULT_FOLDER = "./checkDir/result",
      JS_CHECK_FILE_NAME = "jsFile.json",
      CSS_CHECK_FILE_NAME = "cssFile.json";

let compackResource = {
    html: ["./index.html"]
};

let currentProcessHtmlName = "",
    currentProcessHtmlPath = "",
    currentJsFiles = null,
    currentCssFiles = null;
    

/**
 * 在 processhtml 生成的资源文件中提取对应的资源路径
 * 示例:
 *      E:\work\project\lensyn-pms\pms\index.html:./static/css/common/nx_content.css
 *      E:\work\project\lensyn-pms\pms\index.html:./static/js/lib/jquery.min.js
 * @param {string} str 
 */
function pickResourcePath(str) {
    return str.split(":")[2];
}

/**
 * 判断一个路径对应的文件是否是 css 文件
 * @param {string} path 
 */
function isCssFile(path) {
    return path.indexOf(".css") !== -1;
}

/**
 * 判断一个路径对应的文件是否为 js 文件
 * @param {string} path 
 */
function isJsFile(path) {
    return path.indexOf(".js") !== -1;
}

/**
 * 根据 html 的路径提取对应的名字
 * 如 ./index.html => index
 * @param {string} path 
 */
function getHtmlNameByPath(path) {
    return path.match(/\\?(\w+)\.html/)[1];
}

/**
 * 向事件总线中广播一个事件，通知可以进行下一个 html 文件的处理
 */
function emitProcessHtml() {
    setTimeout(() => {
        eventHub.emit("finish_process_html");
    }, 10000);
}

/**
 * 获取生成的资源的文件名
 * 如 assets-index.min.js
 * @param {string} type 
 */
function getAssetsName(type) {
    return `assets-${currentProcessHtmlName}.min.${type}`;
}

/**
 * 处理一个 html 文件，将页面中标记好的 js/css 替换成对应的名字，
 * 并将标记完后的 js/css 保存到 temp 目录下对应的文件中，如
 * index.sources
 */
gulp.task("start-process-html", () => {
    return gulp.src(currentProcessHtmlPath).
                pipe(processHtml({list: `${TEMP_PATH}/${currentProcessHtmlName}.sources`})).
                pipe(revAppend()).
                pipe(gulp.dest(TEMP_PATH));
});

/**
 * 处理上一步生成的资源文件，提取出其中被打包的 js 和 css 文件的路径
 * 保存到 currentCssFiles 和 currentJsFiles 中
 */
gulp.task("pick-css-js", ["start-process-html"], (callback) => {
    let rl = readline.createInterface({
        input: fs.createReadStream(`${TEMP_PATH}/${currentProcessHtmlName}.sources`),
        output: process.stdout,
        terminal: false
    });

    currentCssFiles = [];
    currentJsFiles = [];

    rl.on("line", (line) => {
        let path = pickResourcePath(line);
        if (isCssFile(path)) {
            currentCssFiles.push(path);
        } else if (isJsFile(path)) {
            currentJsFiles.push(path);
        }
    });

    rl.on("close", callback);
});

/**
 * 根据 pick-css-js 中提取到的 css 文件，将其中引用的图片和字体导入到 DEST_PATH 中
 */
gulp.task("copy-css-resource", ["pick-css-js"], () => {
    return gulp.src(currentCssFiles).
                pipe(cssUseref()).
                pipe(gulpIgnore.exclude("*.css")).
                pipe(gulp.dest(DEST_PATH));
});

/**
 * 根据 pick-css-js 中提取的 css 的路径，进行合并压缩
 */
gulp.task("pack-css", ["copy-css-resource"], () => {
    return gulp.src(currentCssFiles).
                pipe(concat(`${TEMP_PATH}/${getAssetsName("css")}`)).
                pipe(cssClean()).
                pipe(gulp.dest("."));
});

/**
 * 将打包后的文件添加版本号后放到 DEST_PATH 中，
 * 将版本号的映射数据保存到 TEMP_PATH/recv/css 中,以用于替换 html 中对应的文件路径
 */
gulp.task("version-css", ["pack-css"], () => {
    return gulp.src(`${TEMP_PATH}/${getAssetsName("css")}`).
                pipe(rev()).
                pipe(gulp.dest(TEMP_PATH)).
                pipe(gulp.dest(DEST_PATH)).
                pipe(rev.manifest()).
                pipe(gulp.dest(`${TEMP_PATH}/recv/css`));
});

/**
 * 根据 pick-css-js 中提取的 js 中的路径对 js 进行合并压缩
 */
gulp.task("pack-js", ["version-css"], () => {
    return gulp.src(currentJsFiles).
                pipe(concat(`${TEMP_PATH}/${getAssetsName("js")}`)).
                // pipe(uglify()).
                pipe(gulp.dest("."));
});

/**
 * 将 pack-js 生成的 js 添加版本号并放到 DEST_PATH 中，
 * 并将版本号的映射数据保存到 TEMP_PATH/recv/js 中,以用于替换 html 中对应的文件路径
 */
gulp.task("version-js", ["pack-js"], () => {
    return gulp.src(`${TEMP_PATH}/${getAssetsName("js")}`).
                pipe(rev()).
                pipe(gulp.dest(TEMP_PATH)).
                pipe(gulp.dest(DEST_PATH)).
                pipe(rev.manifest()).
                pipe(gulp.dest(`${TEMP_PATH}/recv/js`));
});

/**
 * 将 html 中对应的 js/css 根据版本号的数据进行替换，
 * 将替换过后的 html 文件保存到 DEST_PATH 中
 */
gulp.task("compile-html", ["version-js"], () => {
    return gulp.src([`${TEMP_PATH}/recv/**/*.json`, `${TEMP_PATH}/${currentProcessHtmlName}.html`]).
                pipe(revCollector()).
                pipe(gulp.dest(DEST_PATH));
});

/**
 * 处理 html，只是用于等待一个 html 处理完成后通知处理下一个 html 文件
 */
gulp.task("process-html", ["compile-html"], () => {
    emitProcessHtml();    
});

/**
 * 删除 dist 目录
 */
gulp.task("remove-dist", (callback) => {
    fs.exists(DEST_PATH, (isExist) => {
        if (isExist)  {
            rimraf(DEST_PATH, callback);
        } else {
            callback();
        }
    })
});

/**
 * 创建 temp 文件夹，如果已经有了则删除
 */
gulp.task("create-temp-folder", ["remove-dist"], (callback) => {
    fs.exists(TEMP_PATH, (isExist) => {
        if (isExist) {
            rimraf(TEMP_PATH, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    fs.mkdir(TEMP_PATH, callback);
                }
            });
        } else {
            fs.mkdir(TEMP_PATH, callback);
        }
    });
});

/**
 * 复制 static 目录到 DEST_PATH 中
 */
gulp.task("prepare-resources", ["create-temp-folder"], () => {
    return gulp.src(`./static/**/*`)
               .pipe(gulp.dest(`${DEST_PATH}/static`));
});

/**
 * 执行处理任务
 */
gulp.task("process-resource", ["prepare-resources"], () => {
    let htmlItem = null,
        startIndex = -1;

    // 监听事件，处理完成后处理下一个文件
    eventHub.on("finish_process_html", () => {
        startIndex++;
        if (startIndex < compackResource.html.length) {
            htmlItem = compackResource.html[startIndex];
            currentProcessHtmlPath = htmlItem;
            currentProcessHtmlName = getHtmlNameByPath(htmlItem);
            gulp.start("process-html");

            return;           
        } else {
            // 构建完成删除 temp 目录
            rimraf(TEMP_PATH, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("构建完成");
                }
            });
        }
    });

    emitProcessHtml();
});

gulp.task("build", () => {
    fs.exists(DEST_PATH, yes => {
        if(yes) {
            rimraf(DEST_PATH, e => {
                if(e) {
                    console.log(e)
                } else {
                    fs.mkdir(DEST_PATH, () => {
                        gulp.start("process-resource");
                    });
                }
            })
        } else {
            fs.mkdir(DEST_PATH, () => {
                gulp.start("process-resource");
            });
        }
    })
});

/**
 * 将 js 的检查结果格式化为 checkDir 中需要的格式
 * @param {array} datas
 */
function jsCheckFormatter(datas) {
    let results = [];

    for (let i = 0, j = datas.length; i < j; ++i) {
        let vueItem = datas[i];

        if (vueItem.messages.length > 0) {
            let resultItem = {
                filename: vueItem.filePath,
                messages: []
            };
            let len = vueItem.messages.length > 100 ? 100 : vueItem.messages.length;
            for (let k = 0, p = len; k < p; ++k) {
                let messageItem = vueItem.messages[k];

                resultItem.messages.push({
                    type: "",
                    line: messageItem.line,
                    col: messageItem.column,
                    message: messageItem.message,
                    source: messageItem.source,
                    rule: {
                        ruleId: messageItem.ruleId
                    }
                });
            }
            results.push(resultItem);
        }
    }
    return JSON.stringify(results);
}


/**
 * 检查 js 文件 包括 vue
 */
gulp.task("check-js", () => {
    let writeStream = fs.createWriteStream(`${CHECK_RESULT_FOLDER}/${JS_CHECK_FILE_NAME}`);

    return gulp.src(["./devPkg/**/*.vue", "./devPkg/**/*.js"]).pipe(esLint()).pipe(esLint.format(jsCheckFormatter, writeStream));
});

/**
 * 将 css 的检查数据转换为符合 checkDir 中的格式
 * @param {array} checkDatas
 */
function cssCheckFormatter(checkDatas) {
    let result = [];

    for (let i = 0, j = checkDatas.length; i < j; ++i) {
        let checkItem = checkDatas[i],
            resultItem = {
                fileName: checkItem.source,
                messages: []
            };

        resultItem.filename = checkItem.source;

        for (let k = 0, p = checkItem.warnings.length; k < p; ++k) {
            let warningItem = checkItem.warnings[k];

            resultItem.messages.push({
                type: warningItem.severity,
                line: warningItem.line,
                col: warningItem.column,
                message: warningItem.text,
                rule: {
                    name: warningItem.rule
                }
            });
        }
        result.push(resultItem);
    }

    return JSON.stringify(result);
}

/**
 * 检查 css 文件
 */
gulp.task("check-css", () => {
    return gulp.src(["./devPkg/**/*.css", "./devPkg/**/*.less"]).pipe(styleLint({
        failAfterError: false,
        reportOutputDir: CHECK_RESULT_FOLDER,
        reporters: [
            {formatter: cssCheckFormatter, save: CSS_CHECK_FILE_NAME}
        ]
    }));
});


/* 检查代码 */
gulp.task("check-code", ["check-js", "check-css"]);

gulp.task("default", ["build"]);

