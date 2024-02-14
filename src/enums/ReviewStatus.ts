export const ReviewStatus = {
  PENDING: {
    code: 1,
    desc: '审核中',
  },
  APPROVED: {
    code: 0,
    desc: '审核通过',
  },
  REJECTED: {
    code: -1,
    desc: '不通过',
  },
  NEED_MANUAL_REVIEW: {
    code: 2,
    desc: '待复审',
  },
};
