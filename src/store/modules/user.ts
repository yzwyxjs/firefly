import { MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { defineStore } from 'pinia';

import { logoutApi } from '@/api/user/user-info.ts';
import router from '@/router';
import { initUser } from '@/types/user';
import { checkUA } from '@/utils/ua.ts';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'main_token', // 默认token不走权限
    userInfo: initUser(),
    pathAfterLogin: '',
    loginStatus: false,
    mobileLoginTicket: '',
  }),
  getters: {},
  actions: {
    clearToken() {
      this.token = '';
      this.loginStatus = false;

      this.userInfo = initUser();
    },
    async logout() {
      this.token = '';
      this.userInfo = initUser();
      this.loginStatus = false;
      await logoutApi();
      MessagePlugin.success('退出成功');
    },
    goLoginPage(pathAfterLogin?: string) {
      this.pathAfterLogin = pathAfterLogin || router.currentRoute.value.fullPath;

      const ua = checkUA();
      if (ua === 'pcwx' || ua === 'wx') {
        router.push('/login/wx');
      }
      if (ua === 'mobile') {
        router.push('/login/h5');
      }
      if (ua === 'pc') {
        window.location.href =
          'https://open.weixin.qq.com/connect/qrconnect?appid=wxcaa6212a0fff948c&redirect_uri=https://authserver.dayuweb.com/firefly_login_proxy&response_type=code&scope=snsapi_login&state=web_login#wechat_redirect';
      }
    },
  },
  persist: {
    key: 'user',
    paths: ['token', 'userInfo', 'loginStatus', 'pathAfterLogin', 'mobileLoginTicket'],
  },
});
