const { Command } = require("commander");
const { echoCliName, FUNCTION_LIST } = require("../lib/constant");
const packageJson = require("../package.json");
const inquirer = require("inquirer");
const { ACTION_CREATE_APP } = require("../lib/createApp/constant");
const { ACTION_UTILS } = require("../lib/utils/constant");
const createApp =require("../lib/createApp")
const utils =require('../lib/utils')


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
