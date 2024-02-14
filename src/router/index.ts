import { useLocalStorage, useTitle } from '@vueuse/core';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { localeConfigKey } from '@/locales';
import { useUserStore } from '@/store';
import { RouteMeta } from '@/types/interface';

const env = import.meta.env.MODE || 'development';

const homepageModules = import.meta.glob('./modules/**/homepage.ts', { eager: true });
const loginModules = import.meta.glob('./modules/**/login.ts', { eager: true });

export const homepageRouterList: Array<RouteRecordRaw> = mapModuleRouterList(homepageModules);
export const loginRouterList: Array<RouteRecordRaw> = mapModuleRouterList(loginModules);
export const allRoutes = [...homepageRouterList, ...loginRouterList];

const router = createRouter({
  history: createWebHistory(env === 'site' ? '/starter/vue-next/' : import.meta.env.VITE_BASE_URL),
  routes: allRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});
// 固定路由模块转换为路由
export function mapModuleRouterList(modules: Record<string, unknown>): Array<RouteRecordRaw> {
  const routerList: Array<RouteRecordRaw> = [];
  Object.keys(modules).forEach((key) => {
    // @ts-ignore
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routerList.push(...modList);
  });
  return routerList;
}

router.beforeEach((to, _from, next) => {
  const locale = useLocalStorage(localeConfigKey, 'zh_CN');
  const title = useTitle();
  const meta = to.meta as RouteMeta;
  if (meta?.title) {
    if (typeof meta.title === 'string') {
      title.value = meta.title;
    } else {
      title.value = meta.title[locale.value];
    }
  }
  const userStore = useUserStore();

  if (meta?.needLogin && !userStore.loginStatus) {
    userStore.goLoginPage(to.fullPath);
  } else {
    next();
  }
});

export default router;
