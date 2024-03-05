/**
 * 组件库别名插件，解决打包和开发入口不一致问题。
 * 作用：把入口从 dist 目录换到当前工程的对应项目下的index入口。
 * 组件库打包后的入口跟开发时的入口有点不一致，所以如果开发中直接 import xxx from 组件库名称 这样导入组件会有问题。
 * 一般情况下入口是配置打包完之后的产物的入口的（一般是dist、lib目录下的index）。
 */
import * as path from 'path'
import * as fsPromises from 'fs/promises'
import { Alias } from 'vite'

// 包项目路径
export function packagesPath() {
  return path.resolve(__dirname, '../packages')
}

export async function alias(): Promise<Array<Alias>> {
  const projectPath = packagesPath() //该函数返回一个包含路径别名的数组
  const dirArr = await fsPromises.readdir(projectPath)//读取项目目录下的文件列表
  //遍历文件列表，为每个包创建一个别名
  return dirArr.map(packagePath => {
    return {
      find: new RegExp(`^@xw-ui\\/xw-${packagePath}(\\/(dist))?$`),
      replacement: path.join(projectPath, `/${packagePath}/index`)
    }
  })
}
