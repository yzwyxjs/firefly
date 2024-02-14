<script setup lang="ts">
import { TranslateIcon } from '_tdesign-icons-vue-next@0.2.2@tdesign-icons-vue-next';
import { DialogPlugin, MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { useMediaQuery } from '@vueuse/core';
import { MoreIcon } from 'tdesign-icons-vue-next';
import { onMounted, ref } from 'vue';

import { appealConfession, deleteConfession } from '@/api/confession';
import { appealPicShare, deletePicShare } from '@/api/pic-share-zone';
import ReportDialog from '@/components/report/ReportDialog.vue';
import { ReviewStatus } from '@/enums/ReviewStatus.ts';
import { langList } from '@/locales';
import router from '@/router';
import { useUserStore } from '@/store';
import { Confession } from '@/types/confession';
import { PicShare } from '@/types/pic-share';

const isMobile = useMediaQuery('(max-width: 992px)');
const imgPrefix = import.meta.env.VITE_IMG_URL;

const picViewVisible = ref(false);

const props = defineProps({
  picShare: {
    type: Object as () => PicShare,
    required: true,
  },
});
const handleClickImg = () => {
  picViewVisible.value = true;
};
const previewImgList = ref<string[]>([]);

const userStore = useUserStore();
const emit = defineEmits(['deletePicShare', 'appealPicShare']);

const reportDiaVisible = ref(false);
const handleReportClick = () => {
  if (userStore.loginStatus) {
    reportDiaVisible.value = true;
  } else {
    MessagePlugin.warning('请先登录再进行举报');
    userStore.goLoginPage();
  }
};
const handleDeleteClick = () => {
  const confirmDia = DialogPlugin({
    header: '删除图片分享确认',
    body: '确定要删除这条图片分享吗？删除后将无法恢复！',
    confirmBtn: '确定',
    onConfirm: async ({ e }) => {
      await deletePicShare(props.picShare!.id);
      emit('deletePicShare', props.picShare!.id);
      confirmDia.hide();
    },
    onClose: ({ e, trigger }) => {
      confirmDia.hide();
    },
  });
};

const handleAppealClick = () => {
  const confirmDia = DialogPlugin({
    header: '申诉确认',
    body: '你确定要申诉该图片分享内容吗？多次申诉明确违规内容将会导致您的账号被封停！',
    confirmBtn: '确定',
    onConfirm: async ({ e }) => {
      await appealPicShare(props.picShare!.id);
      MessagePlugin.success('提交成功');
      emit('appealPicShare', props.picShare!.id);
      confirmDia.hide();
    },
    onClose: ({ e, trigger }) => {
      confirmDia.hide();
    },
  });
};
onMounted(() => {
  previewImgList.value = props.picShare!.imgList.map((img) => `${imgPrefix}/pic/${img}`);
});
</script>

<template>
  <div class="picShare-item">
    <report-dialog
      :dialog-visible="reportDiaVisible"
      :content-id="picShare.id"
      :content-type="2"
      @update:visible="
        (value) => {
          reportDiaVisible = value;
        }
      "
    />
    <div class="creator-info">
      <div class="creator-left">
        <a :href="`/user/${picShare.creatorInfo!.uid}`" target="_blank">
          <t-avatar
            :size="isMobile ? '38px' : '55px'"
            :image="picShare.creatorInfo!.avatar"
            :alt="`${picShare.creatorInfo!.nickname}的头像`"
          />
        </a>
      </div>
      <div class="creator-right">
        <div>
          <a :href="`/user/${picShare.creatorInfo!.uid}`" target="_blank"
            ><h3 class="nickname">{{ picShare.creatorInfo.nickname }}</h3></a
          >
          <div class="create-time">{{ picShare.createTime }} 发布</div>
          <div>
            <t-tag
              v-if="
                picShare.status === ReviewStatus.PENDING.code ||
                picShare.status === ReviewStatus.NEED_MANUAL_REVIEW.code
              "
              size="small"
              style="margin-right: 10px"
              theme="primary"
              variant="outline"
              >审核中</t-tag
            >
            <t-tag
              v-if="picShare.status === ReviewStatus.REJECTED.code"
              style="margin-right: 10px"
              size="small"
              theme="danger"
              variant="outline"
              >不通过</t-tag
            >
            <span
              v-if="picShare.status === ReviewStatus.REJECTED.code"
              style="font-size: 14px; margin-right: 10px; color: var(--td-error-color)"
              @click="handleAppealClick"
            >
              点此申诉
            </span>
            <span v-if="picShare.visibility === 0" class="visibility">仅自己可见</span>
          </div>
        </div>

        <div class="item-op-btn">
          <t-dropdown trigger="click">
            <t-button shape="square" variant="text" class="more-btn"><more-icon /></t-button>

            <t-dropdown-menu>
              <t-dropdown-item v-if="picShare.creator !== userStore.userInfo.uid" @click="handleReportClick"
                >举报</t-dropdown-item
              >
              <t-dropdown-item
                v-if="picShare.creator === userStore.userInfo.uid"
                style="color: var(--td-error-color)"
                @click="handleDeleteClick"
                >删除</t-dropdown-item
              >
            </t-dropdown-menu>
          </t-dropdown>
        </div>
      </div>
    </div>
    <div class="content-section">
      <div class="img-content">
        <t-image-viewer v-model:visible="picViewVisible" :default-index="0" :images="previewImgList">
          <template #trigger>
            <div
              v-for="(img, index) in picShare.imgList"
              :key="index"
              class="img-item normal-img"
              @click="handleClickImg"
            >
              <img alt="图片" :src="`${imgPrefix}/pic/${img}`" class="img" />
            </div>
            <div v-for="(img, index) in picShare.blockImgList" :key="index" class="img-item blocked-img">
              <img alt="图片" :src="`${imgPrefix}/pic/${img}`" class="img" />
            </div>
          </template>
        </t-image-viewer>
      </div>

      <div
        v-if="picShare.blockImgList?.length > 0 && picShare.status === ReviewStatus.APPROVED.code"
        style="color: var(--td-error-color); font-size: 12px; line-height: 1; margin: 10px 0"
        @click="handleAppealClick"
      >
        红框的图片为审核不通过图片，仅自己可见，可点此申诉
      </div>
      <div class="content">{{ picShare.content }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import 'index';

.creator-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.picShare-item {
  color: black;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  font-weight: normal;
}
.more-btn {
  color: @active-color;
}
a {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: @active-color;
  }
}

.creator-info {
  display: flex;
  align-items: center;
  text-align: left;

  .creator-left {
    margin-right: 16px;
  }
}

.content-section {
  text-align: left;
}

@media (max-width: @screen-md) {
  .nickname {
    font-size: 14px;
  }

  .create-time {
    font-size: 12px;
  }

  .content {
    font-size: 14px;
  }
  .title {
    margin: 10px 0 5px 0;
    font-size: 16px;
  }
}

@media (min-width: @screen-md) {
  .nickname {
    font-size: 18px;
  }

  .content {
    font-size: 16px;
  }

  .title {
    margin: 6px 0;
  }

  .create-time {
    font-size: 16px;
  }

  .content-section {
    margin-left: 70px;
  }

  .title {
    font-size: 20px;
  }
}

.create-time {
  color: #666;
}
</style>
