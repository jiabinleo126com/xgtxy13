const fs = require('fs');

const menu = [
  {
    "name": "关于我们",
    "link": "aboutus.html"
  },
  {
    "name": "投稿",
    "link": "//www.ieduchina.com/mp/login_member.html"
  },
  {
    "name": "投诉侵权",
    "link": "//www.ieduchina.com/service/tousu.html"
  },
  {
    "name": "联系我们",
    "link": "aboutus_ad.html"
  },
  {
    "name": "加入我们",
    "link": "aboutus_joinus.html"
  }
]
const link = [
  {
    "title": "小红书",
    "children": [
      {
        "title": "国际教育的Linda",
        "image": "//www.ieduchina.com/statics/pcc/img/f2.jpg",
        "islink":true
      },
      {
        "title": "Linda说国际教育",
        "image": "//www.ieduchina.com/statics/pcc/img/f666.jpg",
        "islink":true
      },
      {
        "title": "小鹏",
        "image": "//www.ieduchina.com/statics/pcc/img/c0651e2d.jpg",
        "islink":true
      }
    ]
  },
  {
    "title": "",
    "children": [
      {
        "title": "爱读国际择校说",
        "image": "//www.ieduchina.com/statics/pcc/img/db240701.jpg",
        "islink":true
      },
      {
        "title": "国际择校说",
        "image": "//www.ieduchina.com/statics/pcc/img/cf005a47.jpg",
        "islink":true
      },
      {
        "title": "爱读选校君",
        "image": "//www.ieduchina.com/statics/pcc/img/ae66ed27.jpg",
        "islink":true
      }
    ]
  },
  {
    "title": "视频号",
    "children": [
      {
        "title": "国际教育Linda说",
        "image": "https://www.ieduchina.com/statics/pcc/img/a248026a.png",
        "islink":true
      },
      {
        "title": "选校砖家",
        "image": "https://www.ieduchina.com/statics/pcc/img/181e94a0.png",
        "islink":true
      }
    ]
  },
  {
    "title": "微信公众号",
    "children": [
      {
        "title": "国际教育Linda说",
        "image": "https://www.ieduchina.com/statics/pcc/img/g073a37a.jpg",
        "islink":true
      },
      {
        "title": "选校砖家",
        "image": "https://www.ieduchina.com/statics/pcc/img/1a98d522.png",
        "islink":true
      },
      {
        "title": "香港名校通",
        "image": "https://www.ieduchina.com/statics/pcc/img/b3130733.png",
        "islink":true
      },
      {
        "title": "爱读教育",
        "image": "https://www.ieduchina.com/statics/pcc/img/2a8a129a.png",
        "islink":true
      }
    ]
  },
  {
    "title": "微信服务号",
    "children": [
      {
        "title": "国际教育Linda说低龄",
        "image": "https://www.ieduchina.com/statics/pcc/img/h073a37a.jpg",
        "islink":true
      }
    ]
  },
  {
    "title": "抖音",
    "children": [
      {
        "title": "低龄国际教育Linda说",
        "image": "https://www.ieduchina.com/statics/pcc/img/f1.jpg",
        "islink":true
      }
    ]
  },
  {
    "title": "知乎",
    "children": [
      {
        "title": "国际教育Linda说",
        "image": "https://www.ieduchina.com/statics/pcc/img/65f7f6ed.png",
        "islink":true
      }
    ]
  },
  {
    "title": "小程序",
    "children": [
      {
        "title": "探校小管家",
        "image": "https://www.ieduchina.com/statics/pcc/img/25eb8325.png",
        "islink":true
      }
    ]
  }
]

fs.writeFile('src/components/footer/mock.json', JSON.stringify({ menu, link }), () => { })
