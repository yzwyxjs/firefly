<script setup lang="ts">
import { ref } from 'vue';

const test = ref(0);
</script>

<template>
  <main class="index-page-container">
    <div>萤火微光 永不燃灭 流光溢彩 萤门永存</div>

    <div>Firefly's faint glow, never extinguished. Radiant and splendid, the Firefly Fellowship prevails.</div>
    <div>
      <h3>网站建设中，期待您的加入！</h3>
      <div>技术栈：Vue 3.4 TypeScript TDesign（组件库）</div>
    </div>
  </main>
</template>

<style scoped lang="less">
.index-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  text-align: center;
  color: #333;
}
</style>
