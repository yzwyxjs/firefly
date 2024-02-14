import type { TabValue } from 'tdesign-vue-next';
import { LocationQueryRaw, RouteRecordName } from 'vue-router';

import STYLE_CONFIG from '@/config/style';

export interface GeetestResponse {
  lot_number: string;
  captcha_output: string;
  pass_token: string;
  gen_time: string;
}

export interface Page<S> {
  countId: null;
  /**
   * 当前页码
   */
  current: number;
  maxLimit: null;
  optimizeCountSql: boolean;
  /**
   * 目前没用
   */
  orders: string[];
  /**
   * 一共多少页
   */
  pages: number;
  /**
   * 用户信息列表
   */
  records: S[];
  searchCount: boolean;
  /**
   * 页面大小
   */
  size: number;
  /**
   * 数据库中符合条件的记录总数
   */
  total: number;
}

export interface RouteMeta {
  title?: string | Record<string, string>;
  needLogin?: boolean;
  icon?: string;
  expanded?: boolean;
  orderNo?: number;
  hidden?: boolean;
  hiddenBreadcrumb?: boolean;
  single?: boolean;
  keepAlive?: boolean;
  frameSrc?: string;
  frameBlank?: boolean;
}

export interface MenuRoute {
  path: string;
  title?: string | Record<string, string>;
  name?: string;
  icon?:
    | string
    | {
        render: () => void;
      };
  redirect?: string;
  children: MenuRoute[];
  meta: RouteMeta;
}

export type ModeType = 'dark' | 'light';

export type SettingType = typeof STYLE_CONFIG;

export type ClassName = { [className: string]: any } | ClassName[] | string;

export type CommonObjType = {
  [key: string]: string | number;
};

export interface UserInfo {
  name: string;
  roles: string[];
}

export interface NotificationItem {
  id: string;
  content: string;
  type: string;
  status: boolean;
  collected: boolean;
  date: string;
  quality: string;
}

export interface TRouterInfo {
  path: string;
  query?: LocationQueryRaw;
  routeIdx?: number;
  title?: string;
  name?: RouteRecordName;
  isAlive?: boolean;
  isHome?: boolean;
  meta?: any;
}

export interface TTabRouterType {
  isRefreshing: boolean;
  tabRouterList: Array<TRouterInfo>;
}

export interface TTabRemoveOptions {
  value: TabValue;
  index: number;
  e: MouseEvent;
}
