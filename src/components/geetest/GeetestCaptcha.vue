<template>
  <div id="captcha"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps({
  captchaConfig: { type: Object as () => any, required: true },
});

onMounted(() => {
  (window as any).initGeetest4(props.captchaConfig.config, props.captchaConfig.handler);
});
</script>
