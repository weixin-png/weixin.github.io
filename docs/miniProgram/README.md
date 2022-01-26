---
title: 微信小程序笔记
date: 2022-01-25
---

## 组件内自定义事件传参

```html
//组件内   

<view class="cate-list-item" wx:for="{{homeData}}" wx:key="index" bindtap="goToList"
    id="{{item.id}}" data-id="{{item.id}}">
        组件自定义事件传参通过id/data-xx(属性名)传递
 ....
 .....
    </view>
```

```javascript
//js文件
Component({
  methods: {
    goToList(item) {
      wx.navigateTo({
        url: '/pages/list/list?id=' + item.currentTarget.id,  //属性在currrentTarget中
        success: (result) => {

        },
      });
    }
  },

})
```

## scroll-view组件

1.通过设置show-scrollbar为true隐藏滚动条不生效

wxss文件中添加如下样式:

```css
::-webkit-scrollbar {
  display: none;
}
```

## 小程序进入页面图片渲染会拉伸闪下变形优化.md

### 需求

有些从接口传递过来的图片，本身图片大小不是固定一个比例，全部渲染显示在页面上，会有唰得拉伸从大到小快速闪下变形的bug，很影响用户体验。

### 解决方案

```xml
<image src='...' style='width:98%;height:auto' mode='widthFix'></image>
```

image的mode图片剪裁缩放模式用`mode='widthFix'`(宽度不变，高度自动变化，保持原图宽高比不变)，记得要在css里也加上height:auto，可以消除渲染拉伸变形一闪而过的bug。

### 补充知识

`image`的mode有13种模式，4种是缩放模式，9种是剪裁模式。

##### 缩放模式：

1. `scaleToFill`——不保持纵横比缩放图片，使图片宽高完全拉伸至image元素
2. `widthFix`——保持宽度固定，高度自动变化，意思保持原图宽高比
3. `aspectFit`——保持纵横比缩放图片，使得长边露出，意思是能完全展示图片
4. `aspectFill`—— 保持纵横比缩放图片，使得短边露出，意思是一个方向是完整的，另一个方向会发生截取

##### 剪裁模式：

1. `top`——不缩放，只显示顶部
2. `bottom`——不缩放，只显示底部
3. `center`——不缩放，只显示中间
4. `left`——不缩放，只显示左边
5. `right`——不缩放，只显示右边
6. `top right`——不缩放，只显示右上
7. `top left`——不缩放，只显示左上
8. `bottom left`——不缩放，只显示左下
9. `bottom right`——不缩放，只显示右下

## wxs踩坑

```
wxml里头部:
<wxs module="m1">
    var number = function(num) {
        var n = (num / 100000000).toFixed(1)  //声明变量只能用var关键字
        return n + '亿'
    }
    module.exports = {
     number:number  // 此处不能用es6的简写
    }
</wxs>



内部使用
<view class="play-count">{{m1.number(playlist.playCount)}}</view>

类似于vue中的计算属性computed
```