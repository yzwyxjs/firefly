export interface User {
  uid: number;
  nickname: string;
  /**
   * 昵称状态
   * 0: 拉取自微信
   * 1: 审核中
   * 2: 审核通过
   * -1: 审核未通过
   */
  nicknameStatus?: number;
  newNickname?: string;
  avatar: string;
  /**
   * 头像状态
   * 0: 拉取自微信
   * 1: 审核中
   * 2: 审核通过
   * -1: 审核未通过
   */
  avatarStatus?: number;
  newAvatar?: string;
  signature: string;
  /**
   * 签名状态
   * 1: 审核中
   * 2: 审核通过
   * -1: 审核未通过
   */
  signatureStatus?: number;
  newSignature?: string;
  roles: string[];
  registerTime?: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  email: string;
}

export interface UserState {
  user: User;
  isLogin: boolean;
}

export function initUser(): User {
  return {
    uid: -1,
    nickname: '',
    avatar: '',
    signature: '',
    roles: [],
    registerTime: '',
  };
}
