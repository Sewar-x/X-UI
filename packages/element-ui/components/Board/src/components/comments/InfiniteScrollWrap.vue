<template>
  <div class="infinite-list-wrapper" :style="{ height: height }">
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      class="list"
    >
      <li
        v-for="(item, index) in listItems"
        :key="item[itemKey] || index"
        class="list-item"
      >
        <slot name="item" :data="item">
          {{ item }}
        </slot>
      </li>
    </ul>
    <div class="tip-container">
      <p v-if="loading">{{ loadingText }}</p>
      <p v-if="noMore">{{ noMoreText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '300px'
    },
    listMethod: {
      // 获取列表数据方法
      type: Function,
      default: null
    },
    itemKey: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 15
    },
    params: {
      // 除了分页数据外的参数
      type: Object,
      default: function() {
        return {}
      }
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    noMoreText: {
      type: String,
      default: '没有更多了'
    }
  },
  data() {
    return {
      listItems: [],
      listQuery: {
        page: 1,
        page_size: this.size
      },
      total: -1,
      loading: false,
      methodParams: this.params
    }
  },
  computed: {
    noMore() {
      return this.listItems.length >= this.total
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  watch: {
    params: {
      handler(value) {
        this.methodParams = value
        this.load(true)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async load(refresh = false) {
      if (refresh) {
        this.listItems = []
        this.listQuery = this.$options.data().listQuery
      }
      this.loading = true
      const { data } = await this.listMethod(
        Object.assign({}, this.listQuery, this.methodParams)
      )

      this.listQuery.page = data.current_page + 1
      this.total = data.total
      this.listItems.push(...data.data)
      this.loading = false
      this.$emit('loaded', this.listItems)
    }
  }
}
</script>

<style lang="scss" scoped>
.infinite-list-wrapper {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }
  /*正常情况下滑块的样式*/
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    box-shadow: inset1px1px0rgba(0, 0, 0, 0.1);
  }
  /*鼠标悬浮在该类指向的控件上时滑块的样式*/
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: inset1px1px0rgba(0, 0, 0, 0.1);
  }
  /*鼠标悬浮在滑块上时滑块的样式*/
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: inset1px1px0rgba(0, 0, 0, 0.1);
  }
  /*正常时候的主干部分*/
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset006pxrgba(0, 0, 0, 0);
    background-color: white;
  }
  /*鼠标悬浮在滚动条上的主干部分*/
  &::-webkit-scrollbar-track:hover {
    box-shadow: inset006pxrgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.01);
  }
  ul {
    li {
      list-style: none;
    }
  }
  .tip-container {
    p {
      text-align: center;
    }
  }
}
</style>
