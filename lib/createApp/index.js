const chalk = require("chalk");
const download = require("download-git-repo");
const ora = require("ora");
const createApp = (projectName, template) => {
  const url = `waltiu/code-template/#${template}`;
  const process = ora(` ${chalk.blue(projectName)}目录，开始下载`);
  process.start()
  process.color = "yellow";
  process.text = `正在下载..... ${chalk.yellow(url)} `;
  download(url, `${projectName}/`, (error) => {
    if (error) {
      process.color = "error";
      process.text = "系统错误,请检查代码库是否包含该模板或当前目录是否已存在";
      console.log("error", error);
      process.fail()
    } else {
      process.color = "green";
      process.text = `******项目初始化完成******* `;
      process.succeed()
    }
  });
};
module.exports = createApp;
