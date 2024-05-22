
import { h } from 'vue'
import { isTwoDimensionalArray, isDef } from "../../../utils/is.ts";
import { deepClone } from "../../../utils/func.ts";
import Description from "./Description.vue";

export default {
  props: ['options'],
  setup(props: any, { slots }) {
    const isMultipleDes = isTwoDimensionalArray(props.options.items)
    let rendderFunc = null
    // 如果 items 传入二维数组，表示使用多个描述列表组合成一个描述列表
    if (isMultipleDes) {
      //descriptions items label 的统一宽度
      const itemLabelWidth = props.options.itemLabelWidth
      // 获取 descriptions items 的每一项，将二维数组转为一维数组 
      const itemList = props.options.items.map((item: Array<any>) => {
        if (itemLabelWidth) {
          return item.map((itemConf: object) => {
            if (!(itemConf?.attr && itemConf?.attr?.width)) {
              itemConf.attr.width = itemLabelWidth
            }
            return itemConf
          })
        } else {
          return item
        }
      })
      // 根据  descriptions items 的每一项，生成对应的 options 参数配置
      const optionList = itemList.map((item: Array<any>, index: number) => {
        // 深度克隆配置
        const opt = deepClone(props.options)
        opt.items = item
        // 删除除了第一项以外的  descriptions items 的 title 和 extra
        if (index !== 0) {
          try {
            delete opt.attr.title
            delete opt.attr.extra
          } catch (err) {
            console.error(err)
          }
        }
        return opt
      })


      // 遍历配置项数组，生成 Descriptions 组合列表
      rendderFunc = () => h(
        'div',
        optionList.map((opt: any, index: number) => {
          return h(Description, { key: index, options: opt }, slots)
        })
      )
    } else {
      rendderFunc = () => h(
        Description,
        { options: props.options },
        slots
      )
    }
    console.log("🚀 ~ setup ~ rendderFunc:", rendderFunc)

    return rendderFunc
  }
}