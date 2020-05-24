---
title: 【算法】常见排序
date: 2020-05-21
categories:
 - 数据结构与算法
author: ReisenD
tags:
 - 算法
sidebar: auto
sidebarDepth: 2
---

## 冒泡排序

将相邻的值进行比较，在符合条件的情况下交换顺序，并最终将目标顺序的数据进行输出

### 基础算法
```javascript
const data = [4,2,1,5,6,8,2,4,5,9,3]

// 最开始的排序方法
function bubbling(arr) {
    let len = arr.length
    let cont = 0
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - 1; j++) {
            // 按升序对数组进行排序
            if(arr[j] > arr[j+1]) {
                let m = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = m
            }
        }
        cont++
    }
    console.log(cont)
}
bubbling(data)

```

这个解法的思路是，从第一个数据(4)开始遍历数组，每次对相邻的两个数字进行交换，第一次遍历后会得到：
```javascript
[2,1,4,5,6,2,4,5,8,3, 9] //第1轮遍历后得到的数组-固定最后一位-9
[1,2,4,5,2,4,5,6,3, 8,9] //第2轮遍历后得到的数组-固定倒数第二-8
[1,2,4,2,4,5,5,3, 6,8,9] //第3轮遍历后得到的数组-固定倒数第三-6
[1,2,2,4,4,5,3, 5,6,8,9] //第4轮遍历后得到的数组
[1,2,2,4,4,3, 5,5,6,8,9] //第5轮遍历后得到的数组
[1,2,2,4,3, 4,5,5,6,8,9] //第6轮遍历后得到的数组
[1,2,2,3, 4,4,5,5,6,8,9] //第7轮遍历后得到的数组-固定全部排序数字

[1,2,2,3,4,4,5,5,6,8,9] //第8轮遍历后得到的数组
[1,2,2,3,4,4,5,5,6,8,9] //第11轮遍历后得到的数组
```
因为只对相邻数据进行比较，所以只有当前数据比后一位数据大的时候会发生交换，第一轮只有最大的数据被放在了目标的位置（最后一位），第二轮则是倒数第二位。所以想得到目标的结果，还得进行下一轮遍历，直到遍历完数组长度的次数。 

如果数据在循环中途就完成了排序，那将会多做一些无用功，所以这个算法还可以进行优化

### 优化

```javascript
const data = [4,2,1,5,6,8,2,4,5,9,3]

// 第一次优化的排序方法
function bubbling(arr) {
    let len = arr.length
    for(let i = 0; i < len; i++) {
        //修改 for(let j = 0; j < len - 1; j++) {           
        for(let j = 0; j < len - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                let m = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = m
            }
        }
    }
    console.log(arr)
}
bubbling(data)
```

从每次j循环结束后会从末尾开始排序完成正确的数字来看，只要每次重新循环的时候减去最后一位的长度就可以减少循环次数了。

然而可以看到在第7次便完成了排序，却仍然要继续剩下的4轮循环，也是可以进行进一步优化的


```javascript
const data = [4,2,1,5,6,8,2,4,5,9,3]

// 第二次优化的排序方法
function bubbling(arr) {
    let len = arr.length;
    let num = 0;
    let flag = true;  //增加一个判断的标志，开启时才进行循环
    for(let i = 0; i < len && flag; i++) {      
        flag = false; //每次循环开始时关闭它
        num++
        console.log(`第${num}次执行`)
        for(let j = 0; j < len - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                let m = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = m;
                //说明这次循环仍然执行了排序，数组尚未实现有序化，需要进行下一轮循环
                flag = true;       
            }
        }
    }
    console.log(arr)
}
bubbling(data)  //在打印第8次执行时完成排序数组打印
```
通过开关实现数组循环终止，在完成排序后下一轮循环时终止循环，精致

### 启发
在for循环中使用开关的条件判断方法实现循环中止
```javascript
let flag = true;
for(let i = 0; i < len && flag; i++) {
    flag = false;
    if(true) {
        flag = true
    }
}
```


## 乱序排序

在目标数组中查找出最符合条件的元素（升序中的最小值），放在最开始。重复这个过程完成排序（升序数组从小到大排列）

### 基础算法
```javascript
const data = [4,2,1,5,6,8,2,4,5,9,3]

function choose(arr) {
    let minIndex;
    const len = arr.length;
    // 变量i用作下标索引，所以循环次数为0 到 len-1
    for(let i = 0; i < len - 1; i++) {
        minIndex = i;
        // 从i+1开始遍历，如果存更小的元素，则替换minIndex坐标为j
        for(let j = i + 1; j < len; j++) {
            if(arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }
        // 将最小值与当前值替换到前面
        let m = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = m;
    }
    console.log(arr)
}
choose(data)
```
### 优化

使用双向指针进行遍历，从头和尾部同时开始，降低速度 ~~双倍的快乐~~

```javascript
const data = [4,2,1,5,6,8,2,4,5,9,3]

function choose(arr) {
    let left = 0;               //左指针-最开始
    let right = arr.length - 1; //右指针-最末尾
    let min;                    //最小值索引
    let max;                    //最大值索引
    
    while (left < right) {
        // 定义索引为最左边
        max = left;
        min = left;
        // 开始遍历 获取数组最大值与最小值的索引
        for(let i = left + 1; i < arr.length - left; i++) {
            if(arr[i] > arr[max]) {
                max = i;
            }
            if(arr[i] < arr[min]) {
                min = i;
            }
        }
        // 若max不在最末尾, 则将该值放于末尾
        if(max !== right) {
            swap(arr, max, right);
        };
        // 若min在末尾, 由于前3行执行了交换, 现在该值位于max位上, 所以将最小值索引换为max
        if(min === right) {
            min = max
        }
        // 若min不在最开始, 则将该值放于开始
        if(min !== left) {
            swap(arr, min, left);
        }
        // 缩短while循环空间, 直至left > right
        left++
        right--
    }
    console.log(arr)
}
// 交换函数
function swap(arr, i1, i2) {
    let m = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = m
}
choose(data)
```
### 启发
for循环的i和条件可根据需求进一步修改，例如两层循环的嵌套中，在确保一轮循环后完成末尾值的排序时，可以将下一轮循环长度减少1位
```javascript
for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - i; j++) {
        //...
    }
}
```