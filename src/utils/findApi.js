const fs = require("fs");
const path = require("path");

const findApi = () => {
  const targetPath =path.resolve('src');
  const targetFiles = []; // 搜索的目录
  let apiList = [];
  const getTargetFile = (target) => {
    const targetStatus = fs.statSync(target);
    if (targetStatus.isDirectory()) {
      const subTargets = fs.readdirSync(target);
      subTargets.forEach((subTargetDir) => {
        getTargetFile(path.resolve(target, subTargetDir));
      });
    } else if (/(.tsx|.ts|.js|.jsx)$/.test(target)) {
      targetFiles.push(target);
    }
  };
  const findApi = () => {
    targetFiles.forEach((target) => {
      const file = path.resolve(target);
      const content = fs.readFileSync(file, "utf-8");
      const apis = content.match(/api\S+('|")/g);
      apiList = apiList.concat(apis || []);
    });
  };
  getTargetFile(targetPath);
  findApi();
  const apis = Array.from(new Set(apiList));
  fs.writeFileSync(
    path.resolve("find.api.json"),
    JSON.stringify(apis).replace(/('")|",/g, '"'),
    "utf-8"
  );
  console.log("共找到以api开头的接口共", apis.length, "条");
};
module.exports=findApi
