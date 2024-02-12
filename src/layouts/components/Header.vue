<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { LogoGithubFilledIcon, TranslateIcon } from 'tdesign-icons-vue-next';
import { watch } from 'vue';

import MobileHeaderMenu from '@/components/mobile-header-menu/MobileHeaderMenu.vue';
import { langList } from '@/locales';
import { useLocale } from '@/locales/useLocale.ts';

const { changeLocale } = useLocale();
const changeLang = ({ value: lang }: { value: string }) => {
  changeLocale(lang);
};
const isMobile = useMediaQuery('(max-width: 992px)');

watch(isMobile, (newValue) => {
  if (!newValue) {
    // 释放禁止滚动，防止手机或平板从竖屏转换为横屏无法滚动
    document.body.style.overflow = 'auto';
  }
});
const goGithub = () => {
  window.open('https://github.com/yzwyxjs/firefly');
};
</script>

<template>
  <nav class="nav-container">
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">
        <img src="@/assets/img/logo/firefly-site-logo.png" alt="站点Logo Site Logo" class="logo" />
      </a>
      <div class="nav-right">
        <ul id="nav-pc" class="nav-list">
          <li>
            <router-link class="nav-item" to="/">
              {{ $t('layout.header.index') }}
            </router-link>
          </li>
          <li>
            <router-link class="nav-item" to="/about">
              {{ $t('layout.header.aboutProject') }}
            </router-link>
          </li>
        </ul>

        <div class="right-btn-wrapper">
          <t-dropdown trigger="click">
            <t-button theme="default" shape="square" aria-label="切换语言 Change Language" variant="text">
              <translate-icon v-if="!isMobile" style="font-size: 22px" />
              <translate-icon v-else style="font-size: 30px" />
            </t-button>
            <t-dropdown-menu>
              <t-dropdown-item v-for="(lang, index) in langList" :key="index" :value="lang.value" @click="changeLang">{{
                lang.content
              }}</t-dropdown-item></t-dropdown-menu
            >
          </t-dropdown>

          <t-button theme="default" shape="square" variant="text" aria-label="GitHub" @click="goGithub">
            <logo-github-filled-icon v-if="!isMobile" style="font-size: 22px" />
            <logo-github-filled-icon v-else style="font-size: 30px" />
          </t-button>

          <t-button v-if="isMobile" theme="default" shape="square" variant="text">
            <mobile-header-menu />
          </t-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="less">
@import 'header';
</style>
