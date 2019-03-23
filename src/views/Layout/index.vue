<template>
  <el-container>
    <el-header height="50px">
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
            <a href="#" @click.prevent="handleout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="container">
        <el-row class="head-flex" justify="center">
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="1" class="aside">
            <el-menu
              default-active="2"
              background-color="#293543"
              text-color="#B1B5BA"
              active-text-color="#409EFF"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              >
              <el-submenu index="1">
                <template slot="title">
                  <i class="iconfont icon-Management"></i>
                  <span class="hidden-xs-only">用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                    <template slot="title">
                      <i class="iconfont icon-user-list"></i>
                      <span @click="showList">用户列表</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="iconfont icon-quanxianguanli"></i>
                  <span slot="title" class="hidden-xs-only">权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">
                    <template slot="title">
                      <i class="iconfont icon-jiaoseliebiao"></i>
                      <span>角色列表</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="2-2">
                    <template slot="title">
                      <i class="iconfont icon-permissions-list"></i>
                      <span>权限列表</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="iconfont icon-goods"></i>
                  <span slot="title" class="hidden-xs-only">商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">
                    <template slot="title">
                      <i class="iconfont icon-shangpinliebiao"></i>
                      <span>商品列表</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="3-2">
                    <template slot="title">
                      <i class="iconfont icon-canshu"></i>
                      <span>分类参数</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="3-3">
                    <template slot="title">
                      <i class="iconfont icon-shangpinfenlei"></i>
                      <span>商品分类</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="iconfont icon-dingdanguanli"></i>
                  <span class="hidden-xs-only">订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">
                    <template slot="title">
                      <i class="iconfont icon-dingdanliebiao_huaban"></i>
                      <span>订单列表</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="iconfont icon-shujutongji"></i>
                  <span class="hidden-xs-only">数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">
                    <template slot="title">
                      <i class="iconfont icon-shujubaobiao"></i>
                      <span>数据报表</span>
                    </template>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="1" class="main-right">
            <router-view></router-view>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showList() {
      this.$router.push("/user");
    },
    handleout() {
      this.$confirm('确定退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
};
</script>
<style scoped>
.div-img {
  width: 90%;
  height: 100%;
}
.col-logo {
  height: 100%;
}
.col-span {
  padding: 0 0 0 5px;
}
.logo-img {
  width: 100%;
  height: 100%;
  display: block;
}
.el-header {
  background-color: #fff;
  padding: 0;
}
.head-flex {
  display: flex;
  align-items: center;
  height: 100%;
}
.el-container {
  height: 100%;
}
.container {
  height: 100%;
}
.el-aside {
  height: 100%;
  overflow: hidden;
}
.aside {
  height: 100%;
}
.el-main {
  background-color: #f1f2f7;
  padding: 0;
}
.el-menu,
.el-menu-item {
  height: 100%;
}
.el-menu {
  padding-top: 30px;
  box-sizing: border-box;
}
.main-right {
  height: 100%;
  background: #F1F2F7;
}
.iconfont {
  margin-right: 10px;
}
.el-submenu__title {
  padding: 0;
}
.el-menu-vertical-demo {
  overflow: hidden;
}
.el-menu-item-group__title {
  padding: 0;
}
.p-font {
  /* font-size: 19px; */
  font: 700 22px "微软雅黑";
  text-shadow: -2px 0px 3px #293543;
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