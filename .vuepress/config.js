module.exports = {
  title: "Xin",
  description: "",
  dest: "assets",
  theme: "reco",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    //导航栏
    nav: [
      {
        text: "Home",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "TimeLine",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        //文档位置
        text: "Docs",
        icon: "reco-message",
        items: [
          {
            text: "vuepress-reco",
            link: "/docs/theme-reco/",
          },
          {
            text: "CSS",
            link: "/docs/css/",
          },
          {
            text: "Git",
            link: "/docs/git/",
          },
          {
            text: "Vue",
            link: "/docs/vue/",
          },
          {
            text: "React",
            link: "/docs/react/",
          },
          {
            text: "Node",
            link: "/docs/node/",
          },
          {
            text: "JavaScript",
            link: "/docs/javaScript/",
          },
          {
            text: "小程序",
            link: "/docs/miniProgram/",
          },
        ],
      },
      {
        text: "Contact",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/weixin-png",
            icon: "reco-github",
          },
        ],
      },
    ],
    //侧边栏
    sidebar: {
      // "/docs/theme-reco/": ["", "theme", "plugin", "api", "test"],
      /*       "/docs/vue/": [
        {
          title: "Vue笔记",
          collapsable: false,
          children: ["", "vue2", "vue3"],
        },
      ], */
      "/docs/vue/": ["", "vue2", "vue3"],
    },
    type: "blog",
    //博客配置
    blogConfig: {
      category: {
        location: 2,
        text: "Category",
      },
      tag: {
        location: 3,
        text: "Tag",
      },
    },
    //友情链接
    friendLink: [
      /*       {
        title: "午后南杂",
        desc: "Enjoy when you can, and endure when you must.",
        email: "1156743527@qq.com",
        link: "https://www.recoluan.com",
      },
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar:
          "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com",
      }, */
    ],
    logo: "/avatar2.png",
    // 搜索
    search: true,
    searchMaxSuggestions: 10,
    //子侧边栏
    subSidebar: "auto",
    sidebarDepth: 4,
    lastUpdated: "Last Updated",
    author: "Xin",
    authorAvatar: "/avatar.png",
    record: "Blog",
    startYear: "2022",
  },
  markdown: {
    lineNumbers: true,
  },
  //插件
  plugins: [
    //樱花效果
    [
      "sakura",
      {
        num: 40, // 默认数量
        show: true,
        zIndex: 2,
        img: {
          replace: false, // false 默认图 true 换图 需要填写httpUrl地址
          httpUrl: "http://www.zpzpup.com/assets/image/sakura.png", // 绝对路径
        },
      },
    ],
    "dynamic-title",

    "cursor-effects",
    [
      //播放器
      "meting",
      {
        meting: {
          server: "netease", // netease:网易云，tencent:qq音乐，xiami:虾米音乐
          type: "playlist",
          mid: "3778678", //https://music.163.com/playlist?id=3778678&userid=1975896037
        },
        aplayer: {
          autoplay: true,
          mini: true,
          theme: "#282c34",
        },
        mobile: {
          cover: false,
          lrc: false,
        },
      },
    ],
  ],
};
