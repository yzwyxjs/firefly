<script setup lang="ts">
import { MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';
import { onMounted, ref } from 'vue';

import { loginByWxCode, uploadTicketByH5 } from '@/api/user/user-info.ts';
import { ResultCode } from '@/enums/ResultCode.ts';
import router from '@/router';
import { useUserStore } from '@/store';

const withError = ref(false);
const withErrorText = ref('');
const userStore = useUserStore();
const getLoginType = (state: string) => {
  switch (state) {
    case 'web_login':
      return 'open';
    case 'mp_login':
      return 'mp';
    default:
      return '';
  }
};
onMounted(() => {
  const url = new URL(location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  // MessagePlugin.loading(`正在登录${state} -- ${userStore.mobileLoginTicket}`);
  if (state && state === 'h5_login') {
    uploadTicketByH5(userStore.mobileLoginTicket, code).then((res) => {
      if (res.code === ResultCode.SUCCESS.code) {
        MessagePlugin.success('扫码登录成功');
        withError.value = false;
        userStore.loginStatus = true;
        userStore.userInfo = res.data;
        router.push(userStore.pathAfterLogin || '/');
      } else {
        withError.value = true;
        withErrorText.value = res.message;
      }
    });
    return;
  }
  if (code && state) {
    const loginType = getLoginType(state);
    if (!loginType || loginType === '') {
      withError.value = true;
      withErrorText.value = '登录类型错误';
      return;
    }
    loginByWxCode(code, loginType).then((res) => {
      if (res.code === ResultCode.SUCCESS.code) {
        withError.value = false;

        userStore.loginStatus = true;
        userStore.userInfo = res.data;
        router.push(userStore.pathAfterLogin || '/');
      } else {
        withError.value = true;
        withErrorText.value = res.message;
      }
    });
  } else {
    withError.value = true;
    withErrorText.value = '请返回重新尝试';
  }
});
</script>

<template>
  <main class="main-container">
    <div v-if="!withError" class="notice">
      <t-loading size="60px" />
      <h1 style="color: white; font-size: 34px">正在登录</h1>
    </div>
    <div v-else class="notice" style="background-color: rgba(0, 0, 0, 0.6); padding: 60px; border-radius: 20px">
      <div style="text-align: center">
        <error-circle-icon style="font-size: 70px; color: var(--td-error-color)" />
      </div>
      <h1 style="color: white; font-size: 34px; text-align: center">{{ withErrorText }}</h1>
      <div style="text-align: center">
        <t-button size="large" theme="primary" variant="text" style="width: 200px" @click="router.back()"
          >返回</t-button
        >
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
.notice {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  gap: 30px;
}
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 70px 0;
  h1 {
    font-size: 24px;
  }
}
</style>
