const fs = require("fs");
const menu = [
    {
        title: "学校大全",
        child: [
            {
                title: "内地学校"
            },
            {
                title: "香港学校"
            },
            {
                title: "新加坡学校"
            },
            {
                title: "海外学校"
            }
        ]
    },
    {
        title: "学校活动",
        child: [
            {
                title: "学校开放日"
            },
            {
                title: "香港访校营"
            },
            {
                title: "夏/冬令营"
            },
            {
                title: "国际教育论坛"
            }
        ]
    },
    {
        title: "备考学习",
        child: [
            {
                title: "官方考试"
            }
        ]
    }
]

fs.writeFile('src/components/bar-title/mock.json', JSON.stringify({ menu }), () => { })