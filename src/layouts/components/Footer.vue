<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
</script>

<template>
  <!--  请勿轻易修改本文件内容！！！-->
  <footer class="footer-container">
    <div class="footer-wrapper">
      <div class="footer-content">
        <div class="footer-content-item">
          <h3>{{ $t('layout.footer.aboutSite.title') }}</h3>
          <p>{{ $t('layout.footer.aboutSite.site') }}</p>
          <p>{{ $t('layout.footer.aboutSite.notice') }}</p>
        </div>
        <div class="footer-content-item">
          <h3>{{ $t('layout.footer.contact.title') }}</h3>
          <p>
            {{ $t('layout.footer.contact.bilibili') }}
            <a href="https://space.bilibili.com/76660015l">{{ $t('layout.footer.contact.bilibiliName') }}</a>
          </p>
          <p>
            {{ $t('layout.footer.contact.mail') }}
            <a href="mailto:www@dayu.email">www@dayu.email</a>
          </p>
          <p>
            {{ $t('layout.footer.contact.github') }}
            <a href="https://github.com/yzwyxjs/firefly" target="_blank"> {{ $t('constants.clickHere') }}</a>
          </p>
        </div>
        <div class="footer-content-item">
          <h3>
            {{ $t('layout.footer.friendlyLink.title') }}
          </h3>
          <p>
            {{ $t('layout.footer.friendlyLink.noLink') }}
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 {{ $t('layout.footer.copyright.siteName') }}</p>
        <p>
          {{ $t('layout.footer.copyright.domainServerKeeper')
          }}<a href="https://www.dayuweb.com"> {{ $t('layout.footer.copyright.domainServerKeeperName') }} </a>
        </p>

        <!--只有中文版需要显示健康游戏忠告-->
        <p v-if="locale === 'zh_CN'">
          健康游戏忠告：抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。
        </p>
        <p>{{ $t('layout.footer.copyright.slogan') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
@import '@/style/variables';

.footer-container {
  //background-color: #0e1b43;
  background: linear-gradient(180deg, #0e1b43 0%, #3a4592 100%);
  color: white;
  width: 100vw;
  margin: 0 auto;
  padding: 16px 0;
}
.footer-wrapper {
  color: white;
  width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 30px;
  a {
    transition: all 0.3s;
  }
  a:hover {
    color: @active-color;
  }
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .footer-content-item {
      margin: 10px 20px;
      min-width: 290px;
      flex: 1;
      h3 {
        font-size: 20px;
        margin-bottom: 16px;
      }
      p {
        margin-bottom: 8px;
      }
    }
  }
  .footer-bottom {
    font-size: 14px;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
