const { Command } = require("commander");
const { echoCliName, FUNCTION_LIST } = require("./constant");
const packageJson = require("../package.json");
const inquirer = require("inquirer");
const { ACTION_CREATE_APP } = require("./createApp/constant");
const { ACTION_UTILS } = require("./utils/constant");
const createApp =require("./createApp")
const utils =require('./utils')


const init = () => {
  echoCliName();
  const program = new Command();
      program.version(packageJson.version);

  inquirer.prompt(FUNCTION_LIST).then((res) => {
    if (res.startkit === ACTION_CREATE_APP) {
      createApp(res.name,res.template)
    } else if (res.startkit === ACTION_UTILS) {
      utils[res.util]()
    }
  });
};

module.exports = init;
