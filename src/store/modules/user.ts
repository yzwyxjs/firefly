import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: 'main_token', // 默认token不走权限
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'user',
    paths: ['token'],
  },
});
