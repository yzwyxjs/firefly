import merge from 'lodash/merge';
import componentsLocale from 'tdesign-vue-next/es/locale/en_US';

import layout from './layout';
import pages from './pages';

export default {
  lang: 'English',
  layout,
  pages,
  constants: {
    clickHere: 'Click Here',
  },
  componentsLocale: merge({}, componentsLocale, {
    // 可以在此处定义更多组件库的自定义语言配置，具体可配置内容参看 API 文档
    // https://tdesign.tencent.com/vue-next/config?tab=api
    // pagination: {
    //   jumpTo: 'xxx'
    // },
  }),
};
