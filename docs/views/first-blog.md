---
title: 【Vuepress】使用Vuepress + github page搭建个人博客
date: 2020-04-09
categories:
 - frontEnd
tags:
 - vue
 - vuepress
---

## 前言
在系统地对vue进行学习后，我希望能有个能记录技术的博客。经过多方查阅，先是确认可以以静态的方式进行管理（就是可以暂时不用学习后端语言做后台管理），然后又找到了vuepress这种工具，同时可以使用成熟的主题vuepress-theme-reco，便开始上手搭建起来。尽管还是遭遇了许多小障碍，最终还是成功地将博客部署得差不多能看的程度了，于是便将这个流程记录一下。

## 技术准备
::: tip
还挺简单的，不需要前端知识，甚至不需要vue知识
:::

1、基础的npm使用技术  
2、github账号

## 搭建流程
### 1、仓库创建
在github创建两个仓库，一个用作整个vuepress的项目代码管理，另一个用作博客页面展示。也有将vuepress项目代码和博客地址以分支的形式进行管理的，这样就只需要一个仓库，我还是习惯以多个仓库来分开管理
::: tip
博客页面仓库必须以github规定的标准域名格式进行创建
:::
参考官方指南：[Creating a GitHub Pages site](https://help.github.com/cn/github/working-with-github-pages/creating-a-github-pages-site)

我也习惯先在网页上创建仓库，再克隆到本地进行文件操作，所以这里就不演示流程了  
~~其实是懒得使用git命令~~

以下会将该仓库称为myblog

### 2、项目初始化
将本地文件与git仓库链接，以便使用IDE的终端直接操作命令行。这里会使用克隆到本地的方法。
在对应的目录克隆后，会在本地获得一个文件夹
```javascript
// myblog 

.
├─ README.md    // 如果创建的是空仓库则没有
```

初始化项目的package.json，参考：[创建一个package.json文件](https://www.npmjs.cn/cli/init/)

```sh
npm init -y
```
::: tip
-y 可以快速创建，回避在命令行中编辑一些创建信息
:::

进入新建的package.json，照着[文档](https://www.vuepress.cn/guide/getting-started.html#%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE)对package.json进行修改，添加脚本命令和vuepress依赖并安装

```json {7,8,11}
{
  "name": "myblog",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  },
  "dependencies": {
    "vuepress": "^1.4.0"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
``` sh
npm i   # 安装vuepress
```

接着在根目录下创建docs文件夹，并在其中添加一个README.md文件，这就是Vuepress的默认文档了
此时的目录结构如下

```javascript
// myblog 

.
├─ docs
│  ├─ README.md
├─ node_modules
├─ package.json
├─ README.md    // 这是项目的说明文档，可自由编辑，不影响博客内容
```
::: tip
docs目录下必须包含一个README.md，否则会报错
:::
运行dev命令，成功运行后就可以在8080端口浏览默认样式的vuepress主页了
``` sh
npm run dev   
```

然而我更希望有一个时间顺序排列文章的首页，所以找寻了一番vuepress的主题，接下来将使用vuepress-theme-reco主题进行美化博客

### 3、安装reco主题
按照vuepress-theme-reco官方文档，进行依赖安装
``` sh
npm install vuepress-theme-reco # 安装vuepress-theme-reco
```

安装完成后，创建docs/.vuepress目录，并在其中增加config.js文件
```javascript {5,6}
// myblog 

.
├─ docs
│  ├─ .vuepress
│  │  ├─ config.js
│  ├─ README.md
├─ node_modules
├─ package.json
├─ README.md
```
.vuepress是全局配置的存放路径，config.js则是全局配置的入口文件，参考[目录结构](https://www.vuepress.cn/guide/directory-structure.html#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)

config.js文件的配置参考[配置文件](https://www.vuepress.cn/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)，现在暂且写成这样↓

```javascript
module.exports = {
  base: '/',
  title: 'myBlog',                      //博客标题
  description: 'Just playing around',   //博客描述
  theme: 'reco',                        //使用主题
  themeConfig: {
    type: 'blog',
    nav: [
      { text: 'Home', link: '/' }
    ],
  }                                     //主题配置
}

```

现在，可以对首页的风格进行设置了，参考[首页配置](https://vuepress-theme-reco.recoluan.com/views/1.x/home.html#home-blog)，进入/docs/README.md，写入以下内容
```yaml
---
home: true
heroText: 我的博客
---
```

现在，执行dev，就可以看到美观的博客界面了。
进入/docs，创建一个.md文件，就可以开始新博客的书写了，可以新建一个目录对博客md文件进行管理，但要保证都在/docs路径下。

```yaml
---
title: 第一篇博客
date: 2020-04-09
categories:
 - frontEnd
tags:
 - vuepress
---

这是我的第一篇博客

## docs/views/first-blog.md
```

重新执行dev，就可以浏览自己的第一篇博客了

### 4、部署到GitHub Pages
参考Vuepress文档[部署-GitHub Pages](https://www.vuepress.cn/guide/deploy.html#github-pages)

先确认docs/.vuepress/config.js中设置了正确的base，文档上说可以省略此步骤，且若是按上述流程进行到此则已经完成base设置为'/'。
创建deploy.sh文件，写入以下内容
```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

cd -
```
::: tip
生成静态文件的步骤，取决于package.json中对build命令的设置，官方文档是执行docs:build，此处功能相同，不影响效果
:::

进入文件资源管理，双击这个deploy.sh文件，它会依次执行里面写好的命令，最终将生成的内容提交到你的GitHub Page仓库里，前提是你在流程1正确创建了仓库。


### 5、提交博客项目代码
最后，将myblog项目进行提交，以便日后管理维护。提交过程中IDE或许会提示创建.gitignore文件以便忽略node_modules，参考阅读[忽略特殊文件](https://www.liaoxuefeng.com/wiki/896043488029600/900004590234208)

```sh
node_modules
dist
```

至此，一个普通又美观的vuepress静态博客便以成功创建，努力记录下学习的知识吧