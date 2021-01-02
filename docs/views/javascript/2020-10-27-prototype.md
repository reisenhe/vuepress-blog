---
title: 【JavaScript】知识小记 - 原型和原型链
date: 2020-10-27
categories:
 - frontEnd
author: ReisenD
tags:
 - javascript
 - 面试
---

## 题目举例
1、如何判断一个变量是不是数组  
2、手写一个简易的 jQuery，考虑插件和扩展性  
3、class 的原型本质如何理解  

## class 与继承
使用 class 声明类，并可以使用 new 创建实例  
使用 extends 可以继承一个 class
```js
// 父类
class Game {
    constructor (name) {
        this.name = name
    }
    getJoy() {
        console.log('这游戏很好玩')
    }
}
// 子类
class RPGGame extends Game {
    constructor (name, price) {
        super(name)
        this.price = price
    }
    getIntro() {
        console.log(`这游戏叫 ${this.name}, 价格 ${this.price}`)
    }
}

// 子类
class ACTGame extends Game {
    constructor (name, hard) {
        super(name)
        this.hard = hard
    }
    getHard() {
        console.log(`这游戏叫 ${this.name}, 难度是 ${this.hard}`)
    }
}

let cbpk2077 = new RPGGame('cyberpunk2077', 'V')
let sekiro = new ACTGame('SEKIRO', 10)
```

## instanceof 类型判断
参与了实例构建的类都会返回 true
```js
sekiro instanceof ACTGame;      // true
sekiro instanceof Game;         // true
sekiro instanceof Object;       // true

([]) instanceof Array;          // true
([]) instanceof Object;         // true

({}) instanceof Object;         // true
```
::: tip
Object 是所有**引用类型**的父类
:::

## 原型
```js
typeof ACTGame;         // function

console.log(sekiro.__proto__)
console.log(ACTGame.prototype)
sekiro.__proto__ === Game.prototype;            // false
sekiro.__proto__ === ACTGame.prototype;         // true
```

每一个 class 都有一个**显示原型** prototype  
每一个实例都有一个**隐示原型** \_\_proto__  
实例的 \_\_proto__ 指向对应 class 的 prototype  

### 基于原型的执行规则
实例获取属性或执行方法时，先查找自身属性方法，如果没有，则自动去 \_\_proto__ 中查找
```js
sekiro.getPrice = () => { console.log('游戏售价279元') }

sekiro.name         // 实例自带的属性
sekiro.getPrice()   // 实例自带了该方法
sekiro.getHard()    // 实例无该方法，查找 __proto__ 获得 ACTGame 声明的方法
sekiro.getJoy()     // 实例无该方法，查找 __proto__ 获得 ACTGame 继承 Game 声明的方法
```

## 原型链
```js
console.log(ACTGame.prototype.__proto__)
console.log(Game.prototype)
ACTGame.prototype.__proto__ === Game.prototype      // true
Game.prototype.__proto__ === Object.prototype       // true
ACTGame.prototype.__proto__ === Object.prototype    // false
```

每一个 class 的显示原型 prototype 亦有一个隐式原型，即 prototype.\_\_proto__。它将指向它**父类的显示原型** prototype

sekiro.getJoy() 方法调用过程：  
1. sekiro 无方法 --> 
2. 查找 sekiro.\_\_proto__ --> 指向 ACTGame.prototype --> 无方法 -->
3. 查找 ACTGame.prototype.\_\_proto__ --> 指向 Game.prototype --> 找到方法执行

### hasOwnProperty
```js
sekiro.hasOwnProperty('name')       // true
sekiro.hasOwnProperty('getPrice')   // true
sekiro.hasOwnProperty('getHard')    // false
```
使用 hasOwnProperty 即可为实例判断出使用的参数与方法是否属于自身，还是属于指向的类原型链

### instanceof
instansof 的工作原理即可以理解为：该类是否属于构造了该对象的父类链中的一环? 层层查找 \_\_proto__ 是否能找到该类?
```js
sekiro instanceof Game;         // true
ACTGame instanceof Object;      // true
Game instanceof Object;         // true
```