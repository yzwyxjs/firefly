<script setup lang="ts">
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import router from '@/router';
import { useUserStore } from '@/store';
import { checkUA } from '@/utils/ua.ts';

const userStore = useUserStore();
const loginType = ref('');
const handleLoginClick = () => {
  const ua = checkUA();
  if (ua === 'wx' || ua === 'pcwx') {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5502f8831cf151a0&redirect_uri=https://authserver.dayuweb.com/firefly_login_proxy&response_type=code&scope=snsapi_userinfo&state=${loginType.value}#wechat_redirect`;
  } else {
    if (ua === 'mobile') {
      router.push('/login/h5');
    }
    if (ua === 'pc') {
      window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=wxcaa6212a0fff948c&redirect_uri=https://authserver.dayuweb.com/firefly_login_proxy&response_type=code&scope=snsapi_login&state=${loginType.value}#wechat_redirect`;
    }
  }
};
const withError = ref(false);
const withErrorText = ref('');
onMounted(() => {
  const ua = checkUA();
  if (ua !== 'wx' && ua !== 'pcwx') {
    withError.value = true;
    withErrorText.value = '请使用微信打开本页面';
  }
  const url = new URL(location.href);
  const ticket = url.searchParams.get('ticket');
  const loginTypeParam = url.searchParams.get('loginType');
  if (!loginTypeParam || loginTypeParam === '') {
    loginType.value = 'mp_login';
  }
  if (loginTypeParam === 'h5') {
    if (!ticket || ticket === '') {
      withError.value = true;
      withErrorText.value = '缺少调用凭证参数，请重新扫码';
    } else {
      userStore.mobileLoginTicket = ticket;
      loginType.value = 'h5_login';
    }
  }
});
const handleCancelLogin = () => {
  router.replace('/');
};
</script>

<template>
  <main class="main-container">
    <div class="login-wrapper">
      <h1>登录</h1>
      <div v-if="!withError" style="display: flex; flex-direction: column; gap: 10px; width: 80%; margin: 0 auto">
        <t-button size="large" style="margin-top: 30px" @click="handleLoginClick">微信一键登录</t-button>
        <t-button variant="outline" theme="primary" size="large" @click="handleCancelLogin">取消登录</t-button>
        <div style="text-align: left; font-size: 14px; color: gray">
          点击“微信一键登录”按钮，将会申请获取您的微信头像、昵称等信息，用于在本站展示您的个人信息。
        </div>
      </div>
      <div v-else style="margin: 20px 0">
        <div v-if="withError" style="text-align: center">
          <error-circle-icon style="font-size: 70px; color: var(--td-error-color)" />
        </div>
        <h1 v-if="withError" style="color: black; font-size: 24px; margin-top: 20px; text-align: center">
          {{ withErrorText }}
        </h1>
        <div v-if="withError" style="text-align: center; margin-top: 20px">
          <t-button size="large" theme="primary" variant="text" style="width: 200px" @click="router.back()"
            >返回</t-button
          >
        </div>
      </div>
      <div v-if="!withError" class="login-help">
        <h4>问：为什么要微信登录后才能发表内容？</h4>
        <div>
          答：根据《中华人民共和国网络安全法》等的规定，也为了避免“乐子人”、“水军”、“米黑”、“赛博生命”等恶意用户使用程序批量注册刷屏或发布违法违规内容，为了守护流萤厨的这片乐土，我们决定采用微信登录的方式，以确保网站的合法合规与健康运行。
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
.login-help {
  margin-top: 20px;
  text-align: left;
  h4 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  div {
    font-size: 16px;
    color: #666;
  }
}
.login-wrapper {
  text-align: center;
  padding: 40px 20px;
  background-color: rgba(255, 255, 255, 0.9);
  width: 90vw;
  border-radius: 20px;
  max-width: 400px;
  gap: 30px;
}
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 20px 0;
  padding: 70px 0;
  h1 {
    font-size: 24px;
  }
}
</style>
