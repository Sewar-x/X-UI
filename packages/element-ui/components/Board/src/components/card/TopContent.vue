<template>
  <div class="top-content-wrap">
    <div class="top-content-header">
      <!-- ---------------------- 左侧信息区域 ---------------------->
      <div class="left-content-area">
        <div class="header-content">
          <span class="header-title">{{ element.title }}</span>
        </div>
        <div class="number" v-if="showNumber">{{ element.id }}</div>
        <!---------------------- 任务信息展示区域---------------------->
        <div class="content-detail-area">
          <ul class="ul-class">
            <div v-for="(row, rowIndex) in contentItems" :key="rowIndex">
              <li v-for="(item, index) in row" :key="index" class="li-class">
                <div class="content-list-area">
                  <i :class="item.icon" class="icon-class" />
                  <span v-if="!item.slotName">{{ element[item.props] }}</span>
                </div>
                <!--自定义插槽-->
                <slot v-if="item.slotName" :name="item.slotName" />
              </li>
            </div>
          </ul>
        </div>
      </div>
      <!---------------------- 右侧图片区域---------------------->
      <!-- <div class="image-area" v-if="element.attachment.length!==0">
        <div v-for="(item, index) in element.attachment" 
          :key="index"
          class="items-img">
          <el-image
            v-if="item.url && item.type!=='file'"
            class="image"
            :src="item.url"
            :preview-src-list="element.srcList"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TopContent",
  components: {},
  props: {
    // 元素信息
    element: {
      type: Object,
      default: () => {},
    },
    // 是否显示头部编号
    showNumber: {
      type: Boolean,
      default: false,
    },
    // 元素信息配置项
    contentItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.top-content-wrap {
  width: 100%;
}
.left-content-area {
  width: 100%;
}
.number {
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  border-radius: 50%;
  font-size: 12px;
  margin-right: 3px;
}
.title {
  color: #7c7a7a;
  font-weight: 600;
}
.header-content {
  display: flex;
  justify-content: flex-start;
}
.header-title {
  font-size: 18px;
  margin-left: 5px;
  overflow: hidden;
  color: #373737;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /*1行末尾显示点点点*/
}
// .image-area{
//   overflow: hidden;
//   max-width: 100px;
//   height: 100px;
// }
// .items-img {
//   display: flex;
// }
// .image {
//   height: 100px;
//   width: 120px;
// }
.top-content-header {
  display: flex;
  justify-content: space-between;
  height: 90px;
}
.content-list-area {
  display: ruby;
}
.icon-class {
  width: 20px;
}
.label-class {
  width: 100px;
}
.ul-class {
  list-style: none;
  width: 300px;
}
.li-class {
  display: inline-block;
  margin-right: 10px;
  line-height: 30px;
}
.content-detail-area {
  margin-left: -30px;
  width: 280px;
  margin-top: -13px;
}
</style>
