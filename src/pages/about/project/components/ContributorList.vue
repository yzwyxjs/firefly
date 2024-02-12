<script setup lang="ts">
import ContributorItem from '@/pages/about/project/components/ContributorItem.vue';
import { contributorListData } from '@/pages/about/project/components/ContributorListData.ts';
</script>

<template>
  <div class="contributor-list-container">
    <h2>{{ $t('pages.about.contributors.listTitle') }}</h2>
    <div class="contributor-list">
      <contributor-item v-for="item in contributorListData" :key="item.id" :data="item" />
    </div>
  </div>
</template>

<style scoped lang="less">
.contributor-list-container {
  h2 {
    text-align: center;
  }

  .contributor-list {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
  }
}
</style>
