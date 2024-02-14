import { picShareApiPrefix, picSharePrefix } from '@/api/pic-share-zone/config.ts';
import { GeetestResponse, Page } from '@/types/interface';
import { PicShare } from '@/types/pic-share';
import { request } from '@/utils/request';

const Api = {
  add: '/add',
  delete: '/delete',
  list: '/list',
  appeal: '/appeal',
};

export function addPicShare(picShare: PicShare, geetestData: GeetestResponse) {
  return request.post<string>({
    url: `${picSharePrefix}${Api.add}?l=${geetestData.lot_number}&c=${geetestData.captcha_output}&p=${geetestData.pass_token}&g=${geetestData.gen_time}`,
    data: picShare,
  });
}

export function deletePicShare(picShareId: string) {
  return request.delete<string>({
    url: `${picSharePrefix}${Api.delete}/${picShareId}`,
  });
}
export function listPicShare(pageNum: number) {
  return request.get<Page<PicShare>>({
    url: `${picShareApiPrefix}${Api.list}/${pageNum}`,
  });
}

export function appealPicShare(picShareId: string) {
  return request.put<string>({
    url: `${picSharePrefix}${Api.appeal}/${picShareId}`,
  });
}
