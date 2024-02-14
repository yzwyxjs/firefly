<script setup lang="ts">
import { AddIcon, BacktopIcon, LoadingIcon, RefreshIcon } from '_tdesign-icons-vue-next@0.2.2@tdesign-icons-vue-next';
import { MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { useElementVisibility, useMediaQuery } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';

import { listPicShare } from '@/api/pic-share-zone';
import MyInfo from '@/components/my-info-card/MyInfo.vue';
import { ReviewStatus } from '@/enums/ReviewStatus.ts';
import PicShareItem from '@/pages/pic-share-zone/components/PicShareItem.vue';
import router from '@/router';
import { useUserStore } from '@/store';
import { Confession } from '@/types/confession';
import { PicShare } from '@/types/pic-share';

const isMobile = useMediaQuery('(max-width: 992px)');
const picShareListData = ref<PicShare[]>([]);

const loadLineRef = ref(null);
const pageNum = ref(1);
const totalNum = ref(0);
const loading = ref(false);
const noMoreData = ref(false);
const loadLineVisible = useElementVisibility(loadLineRef);

const handleDeleteItem = (deletedId: string) => {
  picShareListData.value = picShareListData.value.filter((item) => item.id !== deletedId);
};
watch(loadLineVisible, async (visible) => {
  if (visible && !loading.value && !noMoreData.value) {
    loading.value = true;
    pageNum.value += 1;
    const pageData = await listPicShare(pageNum.value);
    console.log(pageData);
    totalNum.value = pageData.total;
    mergeAndDeduplicate(pageData.records, pageData.total);
    loading.value = false;
  }
});
const userStore = useUserStore();
const handleAddNewClick = () => {
  if (userStore.loginStatus) {
    router.push('/confessions/new');
  } else {
    MessagePlugin.warning('请先登录');
    if (isMobile.value) {
      router.push('/login');
    }
  }
};
const handleBackTop = () => {
  // 平滑滚动
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
const handleRefresh = async () => {
  handleBackTop();
  loading.value = true;
  pageNum.value = 1;
  noMoreData.value = false;
  picShareListData.value = [];
  const pageData = await listPicShare(pageNum.value);
  totalNum.value = pageData.total;
  loading.value = false;
  mergeAndDeduplicate(pageData.records, pageData.total);
};
const mergeAndDeduplicate = (newRecords: PicShare[], total: number) => {
  // 根据id合并数据并保证不重复
  newRecords.forEach((newRecord) => {
    if (!picShareListData.value.find((item) => item.id === newRecord.id)) {
      picShareListData.value.push(newRecord);
    }
  });
  if (total === picShareListData.value.length) {
    noMoreData.value = true;
  }
};

const handleAppealClick = (id: string) => {
  picShareListData.value = picShareListData.value.map((item) => {
    if (item.id === id) {
      item.status = ReviewStatus.PENDING.code;
    }
    return item;
  });
};
onMounted(async () => {
  loading.value = true;
  const pageData = await listPicShare(pageNum.value);
  totalNum.value = pageData.total;
  loading.value = false;
  mergeAndDeduplicate(pageData.records, pageData.total);
});
</script>

<template>
  <main class="main-container">
    <div class="content-wrapper">
      <!-- 分为两栏，左边时内容区，右边是个人信息区-->
      <div class="pic-share-list" style="">
        <div
          v-if="picShareListData.length === 0 && !loading"
          style="
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
          "
        >
          <h1>暂无内容</h1>
          <p>快来发一发吧～</p>
        </div>
        <div
          v-else-if="picShareListData.length === 0 && loading"
          style="
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
          "
        >
          <t-loading size="80px" />
          <h1 style="margin-top: 20px; color: black">加载中</h1>
        </div>
        <div v-else>
          <pic-share-item
            v-for="item in picShareListData"
            :key="item.id"
            :pic-share="item"
            @appeal-pic-share="handleAppealClick"
            @delete-pic-share="handleDeleteItem"
          />
          <div ref="loadLineRef">
            <t-button
              v-if="!noMoreData && !loading"
              :loading="loadLineVisible"
              size="large"
              theme="primary"
              variant="text"
            >
              加载更多
            </t-button>
            <div v-if="picShareListData.length > 0 && loading">加载中...</div>
            <div v-if="noMoreData" style="margin-top: 20px; color: #666">没有更多了</div>
          </div>
        </div>
      </div>
      <aside v-if="!isMobile" class="login-info-sidebar">
        <my-info :post-new-router-path="'/pic-share-zone/new'" />
      </aside>
      <div class="fixed-btns">
        <div class="btn" @click="handleRefresh">
          <refresh-icon v-if="!loading" />
          <loading-icon v-else />
        </div>
        <div class="btn" @click="handleAddNewClick"><add-icon /></div>
        <div class="btn" @click="handleBackTop"><backtop-icon /></div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
.fixed-btns {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color: @active-color;
    transition: all 0.3s;
    &:hover {
      background-color: var(--td-brand-color-3);
    }
  }
}
.main-container {
  padding: 70px 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  color: #666;
  font-weight: 600;
  background: url('@/assets/img/bg/firefly-website-bgimg-3840-2160.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  -webkit-tap-highlight-color: transparent;
  text-align: center;
  transition: all 0.3s;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  gap: 20px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.pic-share-list {
  flex: 1;
  box-sizing: border-box;
  border-radius: 4px;
  min-height: 500px;
}
@media (max-width: @screen-md) {
  .content-wrapper {
    padding: 10px;
  }
  .fixed-btns {
    .btn {
      width: 40px;
      height: 40px;
      font-size: 24px;
    }
  }
}

@media (min-width: @screen-md) {
  .pic-share-list {
    padding: 20px 0 20px 0;
  }
  .content-wrapper {
    padding: 20px;
  }
  .fixed-btns {
    bottom: 40px;
    right: 40px;

    .btn {
      width: 60px;
      height: 60px;
      font-size: 28px;
    }
  }
}
.login-info-sidebar {
  width: 320px;
  margin-top: 20px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 70px;
}
</style>
