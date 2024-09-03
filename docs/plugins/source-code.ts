import * as path from 'path'
import * as fsPromises from 'fs/promises'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index' // 语法高亮

loadLanguages(['markup', 'css', 'javascript'])
// 将源码使用 <pre> 标签包裹
const warp = code => `<pre v-pre><code>${code}</code></pre>`
/**
 * 实现原理是将一个字符串按照特定的模式（.*?source-code="(.*)"）进行匹配，然后将匹配到的结果按照:::分割成数组
 * @param _ 
 * @returns 
 */
function sourceSplit(_: string) {
  const result = /.*?source-code="(.*)"/.exec(_)
  const originPath = (result && result[1]) ?? ''
  return originPath.split(':::')
}

// 项目包路径
const packagesPath = path.resolve(__dirname, '../../packages/')
/**
 * 用于将 Markdown 文件中的代码示例转换为可显示在网页上的代码片段。
 * 它首先会提取模块代码中的 source-code 属性，然后读取相应的文件，并将文件内容替换到属性中。
 * 这样，浏览器就可以直接解析模块代码中的代码片段了
 * docs:https://rollupjs.org/plugin-development/#transform
 * @param src string 源代码字符串
 * @param id  string | SourceMap;
 * @returns 
 */
const sourceCode = () => {
  return {

    //在每个传入模块请求时被调用  transform 钩子
    async transform(src: string, id: string) {
      const mdFile = '.md' // 文件类型
      // 文件非 markodwn 类型，返回
      if (!id.includes(mdFile)) return
      // 提取示例组件中source-code属性值
      const reg = /source-code="(.*)"/g
      // 示例组件中不存在source-code属性，返回
      if (!src.match(reg)) return
      //使用正则表达式从模块代码中提取 source-code 属性，并将其替换为实际的代码内容。
      const match = src.match(reg)?.map(_ => {
        // 获取示例组件项目名和文件地址，通过 “项目名:::组件路由地址” 进行分割
        const [packageName, compPath] = sourceSplit(_)
        // 获取项目类型，react 使用ant design 组件，使用 tsx 语法， Vue 使用
        const suffix = packageName.includes('ant') ? 'tsx' : 'vue'
        // 返回读取的文件内容
        return fsPromises.readFile(path.resolve(packagesPath, `${packageName}/demo/${compPath}.${suffix}`), 'utf-8')
      })
      const filesRes = await Promise.all(match)


      //正则表达式 /source-code="(.*)"/g 可能会匹配到多个匹配项，因此在替换时需要使用 i++ 来确保每次替换都是唯一的。
      let i = 0
      //读取模块代码中的所有文件，并将其内容合并到模块代码中

      return src.replace(reg, (str) => {

        // 获取示例组件项目名和文件地址，通过 “项目名:::组件路由地址” 进行分割
        const [packageName, compPath] = sourceSplit(str)
        // 获取示例组件地址
        const compPathStrArr = compPath.split('/')
        // iframe src 地址
        const iframeSrc = compPathStrArr[compPathStrArr.length - 1]
        // 正则匹配 @sewen-ui 路径别名替换为原路径
        const searchString = new RegExp(`@/sewen-ui/${packageName}`, 'g')
        const replaceString = `sewen-ui/${packageName}`
        const file = filesRes[i] ? (filesRes[i] as string).replace(searchString, replaceString) : null
        i++
        // 返回编码后的源码文件内容
        return `source-code="${encodeURIComponent(warp(Prism.highlight(file, Prism.languages.markup, 'markup')))}" raw-source="${encodeURIComponent(file)}" lib-type="${packageName}" iframe-src="${iframeSrc}"`
      })
    }
  }
}
export default sourceCode
