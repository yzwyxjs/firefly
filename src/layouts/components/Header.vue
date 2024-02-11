<script setup lang="ts">
import { LogoGithubFilledIcon, TranslateIcon } from 'tdesign-icons-vue-next';

import { langList } from '@/locales';
import { useLocale } from '@/locales/useLocale.ts';

const { changeLocale } = useLocale();
const changeLang = ({ value: lang }: { value: string }) => {
  changeLocale(lang);
};

const goGithub = () => {
  window.open('https://github.com/yzwyxjs/firefly');
};
</script>

<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo">Vue 3 + Vite + TypeScript</a>
      <div class="nav-right">
        <ul id="nav-mobile" class="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <ul id="nav-pc" class="nav-list">
          <li class="nav-item">
            <router-link to="/">
              {{ $t('layout.header.index') }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about">
              {{ $t('layout.header.aboutProject') }}
            </router-link>
          </li>
        </ul>

        <div class="right-btn-wrapper">
          <t-dropdown trigger="click">
            <t-button theme="default" shape="square" variant="text">
              <translate-icon style="font-size: 22px" />
            </t-button>
            <t-dropdown-menu>
              <t-dropdown-item v-for="(lang, index) in langList" :key="index" :value="lang.value" @click="changeLang">{{
                lang.content
              }}</t-dropdown-item></t-dropdown-menu
            >
          </t-dropdown>

          <t-button theme="default" shape="square" variant="text" @click="goGithub">
            <logo-github-filled-icon style="font-size: 22px" />
          </t-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="less">
@import '@/style/variables';
nav {
  background-color: transparent;
  color: white;
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}
.select-item {
  width: 200px;
  color: white;
  background-color: #333;
  &:hover {
    background-color: #171717;
  }
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.right-btn-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
}
.nav-item {
  margin: 0 10px;
  min-width: 93px;
  height: 50px;
  padding: 0 20px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    color: @active-color;
    background-color: rgba(255, 255, 255, 0.21);
  }
}
.router-link-active {
  color: @active-color;

  &::after {
    content: '';
    width: 93px;
    height: 3px;
    display: block;
    background: @active-color;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.brand-logo {
  margin-left: 20px;
}
#nav-mobile {
  display: none;
}
@media (max-width: 992px) {
  #nav-mobile {
    display: block;
  }
}
@media (max-width: 600px) {
  .brand-logo {
    margin-left: 0;
  }
}
</style>
