import Layout from '@/layouts/index.vue';
import Index from '@/pages/homepage/index.vue';

export default [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    meta: {
      title: {
        zh_CN: '流萤 主题网站',
        en_US: 'Firefly Theme Website',
      },
      orderNo: 0,
    },
    children: [
      {
        path: '',
        component: Index,
        name: 'index',
        meta: {
          title: {
            zh_CN: '流萤 主题网站',
            en_US: 'Firefly Theme Website',
          },
          orderNo: 0,
        },
      },
    ],
  },
];
