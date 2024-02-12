<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isMobile = useMediaQuery('(max-width: 992px)');
</script>

<template>
  <main class="index-page-container">
    <!--这里不同语言、不同设备类型需要精细化调整排版，因此通过v-if控制一下-->
    <h1 v-if="locale === 'zh_CN' && !isMobile" class="site-title">萤火微光 永不燃灭 流光溢彩 萤门永存</h1>
    <h1 v-if="locale === 'zh_CN' && isMobile" class="site-title">
      萤火微光 永不燃灭
      <br />
      流光溢彩 萤门永存
    </h1>

    <h1 v-if="isMobile" class="site-title en">
      Firefly's faint glow,<br />
      never extinguished.
      <br />
      Radiant and splendid, <br />the Firefly Fellowship prevails.
    </h1>
    <h1 v-if="!isMobile" class="site-title en">
      Firefly's faint glow, never extinguished.
      <br />
      Radiant and splendid, the Firefly Fellowship prevails.
    </h1>

    <h2 class="site-intro" style="margin-top: 20px">
      {{ $t('pages.homepage.siteIntro') }}
    </h2>
    <div class="develop-notice">
      <h3>{{ $t('pages.homepage.developing') }}</h3>
      <div style="margin-top: 10px" class="develop-desc">{{ $t('pages.homepage.developingDesc') }}</div>
      <t-button size="large" style="margin-top: 20px" variant="base" href="https://github.com/yzwyxjs/firefly">
        {{ $t('pages.homepage.joinUs') }}</t-button
      >
    </div>
  </main>
</template>

<style scoped lang="less">
@media (max-width: @screen-md) {
  .site-title {
    font-size: 8vw;
    margin-bottom: 1rem;
    color: #fff;

    &.en {
      font-size: 6vw;
    }
  }

  .develop-desc {
    font-size: 3.6vw;
    color: #fff;
  }

  .develop-notice {
    color: #fff;
    font-size: 5vw;
    margin-top: 2rem;
  }
  .site-intro {
    font-size: 16px;
    color: #fff;
  }
}

@media (min-width: @screen-md) {
  .site-title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #fff;

    &.en {
      font-size: 2rem;
    }
  }

  .develop-notice {
    color: #fff;
    font-size: 1.5rem;
    margin-top: 2rem;
  }
  .site-intro {
    font-size: 18px;
    color: #fff;
  }
}
.index-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 30px;
  text-align: center;
  background: url('@/assets/img/bg/firefly-website-bgimg-3840-2160.jpg') no-repeat center center;
  background-size: cover;
  color: #333;
}
</style>
