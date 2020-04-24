const { series } = require("gulp");

// 私有任务（private task）
function clean(cb) {
  cb();
}

// 公开任务
function build(cb) {
  cb();
}

exports.build = build;
exports.default = series(clean, build);
