<script setup lang="ts">
import { ChevronLeftIcon } from '_tdesign-icons-vue-next@0.2.2@tdesign-icons-vue-next';
import { getCurrentDate } from '_tdesign-vue-next@1.8.1@tdesign-vue-next/es/_common/js/upload/utils';
import {
  Data,
  FormRule,
  MessagePlugin,
  SubmitContext,
  UploadFailContext,
  UploadFile,
  UploadRemoveContext,
} from 'tdesign-vue-next';
import { ref } from 'vue';

import { addConfession } from '@/api/confession';
import { addPicShare } from '@/api/pic-share-zone';
import { getUploadAddress } from '@/api/pic-share-zone/config.ts';
import GeetestCaptcha from '@/components/geetest/GeetestCaptcha.vue';
import router from '@/router';
import { Confession, initConfession } from '@/types/confession';
import { GeetestResponse } from '@/types/interface';
import { initPicShare, PicFile, PicShare } from '@/types/pic-share';

const formData = ref<PicShare>({ ...initPicShare() });
const requestLoading = ref(false);
const FORM_RULES: Record<string, FormRule[]> = {
  title: [{ required: true, message: '请输入标题', type: 'error' }],
  content: [
    { required: true, message: '请输入内容', type: 'error' },
    { max: 1000, message: '内容不能超过1000个字符' },
  ],
};
const formRef = ref(null);
const sharePics = ref([]);

const handleValidate = (result: any) => {
  if (result.type === 'FILE_OVER_SIZE_LIMIT') {
    MessagePlugin.warning(`文件大小超过限制`);
  }
};

// 用于格式化接口响应值，error 会被用于上传失败的提示文字；url 表示文件/图片地址
const formatResponse = (res: UploadFile) => {
  const resData = res.data as PicFile;
  res.uploadTime = getCurrentDate();
  res.url = resData.url;
  res.name = resData.fileId;
  res.status = 'success';
  formData.value.imgList.push(resData.fileId + resData.fileExt);
  return res;
};
const handleFail = (options: UploadFailContext) => {
  MessagePlugin.error(`文件 ${options.file.name} 上传失败`);
};
const handleRemoveFile = (context: UploadRemoveContext) => {
  // removeFileByMediaId(context.file.wxFile.field, context.file.wxFile.mediaId);
  formData.value.imgList = formData.value.imgList.filter((item) => item !== (context.file as any).fileId);
};
const onSubmit = async ({ validateResult, firstError }: SubmitContext<Data>) => {
  if (!firstError) {
    if (formData.value.imgList.length === 0) {
      MessagePlugin.error('请上传图片');
      return false;
    }
    if (formData.value.imgList.length > 9) {
      MessagePlugin.error('最多上传9张图片');
      return false;
    }
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

const submitPicShare = (result: GeetestResponse) => {
  requestLoading.value = true;
  addPicShare(formData.value, result)
    .then(() => {
      MessagePlugin.success('发布成功');
      router.replace('/pic-share-zone');
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
  submitPicShare(result);
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
        @click="router.replace('/pic-share-zone')"
      >
        <chevron-left-icon style="font-size: 24px" />
      </t-button>
      <t-form ref="formRef" :data="formData" :rules="FORM_RULES" label-align="top" @submit="onSubmit">
        <t-form-item label="上传图片" name="reasonPics" :required-mark="true">
          <t-upload
            ref="uploadRef1"
            v-model="sharePics"
            :size-limit="{
              size: 5,
              unit: 'MB',
            }"
            :max="9"
            :action="getUploadAddress()"
            :format-response="formatResponse"
            :with-credentials="true"
            theme="image"
            accept=".jpg,.bmp,.png"
            :auto-upload="true"
            :upload-all-files-in-one-request="false"
            :locale="{
              triggerUploadText: {
                image: '请选择图片',
              },
            }"
            :multiple="true"
            @validate="handleValidate"
            @remove="handleRemoveFile"
            @fail="handleFail"
          >
          </t-upload>
          <template #tips>
            <div>请勿上传邪典、色情、低俗等违法犯罪内容！</div>
          </template>
        </t-form-item>
        <t-form-item label="图片介绍" name="content">
          <t-textarea v-model="formData.content" :autosize="{ minRows: 10, maxRows: 18 }" type="textarea" />
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
  margin: 20px auto;
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
