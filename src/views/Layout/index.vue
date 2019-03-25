<template>
  <el-container>
    <el-header height="50px">
      <AppHeader></AppHeader>
    </el-header>
    <el-main>
      <div class="container">
        <el-row class="head-flex" justify="center">
          <navMenu></navMenu>
          <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="1" class="main-right">
            <router-view></router-view>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import navMenu from './navmenu.vue'
import AppHeader from './header.vue'
export default {
  data () {
    return {}
  },
  components: {
    navMenu,
    AppHeader
  },
  methods: {

    handleout () {
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
}
</script>
<style scoped>
.head-flex {
  display: flex;
  align-items: center;
  height: 100%;
}
.col-logo {
  height: 100%;
}
.col-span {
  padding: 0 0 0 5px;
}

.el-header {
  background-color: #fff;
  padding: 0;
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

.el-menu-item-group__title {
  padding: 0;
}
.p-font {
  /* font-size: 19px; */
  font: 700 22px "微软雅黑";
  text-shadow: -2px 0px 3px #293543;
}

</style>
