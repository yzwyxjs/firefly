import { loginApiPrefix, userPrefix } from '@/api/user/config.ts';
import { Result } from '@/types/axios';
import { User } from '@/types/user';
import { MobileLoginTicket } from '@/types/user/login.ts';
import { request } from '@/utils/request';

const Api = {
  loginByWxCode: '/loginByWxCode',
  getMobileLoginTicket: '/getMobileLoginTicket',
  uploadTicketByH5: '/uploadTicketByH5',
  verifyMobileLoginTicket: '/verifyMobileLoginTicket',
  loginStatus: '/loginStatus',
  userInfo: '/user-info',
};

export function loginByWxCode(code: string, loginType: 'open' | 'mp' | null) {
  return request.post<Result<User>>(
    {
      url: `${loginApiPrefix}${Api.loginByWxCode}/${code}/${loginType}`,
    },
    {
      isTransformResponse: false,
    },
  );
}

export function getMobileLoginTicket() {
  return request.get<MobileLoginTicket>({
    url: `${loginApiPrefix}${Api.getMobileLoginTicket}`,
  });
}

export function uploadTicketByH5(ticket: string, code: string) {
  return request.post<Result<User>>(
    {
      url: `${loginApiPrefix}${Api.uploadTicketByH5}/${ticket}/${code}`,
    },
    {
      isTransformResponse: false,
    },
  );
}

export function verifyMobileLoginTicket() {
  return request.get<Result<User>>(
    {
      url: `${loginApiPrefix}${Api.verifyMobileLoginTicket}`,
    },
    {
      isTransformResponse: false,
    },
  );
}

export function getUserInfo() {
  return request.get<Result<User>>(
    {
      url: `${loginApiPrefix}${Api.loginStatus}`,
    },
    {
      isTransformResponse: false,
    },
  );
}

export function logoutApi() {
  return request.delete<void>({
    url: `${userPrefix}/logout`,
  });
}
export function fetchUserInfoById(uid: string) {
  return request.get<User>({
    url: `${loginApiPrefix}${Api.userInfo}/${uid}`,
  });
}
