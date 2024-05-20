/**
 * 用于实现元素拖拽 drag.ts
 */
export const drag = {
  bind(el) {
    el.style.position = 'absolute' // 将元素定位
    let x = 0
    let y = 0
    let l = 0
    let t = 0
    let isDown = false

    // 鼠标按下事件
    el.onmousedown = function (e) {
      x = e.clientX // 鼠标在视口中的x坐标
      y = e.clientY // 鼠标在视口中的y坐标
      l = el.offsetLeft // 当前元素左上角相对于 HTMLElement.offsetParent 节点的左边界偏移的像素值（即元素左上角相对于定位父元素的左侧偏移量）
      t = el.offsetTop // 元素左上角相对于定位父元素的顶部偏移量
      // 开关打开
      isDown = true
      // 设置样式
      el.style.cursor = 'move'
    }

    // 鼠标移动
    window.onmousemove = function (e) {
      if (isDown === false) {
        return
      }
      const nx = e.clientX
      const ny = e.clientY

      // 计算移动后的左偏移量和顶部的偏移量:
      // 如果将鼠标移动后位置直接给元素定位，会将元素左顶点与鼠标对齐，所以我们要减掉（x-l）来优化位移
      const nl = nx - (x - l)
      const nt = ny - (y - t)
      el.style.left = nl + 'px'
      el.style.top = nt + 'px'
    }

    // 鼠标抬起事件
    el.onmouseup = function () {
      // 开关关闭
      isDown = false
      el.style.cursor = 'default'
    }
  }
}

export default drag