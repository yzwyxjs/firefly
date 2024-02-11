import { defineStore } from 'pinia';

import { PanelSetting } from '@/types/menu/settings.ts';

export const usePanelSettingStore = defineStore('panel-setting', {
  state: () => ({
    panelLeft: '100px',
    panelRight: '',
    panelTop: '100px',
    panelBottom: '',
    panelIndex: 0,
    animateName: 'menu-slide-left',
    dragTargetId: '',
    editingComponentId: '',
  }),
  getters: {},
  actions: {
    updatePanelPosition(panelSetting: PanelSetting) {
      this.panelLeft = panelSetting.panelLeft;
      this.panelTop = panelSetting.panelTop;
    },

    clearPanelPosition() {
      this.panelLeft = '100px';
      this.panelRight = '';
      this.panelTop = '100px';
      this.panelBottom = '';
      this.panelIndex = 0;
      this.animateName = 'menu-slide-left';
    },

    updateComponentId(id: string) {
      this.editingComponentId = id;
    },

    updatePanelIndex(panelIndex: number) {
      if (panelIndex > this.panelIndex) {
        this.animateName = 'menu-slide-left';
      } else {
        this.animateName = 'menu-slide-right';
      }
      this.panelIndex = panelIndex;
    },
    updateDragTargetId(dragTargetId: string) {
      this.dragTargetId = dragTargetId;
    },
  },
  persist: {
    key: 'panel-setting',
  },
});
