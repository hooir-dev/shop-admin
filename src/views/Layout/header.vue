<template>
  <el-row class="head-flex" justify="center">
    <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1" class="col-span">
      <span class="navicon"></span>
    </el-col>
    <el-col :xs="8" :sm="6" :md="3" :lg="3" :xl="1" class="col-logo">
      <div class="div-img hidden-sm-and-down">
        <img class="logo-img" src="./20160624@210450.jpg" alt="">
      </div>
    </el-col>
    <el-col :xs="13" :sm="14" :md="14" :lg="16" :xl="1">
      <div>
        <p class="p-font">欢迎登录品优购后台管理</p>
      </div>
    </el-col>
    <el-col :xs="2" :sm="4" :md="4" :lg="4" :xl="1">
      <div>
        <el-button type="primary" @click.prevent="hadleLogout">退出</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { removeToken } from '@/utils/auth.js'
export default {
  data () {
    return {}
  },
  methods: {
    hadleLogout () {
      removeToken()
      this.$router.replace('/login')
    }
  }
}
</script>
<style scoped>
.div-img {
  width: 90%;
  height: 100%;
}
.logo-img {
  width: 100%;
  height: 100%;
  display: block;
}
.navicon { margin-right: 15px; }
.navicon { display: inline-block; position: relative; width: 30px; height: 5px; background-color: #000; }
.navicon:before, .navicon:after { content: ''; display: block; width: 30px; height: 5px; position: absolute; background: #000; -webkit-transition-property: margin, -webkit-transform; transition-property: margin, -webkit-transform; transition-property: margin, transform; transition-property: margin, transform, -webkit-transform; -webkit-transition-duration: 300ms; transition-duration: 300ms; }
.navicon:before { margin-top: -10px; }
.navicon:after { margin-top: 10px; }
/* open */
h2.open .navicon { background: none }/* hidden */
h2.open .navicon:before { margin-top: 0; -webkit-transform: rotate(45deg); transform: rotate(45deg); }
h2.open .navicon:after { margin-top: 0; -webkit-transform: rotate(-45deg); transform: rotate(-45deg); }
h2.open .navicon:before, #mnav h2.open .navicon:after { content: ''; display: block; width: 30px; height: 5px; position: absolute; background: #FFFFFF; -webkit-transition-property: margin, -webkit-transform; transition-property: margin, -webkit-transform; transition-property: margin, transform; transition-property: margin, transform, -webkit-transform; -webkit-transition-duration: 300ms; transition-duration: 300ms; }
</style>
