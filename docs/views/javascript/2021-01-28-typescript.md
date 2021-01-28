---
title: 【Typescript】知识小记 - 类型声明、抽象类与接口
date: 2021-01-28
categories:
 - frontEnd
author: ReisenD
sidebar: auto
sidebarDepth: 2
tags:
 - javascript
 - typescript
---

使用 typescript 进行开发，为了避免写成 anyscript，记录一些使用的要点  

ts 各种限制的意义就在于在开发时严格的规范将利于避免后期可能的维护难题

## 声明 Typescript 类型
几种声明 typescript 类型的方法
### 声明 TS 变量
```ts
let a: string = 'stringA';  // 冒号声明，a 变量声明后只能存储字符串
let b = 100;                // 直接赋值声明，b 变量声明后只能存储数字
let c: string | boolean;    // 多重声明，c 变量可以存储字符串或布尔两种类型
/*
* any类型使用后，将不去检查该变量的判断，应该尽量避免使用
*/
let anyVar;                 // 无类型声明，anyVar 变量自动被判断为 any 类型

/*
* 不确定类型的变量可以使用 unknown 类
*/
let e: unknown;             // 声明 unknown 类型变量，e变量在参与赋值时将对其他变量提示
e = 100;
let s: string;
//s = e;                    // 这行赋值将因为 e 不属于 string 类型而报错
e = 'hello';
s = <string>e;              // 使用类型断言，在赋值时使 e 变量以 字符串形式参与赋值，便不会报错
s = e as string;            // 类型断言 as 写法
```
### 声明 TS 方法与对象
```ts
/*
* 声明对象时，指定对象中的属性
* 使用 ? 表示该属性可选
*/
// 对象必须包含且仅包含 name 属性
let obj: {name: string}
// 对象必须包含 name 属性，或者添加一个 age 属性                     
let obj1: {name: string, age?: number}
// 对象必须包含 name 属性，除此之外可添加任意属性
let obj2: {name: string, [prop:string]: any}    
obj = {name: 'reisen'}
obj1 = {name: 'twei', age: 5000}
obj2 = {name: 'eirin', old: false}


/*
* 声明方法
* （形参: 类型...) => 返回值类型
*/
let fn1: (a: number, b:number) => number
fn1 = (n1, n2) => { return n1+n2 }
// 在 () 后使用冒号设置函数的返回类型，fn2 必须提供一个 string 类型的返回值
let fn2 = function(): string { return 'this is string' }
// 声明 void 类型表示函数不会有任何返回，可以有 return，但后面不能接内容
let fn3 = function(): void { return }
```

### 声明 TS 数组
```ts
// 规定一个只能添加数字的数组 arr1 和只能添加字符串的数组 arr2
let arr1: number[]
let arr2: Array<string>

// 元组: 规定一个固定长度固定类型的数组
// arr3 将只能添加第一位是字符 第二位是布尔值的内容
let arr3: [string, boolean]
```

### 声明 TS 枚举类 enum
使用枚举关键字 enum 可以创建一个特定的枚举类型，声明为该类型的变量或属性仅可设置为该类型的特定值
```ts
// 声明一个 Race 枚举类型，该类型包含两种不同的值，枚举属性可不需要赋值
enum Race {
    Rabbit,
    Human
}
let player: {name: string, race: Race}
player = {
    name: 'reisen',
    race: Race.Rabbit
}
```

### 声明 TS 类型别名 type
使用类型声明关键字 type 可创建一个特定的类型
```ts
type myType = string;
let b: myType = 'reimu'

type myObj = {
    name: string,
    age: number
}
let c: myObj = {
    name: 'reisen',
    age: 70
}
```


## 抽象类 abstract
使用 abstract 关键字创建的类就是抽象类  
抽象类只能被继承，不能使用 new 创建实例
```ts
abstract class Game {
    name: string
    constructor (name: string) {
        this.name = name
    }
}
class ACTGame extends Game {
    name: string;
    hard: number
    constructor (name: string, hard: number) {
        super(name)
        this.hard = hard
    }
}
// let sekiro = new Game('SEKIRO');     // 提示错误, 不能创建抽象类实例
let sekiro = new ACTGame('SEKIRO', 10)
```
### 抽象方法 
在抽象类中可以定义普通方法，也可以使用 abstract 可以定义抽象方法  
抽象方法没有方法体，继承后的字类必须重新该方法
```ts
abstract class Game {
    constructor() {}
    sayCool() {
        console.log('this game is really cool')
    }
    abstract getPrice(): void
}
class ACTGame extends Game {
    constructor() {
        super()
    }
    // 未定义该方法将发生报错
    getPrice(){
        console.log(279)
    }
}
```

## 接口 interface
使用 interface 关键字创建一个类型结构，和 type 关键字类似
```ts
interface RPGGame {
    name: string,
    role: string
}
const cbpk2077: RPGGame = {
    name: 'cyberpunk',
    role: 'V'
}
```
### 重复声明
区别于 type 类型声明，接口可以重复声明，多次声明后将合并类型结构
```ts
interface IdleGame {
    name: string,
    devs: number
}
interface IdleGame {
    cost: number
}
const HollowKn: IdleGame = {
    name: 'Hollow Knight',
    devs: 3,
    cost: 99
}
```
### 类的实现
类似于 abstract 抽象方法，接口可以在定义类的时候限制类的结构，使用 implements 关键字实现类似抽象方法的继承效果  
区别于抽象方法，接口不能有实际的属性值和函数体，接口定义方法的都是抽象方法
```ts
interface Game {
    name: string,
    sayCool(): void
}
class ACTGame implements Game {
    name: string;
    constructor(name:string) {
        this.name = name
    }
    sayCool() {
        console.log('this game is really cool')
    }
    // 和继承类似，接口不限制继续定义其他属性与方法
    sayHi() {
        console.log('hi')
    }
}
```