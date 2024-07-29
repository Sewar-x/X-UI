// const OUTPUT_DIR = require("../build/constant.ts").OUTPUT_DIR;
const path = require('path')
const inquirer = require('inquirer');

async function getInput() {
  const info = {
    user: null,
    password: null
  }
  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'user',
        message: '请输入用户名,按回车确认：',
        validate: function (val) {
          return val ? true : "请输入非空字符串";
        }
      },
      {
        type: 'input',
        name: 'password',
        message: '请输入密码,按回车确认：',
        validate: function (val) {
          return val ? true : "请输入非空字符串";
        }
      }
    ])
    .then((answers) => {
      info.user = answers.user
      info.password = answers.password
    })
  return info
}

//获取上传配置信息
const getConfig = async function () {

  let users = {
    user: null,
    password: null
  }
  try {
    users = require("./users.ts");
  } catch (err) {
    console.log('用户信息文件不存在 ', err)
  } finally {
    if (!users.user || !users.password) {
      users = await getInput()
    }
  }

  return {
    user: users?.user,
    password: users?.password,
    host: "10.126.16.116",
    port: new Map([
      ["test", 2021],
      ["production", 2021],
    ]),
    localRoot: path.resolve(__dirname, `../dist`),
    remoteRoot: {// 远程静态资源文件路径
      test: '/data/xwui',
      production: '/data/xwui'
    }
  };
}


module.exports = getConfig
