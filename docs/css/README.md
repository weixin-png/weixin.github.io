---
title: css笔记
date: 2022-01-25
---

# CSS笔记

## 文字两行显示，超出部分用省略号代替

```css
用的是-webkit-私有属性。
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;


//多行
.songlist-desc {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
}
```

## CSS3 :nth-child(n)使用注意

:nth-child(n) ---->选中某个元素，该元素必须是某个父元素下的第n个子元素；

**p:nth-child(n) ---->选中p元素，且该p元素必须是某个父元素下的第n个子元素**

注意：n是从1开始的

如下代码，p:nth-child(1)，只会选中第二个div中第一个子元素p;

不会选中第一个div中的第一个p，因为第一个div中第一p元素不是第一个子元素


```
<style>
    p:nth-child(1){
        color:red
    }        
</style>
<div style="border:1px solid">
    <span>div span中第一个段落。</span>
    <p>div 中第一个段落。</p>
    <p>div 中的最后一个段落。</p>
</div><br>

<div style="border:1px solid">
    <p>另一个 div 中第一个段落。</p>
    <p>另一个 div 中的最后一个段落。</p>
</div>
```


**正方向范围**

li:nth-child(n+6)

选中从第6个开始的子元素

**负方向范围**

:nth-child(-n+9)

选中从第1个到第9个子元素。使用 :nth-child(-n+9) ，就相当让你选中第9个和其之前的所有子元素

**前后限制范围**

:nth-child(n+4):nth-child(-n+8)

选中第4-8个子元素。使用 nth-child(n+4):nth-child(-n+8) 我们可以选中某一范围内子元素，上面的例子里是从第4个到第8个子元素

**奇数、偶数位**

:nth-child(odd)

:nth-child(even)

### 隔选择子元素

:nth-child(3n+1),

选择1,4,7,10

**范围高级用法**

nth-child(n+2):nth-child(odd):nth-child(-n+9)

使用 nth-child(n+2):nth-child(odd):nth-child(-n+9) 我们将会选中的子元素是从第2位到第9位，并且只包含奇数位。

## 画三角形

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div::before {
            position: absolute;
            top: 0;
            right: 0px;
            content: '';
            border: 8px solid transparent;
            border-left: 8px solid #ccc;

        }

        div {
            width: 200px;
            height: 200px;
            position: relative;
            margin: 0 auto;
        }

        div::after {
            position: absolute;
            top: 0;
            right: 2px;
            content: '';
            border: 8px solid transparent;
            border-left: 8px solid #fff;
        }
    </style>
</head>

<body>
    <div>123</div>
</body>

</html>
```

## 动画

```css
.music-cover {
    position: absolute;  //绝对对位的元素添加动画会覆盖原有的top、left、right、bottom
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 350rpx;
    height: 350rpx;
    border-radius: 50%;
    margin: auto;  //元素需有宽高才生效
}
.animation-image {
    animation: 20s linear infinite move;
}
@keyframes move {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## 将图片设为背景，并模糊处理

```css
/* 背景模糊 */
    .fixbg{ 
    width:100%; 
    height: 100vh; 
    position: fixed; 
    background-size:cover; 
    background-position: center 0;
    filter:blur(10px); 
    transform: scale(1.2);
    z-index: -1;
  }
```

## 鼠标经过盒子，呈现浮起效果

```css
.recommend-item:hover {
    box-shadow: 15px 15px 30px rgb(0 0 0 / 10%);
    cursor: pointer;
    /* 盒子上移效果 */
    margin-top: -5px;
}
```

## 浏览器隐藏滚动条

```css
body::-webkit-scrollbar {
    display: none;
}
```