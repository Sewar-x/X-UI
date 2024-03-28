import { createDateRangeShortcuts as create } from '../../shared'

export function createDateRangeShortcuts() {
  const shortcuts = create()
  return shortcuts.map(item => {
    const { value, ...rest } = item
    return {
      ...rest,
      onClick(picker) {
        picker.$emit('pick', value)
      }
    }
  })
}
