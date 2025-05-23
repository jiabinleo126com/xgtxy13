const fs = require("fs");
const menu = [
    {
        title: "学校大全",
        child: [
            {
                title: "内地学校",
                link:"https://schoollist.ieduchina.com/"
            },
            {
                title: "香港学校",
                link:"https://www.ieduchina.com/hongkong/"
            },
            {
                title: "新加坡学校",
                link:"https://www.ieduchina.com/singapore/index.html"
            },
            {
                title: "海外学校",
                link:"https://schoollist.ieduchina.com/schlist/c1/"
            }
        ]
    },
    {
        title: "学校活动",
        child: [
            {
                title: "学校开放日",
                link:"https://www.ieduchina.com/huodong/?type=6"
            },
            {
                title: "香港访校营",
                link:"https://www.ieduchina.com/topic/2025/hk13/"
            },
            {
                title: "夏/冬令营",
                link:"https://www.ieduchina.com/camps/index.html"
            },
            {
                title: "国际教育论坛",
                link:"https://www.ieduchina.com/topic/2025/sz/index.html"
            }
        ]
    },
    {
        title: "备考学习",
        child: [
            {
                title: "官方考试",
                link:"https://www.ieduchina.com/xuexi/index.html?tgfrom=guanwang"
            }
        ]
    }
]

fs.writeFile('src/components/bar-title/mock.json', JSON.stringify({ menu }), () => { })