export interface Report {
  reportId: string;
  contentId: string;
  contentType?: number;
  reasonCode?: number;
  reasonContent: string;
  uid: number;
  status?: number;
  createTime: string;
  finishTime: string;
}

export function initReport(): Report {
  return {
    reportId: '',
    contentId: '',
    contentType: -1,
    reasonCode: -1,
    reasonContent: '',
    uid: -1,
    status: -1,
    createTime: '',
    finishTime: '',
  };
}
