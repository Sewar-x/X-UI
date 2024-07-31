export function setShowLabel(data, checked) {
  if(!data) return false
  if(data&&data.series&&(data.series instanceof Array)){
    data.series.forEach(item => {
      if (item ?.label) {
        item.label.show = checked
      } else {
        item.label = {
          show: checked
        }
      }
      if (item ?.itemStyle ?.normal ?.label) {
        item.itemStyle.normal.label.show = checked
      }
    });
  }
}
