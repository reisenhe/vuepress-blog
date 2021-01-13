---
title: 【JavaScript】知识小记 - 发布订阅模式
date: 2021-01-07
categories:
 - frontEnd
author: ReisenD
tags:
 - javascript
 - 设计模式
 - 面试
---

发布订阅，是一种计算机语音开发模式。它定义一种对象之间的一对多的关系，当一个被观察的对象发生变化时，观察者将接收到消息。
:::tip
发布订阅模式 与 观察者模式 之间的区别在于，发布者和订阅者不直接交流，而是通过一层消息代理进行通信
:::

```js
class EventEmitter {
    constructor() {
        this.list = {}
    }
    // 绑定事件
    on(key, fn) {
        // 因为一个事件可能要触发多个方法，所以以数组形式存储该事件的方法
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
        return this
    }
    // 触发事件
    emit(key, ...args) {
        let fns = this.list[key]
        if (!fns || !fns.length) return false;
        // 事件存在方法，遍历执行该方法
        for (let i = 0; i < fns.length; i++) {
            fns[i].call(this, ...args)
        }
    }
    // 只监听一次，触发后就去除该方法
    once (key, fn) {
        let _this = this;
        let onFn = function (...args) {
            // 将消除方法的事件也置于执行该方法中
            _this.off(key, onFn);
            fn.call(_this, ...args)
        }
        this.on(key, onFn)
    }
    // 取消事件里的某个方法
    off(key, fn) {
        let fns = this.list[key]
        this.list[key] = fns.filter(item => item.name !== fn.name)
    }
    // 取消整个事件
    alloff(key) {
        if (key === undefined) {
            this.list = {}
        } else {
            this.list[key] = []
        }
    }
}

let EvEm = new EventEmitter()
let quin = (time) => {console.log(`才${time}, 摸了`)}
EvEm.on('rua', quin)
EvEm.emit('rua', '八点')        // 才八点, 摸了
```

## Event Bus
创建一个实例, 这个实例将作为接收事件和派发事件的中转, Vue/React 等当项目的数据不太复杂时, 进行跨组件事件传递时可以用到这类方法  
Event Bus 是发布订阅模式的典型应用。尝试实现: 相当于重新实现一遍发布订阅模式，这次使用 Map 对象存储，使用原型方法创建
```js
class EventEmitter {
    constructor() {
        this._events = new Map(); // 事件/回调存储
    }
}
/**
 * 触发事件
 * @param {String} type 事件类型 
 */
EventEmitter.prototype.emit = function(type, ...args) {
    let handler;
    // 取出该类事件对应的回调函数
    handler = this._events.get(type)
    handler.forEach(fn => {
        if (args.length > 0) {
            fn.apply(this, args)
        } else {
            fn.call(this)
        }
    })
}
/**
 * 监听事件
 * @param {String} type 事件类型
 * @param {Function} fn 触发的方法
 */
EventEmitter.prototype.on = function(type, fn) {
    // 事件将以数组形式储存
    if (!this._events.has(type)) {
        this._events.set(type, [])
    }
    let handler = this._events.get(type)
    handler.push(fn)
}
/**
 * 取消监听事件
 * @param {String} type 事件类型 
 * @param {Function} fn 触发的方法
 */
EventEmitter.prototype.off = function(type, fn) {
    let handler = this._events.get(type)
    handler = handler.filter(item => item.name !== fn.name)
    this._events.set(type, handler)
}

// 测试例子
const emitter = new EventEmitter();
const mo1 = time => {
    console.log(`才${time}，摸了`)
}
const mo2 = time => {
    console.log(`${time}这个时间，不如去吃个夜宵`)
}
emitter.on('onMole', mo1)
emitter.on('onMole', mo2)
emitter.emit('onMole', '11点')      // 才11点，摸了; 11点这个时间，不如去吃个夜宵
emitter.off('onMole', mo2)
emitter.emit('onMole', '8点')       // 才8点，摸了
```