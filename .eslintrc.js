/*
 * @Description:
 * @Autor: ZY
 * @Date: 2020-09-22 11:09:46
 * @LastEditors: ZY
 * @LastEditTime: 2020-10-24 18:14:07
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended', // vue 插件推荐规则
    // '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-undef': 'off', // 是否校验对象未定义
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off', // 强制 generator 函数中 * 号周围使用一致的空格
    // 'vue/max-attributes-per-line': [ // 属性换行，和单行多行最大个数
    //   2,
    //   {
    //     singleline: 5,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: false
    //     }
    //   }
    // ],
    'vue/attribute-hyphenation': 0, // 属性推荐-间隔，避免驼峰
    // 'vue/html-self-closing': 0,
    // 'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    // 'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'no-tabs': 0,
    // quotes: [
    //   2,
    //   'single',
    //   {
    //     avoidEscape: true,
    //     allowTemplateLiterals: true
    //   }
    // ],
    // semi: [
    //   2,
    //   'never',
    //   {
    //     beforeStatementContinuationChars: 'never'
    //   }
    // ],
    // 'no-delete-var': 2,
    // 'prefer-const': [
    //   2,
    //   {
    //     ignoreReadBeforeAssign: false
    //   }
    // ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: {
      jest: true
    }
  }]
}
