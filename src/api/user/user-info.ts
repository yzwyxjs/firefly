import { loginApiPrefix } from '@/api/user/config.ts';
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
};

export function loginByWxCode(code: string, loginType: 'open' | 'mp') {
  return request.post<User>({
    url: `${loginApiPrefix}${Api.loginByWxCode}/${code}/${loginType}`,
  });
}

export function getMobileLoginTicket() {
  return request.get<MobileLoginTicket>({
    url: `${loginApiPrefix}${Api.getMobileLoginTicket}`,
  });
}

export function uploadTicketByH5(ticket: string, code: string) {
  return request.post<string>({
    url: `${loginApiPrefix}${Api.uploadTicketByH5}/${ticket}/${code}`,
  });
}

export function verifyMobileLoginTicket() {
  return request.get<User>({
    url: `${loginApiPrefix}${Api.verifyMobileLoginTicket}`,
  });
}

export function getUserInfo() {
  console.log('loginApiPrefix', loginApiPrefix);
  return request.get<Result<User>>(
    {
      url: `${loginApiPrefix}${Api.loginStatus}`,
    },
    {
      isTransformResponse: false,
    },
  );
}
