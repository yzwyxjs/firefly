<script setup lang="ts">
import { Contributor } from '@/types/contributor';

defineProps({
  data: {
    type: Object as () => Contributor,
    required: true,
  },
});
</script>

<template>
  <a class="contributor-item" :href="data.github">
    <img :src="data.avatar" :alt="`${data.nickname}的头像`" class="avatar" />
    <div>
      <p class="nickname">{{ data.nickname }}</p>
      <p class="join-time">{{ data.joinTime }} {{ $t('pages.about.contributors.joinTime') }}</p>
      <p class="desc">{{ data.description }}</p>
    </div>
  </a>
</template>

<style scoped lang="less">
@media (max-width: @screen-md) {
  .contributor-item {
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

@media (min-width: @screen-md) {
  .contributor-item {
    width: 300px;
  }
}

.contributor-item {
  height: 100%;
  margin: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  gap: 10px;
  padding: 10px 20px;
  display: flex;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .nickname {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .join-time {
    font-size: 14px;
  }

  .desc {
    font-size: 14px;
  }
}
</style>
