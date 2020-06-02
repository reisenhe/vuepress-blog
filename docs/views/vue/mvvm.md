---
title: 【Vue】MVVM原理理解
date: 2020-05-31
categories:
 - frontEnd
author: ReisenD
tags:
 - vue
 - 面试
---

## 定义
MVVM是一种框架结构，全称是Model-View-ViewModel。MVVM同时也是Vue等一些js框架的设计模式。

<kbd>**View**</kbd> 是视图，即用户通过浏览器看到的通过html和样式组合成的页面外观结构  
<kbd>**Model**</kbd> 是模型，是页面的内容、数据和交互逻辑，在vue中，它们以data、method的定义或者vuex中的数据的形式存在  
<kbd>**ViewModel**</kbd> 是一种定制化的Model，它作为一个监听模型将<kbd>**View**</kbd>和<kbd>**Model**</kbd>链接起来，将这二者之间发生的变化进行同步响应，以实现双向绑定的效果 

## 与MVC的区别
MVC全称是Model-View-Controller

<kbd>**Controller**</kbd> 是控制器，通常负责读取数据，控制用户输入，并向<kbd>**Model**</kbd>发送数据

用户通过浏览器输入地址，访问页面，路由发出请求信息，使用对应的控制器(增删查改)进行数据获取，接着把数据信息提供给前端，让前端使用对应的样式结构进行展示。
也就是说用户要通过<kbd>Controller</kbd>对<kbd>Model</kbd>进行状态改变，<kbd>Model</kbd>完成变化后，才将新数据返回<kbd>View</kbd>，让用户观测到反馈

而MVVM则是进行了双向绑定，<kbd>View</kbd>和<kbd>Model</kbd>没有直接联系，而是通过<kbd>ViewModel</kbd>进行数据传递。  
用户操作<kbd>View</kbd>由<kbd>ViewModel</kbd>监测到便会对<kbd>Model</kbd>进行修改；  
<kbd>Model</kbd>发生变化，又会通过<kbd>ViewModel</kbd>对<kbd>View</kbd>进行相应的变化调整。

## 总结
所以MVVM的核心特性就是双向绑定，即数据变化时，有没有将View和Model连接起来的桥梁对变化进行监听并反馈到视图和模型上
