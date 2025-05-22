const fs = require('fs');
function pathfun(a) {
  if (a === 'index') {
    return "/"
  } else {
    return a + '.html'
  }
}
const menu = [
  {
    "title": "首页",
    "link": pathfun("index")
  },
  {
    "title": "教育资讯",
    "link": pathfun("newslist"),
    "children": [
      {
        "title": "校园资讯",
        "link": pathfun("newslist")
      },
      {
        "title": "家庭资讯",
        "link": pathfun("newslist")
      },
      {
        "title": "留学资讯",
        "link": pathfun("newslist")
      },
      {
        "title": "移民资讯",
        "link": pathfun("newslist")
      },
      {
        "title": "最新时讯",
        "link": pathfun("newslist")
      }
    ]
  },
  {
    "title": "K12国际学校",
    "link": "",
    "children": [
      {
        "title": "国际学校",
        "link": pathfun("schoollist_guoji")
      },
      {
        "title": "香港学校",
        "link": pathfun("xggjxx")
      },
      {
        "title": "新加坡学校",
        "link": pathfun("xinjiapo")
      },
      {
        "title": "海外学校",
        "link": "//schoollist.ieduchina.com/schlist/c1/"
      },
      {
        "title": "学校视频",
        "link": pathfun("./video")
      },
      {
        "title": "机构大全",
        "link": pathfun("./schoollist_jigou")
      }
    ]
  },
  {
    "title": "学校活动",
    "link": pathfun("huodong"),
    "children": [
      {
        "title": "香港访校营",
        "link": "",
        "children": [
          {
            class: "2024年",
            child: [
              {
                "title": "2024年7月5日-7月6日（报名中）",
                "desc": "香港教育文化之旅",
                "link": "https://www.ieduchina.com/huodong/202405/2232.html",
                "type": "ing"
              },
              {
                "title": "2024年7月22日-7月26日（报名中）",
                "desc": "香港教育文化之旅",
                "link": "https://www.ieduchina.com/camp/1427.html",
                "type": "ing"
              }, {
                "title": "2024年5月",
                "desc": "香港教育文化之旅",
                "link": pathfun("xgtxyhg")
              }, {
                "title": "2024年1月",
                "desc": "香港教育文化之旅",
                "link": pathfun("xgtxyhg")
              }
            ]
          },
          {
            class: "2023年",
            child: [
              {
                "title": "2023年12月",
                "desc": "香港教育文化之旅",
                "link": pathfun("xgtxy")
              }, {
                "title": "2023年10月",
                "desc": "香港教育文化之旅",
                "link": pathfun("xgtxyhg")
              },
              {
                "title": "2023年7月",
                "desc": "香港教育文化之旅",
                "link": pathfun("xgtxy")
              }
            ]
          }
        ]
      },
      {
        "title": "学校开放日",
        "link": pathfun("huodong")
      },
      {
        "title": "夏 / 冬令营",
        "link": pathfun("xialingying")
      },
    ]
  },
  {
    "title": "升学指南",
    "link": pathfun("beikao"),
    children: [
      {
        "title": "内地升学备考",
        "link": pathfun("beikao_index")
      },
      {
        "title": "香港升学",
        "link": pathfun("xggw")
      },
      {
        "title": "AP",
        "link": pathfun("ap")
      },
      {
        "title": "A-level",
        "link": "//www.ieduchina.com/topic/alevel/"
      },
      {
        "title": "IG",
        "link": "//www.ieduchina.com/topic/igcse/"
      },
      {
        "title": "旧版备考",
        "link": pathfun("beikaoold")
      },
      {
        "title": "备考",
        "link": pathfun("beikao")
      },
      {
        "title": "小鹅通",
        "link": pathfun("xiaoetong")
      },
      {
        "title": "大湾区论坛",
        "link": pathfun("dawanquluntan")
      },
      {
        "title": "北京择校",
        "link": pathfun("beijingzexiao")
      },
      {
        "title": "亲子活动",
        "link": pathfun("qinzi")
      },
      {
        "title": "上海择校",
        "link": pathfun("shanghaizexiao")
      },
      {
        "title": "邮件模板",
        "link": pathfun("emailtemplate")
      },
      {
        "title": "名校直播",
        "link": pathfun("lives")
      }
    ]
  },
  {
    "title": "备考学习",
    "link": "",
    "children": [
      {
        "title": "官方考试",
        "link": "kaoshi.html",
        children: [
          {
            class: "入学考试",
            child: [
              {
                "title": "MAP",
                "link": "kaoshi.html",
              },
              {
                "title": "CAT4",
                "link": "kaoshi.html",
              },
              {
                "title": "中数",
                "link": "kaoshi.html",
              },
              {
                "title": "英数",
                "link": "kaoshi.html",
              },
              {
                "title": "新加坡",
                "link": "kaoshi.html",
              }
            ]
          },
          {
            class: "语言考试",
            child: [
              {
                "title": "雅思",
                "link": "kaoshi.html",
              },
              {
                "title": "托福",
                "link": "kaoshi.html",
              },
              {
                "title": "多邻国",
                "link": "kaoshi.html",
              },
              {
                "title": "SAT",
                "link": "kaoshi.html",
              },
              {
                "title": "GRE",
                "link": "kaoshi.html",
              }
            ]
          },
          {
            class: "国际考试",
            child: [
              {
                "title": "A-LEVEL",
                "link": "kaoshi.html",
              },
              {
                "title": "IB考试",
                "link": "kaoshi.html",
              },
              {
                "title": "AP考试",
                "link": "kaoshi.html",
              },
              {
                "title": "DSE考试",
                "link": "kaoshi.html",
              }
            ]
          },
          {
            class: "数学竞赛",
            child: [
              {
                "title": "美国AMC",
                "link": "kaoshi.html",
              },
              {
                "title": "澳洲AMC",
                "link": "kaoshi.html",
              },
              {
                "title": "袋鼠数学竞赛",
                "link": "kaoshi.html",
              }
            ]
          }
        ]
      },
      {
        "title": "学习资源",
        "link": "https://weidian.com/?userid=1730265966"
      }
    ]
  },
  {
    "title": "家长进修",
    "link": "",
    "children": [
      {
        "title": "在职研究生",
        "link": "zaizhiyanjiusheng.html",
      }
    ]
  }
]

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
fs.writeFile('src/components/header/mock.json', JSON.stringify({ menu }), () => { })