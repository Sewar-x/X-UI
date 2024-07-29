const chalk = require('chalk')
const fsPromise = require('fs').promises

/**
 * 修改所有packages的版本号
 */
async function changeVersion(): Promise<boolean | undefined> {
  const version = getVersion()
  // 输出提示信息
  console.log(chalk.blue('正在更改版本号:version ...'))
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

function getVersion(): string {
  
    // 获取项目根路径
    const packagePath = path.resolve(__dirname, '../package.json')
    // 读取 package.json 文件内容
    const packageJSON = require(packagePath)
    // 获取当前版本号
    let versions = packageJSON.version.split('.')
    let lastVer = Number(versions[versions.length-1])
    // 最后版本号加一
    versions[versions.length-1] = lastVer++
    
    return versions.join('.')
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


changeVersion()