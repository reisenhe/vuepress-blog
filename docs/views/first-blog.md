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

### 2、项目初始化