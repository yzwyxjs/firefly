<script setup lang="ts">
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { Data, FormRule, MessagePlugin, SubmitContext } from 'tdesign-vue-next';
import { ref } from 'vue';

import { addConfession } from '@/api/confession/index.ts';
import GeetestCaptcha from '@/components/geetest/GeetestCaptcha.vue';
import router from '@/router';
import { Confession, initConfession } from '@/types/confession';
import { GeetestResponse } from '@/types/interface';

const formData = ref<Confession>({ ...initConfession() });
const requestLoading = ref(false);
const FORM_RULES: Record<string, FormRule[]> = {
  title: [
    { required: true, message: '请输入标题', type: 'error' },
    { max: 50, message: '标题不能超过50个字符' },
  ],
  content: [
    { required: true, message: '请输入内容', type: 'error' },
    { max: 1000, message: '内容不能超过1000个字符' },
  ],
};
const formRef = ref(null);
const onSubmit = async ({ validateResult, firstError }: SubmitContext<Data>) => {
  if (!firstError) {
    if (captchaConfig.value.config.product === 'bind') {
      if ((window as any).captchaObj) {
        (window as any).captchaObj.showCaptcha();
        return true;
      }
      MessagePlugin.error('请等待验证码加载完成');
      return false;
    }
  } else {
    MessagePlugin.error('请检查所有必填字段');
  }
};

const submitConfession = (result: GeetestResponse) => {
  requestLoading.value = true;
  addConfession(formData.value, result)
    .then(() => {
      MessagePlugin.success('发布成功');
      router.replace('/confessions');
    })
    .finally(() => {
      requestLoading.value = false;
    });
};

const validate = () => {
  const result = (window as any).captchaObj.getValidate();
  if (!result) {
    MessagePlugin.error('请先完成验证');
    return;
  }
  submitConfession(result);
};

const captchaHandler = (captchaObj: any) => {
  (window as any).captchaObj = captchaObj;
  captchaObj.appendTo('#captcha').onSuccess(() => {
    if (captchaConfig.value.config.product === 'bind') {
      validate();
    }
  });
};

const captchaConfig = ref({
  config: {
    captchaId: 'fa98ea0b707426fa0950f51313f0ad96',
    language: 'zho',
    product: 'bind',
  },
  handler: captchaHandler,
});
</script>

<template>
  <main class="main-container">
    <geetest-captcha :captcha-config="captchaConfig" />

    <div class="content-wrapper">
      <t-button
        theme="primary"
        variant="text"
        style="margin-bottom: 10px"
        shape="square"
        @click="router.replace('/confessions')"
      >
        <chevron-left-icon style="font-size: 24px" />
      </t-button>
      <t-form
        ref="formRef"
        :data="formData"
        :rules="FORM_RULES"
        label-width="100px"
        label-align="top"
        @submit="onSubmit"
      >
        <t-form-item label="标题（不超过50字）" name="title">
          <t-input v-model="formData.title" :maxlength="50" size="large" />
        </t-form-item>
        <t-form-item label="内容（不超过1000字）" name="content">
          <t-textarea
            v-model="formData.content"
            :maxlength="1000"
            :autosize="{ minRows: 10, maxRows: 18 }"
            type="textarea"
          />
        </t-form-item>
        <t-form-item label="权限" name="visibility">
          <t-radio-group v-model="formData.visibility">
            <t-radio :value="1">公开</t-radio>
            <t-radio :value="0">私密</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item>
          <div style="text-align: center; width: 100%">
            <t-button :loading="requestLoading" type="submit" size="large">发表</t-button>
          </div>
        </t-form-item>
      </t-form>
    </div>
  </main>
</template>

<style scoped lang="less">
.content-wrapper {
  padding: 20px;
  color: black;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 30px auto;
  text-align: left;
  font-size: 20px;
}
.main-container {
  padding: 70px 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666;
  font-weight: 600;
  background: url('@/assets/img/bg/firefly-website-bgimg-3840-2160.jpg') no-repeat center center;
  background-size: cover;
  user-focus: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  // 点击后不要出现蓝色背景
  -webkit-tap-highlight-color: transparent;
}
</style>
