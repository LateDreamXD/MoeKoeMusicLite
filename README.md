<br />
<p align="center">
    <img src="./assets/icon.png" alt="hero" width="250" height="250">
  <h2 align="center" style="font-weight: 600">MoeKoe Music Lite</h2>
  <p align="center">
    <a href="https://github.com/LateDreamXD/MoeKoeMusicLite/releases/latest"><img src="https://img.shields.io/github/v/release/LateDreamXD/MoeKoeMusicLite?style=flat-square" /></a>
    <a href="https://github.com/LateDreamXD/MoeKoeMusicLite/stargazers"><img src="https://img.shields.io/github/stars/LateDreamXD/MoeKoeMusicLite?style=flat-square" /></a>
    <a href="https://github.com/LateDreamXD/MoeKoeMusicLite/releases"><img src="https://img.shields.io/github/downloads/LateDreamXD/MoeKoeMusicLite/total?style=flat-square" /></a>
    <a href="https://github.com/LateDreamXD/MoeKoeMusicLite/blob/main/LICENSE"><img src="https://img.shields.io/github/license/LateDreamXD/MoeKoeMusicLite?style=flat-square" /></a>
    <a href="https://github.com/LateDreamXD"><img src="https://img.shields.io/badge/%F0%9F%8E%89_Create_by_LateDreamXD-with_Love_%E2%9D%A4-pink?style=flat-square" /></a>
  </p>
  <p align="center">
    一款开源简洁高颜值的酷狗第三方客户端的轻量版本
  </p>
  </p>
</p>

![images](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/1.png)

## ❤️ 前言

我第一次接触萌音这个项目还是在去年 (2025 年) 年末，发现还挺好用的，于是一直用到现在。

我陆陆续续也对这个项目作出了很多贡献，现在也已经是仅次于阿珏的主要维护者了。

但是 :electron: [electron](https://www.electronjs.org/zh/docs/latest/) 这个框架其实缺点挺多的，于是就有了这个极速版。一开始是使用 [tarui 2.0](https://v2.tauri.app/zh-cn/) 作为框架，但是发现缺点更多了，包括但不限于本地空间占用大、构建耗时长以及我不怎么会 [rust](https://rust-lang.org/zh-CN/) 。然后换到了 [wails v3](https://v3.wails.io) ，这下是没有那些问题了，但是新的问题又来了：我写不惯 [go](https://golang.google.cn) 。最后换到了现在的 [tinyjs](https://tinyjs.app) ，这个框架治好了我的所有问题。


## ✨ 特性

- 🆙 极致的轻量体积
- ✅ 使用 Vue.js 全家桶开发
- 🔴 酷狗账号登录（扫码/手机/账号登录）
- 📃 支持歌词显示
- 📻 每日推荐歌曲
- 🔕 无任何社交功能
- 🔗 官方服务器直连
- ✔️ 每日自动领取VIP，登录就是VIP
- 🎨 主题色切换
- 👋 启动问候语
- ⚙️ 多平台支持
<!-- - 🧩 超级插件系统 -->
- 🧭 布局个性化设置
- 🥚 隐藏功能与彩蛋系统
- 🚀 新手引导系统
- ✨ 更多特性由你来探索

## 📢 Todo List
- [x] 📺 支持 MV 播放
- [x] 🌚 Light/Dark Mode 自动切换
- [ ] ~~👆 支持 Touch Bar~~ *( 抱歉我没有 mac 设备 )*
- [x] ⌨️ 全局快捷键
- [x] 🤟 多语言支持
- [ ] 📻 桌面歌词
- [x] ⚙️ 系统架构优化
- [x] 🎶 歌曲、歌单/收藏、取消

[查看更新日志](http://github.com/LateDreamXD/MoeKoeMusicLite/commits/main)

## 📦️ 安装

访问本项目的 [Releases](https://github.com/LateDreamXD/MoeKoeMusicLite/releases) 页面下载安装包。


## ⚙️ 开发

1. 安装 [tinyjs](https://tinyjs.app)

2. 克隆本仓库

```sh
git clone --depth=1 https://github.com/LateDreamXD/MoeKoeMusicLite.git
```

3. 进入目录并安装依赖

```sh
cd MoeKoeMusicLite
pnpm install --frozen-lockfile
```
4. 启动开发者模式
  - 在浏览器里开发
  ```sh
  pnpm run dev
  ```
  - 在客户端开发模式下开发
  ```sh
  tinyjs dev
  ```

5. 编译项目
```sh
tinyjs build
```


## ⭐ 支持项目

如果您觉得这个项目对您有帮助，欢迎给我们一个 Star！您的支持是我们持续改进的动力。

## ✅ 反馈

如有任何问题或建议，欢迎提交 issue 或 pull request。

## ⚠️ 免责声明
0. 本程序是酷狗第三方客户端，并非酷狗官方，需要更完善的功能请下载官方客户端体验.
1. 本项目仅供学习使用，请尊重版权，请勿利用此项目从事商业行为及非法用途！
2. 使用本项目的过程中可能会产生版权数据。对于这些版权数据，本项目不拥有它们的所有权。为了避免侵权，使用者务必在 24 小时内清除使用本项目的过程中所产生的版权数据。
3. 由于使用本项目产生的包括由于本协议或由于使用或无法使用本项目而引起的任何性质的任何直接、间接、特殊、偶然或结果性损害（包括但不限于因商誉损失、停工、计算机故障或故障引起的损害赔偿，或任何及所有其他商业损害或损失）由使用者负责。        
1. 禁止在违反当地法律法规的情况下使用本项目。对于使用者在明知或不知当地法律法规不允许的情况下使用本项目所造成的任何违法违规行为由使用者承担，本项目不承担由此造成的任何直接、间接、特殊、偶然或结果性责任。    
2. 音乐平台不易，请尊重版权，支持正版。
3. 本项目仅用于对技术可行性的探索及研究，不接受任何商业（包括但不限于广告等）合作及捐赠。
4. 如果官方音乐平台觉得本项目不妥，可联系本项目更改或移除。
            

## 📁 资源文件

本项目使用的所有[资源文件](./resources/)均来自 MoeKoe Music，包括但不限于萌音娘 OC 形象、启动问候语音频等等。

## 📜 开源许可

本项目仅供个人学习研究使用，禁止用于商业及非法用途。

MoeKoe Music 前端基于 [GNU General Public License v2.0 (GPL-2.0)](https://github.com/MoeKoeMusic/MoeKoeMusic/blob/main/LICENSE) 许可进行开源。

## 👍 灵感来源

API 源代码来自 [MakcRe/KuGouMusicApi](https://github.com/MakcRe/KuGouMusicApi) 

- [Apple Music](https://music.apple.com)
- [YouTube Music](https://music.youtube.com)
- [YesPlayMusic](https://github.com/qier222/YesPlayMusic)
- [酷狗音乐](https://kugou.com/)

## 🖼️ 截图

![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/2.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/3.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/4.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/5.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/6.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/7.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/8.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/9.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/10.png)
![image](https://github.com/MoeKoeMusic/MoeKoeMusic/raw/main/images/11.png)


## 🗓️ Star History

[![Star History Chart](https://api.star-history.com/chart?repos=LateDreamXD/MoeKoeMusicLite&type=date&legend=top-left&sealed_token=unIw8k8CbengL1CW5XVoW-psSsTQHjp7X6Hchrr9WiEh4baeFZXunI95J9V8nnY8XTWrT8UuvRBXScevzXLRlhTID0-_V200iw9TFChclu1-28maCH3NutInvRl6nQ1jDMXpInpefFixeHYDr8BCn9fYqiNtZAoK30Vi46s7QPQQU80mJstgjgeqWjXf)](https://www.star-history.com/#LateDreamXD/MoeKoeMusicLite&Date)
