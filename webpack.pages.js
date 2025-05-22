const HtmlWebpackPlugin = require("html-webpack-plugin");
const Mock = require('mockjs')
const fs = require("fs")
const glob = require("glob")
const defaultTemplate = process.env.npm_package_config_project;
let dpages = "";
if (/,/.test(defaultTemplate)) {
  dpages = defaultTemplate.split(",")
}
require("./src/components/footer/mock")
function getEntry() {
  const entry = [];
  glob.sync('./src/pages/*/**.ejs')
    .forEach(function (file) {
      let template = "";
      if (defaultTemplate) {
        if (dpages) {
          for (let i = 0; i < dpages.length; i++) {
            const element = dpages[i];
            if (element === file.split(`pages/`)[1].split("/")[0]) {
              template = file.split(`pages/`)[1].split(".ejs")[0];
            }
          }
        } else {
          if (defaultTemplate === file.split(`pages/`)[1].split("/")[0]) {
            template = file.split(`pages/`)[1].split(".ejs")[0];
          }
        }
      } else {
        template = file.split(`pages/`)[1].split(".ejs")[0];
      }
      if (template) {
        entry.push({
          template
        })
      }
    });
  return entry;
};
let htmlTemplate = [];
let entry = {};
let data = {}
let pages = getEntry();
let pages_table = []
for (let index = 0; index < pages.length; index++) {
  let { template } = pages[index];
  let chunk = (defaultTemplate && !/,/.test(defaultTemplate)) ? "index" : `${template.split("/")[0]}`;
  let filename = "";
  if (template && template.split("/")[1] && template.split("/")[1] == "index") {
    if (defaultTemplate && !/,/.test(defaultTemplate)) {
      filename = `index.html`
    } else {
      filename = `${template.split("/")[0]}.html`
    }
  } else {
    if (defaultTemplate && !/,/.test(defaultTemplate)) {
      filename = `${template.split("/")[1]}.html`
    } else {
      filename = `${template.split("/").join("_")}.html`;
    }
  }
  pages_table.push(`http://localhost/${filename}`)
  entry[chunk] = `./src/pages/${template.split("/")[0]}/index.ts`
  data[template] = `./src/pages/${template.split("/")[0]}/mock.js`
  htmlTemplate.push(new HtmlWebpackPlugin({
    template: `./src/pages/${template}.ejs`,
    hash: false,
    minify: {
      caseSensitive: true, //以大小写敏感的方式处理属性 (对自定义html标签很有用)
      collapseBooleanAttributes: false,//从布尔属性中省略属性值
      collapseInlineTagWhitespace: true,//不要在显示之间留下任何空格：inline；元素。必须与collapseWhitespace=true一起使用
      collapseWhitespace: true, //去除空格对文本节点有益
      conservativeCollapse: false,//始终折叠到1个空格（永远不要完全移除）。必须与collapseWhitespace=true一起使用
      keepClosingSlash: true,	//保留单个元素的尾部斜杠
      customAttrAssign: [],//允许支持自定义属性赋值表达式的正则表达式数组（例如，'<div flex？=“｛｛mode！=cover｝”></div>'）
      // customAttrCollapse,
      customAttrSurround: [],//允许支持自定义属性环绕表达式的正则表达式数组（例如，＜input｛｛#if value｝｝checked＝“checked”｛/if｝＞）
      customEventAttributes: [],
      removeComments: true, //删除html注释
      removeRedundantAttributes: false, //删除属性，如果它的值和默认值一致.
      removeScriptTypeAttributes: true, //删除script标签上的type="text/javascript" . 否则 type 属性值会保留
      removeStyleLinkTypeAttributes: true, //删除style标签的type="text/css"  否则 type 属性值会保留
      useShortDoctype: true, //使用html5 简短的doctype 
      continueOnParseError: true, //处理解析错误 而不是终止
      minifyJS: true,
      minifyCSS: true,
      preserveLineBreaks: false,//保留标签之间有1个空行. 必须和 collapseWhitespace=true一起使用
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true//删除ignoreCustomFragments两端空白.
    },
    inject: "body",
    filename,
    xhtml: true,
    showErrors: true,
    chunks: [chunk]
  }))
}
for (const key in data) {
  if (Object.hasOwnProperty.call(data, key)) {
    fs.access(data[key], (err) => {
      if (!err) {
        let file = require(data[key])
        for (let i = 0; i < pages.length; i++) {
          if (pages[i].template == key) {
            pages[i].mock = true
            if (defaultTemplate) {
              if (key.split("/")[1] === "index") {
                pages[i].link = `/`
              } else {
                pages[i].link = `//${key.split("/")[1]}.html`
              }
            } else {
              if (key === "index/index") {
                pages[i].link = `/`
              } else if (key.split("/")[1] === "index") {
                pages[i].link = `/${key.split("/")[0]}.html`
              } else {
                pages[i].link = `/${key.split("/")[0]}_${key.split("/")[1]}.html`
              }
            }
          }
        }
        if (JSON.stringify(file) != "{}") {
          fs.writeFile(data[key].split(".js")[0] + ".json", JSON.stringify(Mock.mock(file)), function (err) {
            if (err) {
              console.error(`${key}创建失败`);
            }
          })
        }
      }
    })
  }
}

setTimeout(() => {
  console.table(pages_table)
}, 5000)
module.exports = {
  entry,
  htmlTemplate
}