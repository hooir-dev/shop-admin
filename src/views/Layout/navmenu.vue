<template>
  <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="1" class="aside">
    <el-menu
      :default-active="$route.path"
      background-color="#324157"
      text-color="#B1B5BA"
      active-text-color="#409EFF"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select='handleMenuSelect'
      router
      >
      <el-submenu :index="first.path" v-for="first in menus" :key="first.id">
        <template slot="title">
          <i class="iconfont icon-guanli"></i>
          <span class="hidden-xs-only">{{ first.authName }}</span>
        </template>
        <el-menu-item :index="second.path" v-for="second in first.children" :key="second.id">
          <template>
            <i class="iconfont icon-xingmingyonghumingnicheng"></i>
            <span>{{ second.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
import { getRightsMeun } from '@/api/rights.js'
export default {
  name: 'NavMenu',
  data () {
    return {
      menus: []
    }
  },
  async created () {
    await this.loadRightsMeun()
    console.log(this.$route)
    this.handleMenuSelect(this.$route.path.substr(1))
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async loadRightsMeun () {
      let { data } = await getRightsMeun()
      this.menus = data
    },
    handleMenuSelect (index) {
      const secondPath = index
      this.menus.forEach(first => {
        const second = first.children.find(second => {
          return second.path === secondPath
        })
        if (second) {
          // 找到当前菜单与父菜单
          this.$emit('menu-select', [first.authName, second.authName])
        }
      })
    }
  }
}
</script>
<style scoped>
.el-menu {
  text-align: left;
  padding-top: 30px;
}
.aside {
  height: 100%;
}
.el-menu-item {
  padding-left: 6px;
}
.el-menu-vertical-demo {
  overflow: hidden;
  height: 100%;
}
i {
  margin: 0 6px;
}
</style>
