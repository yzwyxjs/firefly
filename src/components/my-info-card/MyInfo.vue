<script setup lang="ts">
import { DialogPlugin, MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';

import router from '@/router';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const props = defineProps({
  postNewRouterPath: {
    type: String,
    required: true,
  },
});
const handlePostNewClick = () => {
  router.replace(props.postNewRouterPath?.toString());
};
const handleLoginClick = () => {
  // userStore.loginStatus = !userStore.loginStatus;
  userStore.goLoginPage();
};

const handleEditUserInfoClick = () => {
  MessagePlugin.error('该功能还没有做完，呜呜呜～');
};
const handleLogoutClick = () => {
  const confirmDia = DialogPlugin({
    header: '退出登录',
    body: '确定要退出登录吗？',
    confirmBtn: '确定',
    onConfirm: async ({ e }) => {
      userStore.logout();
      confirmDia.hide();
    },
    onClose: ({ e, trigger }) => {
      confirmDia.hide();
    },
  });
};
</script>

<template>
  <div class="login-info-wrapper">
    <h2 v-if="!userStore.loginStatus">请登录后发表内容</h2>
    <!--    <h2 v-else>请登录后发表内容</h2>-->
    <div v-if="userStore.loginStatus">
      <t-button
        theme="primary"
        variant="text"
        style="position: absolute; right: 10px; top: 10px"
        @click="handleEditUserInfoClick"
      >
        编辑资料
      </t-button>
      <t-avatar class="avatar" :image="userStore.userInfo.avatar" size="80px" />
      <div class="nickname">{{ userStore.userInfo.nickname }}</div>
      <div class="reg-time">{{ userStore.userInfo.registerTime }} 加入本站</div>
      <div class="signature">{{ userStore.userInfo.signature || '这个用户比较懒，还没有填写个性签名～' }}</div>
    </div>
    <div v-if="userStore.loginStatus" style="display: flex; gap: 20px; justify-content: center; margin-top: 20px">
      <t-button @click="handlePostNewClick">发布内容</t-button>
      <t-button theme="danger" variant="outline" @click="handleLogoutClick">退出登录</t-button>
    </div>
    <div v-else>
      <t-button size="large" @click="handleLoginClick">微信扫码登录</t-button>
      <div class="login-help">
        <h4>问：为什么要微信扫码登录后才能发表内容？</h4>
        <div>
          答：根据《中华人民共和国网络安全法》等的规定，也为了避免“乐子人”、“水军”、“米黑”、“赛博生命”等恶意用户使用程序批量注册刷屏或发布违法违规内容，为了守护流萤厨的这片乐土，我们决定采用微信扫码登录的方式，以确保网站的合法合规与健康运行。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-info-wrapper {
  padding: 20px;
  background-color: #fff;
  font-weight: normal;
  border-radius: 8px;
  color: black;
  h2 {
    font-size: 22px;
    margin-bottom: 20px;
  }
  t-button {
    margin-top: 20px;
  }
}

.avatar {
  margin-bottom: 20px;
}

.nickname {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.reg-time {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.signature {
  font-size: 14px;
  text-align: left;
  color: #666;
}

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
</style>
