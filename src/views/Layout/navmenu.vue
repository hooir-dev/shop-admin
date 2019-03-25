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
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-Management"></i>
          <span class="hidden-xs-only">用户管理</span>
        </template>
        <el-menu-item>
          <el-menu-item index="/user">
            <template slot="title">
              <i class="iconfont icon-user-list"></i>
              <span>用户列表</span>
            </template>
          </el-menu-item>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-quanxianguanli"></i>
          <span slot="title" class="hidden-xs-only">权限管理</span>
        </template>
        <el-menu-item>
          <el-menu-item index="2-1">
            <template slot="title">
              <i class="iconfont icon-jiaoseliebiao"></i>
              <span>角色列表</span>
            </template>
          </el-menu-item>
        </el-menu-item>
        <el-menu-item>
          <el-menu-item index="2-2">
            <template slot="title">
              <i class="iconfont icon-permissions-list"></i>
              <span>权限列表</span>
            </template>
          </el-menu-item>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-goods"></i>
          <span slot="title" class="hidden-xs-only">商品管理</span>
        </template>
        <el-menu-item>
          <el-menu-item index="3-1">
            <template slot="title">
              <i class="iconfont icon-shangpinliebiao"></i>
              <span>商品列表</span>
            </template>
          </el-menu-item>
        </el-menu-item>
        <el-menu-item>
          <el-menu-item index="3-2">
            <template slot="title">
              <i class="iconfont icon-canshu"></i>
              <span>分类参数</span>
            </template>
          </el-menu-item>
        </el-menu-item>
        <el-menu-item>
          <el-menu-item index="3-3">
            <template slot="title">
              <i class="iconfont icon-shangpinfenlei"></i>
              <span>商品分类</span>
            </template>
          </el-menu-item>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-dingdanguanli"></i>
          <span class="hidden-xs-only">订单管理</span>
        </template>
        <el-menu-item>
          <el-menu-item index="4-1">
            <template slot="title">
              <i class="iconfont icon-dingdanliebiao_huaban"></i>
              <span>订单列表</span>
            </template>
          </el-menu-item>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-shujutongji"></i>
          <span class="hidden-xs-only">数据统计</span>
        </template>
        <el-menu-item>
          <el-menu-item index="5-1">
            <template slot="title">
              <i class="iconfont icon-shujubaobiao"></i>
              <span>数据报表</span>
            </template>
          </el-menu-item>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
export default {
  name: 'NavMenu',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.aside {
  height: 100%;
}
.el-menu-vertical-demo {
  overflow: hidden;
  height: 100%;
}
</style>
