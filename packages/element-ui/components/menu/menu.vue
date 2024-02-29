<template>
  <div class="xw-menu-wrapper">
    <el-menu :collapse="_collapse" class="xw-menu" v-bind="$attrs">
      <el-menu-item @click="onTitleClick" class="xw-menu-title" v-if="title" index="title">
        <i class="el-icon xw-icon-logo">
          <img class="xw-logo" :src="logo" />
        </i>
        <span slot="title" class="xw-title">{{title}}</span>
      </el-menu-item>
      <slot></slot>
    </el-menu>
    <div class="xw-trigger">
      <i style="display: inline-block;" class="el-icon el-icon-trigger" @click="toggle">
        <icon-open v-if="collapse" />
        <icon-close v-else="!collapse"/>
      </i>
    </div>
  </div>
</template>

<script>
import { Menu as ElMenu, MenuItem as ElMenuItem  } from 'element-ui'
import Logo from './assets/logo.png'
import IconOpen from './iconOpen.vue'
import IconClose from './iconClose.vue'
export default {
  name: 'XMenu',
  components: { ElMenu, ElMenuItem, IconClose, IconOpen },
  props: {
    title: {
      type: String
    },
    logo: {
      type: String,
      default: Logo
    },
    collapse: {
      type: Boolean,
      default: false
    },
    url: {
      type: String
    }
  },
  computed: {
    _collapse: {
      get () {
        return this.collapse
      },
      set (val) {
        this.$emit('update:collapse', val)
      }
    }
  },
  methods: {
    toggle () {
      this._collapse = !this._collapse
    },
    onTitleClick () {
      if (this.$router && this.url) {
        this.$router.push(this.url)
      }
    }
  }
}
</script>

<style lang="less">
.xw-menu-wrapper {
  height: 100%;
  position: relative;
  padding-bottom: 48px;
  box-sizing: border-box;
  .xw-menu-title {
    border-bottom: 1px solid rgba(0,0,0,.1);
    &:hover {
      background: #fff!important;
    }
  }
}

.el-menu:not(.el-menu--collapse) {
  .xw-title {
    height: 56px;
    line-height: 56px;
    padding-left: 16px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.90);
    box-sizing: border-box;
  }
}

.xw-menu {
  &:not(.el-menu.el-menu--collapse) {
    width: var(--xw-menu-width);
  }

  &.el-menu.el-menu--collapse {
    .logo {
      margin-left: -2px;
    }
  }

  height: 100%;
  overflow-y: auto;
}

.xw-logo {
  width: 32px;
  margin-left: 32px - 24px;
}

.xw-trigger {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
  width: 100%;
  height: 48px;
  font-size: 24px;
  svg {
    width: 1em;
    height: 1em;
  }
  .el-icon {
    cursor: pointer;
    text-align: center;
    width: 64px;
    &:hover {
      color: var(--xw-color-primary);
    }
  }
}
.xw-icon-logo {
  width: 32px;
  height: 32px;
}
</style>