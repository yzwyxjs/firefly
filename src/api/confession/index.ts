import { confessionApiPrefix, confessionPrefix } from '@/api/confession/config.ts';
import { Confession } from '@/types/confession';
import { GeetestResponse, Page } from '@/types/interface';
import { request } from '@/utils/request';

const Api = {
  add: '/add',
  delete: '/delete',
  list: '/list',
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
