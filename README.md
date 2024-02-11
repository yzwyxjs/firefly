# 流萤主题网站 Firefly Theme Website

本网站是由一群喜爱流萤的玩家自发组织创建的，项目开源，由玩家社区维护。欢迎热爱技术的你也参与到本网站的建设中来！

本网站内容仅代表玩家观点，不代表任何《崩坏：星穹铁道》原作观点。

This website was initiated and created by a group of players who love Firefly, with the project being open source and maintained by the player community. If you have a passion for programming, you are welcome to join in the development of this site!

The content on this website represents only the views of the players and does not represent the views of any original works of "Honkai: Star Rail".

## 开发相关 Development
### 如何参与本项目 How to Contribute

- 您可以直接在本项目中提交 Issue 或 Pull Request。我们建议参与本项目贡献的您[点击此处](https://s.dayuweb.com/s/w5pViXRm)填写一下调查问卷，以便于我们后续的交流与开发～


- You can submit an Issue or Pull Request directly in this project. We recommend that you [click here](https://s.dayuweb.com/s/RDoXwpsh) to fill out a survey to facilitate our subsequent communication and development!



#### 贡献提交规范 Commit Specification
- [Angular Convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)


### 开源协议 Open Source License

本项目遵循 [MIT 协议](https://github.com/yzwyxjs/firefly/LICENSE)。
This project follows the [MIT License](https://github.com/yzwyxjs/firefly/LICENSE).

### 目录结构 Directory Structure

```plaintext
├── public
│   ├── favicon.ico        # 网站图标 Website icon
├── src
│   ├── assets             # 静态资源 Static resources
│   ├── components         # 组件 Components
│   ├── layouts            # 布局 Layouts
│       └── components     # 布局组件 Layout components
│       └── index.vue      # 默认布局 Default layout
│   ├── locales            # 本地化 Localizations
│       └── lang           # 语言文件夹 Language files folder
│       └── index.ts       # 本地化插件 Localizations plugin
│       └── useLocale.ts   # 本地化工具函数 Localizations utility functions
│   ├── pages              # 页面 Pages
│   ├── router             # 路由 Router
│   ├── store              # Pinia状态管理 State management (Pinia)
│   ├── style              # 样式 Style
│   ├── types              # 类型定义 Type definitions
│   ├── utils              # 工具函数 Utilities
│   ├── App.vue            # 根组件 Root component
│   ├── main.ts            # 入口文件 Entry file
│   ├── globals.d.ts       # 全局类型定义 Global type definitions
```


### 开发  Development

``` bash
## 安装依赖  Install dependencies
npm install

## 启动项目  Start project
npm run dev
```

### 构建  Build

```bash
## 构建正式环境  Build
npm run build
```
