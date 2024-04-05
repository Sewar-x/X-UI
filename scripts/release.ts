
/**
 * 发布脚本,发版前需要在本地打tag
 */
const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
const yargs = require('yargs')
const fsPromise = require('fs').promises
const { execSync } = require('child_process');
/**
 * 解析包路径
 * @param target 
 * @returns 
 */
const pathResolve = (target: string) => (...args: any) => path.resolve(__dirname, `../packages/${target}`, ...args)

/* 
* 获取命令行参数和分支
* 执行命令：pnpm run release -- --pv=1.0.30 --t=latest 或 pnpm run release --  --pubversion=1.0.30 --tag=latest
* version 发布的版本号
* gitBranch 当前git的分支
* gitTtag 发布的版本 beta/latest/pre
*/
function getCommondParams(): {
  version: string,
  gitBranch: string,
  gitTtag: string | undefined
} {
  // 解析命令行参数
  let argv: {
    pubversion: string,
    tag: string
  } = { pubversion: '', tag: '' }
  argv = yargs.option('t', {
    alias: 'tag',
    description: 'The tag for the release',
    type: 'string',
    default: 'latest' // 默认为'latest'
  }).option('pv', {
    alias: 'pubversion',
    description: 'The version number of the release',
    type: 'string',
    default: undefined // 确保没有默认值，这样用户不提供值时，它不会被解析为true
  }).help()
    .alias('help', 'h')
    .argv;

  console.log(argv);
  // 获取当前分支，用于后续提交到gitee的分支，如：master/thuo
  let gitBranch: string = ''
  if (!argv.pubversion) {
    console.log(chalk.blue('version 不能为空'))
    throw new Error('version 不能为空')
  }
  try {
    gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    console.log(`当前 Git 分支: ${gitBranch}`);
  } catch (error) {
    console.error('无法获取 Git 分支信息:', error);
  }
  return { version: argv.pubversion, gitTtag: argv.tag, gitBranch }
}

/**
 * 修改所有packages的版本号
 */
async function changeVersion(version: string): Promise<void> {
  // 输出提示信息
  console.log(chalk.blue('更改版本号...'))

  // 获取项目路径
  const projectPath = path.resolve(__dirname, '../packages')

  // 读取项目路径下的所有文件/文件夹
  const targets = await fsPromise.readdir(projectPath)
  console.log("🚀 ~ changeVersion ~ projectPath:", projectPath,targets)

  // 遍历每个文件/文件夹
  for (let target of targets) {
    // 创建解析路径的函数
    const resolve = pathResolve(target)

    // 获取 package.json 的路径
    const packagePath = resolve('package.json')

    // 读取 package.json 文件内容
    const packageJSON = require(packagePath)

    // 更新版本号
    packageJSON.version = version

    // 将更新后的 package.json 文件内容写回文件
    // fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 2))
  }
}

// 将修改后的版本号提交到 github
async function gitCommit(version: string, gitBranch: string): Promise<void> {
  if (!version || !gitBranch) {
    console.log(chalk.blue('version 不能为空'))
    return Promise.reject()
  }
  await execa('git', ['add', '.'])
  await execa('git', ['commit', '-m', ` 发布版本 ${version}`])
  await execa('git', ['push', 'github', gitBranch])
}

/**
 * 发布到 npm
 */
async function npmPublish(gitTtag: string = 'latest') {
  // 在目标文件目录下执行发布命令
  await execa('nrm', ['use', 'localhost'], {
    // 继承父进程的stdio流
    stdio: 'inherit'

  })
  // 在目标文件目录下执行发布命令
  await execa('npm', ['publish'], {
    // 继承父进程的stdio流
    stdio: 'inherit'
  })
}



async function start() {
  // 获取发布版本号，标签，分支
  const { version, gitBranch, gitTtag } = getCommondParams()
  if (version) {
    changeVersion(version)
  }
  // 将修改后的版本号提交到 github
  gitCommit(version, gitBranch)
  // npmPublish(gitTtag)
}

start()
