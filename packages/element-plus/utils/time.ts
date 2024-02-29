import {  createDateRangeShortcuts as create } from '@xw-ui/xw-shared'

export function createDateRangeShortcuts () {
  const shortcuts = create()
  return shortcuts.map(function (item) {
    const { value, ...rest } = item
    return {
      ...rest,
      value () {
        return value
      }
    }
  })
}
