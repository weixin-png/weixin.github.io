---
title: JS笔记
date: 2022-01-25
---


## 对象常用方法

#### 两个对象合并：

`**Object.assign()**` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }



// 通过 for in 循环赋值

var obj1={ a: 1, b: { c: 2 }, c: 0 }
var obj2={}
for( var key in obj1 ){
    obj2[key]=obj[key]
}

console.log(obj2); // { a: 1, b: { c: 2 }, c: 0 }

//Object.keys()    将objB中含objA的Key的value赋值给objA对应的value
const listAssign = (objA, objB) => Object.keys(objA).forEach(key => { objA[key] = objB[key] || objA[key]});
```

## 字符串常用方法

## 堆栈

```txt
堆（heap）用于复杂数据类型（引用类型）分配空间，例如数组对象、object对象（引用类型的值通常大小不固定，所以被存储在堆内存中）；它是运行时动态分配内存的，因此存取速度较慢。
栈（stack）中主要存放一些基本类型（Undefined、Null、Boolean、Number 和 String）的变量和对象的引用（基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中），其优势是存取速度比堆要快，并且栈内的数据可以共享，但缺点是存在栈中的数据大小与生存期必须是确定的，缺乏灵活性。
```

## 节流函数和防抖函数

函数节流：不断触发一个函数后，执行第一次，只有大于设定的执行周期后才会执行第二次

```javascript
 1 /* 
 2             节流函数：fn:要被节流的函数，delay：规定的时间
 3         */
 4        function throttle(fn,delay){
 5             // 记录上一次函数触发的时间
 6             var lastTime = 0
 7             return function(){
 8             // 记录当前函数触发的时间
 9             var nowTime = new Date().getTime()
10             // 当当前时间减去上一次执行时间大于这个指定间隔时间才让他触发这个函数
11             if(nowTime - lastTime > delay){
12                 // 绑定this指向
13                 fn.call(this)
14                 //同步时间
15                 lastTime = nowTime
16             }
17             }
18        }   


/* 
节流函数（定时器加时间戳实现）
*/
export default function throttle(fn, delay) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not a function')
  }
  let timer = null
  //上一次触发数的时间（用闭包延长生命周期）
  let oldTime = Date.now()
  //   let oldTime = +new Date() 作用同上
  return (...args) => {
    //当前触发的时间
    let newTime = Date.now()
    //从上一次到现在还剩下多少时间
    const remaining = delay - (newTime - oldTime)
    clearTimeout(timer)
    if (remaining <= 0) {
      //时间到了
      fn.call(this, ...args)
      //同步上一次触发的时间
      oldTime = Date.now()
    } else {
      //第一次触发事件的程序出口
      timer = setTimeout(() => {fn.call(this,...args)}, newTime - oldTime)
    }
  }
}
```

函数防抖：不断触发一个函数，在规定时间内只让最后一次生效，前面都不生效

```javascript
function debounce(fn, delay = 200) {
    if (typeof fn !== 'function') { // 参数类型为函数
        throw new TypeError('fn is not a function');
    }

    let timer = null; 
    return function(...args) {
        if (timer) {
             clearTimeout(lastFn);
        }
        let timer = setTimeout(() => {
            timer = null;
            fn.call(this, ...args);
        }, delay);
    }
}
就是每次调用函数前，先移除上次还处于延迟中的任务，然后重新发起一次新的延迟等待。

上面最重要的地方在于 fn.call(this, ...args)，这里之所以要通过 call 方式来修改原函数的 this，是因为，原函数通过参数进行传递时，是只会被当做普通函数处理，不管原函数本来是否挂载在某个对象上。

所以，如果 debounce 内部直接以 fn() 方式调用原函数，会导致原函数的内部 this 指向发生变化。

有两种解决方式：

一是：debounce 以 fn() 方式调用，但在使用 debounce 的地方，传递 fn 原函数时需要先进行绑定，如:

var o = {
    c: 1,
    a: function() {
        console.log(this.c);
    }
}
var b = debounce(o.a.bind(o));
这是一种方式，缺点是需要使用者手动进行显示绑定 this。

另一种方式：debounce 内部通过 apply 或 call 方式来调用原函数。

但这种方式也有一个前提，就是 debounce 返回的新函数需要把它当做原函数，和原函数一样的处理。如果原函数本来挂载在某对象上，新生成的函数也需要挂载到那对象上，因为 debounce 内部的 fn.call(this) 时，这个 this 是指返回的新函数调用时的 this。所以，需要让新函数的 this 和原函数是一致的，才会是期望的正常行为。

var o = {
    c: 1,
    a: function() {
        console.log(this.c);
    }
}

o.b = debounce(o.a);
总之，debounce 的用途就是通用的工具函数，所以需要防抖处理的工作，都可以通过 debounce 进行包装转换。

就算你没写过这个通用的工具函数，至少在项目中，也写过直接定义一个全局变量来进行防抖处理吧，类似这样：

var flag = null;

function task() {
    if (flag) {
        clearTimeout(flag);
    }
    flag = setTimeout(() => {
        flag = null;
        // do something
    }, 200);
}
这其实也是防抖的处理，只是实现方式是直接对需要进行防抖处理的函数，在其代码基础上，直接进行改动。不具有通用性。


/* 
封装一个防抖函数 
*/
export default function debounce(fn, delay = 200) {
  //默认延时200ms
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not a function!');
  }
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    // const that = this;
    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, delay);
  };
}
```

## 报错及解决思路

1.从loaclStorage中读取数据时数据未定义

**原因：JSON.parse(undefined)**

```javascript
function debounce(fn, delay=1000) {
    let timer = null
    return function() {
            if(timer) {
        clearTimeOut(timer)
        } 
        const context = this
        const args = arguments
        timer = setTimeOut(() => {
            fn.call(context, args)
        },delay)
    }
}
```

## Promise.reject() 异样捕捉

#### 1、定义和用法

Promise.reject()办法返回一个带有回绝起因的Promise对象。
reason 示意Promise被回绝的起因。。
动态函数Promise.reject返回一个被回绝的Promise对象。

```
Promise.reject(reason).catch(reason =>{
   console.log(reason);
})
```

#### 2、示例

```
function fn() {
  try {
    Promise.reject("reject");
  } catch (err) {
    console.log(err);
  }
}
fn();
```

```
async function fn() {
  try {
    await Promise.reject("reject");
  } catch (err) {
    console.log(err);
  }
}
fn();
```

因为**try catch是同步**的，执行到Promise.reject()时把它放到了异步工作队列里，没有立刻执行Promise.reject()就向下执行了，同步工作执行完再回头把异步工作队列里的Promise.reject()回调函数拿进去执行就报错了。

#### 3、捕捉JS未解决的Promise谬误 unhandledrejection

当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；这可能产生在 window 下，但也可能产生在 Worker 中。 这对于调试回退错误处理十分有用。unhandledrejection 继承自 PromiseRejectionEvent，而 PromiseRejectionEvent 又继承自 Event。因而unhandledrejection 含有 PromiseRejectionEvent 和 Event 的属性和办法。

```
window.addEventListener("unhandledrejection", event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});
window.onunhandledrejection = event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
};

window.addEventListener('unhandledrejection', function (event) {
  // ...您的代码能够解决未解决的回绝...
  // 避免默认解决（例如将谬误输入到控制台）
  event.preventDefault();
});
```

#### 4、Promise.all() reject捕捉

```
function fn(msg){
  return new Promise((resolve, reject)=>{
    return reject(msg);
  });
}
Promise.all([fn(1), fn(2)]).then(data=>{
  console.log('success', data);
}).catch(err=>{
  console.log('error', err);
})
```

```javascript
    validate([
        body('user.password')
        .custom((password, { //用async修饰需返回一个promise
            req
        }) => {
            if (req.user.password !== md5(password)) {
                // return Promise.reject('密码错误')  //async
                throw new Error('Password confirmation does not match password');
                // Promise.reject() 时把它放到了异步任务队列里， 没有立即执行Promise.reject() 就向下执行了， 同步任务执行完再回头把异步任务队列里的Promise.reject() 回调函数拿出来执行就报错了
            }
            return true
        })
    ])
```

# 测试百度地图API

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>百度API测试</title>
    <!-- 下面我们添加一个meta标签，以便使您的页面更好的在移动平台上展示。 -->
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
</head>
<!-- 设置容器样式大小，使地图充满整个浏览器窗口： -->
<style type="text/css">
    html {
        height: 100%
    }

    body {
        height: 100%;
        margin: 0px;
        padding: 0px
    }

    #container {
        height: 100%
    }
</style>
<!-- 引用百度地图API文件 -->
<script type="text/javascript"
    src="https://api.map.baidu.com/api?v=1.0&&type=webgl&ak=62Z0wkfaExzPgGrpUwouVpawxRjlR9qF"></script>

<body>
    <!-- 地图需要一个HTML元素作为容器，这样才能展现到页面上。这里我们创建了一个div元素。 -->
    <div id="container"></div>
    <script>
        // 位于BMapGL命名空间下的Map类表示地图，通过new操作符可以创建一个地图实例。其参数可以是元素id也可以是元素对象
        const map = new BMapGL.Map("container");
        /*         注意：

                        1、在调用此构造函数时应确保容器元素已经添加到地图上；

                        2、命名空间 API GL版使用BMapGL作为命名空间，所有类均在该命名空间之下，比如：BMapGL.Map、BMapGL.Control、BMapGL.Overlay； */
        //    设置中心点坐标
        const point = new BMapGL.Point(114.4155, 23.1125);
        // 在创建地图实例后，我们需要对其进行初始化，BMapGL.Map.centerAndZoom()方法要求设置中心点坐标和地图级别。 地图必须经过初始化才可以执行其他操作
        map.centerAndZoom(point, 15);

        /*         const xy = navigator.geolocation.getCurrentPosition((position) => {
            该api在chrome浏览器无效
                    console.log("x" + position.coords.longitude);
                    console.log("y" + position.coords.latitude);
                }, (e2) => {
                    console.log(e2);
                }) */

        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
        map.addControl(scaleCtrl);
        var zoomCtrl = new BMapGL.ZoomControl();  // 添加比例尺控件
        map.addControl(zoomCtrl);
    </script>
</body>

</html>
```

![image20211129230445032](file://C:\Users\xin\AppData\Roaming\Typora\typora-user-images\image-20211129230445032.png)

# 什么是前端工程化？

工程化是一种思想，而不是某种技术。其主要目的为了提高效率和降低成本，即提高开发过程中的开发效率，减少不必要的重复工作时间等

**例子**

要盖一栋大楼，假如我们不进行工程化的考量那就是一上来掂起瓦刀、砖块就开干，直到把大楼垒起来，这样做往往意味着中间会出现错误，要推倒重来或是盖好以后结构有问题但又不知道出现在哪谁的责任甚至会在某一天轰然倒塌，那我们如果用工程化的思想去做，就会先画图纸、确定结构、确定用料和预算以及工期，另外需要用到什么工种多少人等等，我们会先打地基再建框架再填充墙体这样最后建立起来的高楼才是稳固的合规的，什么地方出了问题我们也能找到源头和负责人。

那么前端工程化需要考虑哪些因素呢？

应该从模块化、组件化、规范化、自动化4个方面去思考

## **模块化**

模块化就是把一个大的文件，拆分成多个相互依赖的小文件，按一个个模块来划分

## 组件化

页面上所有的东西都可以看成组件，页面是个大型组件，可以拆成若干个中型组件，然后中型组件还可以再拆，拆成若干个小型组件

- 组件化≠模块化。模块化只是在文件层面上，对代码和资源的拆分；组件化是在设计层面上，对于UI的拆分
- 目前市场上的组件化的框架，主要的有Vue，React，Angular2

## 规范化

在项目规划初期制定的好坏对于后期的开发有一定影响。包括的规范有

- 目录结构的制定
- 编码规范
- 前后端接口规范
- 文档规范
- 组件管理
- Git分支管理
- Commit描述规范
- 定期codeReview
- 视觉图标规范

## 自动化

也就是简单重复的工作交给机器来做，自动化也就是有很多自动化工具代替我们来完成，例如持续集成、自动化构建、自动化部署、自动化测试等等