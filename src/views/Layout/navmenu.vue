<template>
  <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="1" class="aside">
    <el-menu
      default-active="2"
      background-color="#293543"
      text-color="#B1B5BA"
      active-text-color="#409EFF"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      >
      <el-submenu :index="first.path" v-for="first in menus" :key="first.id">
        <template slot="title">
          <i class="iconfont icon-Management"></i>
          <span class="hidden-xs-only">{{ first.authName }}</span>
        </template>
        <el-menu-item :index="second.path" v-for="second in first.children" :key="second.id">
          <template>
            <i class="iconfont icon-user-list"></i>
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
  created () {
    this.loadRightsMeun()
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
    }
  }
}
</script>
<style scoped>
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
