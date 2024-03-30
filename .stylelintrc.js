// .stylelintrc.js
module.exports = {
    // 继承的预设，这些预设包含了规则集插件
    extends: [
        // 代码风格规则
        'stylelint-stylistic/config',
        // 基本 scss 规则
        'stylelint-config-standard-less',
        // scss vue 规则
        'stylelint-config-recommended-vue/less',
        // 样式属性顺序规则
        'stylelint-config-recess-order',
        'stylelint-config-recommended'
    ],
    rules: {
        // 自定义规则集的启用 / 禁用
        // 'stylistic/max-line-length': null,
        'stylistic/max-line-length': 100,
    },
    plugins: ["stylelint-processor-styled-components"],
    processors: ["stylelint-processor-styled-components"]
};
