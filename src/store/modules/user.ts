import { defineStore } from 'pinia';

import { initUser } from '@/types/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'main_token', // 默认token不走权限
    userInfo: initUser(),
    loginStatus: true,
  }),
  getters: {},
  actions: {
    logout() {
      this.token = '';
      this.userInfo = initUser();
      this.loginStatus = false;
    },
  },
  persist: {
    key: 'user',
    paths: ['token', 'userInfo', 'loginStatus'],
  },
});
