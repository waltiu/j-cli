const chalk = require("chalk");
const figlet = require("figlet");
const { TEMPLATE_REACT, TEMPLATE_VUE,ACTION_CREATE_APP } = require("./createApp/constant");
const utils =require('./utils')
const {ACTION_UTILS} =require('./utils/constant')
const packageJson = require("../package.json");

// 输出cli名称
const echoCliName = () => {
  console.log(
    chalk.yellow(
      figlet.textSync(packageJson.name, {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const FUNCTION_LIST = [
  {
    type: "list",
    message: "✨请选择即将使用的工具：",
    name: "startkit",
    default: ACTION_CREATE_APP,
    choices: [ACTION_CREATE_APP, ACTION_UTILS],
  },
  {
    type: "list",
    message: "✨请选择即将使用的模板：",
    name: "template",
    default: TEMPLATE_REACT,
    choices: [TEMPLATE_REACT, TEMPLATE_VUE],
    when: function (answers) {
      return answers.startkit === ACTION_CREATE_APP;
    },
  },
  {
    type: "list",
    message: "✨✨✨✨✨✨✨：",
    name: "util",
    default: ACTION_CREATE_APP,
    choices: Object.keys(utils),
    when: function (answers) {
      return answers.startkit === ACTION_UTILS;
    },
    
  },
  {
    message: '✨项目名称:',
    name: 'name',
    validate: function(val) {
        if(val) { 
            return true;
        }
        return "不能为空";
    },
    when: function (answers) {
      return answers.template;
    },
  },

];

module.exports = {
  echoCliName,
  FUNCTION_LIST,
};
