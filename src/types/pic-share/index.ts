import { User } from '@/types/user';

export interface PicShare {
  id: string;
  content: string;
  imgList: string[];
  blockImgList?: string[];
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
  creatorInfo?: User;
}

export interface PicFile {
  fileId: string;
  uploader: number;
  createTime: string;
  status: number;
  fileExt: string;
  url: string;
  oriFileName: string;
}

export function initPicShare(): PicShare {
  return {
    id: '',
    content: '',
    imgList: [],
    createTime: '',
    creator: -1,
    status: 0,
    visibility: 1,
  };
}
