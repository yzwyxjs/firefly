<!--这个页面的代码写的有点乱，后续会重构一下，目前时间比较紧，请各位贡献者暂时谅解一下-->
<script setup lang="ts">
import { MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { useElementVisibility, useMediaQuery } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';

import { listConfession, listConfessionByUid } from '@/api/confession';
import { listPicShare, listPicShareByUid } from '@/api/pic-share-zone';
import { fetchUserInfoById } from '@/api/user/user-info.ts';
import ReportDialog from '@/components/report/ReportDialog.vue';
import { ReviewStatus } from '@/enums/ReviewStatus.ts';
import ConfessionItem from '@/pages/confessions/components/ConfessionItem.vue';
import PicShareItem from '@/pages/pic-share-zone/components/PicShareItem.vue';
import router from '@/router';
import { useUserStore } from '@/store';
import { Confession } from '@/types/confession';
import { PicShare } from '@/types/pic-share';
import { initUser, User } from '@/types/user';

const uid = ref('');

const isMobile = useMediaQuery('(max-width: 992px)');

const loadLineRef = ref(null);
const pageNum = ref(0);
const totalNum = ref(0);
const loading = ref(false);
const noMoreData = ref(false);
const reportDiaVisible = ref(false);
const loadLineVisible = useElementVisibility(loadLineRef);
const picShareListData = ref<PicShare[]>([]);
const confessionListData = ref<Confession[]>([]);
const userInfo = ref<User>({ ...initUser() });
const handleDeleteItem = (deletedId: string) => {
  picShareListData.value = picShareListData.value.filter((item) => item.id !== deletedId);
};
const fetchData = async () => {
  loading.value = true;
  pageNum.value += 1;
  if (activeTab.value === 'picShare') {
    const pageData = await listPicShareByUid(pageNum.value, uid.value);
    totalNum.value = pageData.total;
    mergeAndDeduplicate(pageData.records, pageData.total);
    loading.value = false;
  } else if (activeTab.value === 'confession') {
    const pageData = await listConfessionByUid(pageNum.value, uid.value);
    totalNum.value = pageData.total;
    mergeAndDeduplicate(pageData.records, pageData.total);
    loading.value = false;
  }
};
watch(loadLineVisible, (visible) => {
  if (visible && !loading.value && !noMoreData.value) {
    fetchData();
  }
});
const userStore = useUserStore();
const mergeAndDeduplicate = (newRecords: PicShare[] | Confession[], total: number) => {
  // 根据id合并数据并保证不重复
  if (activeTab.value === 'picShare') {
    newRecords.forEach((newRecord) => {
      if (!picShareListData.value.find((item) => item.id === newRecord.id)) {
        picShareListData.value.push(newRecord as PicShare);
      }
    });
    if (total === picShareListData.value.length) {
      noMoreData.value = true;
    }
  } else if (activeTab.value === 'confession') {
    newRecords.forEach((newRecord) => {
      if (!confessionListData.value.find((item) => item.id === newRecord.id)) {
        confessionListData.value.push(newRecord as Confession);
      }
    });
    if (total === confessionListData.value.length) {
      noMoreData.value = true;
    }
  }
};

const handleAppealClick = (id: string) => {
  if (activeTab.value === 'picShare') {
    picShareListData.value = picShareListData.value.map((item) => {
      if (item.id === id) {
        item.status = ReviewStatus.PENDING.code;
      }
      return item;
    });
  } else if (activeTab.value === 'confession') {
    confessionListData.value = confessionListData.value.map((item) => {
      if (item.id === id) {
        item.status = ReviewStatus.PENDING.code;
      }
      return item;
    });
  }
};
const activeTab = ref('confession');

const handleSwitchTab = (to: string) => {
  if (activeTab.value === to) return;
  activeTab.value = to;
  pageNum.value = 0;
  noMoreData.value = false;
  picShareListData.value = [];
  confessionListData.value = [];
  totalNum.value = 0;
  fetchData();
};
const handleReportClick = () => {
  if (userStore.loginStatus) {
    reportDiaVisible.value = true;
  } else {
    MessagePlugin.warning('请先登录再进行举报');
    userStore.goLoginPage();
  }
};
const handleEditUserInfoClick = () => {
  MessagePlugin.error('该功能还没有做完，呜呜呜～');
};
onMounted(async () => {
  uid.value = router.currentRoute.value.params.uid as string;
  fetchData();
  userInfo.value = await fetchUserInfoById(uid.value);
});
</script>

<template>
  <main class="main-container">
    <report-dialog
      :dialog-visible="reportDiaVisible"
      :content-id="uid"
      :content-type="3"
      @update:visible="
        (value) => {
          reportDiaVisible = value;
        }
      "
    />
    <div class="content-wrapper">
      <div class="user-info-bar">
        <t-button
          v-if="userInfo.uid === userStore.userInfo.uid"
          theme="primary"
          variant="text"
          style="position: absolute; right: 10px; top: 10px"
          @click="handleEditUserInfoClick"
        >
          编辑资料
        </t-button>
        <t-button
          v-if="userInfo.uid !== userStore.userInfo.uid"
          theme="primary"
          variant="text"
          style="position: absolute; right: 10px; top: 10px"
          @click="handleReportClick"
        >
          举报
        </t-button>
        <t-avatar class="avatar" :image="userInfo.avatar" size="80px" />
        <div style="text-align: left">
          <div class="nickname">{{ userInfo.nickname }}</div>
          <div class="reg-time">{{ userInfo.registerTime }} 加入本站</div>
          <div class="signature">{{ userInfo.signature || '这个用户比较懒，还没有填写个性签名～' }}</div>
        </div>
      </div>
      <div style="width: 100%">
        <div class="tab-btn">
          <div
            :class="{
              active: activeTab === 'confession',
              'tab-item': true,
            }"
            @click="handleSwitchTab('confession')"
          >
            表白墙
          </div>
          <div
            :class="{
              active: activeTab === 'picShare',
              'tab-item': true,
            }"
            @click="handleSwitchTab('picShare')"
          >
            图片
          </div>
        </div>
        <div v-if="activeTab === 'confession'" class="list-area">
          <confession-item
            v-for="item in confessionListData"
            :key="item.id"
            :confession="item"
            style="width: 100%"
            @appeal-pic-share="handleAppealClick"
            @delete-pic-share="handleDeleteItem"
          />

          <div ref="loadLineRef" style="text-align: center; margin-top: 20px">
            <t-loading v-if="loading" size="30px" />
            <div v-else-if="noMoreData" style="color: #666">没有更多了</div>
            <div v-else>加载更多</div>
          </div>
        </div>
        <div v-if="activeTab === 'picShare'" class="list-area">
          <pic-share-item
            v-for="item in picShareListData"
            :key="item.id"
            :pic-share="item"
            style="width: 100%"
            @appeal-pic-share="handleAppealClick"
            @delete-pic-share="handleDeleteItem"
          />

          <div ref="loadLineRef" style="text-align: center; margin-top: 20px">
            <t-loading v-if="loading" size="30px" />
            <div v-else-if="noMoreData" style="color: #666">没有更多了</div>
            <div v-else>加载更多</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
.list-area {
  min-height: 600px;
}
.tab-btn {
  display: flex;
  justify-content: flex-start;
  .tab-item {
    font-size: 20px;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  .active {
    color: var(--td-brand-color);
  }
}
@media (max-width: @screen-md) {
  .user-info-bar {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .reg-time {
    text-align: center;
  }

  .nickname {
    font-size: 20px;
    font-weight: bolder;
    text-align: center;
  }
  .signature {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }
  .user-info-bar {
    gap: 10px;
  }
  .tab-btn {
    gap: 5px;
    .tab-item {
      font-size: 14px;
    }
  }
}

@media (min-width: @screen-md) {
  .tab-btn {
    gap: 20px;
    .tab-item {
      font-size: 18px;
    }
  }
  .nickname {
    font-size: 24px;
    font-weight: bold;
  }
  .signature {
    font-size: 16px;
    color: #666;
    margin-top: 10px;
  }
  .user-info-bar {
    gap: 20px;
  }
}
.user-info-bar {
  padding: 20px;
  width: 100%;
  background-color: #fff;
  font-weight: normal;
  border-radius: 8px;
  color: black;
  display: flex;
  position: relative;
  .reg-time {
    font-size: 14px;
    color: #666;
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
  margin: 30px 0;
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
  flex-direction: column;
  width: 100vw;
  max-width: 800px;
  margin: 30px auto;
  gap: 5px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.pic-share-list {
  width: 1000px;
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
</style>
