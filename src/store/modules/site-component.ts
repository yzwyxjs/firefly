import { defineStore } from 'pinia';

import { LowCodeComponent } from '@/types/component';
import { findComponentById } from '@/utils/component';
import { EdgeCoordinate } from '@/utils/component/EdgeCoordinate.ts';

export const useSiteComponentStore = defineStore('site-component', {
  state: () => ({
    componentList: [] as LowCodeComponent[],
    horizontalArray: [] as EdgeCoordinate[],
    verticalArray: [] as EdgeCoordinate[],
  }),
  getters: {},
  actions: {
    updateComponentList(components: LowCodeComponent[]) {
      this.componentList = components;
    },

    updatePropsById(id: string, props: Record<string, any>) {
      const componentById = findComponentById(this.componentList, id);
      if (componentById) {
        // 合并props，用Object.assign()方法
        Object.assign(componentById.props, props);
      }
    },

    updateDisableDragById(id: string, disableDrag: boolean) {
      const componentById = findComponentById(this.componentList, id);
      if (componentById) {
        componentById.disableDrag = disableDrag;
      }
    },
  },
  persist: {
    key: 'site-component',
  },
});
