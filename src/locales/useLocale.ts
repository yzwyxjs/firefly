import { useLocalStorage, useTitle } from '@vueuse/core';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { i18n, langCode, localeConfigKey } from '@/locales/index';
import router from '@/router';
import { RouteMeta } from '@/types/interface';

export function useLocale() {
  const { locale } = useI18n({ useScope: 'global' });
  function changeLocale(lang: string) {
    // 如果切换的语言不在对应语言文件里则默认为简体中文
    if (!langCode.includes(lang)) {
      lang = 'zh_CN';
    }

    locale.value = lang;
    useLocalStorage(localeConfigKey, 'zh_CN').value = lang;
    const title = useTitle();
    const meta = router.currentRoute.value.meta as RouteMeta;
    if (meta?.title) {
      if (typeof meta.title === 'string') {
        title.value = meta.title;
      } else {
        title.value = meta.title[locale.value];
      }
    }
  }

  const getComponentsLocale = computed(() => {
    return i18n.global.getLocaleMessage(locale.value).componentsLocale;
  });

  return {
    changeLocale,
    getComponentsLocale,
    locale,
  };
}
