import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
import { DropdownOption } from 'tdesign-vue-next';
import { computed } from 'vue';
import { createI18n } from 'vue-i18n';

// 导入语言文件
const langModules = import.meta.glob('./lang/*/index.ts', { eager: true });

const langModuleMap = new Map<string, Object>();

export const langCode: Array<string> = [];

export const localeConfigKey = 'firefly-locale';

// 获取浏览器默认语言环境
const languages = usePreferredLanguages();

// 生成语言模块列表
const generateLangModuleMap = () => {
  const fullPaths = Object.keys(langModules);
  fullPaths.forEach((fullPath) => {
    const k = fullPath.replace('./lang', '');
    const startIndex = 1;
    const lastIndex = k.lastIndexOf('/');
    const code = k.substring(startIndex, lastIndex);
    langCode.push(code);
    // @ts-ignore
    langModuleMap.set(code, langModules[fullPath]);
  });
};

// 导出 Message
const importMessages = computed(() => {
  generateLangModuleMap();

  const message: Recordable = {};
  langModuleMap.forEach((value: any, key) => {
    message[key] = value.default;
  });
  return message;
});

const getInitialLanguage = () => {
  // 判断浏览器语言
  const lang = navigator.language.includes('zh') ? 'zh_CN' : 'en_US';
  if (langCode.includes(lang)) {
    return lang;
  }
  return 'zh_CN';
};

export const i18n = createI18n({
  legacy: false,
  locale: useLocalStorage(localeConfigKey, getInitialLanguage()).value || languages.value[0] || 'zh_CN',
  fallbackLocale: 'zh_CN',
  messages: importMessages.value,
  globalInjection: true,
});

export const langList = computed(() => {
  if (langModuleMap.size === 0) generateLangModuleMap();

  const list: DropdownOption[] = [];
  langModuleMap.forEach((value: any, key) => {
    list.push({
      content: value.default.lang,
      value: key,
    });
  });

  return list;
});

// @ts-ignore
export const { t } = i18n.global;

export default i18n;
