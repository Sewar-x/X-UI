
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
* 执行命令：
*   pnpm run release -- --ver=1.0.30 --t=latest --npm=true --b=false --doc=false  
*   或 pnpm run release -- --releaseVersion=1.0.30 --tag=latest --npm=true --build=false --docBuild=false  
* version 发布的版本号
* gitBranch 当前git的分支
* gitTtag 发布的版本 beta/latest/pre
*/
function getCommondParams(): {
  version: string,
  gitBranch: string,
  gitTtag: string | undefined,
  npm: boolean,
  isBuild: boolean,
  isDocsBuild: boolean
} {
  // 解析命令行参数
  let argv: {
    releaseVersion: string,
    tag: string,
    npm: boolean,
    build: boolean,
    docBuild: boolean
  } = { releaseVersion: '', tag: '', npm: true, build: false, docBuild: false }
  argv = yargs.option('t', { // 版本 tag 参数
    alias: 'tag',
    description: 'The tag for the release',
    type: 'string',
    default: 'latest' // 默认为'latest'
  }).option('ver', { //  发布 version 参数，用于指定发布版本号，如：1.0.30
    alias: 'releaseVersion',
    description: 'The version number of the release',
    type: 'string',
    default: undefined // 确保没有默认值，这样用户不提供值时，它不会被解析为true
  }).option('npm', { // 是否发布 npm
    alias: 'npm',
    description: 'is publish npm registry?',
    type: 'boolean',
    default: true
  }).option('b', { // 是否需要本地构建
    alias: 'build',
    description: 'is local build?',
    type: 'boolean',
    default: true
  }).option('doc', { // 是否需要构建文档
    alias: 'docBuild',
    description: 'is local build?',
    type: 'boolean',
    default: true
  }).help()
    .alias('help', 'h')
    .argv;

  // 获取当前分支，用于后续提交到gitee的分支，如：master/thuo
  let gitBranch: string = ''
  if (!argv.releaseVersion) {
    console.log(chalk.blue('version 不能为空'))
    throw new Error('version 不能为空')
  }
  try {
    gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    console.log(`当前 Git 分支: ${gitBranch}`);
  } catch (error) {
    console.error('无法获取 Git 分支信息:', error);
  }
  return {
    version: argv.releaseVersion,
    gitTtag: argv.tag,
    gitBranch,
    npm: argv.npm,
    isBuild: argv.build,
    isDocsBuild: argv.docBuild
  }
}

/**
 * 向 package.json 文件写入版本号
 * @param packagePath 
 * @param version 
 */
function setPackagesVersion(packagePath: string, version: string) {
  // 读取 package.json 文件内容
  const packageJSON = require(packagePath)

  // 更新版本号
  packageJSON.version = version
  try {
    // 将更新后的 package.json 文件内容写回文件
    fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 2))
  } catch (err) {
    console.log(chalk.red('版本号文件写入失败,请检查文件权限'))
  }

}

/**
 * 修改所有packages的版本号
 */
async function changeVersion(version: string): Promise<boolean | undefined> {
  if (version) {
    return false
  }
  // 输出提示信息
  console.log(chalk.blue('正在更改版本号...'))
  // 获取项目根路径
  const rootPackages = path.resolve(__dirname, '../package.json')
  // 向项目根路径 package.json 文件写入版本号
  setPackagesVersion(rootPackages, version)
  // 获取项目子项目路径
  const projectPath = path.resolve(__dirname, '../packages')

  // 读取项目路径下的所有文件/文件夹
  const targets = await fsPromise.readdir(projectPath)

  // 遍历每个文件/文件夹
  for (let target of targets) {
    // 创建解析路径的函数
    const resolve = pathResolve(target)
    // 获取 package.json 的路径
    const packagePath = resolve('package.json')
    // 向 package.json 文件写入版本号
    setPackagesVersion(packagePath, version)
  }
  console.log(chalk.blue(`完成版本号更改,当前把版本号为： ${version}`))
}

// 将修改后的版本号提交到 github
async function gitCommit(version: string, gitBranch: string): Promise<void> {
  // 检查version和gitBranch是否为空
  if (!version || !gitBranch) {
    console.log(chalk.blue('version 不能为空'))
    return Promise.reject()
  }

  // 执行 git add 命令，将所有修改添加到暂存区
  await execa('git', ['add', '.'])

  // 执行 git commit 命令，提交修改，并添加提交信息
  await execa('git', ['commit', '-m', ` 发布版本 ${version}`])

  // 执行 git push 命令，将修改推送到 github 上的指定分支
  await execa('git', ['push', 'github', gitBranch])

  // 打印完成信息
  console.log(chalk.blue(`完成版本： ${version} github ${gitBranch} 分支推送`))
}



/**
 * 发布到 npm
 */
async function npmPublish(publish: boolean, gitTtag: string = 'latest'): Promise<Boolean | undefined> {
  if (!publish) {
    return false
  }
  try {
    // 在目标文件目录下执行发布命令
    await execa('nrm', ['use', 'localhost'], {
      // 继承父进程的stdio流
      stdio: 'inherit'

    })
  } catch (err) {
    console.log(chalk.red(`当前不存在本地 npm 镜像源`))
  }

  console.log(chalk.blue(`切换当前 npm 镜像源为私有镜像源`))
  console.log(chalk.blue(`正在发布镜像`))
  // 在目标文件目录下执行发布命令
  await execa('npm', ['publish'], {
    // 继承父进程的stdio流
    stdio: 'inherit'
  })
  console.log(chalk.blue(`npm 发布成功! 切换当前 npm 镜像源 npm 镜像源`))
  await execa('nrm', ['use', 'npm'], {
    // 继承父进程的stdio流
    stdio: 'inherit'

  })
}

/**
 * 本地构建组件库
 * @returns 
 */
async function build(isBuild: boolean): Promise<Boolean | undefined> {
  if (!isBuild) {
    return false
  }

  try {
    // 在目标文件目录下执行发布命令
    await execa('npm', ['run build'], {
      // 继承父进程的stdio流
      stdio: 'inherit'

    })
  } catch (err) {
    console.log(chalk.red(`本地构建失败！`))
    return false
  }
}

/**
 * 本地构建组件库文档
 * @returns 
 */
async function docBuild(isBuild: boolean): Promise<Boolean | undefined> {
  if (!isBuild) {
    return false
  }
  try {
    // 在目标文件目录下执行发布命令
    await execa('npm', ['run docs:build'], {
      // 继承父进程的stdio流
      stdio: 'inherit'

    })
  } catch (err) {
    console.log(chalk.red(`本地构建失败！`))
    return false
  }
}



async function start() {
  // 获取发布版本号，标签，分支
  const { version, gitBranch, gitTtag, npm, isBuild, isDocsBuild } = getCommondParams()
  // 修改所有版本号
  changeVersion(version)
  // 本地构建组件库
  build(isBuild)
  //本地构建组件库文档
  docBuild(isDocsBuild)
  // 将修改后的版本号提交到 github
  gitCommit(version, gitBranch)
  // 发布到 npm
  npmPublish(npm, gitTtag)

}

start()
