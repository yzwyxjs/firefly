const apiBaseUrl = import.meta.env.VITE_API_URL;

const fileUploadPrefix = `${apiBaseUrl}/files`;

export const picSharePrefix = `${apiBaseUrl}/pic-share`;
export const picShareApiPrefix = `${apiBaseUrl}/api/pic-share`;

export function getUploadAddress() {
  return `${fileUploadPrefix}/uploadSharePic`;
}
