const shellJs =require('shelljs')
const download = require("download-git-repo");
const ora = require('ora');
const createApp=(projectName,template)=>{
    const spinner = ora('******项目开始克隆中********').start();
    download(`waltiu/code-template/#${template}`,`${projectName}/`, (error)=>{
        if(error){
            spinner.color = "error";
            spinner.fail( error,'系统错误,请检查代码库是否包含该模板或当前目录是否已存在！')
            console.log('error',error)
        }else{
            spinner.color = "green";
            spinner.succeed("******项目初始化完成*******");
        }
    })
   
}
module.exports=createApp