<script setup lang="ts">
import { MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import QrcodeVue from 'qrcode.vue';
import { ref } from 'vue';

import { getMobileLoginTicket, verifyMobileLoginTicket } from '@/api/user/user-info.ts';
import { ResultCode } from '@/enums/ResultCode.ts';
import router from '@/router';
import { useUserStore } from '@/store';
import { MobileLoginTicket } from '@/types/user/login.ts';
import { checkUA } from '@/utils/ua.ts';

const userStore = useUserStore();
const codeUrl = ref('');
const loginTicket = ref<MobileLoginTicket>({
  ticket: '',
  expireTime: '',
});
const requesting = ref(false);

const gotLoginTicket = ref(false);
let timer;
const handleLoginClick = async () => {
  requesting.value = true;
  loginTicket.value = await getMobileLoginTicket();
  codeUrl.value = `https://www.liuying520.com/login/wx?ticket=${loginTicket.value.ticket}&loginType=h5`;
  gotLoginTicket.value = true;
  requesting.value = false;
  timer = setInterval(() => {
    checkLoginResult(true);
  }, 3000);
};
const checkLoginResult = async (noMessageNotice = true) => {
  const checkResult = await verifyMobileLoginTicket();
  if (checkResult.code === ResultCode.SUCCESS.code) {
    clearInterval(timer);
    // MessagePlugin.success('登录成功');
    userStore.userInfo = checkResult.data;
    userStore.loginStatus = true;
    router.push(userStore.pathAfterLogin || '/');
  } else if (checkResult.code === ResultCode.USER_NOT_LOGIN.code) {
    // console.log('用户未登录');
    if (!noMessageNotice) {
      MessagePlugin.warning('您还未完成登录，请扫码登录');
    }
  } else {
    clearInterval(timer);
    MessagePlugin.error(checkResult.message);
  }
};
const handleCancelLogin = () => {
  if (gotLoginTicket.value) {
    gotLoginTicket.value = false;
    clearInterval(timer);
  } else {
    router.replace('/');
  }
};
</script>

<template>
  <main class="main-container">
    <div class="login-wrapper">
      <h1>登录</h1>
      <div v-if="gotLoginTicket" style="margin-top: 20px">
        <qrcode-vue id="code" :value="codeUrl" :size="200"></qrcode-vue>
        <h2 style="margin-top: 10px; font-size: 18px; color: red">请保存二维码到相册，使用微信扫一扫识别</h2>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px; width: 80%; margin: 0 auto">
        <t-button
          v-if="!gotLoginTicket"
          :loading="requesting"
          size="large"
          style="margin-top: 30px"
          @click="handleLoginClick"
          >微信扫码登录</t-button
        >
        <t-button v-if="gotLoginTicket" size="large" style="margin-top: 30px" @click="checkLoginResult(false)"
          >登录完成</t-button
        >
        <t-button v-if="!gotLoginTicket" variant="outline" theme="primary" size="large" @click="handleCancelLogin"
          >返回</t-button
        >
        <t-button v-if="gotLoginTicket" variant="outline" theme="primary" size="large" @click="handleCancelLogin"
          >取消</t-button
        >
      </div>
      <div class="login-help">
        <h4>问：为什么要微信扫码登录后才能发表内容？</h4>
        <div>
          答：根据《中华人民共和国网络安全法》等的规定，也为了避免“乐子人”、“水军”、“米黑”、“赛博生命”等恶意用户使用程序批量注册刷屏或发布违法违规内容，为了守护流萤厨的这片乐土，我们决定采用微信扫码登录的方式，以确保网站的合法合规与健康运行。
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
  margin: 50px 0;
  padding: 70px 0;
  h1 {
    font-size: 24px;
  }
}
</style>
