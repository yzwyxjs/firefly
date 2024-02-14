import { confessionApiPrefix, confessionPrefix } from '@/api/confession/config.ts';
import { Confession } from '@/types/confession';
import { GeetestResponse, Page } from '@/types/interface';
import { PicShare } from '@/types/pic-share';
import { request } from '@/utils/request';

const Api = {
  add: '/add',
  delete: '/delete',
  list: '/list',
  appeal: '/appeal',
  listByUid: '/listByUid',
};

export function addConfession(confession: Confession, geetestData: GeetestResponse) {
  return request.post<string>({
    url: `${confessionPrefix}${Api.add}?l=${geetestData.lot_number}&c=${geetestData.captcha_output}&p=${geetestData.pass_token}&g=${geetestData.gen_time}`,
    data: confession,
  });
}

export function deleteConfession(confessionId: string) {
  return request.delete<string>({
    url: `${confessionPrefix}${Api.delete}/${confessionId}`,
  });
}
export function listConfession(pageNum: number) {
  return request.get<Page<Confession>>({
    url: `${confessionApiPrefix}${Api.list}/${pageNum}`,
  });
}

export function appealConfession(confessionId: string) {
  return request.put<string>({
    url: `${confessionPrefix}${Api.appeal}/${confessionId}`,
  });
}
export function listConfessionByUid(pageNum: number, uid: string) {
  return request.get<Page<PicShare>>({
    url: `${confessionApiPrefix}${Api.listByUid}/${uid}/${pageNum}`,
  });
}
