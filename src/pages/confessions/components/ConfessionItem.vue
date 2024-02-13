<script setup lang="ts">
import { MoreIcon } from '_tdesign-icons-vue-next@0.2.2@tdesign-icons-vue-next';
import { useMediaQuery } from '@vueuse/core';

import { useLocale } from '@/locales/useLocale.ts';
import { Confession } from '@/types/confession';

const isMobile = useMediaQuery('(max-width: 992px)');

defineProps({
  confession: {
    type: Object as () => Confession,
    required: true,
  },
});
</script>

<template>
  <div class="confession-item">
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
        </div>

        <div class="item-op-btn">
          <t-dropdown trigger="click">
            <t-button shape="square" variant="text" class="more-btn"><more-icon /></t-button>

            <t-dropdown-menu>
              <t-dropdown-item>举报</t-dropdown-item>
              <t-dropdown-item style="color: var(--td-error-color)">删除</t-dropdown-item>
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
