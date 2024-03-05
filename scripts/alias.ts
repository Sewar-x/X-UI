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
