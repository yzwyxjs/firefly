<script setup lang="ts">
import { useLocale } from '@/locales/useLocale';

const { getComponentsLocale, locale } = useLocale();
</script>

<template>
  <t-config-provider :global-config="getComponentsLocale"> <router-view :key="locale" /></t-config-provider>
</template>

<style scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
</style>
