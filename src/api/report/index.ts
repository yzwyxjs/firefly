import { reportPrefix } from '@/api/report/config.ts';
import { Report } from '@/types/user/report.ts';
import { request } from '@/utils/request';

const Api = {
  add: '/add',
};

export function addReport(report: Report) {
  return request.post<string>({
    url: `${reportPrefix}${Api.add}`,
    data: report,
  });
}
