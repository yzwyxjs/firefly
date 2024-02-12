<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import ContributorList from '@/pages/about/project/components/ContributorList.vue';

const { locale } = useI18n();
</script>

<template>
  <main class="page-container">
    <div class="page-wrapper">
      <h1 class="page-title">{{ $t('pages.about.aboutProject') }}</h1>

      <div class="page-content">
        <div v-if="locale === 'zh_CN'" class="chinese-version">
          <h2 class="site-intro">
            在本站，您可以在「表白墙」中说出你想对她说的话。您也可以在「美图分享」中分享或查看关于她的图片、表情包等。
          </h2>
          <h2 class="site-intro">
            但目前本项目仍处于开发阶段，以上功能正在紧张开发中。如果你擅长开发网页或制作动画，并且对本项目有兴趣，我们欢迎您加入到我们的开发中！
          </h2>
          <h1>流萤主题网站</h1>
          <p>
            本网站是由一群喜爱流萤的玩家自发组织创建的，项目开源，由玩家社区维护。欢迎热爱技术的你也参与到本网站的建设中来！
          </p>
          <p>本网站内容仅代表玩家观点，不代表任何《崩坏：星穹铁道》原作观点。</p>

          <h2>开发相关</h2>
          <h3>如何参与本项目</h3>
          <ul>
            <li>
              您可以直接在本项目中提交 <a href="https://github.com/yzwyxjs/firefly/issues">Issue</a> 或
              <a href="https://github.com/yzwyxjs/firefly/pulls">Pull Request</a>。我们建议参与本项目贡献的您<a
                href="https://s.dayuweb.com/s/w5pViXRm"
                >点击此处</a
              >填写一下调查问卷，以便于我们后续的交流与开发～
            </li>
          </ul>

          <h3>技术栈</h3>
          <ul>
            <li>Vue 3</li>
            <li>Vite</li>
            <li>Pinia</li>
            <li>TypeScript</li>
            <li><a href="https://tdesign.tencent.com/">TDesign</a></li>
            <li>Axios</li>
          </ul>

          <h3>贡献提交规范</h3>
          <ul>
            <li>
              <a
                href="https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular"
                >Angular Convention</a
              >
            </li>
          </ul>

          <h3>开源协议</h3>
          <p>本项目遵循 <a href="https://github.com/yzwyxjs/firefly/blob/master/LICENSE">MIT 协议</a>。</p>
        </div>

        <div v-if="locale === 'en_US'" class="english-version">
          <h2 class="site-intro">
            On this site, you can express your feelings on the "Confession Wall". You can also share or view pictures,
            memes, etc., about her in the "Image Sharing" section.
          </h2>
          <h2 class="site-intro">
            However, this project is still in the development stage, and the above features are under active
            development. If you are skilled in web development or animation creation and are interested in this project,
            we welcome you to join our development team!
          </h2>

          <h1>Firefly Theme Website</h1>
          <p>
            This website was initiated and created by a group of players who love Firefly, with the project being open
            source and maintained by the player community. If you have a passion for programming, you are welcome to
            join in the development of this site!
          </p>
          <p>
            The content on this website represents only the views of the players and does not represent the views of any
            original works of "Honkai: Star Rail".
          </p>

          <h2>Development</h2>
          <h3>How to Contribute</h3>
          <ul>
            <li>
              You can submit an <a href="https://github.com/yzwyxjs/firefly/issues">Issue</a> or
              <a href="https://github.com/yzwyxjs/firefly/pulls">Pull Request</a> directly in this project. We recommend
              that you <a href="https://s.dayuweb.com/s/RDoXwpsh">click here</a> to fill out a survey to facilitate our
              subsequent communication and development!
            </li>
          </ul>

          <h3>Technology Stack</h3>
          <ul>
            <li>Vue 3</li>
            <li>Vite</li>
            <li>Pinia</li>
            <li>TypeScript</li>
            <li><a href="https://tdesign.tencent.com/">TDesign</a></li>
            <li>Axios</li>
          </ul>

          <h3>Commit Specification</h3>
          <ul>
            <li>
              <a
                href="https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular"
                >Angular Convention</a
              >
            </li>
          </ul>

          <h3>Open Source License</h3>
          <p>
            This project follows the <a href="https://github.com/yzwyxjs/firefly/blob/master/LICENSE">MIT License</a>.
          </p>
        </div>

        <contributor-list />
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
.site-intro {
  text-align: left;
  margin-top: 20px;
}
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 100px 30px;
  text-align: center;
  background: url('@/assets/img/bg/firefly-website-bgimg-3840-2160.jpg') no-repeat center center;
  background-size: cover;
  color: #333;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
}

.page-wrapper {
  width: 100%;
  color: white;
  max-width: 1200px;
  margin: 30px auto;
  padding: 16px 30px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-x: auto;
}

.page-content {
  font-size: 18px;
  color: #fff;
  text-align: left;

  p {
    margin-top: 5px;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  a {
    transition: all 0.3s;
  }
  a:hover {
    color: @active-color;
  }
}
</style>
