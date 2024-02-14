<script setup lang="ts">
import { Data, FormRule, MessagePlugin, SubmitContext } from '_tdesign-vue-next@1.8.1@tdesign-vue-next';
import { computed, ref, watch } from 'vue';

import { addReport } from '@/api/report';
import { initReport, Report } from '@/types/user/report.ts';

const dialogVisible = ref(false);
const formData = ref<Report>({ ...initReport() });
const emit = defineEmits(['update:visible']);
const requestLoading = ref(false);
const FORM_RULES: Record<string, FormRule[]> = {
  reasonCode: [{ required: true, message: '请选择举报理由', type: 'error' }],
  reasonContent: [
    { required: true, message: '请输入举报原因', type: 'error' },
    { max: 300, message: '内容不能超过300个字符' },
  ],
};
const formRef = ref(null);
const props = defineProps({
  contentType: {
    type: Number,
    required: true,
  },
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  contentId: {
    type: String,
    required: true,
  },
});

watch(
  () => props.dialogVisible,
  (val) => {
    dialogVisible.value = val;
  },
);

watch(
  () => dialogVisible.value,
  (val) => {
    emit('update:visible', val);
  },
);

const reportContentType = computed(() => {
  // 1: 表白墙 2: 图片墙 3: 用户资料
  switch (props.contentType) {
    case 1:
      return '表白墙内容';
    case 2:
      return '图片墙内容';
    case 3:
      return '用户资料';
    default:
      return '';
  }
});

const onSubmit = async ({ validateResult, firstError }: SubmitContext<Data>) => {
  if (!firstError) {
    requestLoading.value = true;
    formData.value.contentType = props.contentType;
    formData.value.contentId = props.contentId as string;
    addReport(formData.value)
      .then(() => {
        MessagePlugin.success('举报成功');
        dialogVisible.value = false;
        formData.value = { ...initReport() };
      })
      .finally(() => {
        requestLoading.value = false;
      });
  } else {
    MessagePlugin.error('请检查所有必填字段');
  }
};
</script>

<template>
  <t-dialog v-model:visible="dialogVisible" top="20px" header="举报" :footer="false" @confirm="onSubmit">
    <template #body>
      <div style="font-size: 18px; color: white">{{ reportContentType }}举报</div>

      <t-form
        ref="formRef"
        :data="formData"
        :rules="FORM_RULES"
        label-width="100px"
        label-align="top"
        @submit="onSubmit"
      >
        <t-form-item label="举报理由" name="reasonCode"
          ><t-radio-group v-model="formData.reasonCode" style="margin-top: 20px">
            <t-radio :value="101">涉黄、涉暴、涉政、涉恐</t-radio>
            <t-radio :value="102">刷屏</t-radio>
            <t-radio :value="103">广告、诈骗、虚假信息</t-radio>
            <t-radio :value="104">侵权、抄袭、盗图</t-radio>
            <t-radio :value="105">其他</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="原因（不超过300字）" name="reasonContent">
          <t-textarea
            v-model="formData.reasonContent"
            :maxlength="300"
            :autosize="{ minRows: 10, maxRows: 18 }"
            type="textarea"
          />
        </t-form-item>
        <t-form-item>
          <div style="text-align: center; width: 100%">
            <t-button :loading="requestLoading" type="submit" size="large">提交</t-button>
          </div>
        </t-form-item>
      </t-form>
    </template>
  </t-dialog>
</template>

<style scoped lang="less"></style>
