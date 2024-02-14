<script setup lang="ts">
import { DialogPlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { useMediaQuery } from '@vueuse/core';
import { LogoutIcon } from 'tdesign-icons-vue-next';
import { ref, watch } from 'vue';

import { deleteConfession } from '@/api/confession';
import { useUserStore } from '@/store';

const isMobile = useMediaQuery('(max-width: 992px)');
const isMobileMenuExpand = ref(false);
const userStore = useUserStore();
watch(isMobileMenuExpand, (newValue) => {
  if (newValue) {
    // 阻止滚动穿透
    document.body.style.overflow = 'hidden';
  } else {
    // 恢复正常滚动
    document.body.style.overflow = 'auto';
  }
});

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
  <div>
    <div class="right-btns">
      <div
        class="button-content"
        aria-label="导航折叠菜单"
        :aria-expanded="isMobileMenuExpand"
        @click="isMobileMenuExpand = !isMobileMenuExpand"
      >
        <div
          aria-hidden="true"
          :class="{ 'btn-label': true, changeFigure: isMobileMenuExpand }"
          style="width: 30px; height: 30px; padding: 4px; box-sizing: border-box"
        >
          <div class="HeaderMenu-toggle-bar"></div>
          <div class="HeaderMenu-toggle-bar"></div>
          <div class="HeaderMenu-toggle-bar"></div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    <Transition name="modal">
      <div
        v-if="isMobileMenuExpand && isMobile"
        class="mobile-menu-backdrop"
        style="z-index: 8"
        @click.self="isMobileMenuExpand = false"
      >
        <div class="mobile-menu-wrapper mobile-menu-content">
          <ul class="mobile-nav-list">
            <li class="nav-mobile-item">
              <router-link to="/">
                {{ $t('layout.header.index') }}
              </router-link>
            </li>
            <li class="nav-mobile-item">
              <router-link to="/pic-share-zone">
                {{ $t('layout.header.picShareZone') }}
              </router-link>
            </li>
            <li class="nav-mobile-item">
              <router-link to="/confessions">
                {{ $t('layout.header.confessions') }}
              </router-link>
            </li>
            <li class="nav-mobile-item">
              <router-link to="/about">
                {{ $t('layout.header.aboutProject') }}
              </router-link>
            </li>
          </ul>
          <div
            v-if="userStore.loginStatus"
            style="padding: 10px; display: flex; justify-content: space-between; align-items: center"
          >
            <div style="display: flex; justify-content: space-between; align-items: center">
              <t-avatar size="60px" :image="`${userStore.userInfo.avatar}`"></t-avatar>
              <div style="margin-left: 10px">
                <div style="font-size: 16px">{{ userStore.userInfo.nickname }}</div>
                <div style="font-size: 14px; color: #ababab">UID：{{ userStore.userInfo.uid }}</div>
              </div>
            </div>
            <div style="margin-left: 20px">
              <t-button size="large" variant="text" shape="circle" style="color: #9f9f9f" @click="handleLogoutClick">
                <logout-icon style="font-size: 22px" />
              </t-button>
            </div>
          </div>
          <div v-else style="padding: 10px; display: flex; justify-content: space-between; align-items: center">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 30px;
                position: relative;
              "
            >
              <div @click="userStore.goLoginPage()">
                <div style="font-size: 16px">登录</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="less">
@import '@/layouts/components/header.less';
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .mobile-menu-content,
.modal-leave-to .mobile-menu-content {
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
}
.mobile-menu-backdrop {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(3px);
}

.mobile-menu-wrapper {
  position: absolute;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 550px;
  background: #fff;
  opacity: 1;
  overflow: scroll;
  border-radius: 10px;
  margin: 0 auto;
  z-index: 9999;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.mobile-nav-list {
  padding: 0 15px;
}
.nav-mobile-item {
  margin: 0 16px;
  > a {
    display: block;
    cursor: pointer;
    position: relative;
    border-bottom: none;
    z-index: 101;
    font-size: 20px;
    padding: 15px 10px;
    font-weight: 500;
    line-height: 22px;
    transition: all 0.3s;

    &:hover {
      border-bottom: none !important;
    }
  }

  .second-mobile-nav-item:first-child {
    margin-top: 10px;
  }
  .second-mobile-nav-item > a {
    display: block;
    margin: 0 6px;
    cursor: pointer;
    color: #818181;
    position: relative;
    z-index: 101;
    font-size: 16px;
    padding: 15px 10px;
    font-weight: 500;
    line-height: 22px;
    transition: all 0.3s;
  }
}
.nav-mobile-item > a:not(.router-link-exact-active)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) rotate(45deg);
  width: 8px; /* Adjust the width as needed */
  height: 8px; /* Adjust the height as needed */
  border-top: 2px solid #8f9193; /* Adjust the color and thickness as needed */
  border-right: 2px solid #8f9193; /* Adjust the color and thickness as needed */
}
.HeaderMenu-toggle-bar {
  background-color: white;
  width: 22px;
  height: 2px;
  margin-top: 6px;
  margin-bottom: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
  -webkit-transform-origin: 0 50%;
  transform-origin: 0 50%;
  &:first-child {
    transform-origin: bottom right;
    margin-top: 3px;
  }
  &:nth-child(2) {
  }
  &:nth-child(3) {
    transform-origin: top right;
  }
}

.changeFigure div:first-child {
  transform: rotate(-45deg) translateY(0px) !important;
  top: -5px;
}
.changeFigure div:nth-child(2) {
  opacity: 0 !important;
  transform: scale(0) !important;
}
.changeFigure div:nth-child(3) {
  transform: rotate(45deg) translateY(0px) !important;
}
</style>
