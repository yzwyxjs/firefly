import Layout from '@/layouts/index.vue';
import AboutProject from '@/pages/about/project/index.vue';
import Confessions from '@/pages/confessions/index.vue';
import NewConfession from '@/pages/confessions/NewConfession.vue';
import Index from '@/pages/homepage/index.vue';
import PicShareZone from '@/pages/pic-share-zone/index.vue';
import NewPicShare from '@/pages/pic-share-zone/NewPicShare.vue';

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
      {
        path: 'about',
        component: AboutProject,
        name: 'AboutProject',
        meta: {
          title: {
            zh_CN: '关于本项目',
            en_US: 'About Project',
          },
          orderNo: 0,
        },
      },
      {
        path: 'pic-share-zone',
        component: PicShareZone,
        name: 'PicShareZone',
        meta: {
          title: {
            zh_CN: '图片墙',
            en_US: 'Pic Share Zone',
          },
          orderNo: 0,
        },
      },
      {
        path: 'pic-share-zone/new',
        component: NewPicShare,
        name: 'NewPicShare',
        meta: {
          title: {
            zh_CN: '发布图片',
            en_US: 'New Pic Share',
          },
          orderNo: 0,
        },
      },
      {
        path: 'confessions',
        component: Confessions,
        name: 'Confessions',
        meta: {
          title: {
            zh_CN: '表白墙',
            en_US: 'Confessions',
          },
          orderNo: 0,
        },
      },
      {
        path: 'confessions/new',
        component: NewConfession,
        name: 'NewConfession',
        meta: {
          title: {
            zh_CN: '发布表白墙',
            en_US: 'New Confession',
          },
          orderNo: 0,
        },
      },
    ],
  },
];
