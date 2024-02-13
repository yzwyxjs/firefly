import { User } from '@/types/user';

export interface Confession {
  id: string;
  title: string;
  content: string;
  createTime: string;
  creator: number;
  /**
   * 0: 待审核
   * 1: 审核通过
   * -1: 审核未通过
   * -2: 已删除
   */
  status: number;
  /**
   * 0: 仅自己可见
   * 1: 公开
   */
  visibility: number;
  creatorInfo: User;
}

export function initConfession(): Confession {
  return {
    id: '',
    title: '',
    content: '',
    createTime: '',
    creator: -1,
    status: 0,
    visibility: 1,
    creatorInfo: null as any,
  };
}
