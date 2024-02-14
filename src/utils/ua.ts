export const checkUA = () => {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  );
  const ua = window.navigator.userAgent.toLowerCase();
  // 判断是不是微信
  if (ua.match(/MicroMessenger/i)) {
    if (!ua.match(/WindowsWechat/i)) {
      return 'wx';
    }
    return 'pcwx';
  }
  if (flag) {
    return 'mobile';
  }
  return 'pc';
};
