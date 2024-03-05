import * as path from 'path'
import * as fsPromises from 'fs/promises'

// 组件文档目录
const componentBasePath = () => {
  return path.resolve(__dirname, '../zh-CN/components')
}

// 输出配置目录
const outPutBasePath = () => {
  return path.resolve(__dirname, '../.vitepress/pages')
}

// 生成组件文档侧边栏配置项
const getComponentsSideBar = async (path: string) => {
  // 组件文档路径
  const resolvePath = componentBasePath() + path
  // 文件数组
  const dirArr = await fsPromises.readdir(resolvePath)

  return Promise.all(dirArr.map(async (dirItemPath: string) => {
    // 文件路径
    const dirPath = `${resolvePath}/${dirItemPath}`
    // 文件内容
    const fileArr = await fsPromises.readdir(dirPath)
    // 返回侧边栏配置项
    return {
      text: dirItemPath,
      collapsible: true,
      collapsed: false,
      items: await Promise.all(fileArr.map(async (fileName: string) => {
        const buffer = await fsPromises.readFile(`${dirPath}/${fileName}`)
        const fileStr = buffer.toString()
        const reg = /(?<=#\s).*?(?=\n)/

        const sideName = reg.exec(fileStr) && (reg.exec(fileStr) as Array<string>)[0] || dirItemPath
        return {
          text: sideName,
          link: `/zh-CN/components${path}/${dirItemPath}/${fileName.split('.')[0]}`
        }
      }))
    }
  }))
}

const mdFilePath = ['/element-plus', '/element-ui', '/ant-design']

export default function sideBarPlugin() {
  return {
    //在服务器启动时被调用
    buildStart: async () => {
      for (const filePath of mdFilePath) {
        // 侧边栏配置
        const sideBarArr = await getComponentsSideBar(filePath)
        // 输出路径
        const outPutFile = `${outPutBasePath()}/${filePath}.json`
        // 写入文件
        await fsPromises.writeFile(outPutFile, JSON.stringify(sideBarArr), {
          encoding: 'utf-8'
        })
      }
    }
  }
}
