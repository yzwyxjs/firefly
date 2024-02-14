<script setup lang="ts">
import { MoreIcon } from '_tdesign-icons-vue-next@0.2.2@tdesign-icons-vue-next';
import { MessagePlugin } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { useMediaQuery } from '@vueuse/core';
import { DialogPlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { appealConfession, deleteConfession } from '@/api/confession';
import ReportDialog from '@/components/report/ReportDialog.vue';
import { ReviewStatus } from '@/enums/ReviewStatus.ts';
import { useLocale } from '@/locales/useLocale.ts';
import router from '@/router';
import { useUserStore } from '@/store';
import { Confession } from '@/types/confession';

const isMobile = useMediaQuery('(max-width: 992px)');
const userStore = useUserStore();
const props = defineProps({
  confession: {
    type: Object as () => Confession,
    required: true,
  },
});
const emit = defineEmits(['deleteConfession', 'appealConfession']);
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
    header: '删除表白墙内容确认',
    body: '确定要删除这条表白墙内容吗？删除后将无法恢复！',
    confirmBtn: '确定',
    onConfirm: async ({ e }) => {
      await deleteConfession(props.confession!.id);
      emit('deleteConfession', props.confession!.id);
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
    body: '你确定要申诉该表白墙内容吗？多次申诉明确违规内容将会导致您的账号被封停！',
    confirmBtn: '确定',
    onConfirm: async ({ e }) => {
      await appealConfession(props.confession!.id);
      MessagePlugin.success('提交成功');
      emit('appealConfession', props.confession!.id);
      confirmDia.hide();
    },
    onClose: ({ e, trigger }) => {
      confirmDia.hide();
    },
  });
};
</script>

<template>
  <div class="confession-item">
    <report-dialog
      :dialog-visible="reportDiaVisible"
      :content-id="confession.id"
      :content-type="1"
      @update:visible="
        (value) => {
          reportDiaVisible = value;
        }
      "
    />
    <div class="creator-info">
      <div class="creator-left">
        <a :href="`/user/${confession.creatorInfo.uid}`" target="_blank">
          <t-avatar
            :size="isMobile ? '38px' : '55px'"
            :image="confession.creatorInfo.avatar"
            :alt="`${confession.creatorInfo.nickname}的头像`"
          />
        </a>
      </div>
      <div class="creator-right">
        <div>
          <a :href="`/user/${confession.creatorInfo.uid}`" target="_blank"
            ><h3 class="nickname">{{ confession.creatorInfo.nickname }}</h3></a
          >
          <div class="create-time">{{ confession.createTime }} 发布</div>
          <div>
            <t-tag
              v-if="
                confession.status === ReviewStatus.PENDING.code ||
                confession.status === ReviewStatus.NEED_MANUAL_REVIEW.code
              "
              size="small"
              style="margin-right: 10px"
              theme="primary"
              variant="outline"
              >审核中</t-tag
            >
            <t-tag
              v-if="confession.status === ReviewStatus.REJECTED.code"
              style="margin-right: 10px"
              size="small"
              theme="danger"
              variant="outline"
              >不通过</t-tag
            >
            <span
              v-if="confession.status === ReviewStatus.REJECTED.code"
              style="font-size: 14px; margin-right: 10px; color: var(--td-error-color)"
              @click="handleAppealClick"
            >
              点此申诉
            </span>
            <span v-if="confession.visibility === 0" class="visibility">仅自己可见</span>
          </div>
        </div>

        <div class="item-op-btn">
          <t-dropdown trigger="click">
            <t-button shape="square" variant="text" class="more-btn"><more-icon /></t-button>

            <t-dropdown-menu>
              <t-dropdown-item v-if="confession.creator !== userStore.userInfo.uid" @click="handleReportClick"
                >举报</t-dropdown-item
              >
              <t-dropdown-item
                v-if="confession.creator === userStore.userInfo.uid"
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
      <h2 class="title">{{ confession.title }}</h2>
      <div class="content">{{ confession.content }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.confession-item {
  color: black;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  font-weight: normal;
}

.visibility {
  color: #666;
  font-size: 12px;
}

.creator-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
