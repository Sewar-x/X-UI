import * as path from 'path'
import * as fsPromises from 'fs/promises'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'

loadLanguages(['markup', 'css', 'javascript'])
// 项目包路径
const packagesPath = path.resolve(__dirname, '../../packages/')

const sourceCode = () => {
  return {
    /**
     * 用于将 Markdown 文件中的代码示例转换为可显示在网页上的代码片段。
     * 它首先会提取模块代码中的 source-code 属性，然后读取相应的文件，并将文件内容替换到属性中。
     * 这样，浏览器就可以直接解析模块代码中的代码片段了
     * docs:https://rollupjs.org/plugin-development/#transform
     * @param src string 源代码字符串
     * @param id  string | SourceMap;
     * @returns 
     */
    //在每个传入模块请求时被调用  transform 钩子
    async transform(src: string, id: string) {
      const mdFile = '.md' // 文件类型
      if (!id.includes(mdFile)) return

      const reg = /source-code="(.*)"/g

      if (!src.match(reg)) return
      //使用正则表达式从模块代码中提取 source-code 属性，并将其替换为实际的代码内容。
      const match = src.match(reg)?.map(_ => {
        const [packageName, compPath] = sourceSplit(_)
        const suffix = packageName.includes('ant') ? 'jsx' : 'vue'
        return fsPromises.readFile(path.resolve(packagesPath, `${packageName}/demo/${compPath}.${suffix}`), 'utf-8')
      })
      const filesRes = await Promise.all(match)

      //正则表达式 /source-code="(.*)"/g 可能会匹配到多个匹配项，因此在替换时需要使用 i++ 来确保每次替换都是唯一的。
      let i = 0
      //读取模块代码中的所有文件，并将其内容合并到模块代码中
      return src.replace(reg, (str) => {
        const [packageName, compPath] = sourceSplit(str)
        const compPathStrArr = compPath.split('/')
        const iframeSrc = compPathStrArr[compPathStrArr.length - 1]
        const file = filesRes[i]
        i++
        return `source-code="${encodeURIComponent(warp(Prism.highlight(file, Prism.languages.markup, 'markup')))}" raw-source="${encodeURIComponent(file)}" lib-type="${packageName}" iframe-src="${iframeSrc}"`
      })
    }
  }
}

const warp = code => `<pre v-pre><code>${code}</code></pre>`

function sourceSplit(_: string) {
  const result = /.*?source-code="(.*)"/.exec(_)
  const originPath = (result && result[1]) ?? ''
  return originPath.split(':::')
}

export default sourceCode
