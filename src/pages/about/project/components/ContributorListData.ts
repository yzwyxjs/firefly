import { ref } from 'vue';

import { Contributor } from '@/types/contributor';

export const contributorListData = ref<Contributor[]>([
  {
    id: '67596879',
    nickname: '程序员老于',
    joinTime: '2024-02-11',
    role: '前端、后端',
    avatar: 'https://avatars.githubusercontent.com/u/67596879?v=4',
    description: '项目的创始人，网站域名、服务器持有人，负责前端、后端的开发，以及网站的上线、服务器维护。',
    github: 'https://github.com/yzwyxjs',
  },
]);
