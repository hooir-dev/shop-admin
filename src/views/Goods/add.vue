<template>
  <div>
    <p>添加商品信息</p>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'GoodsAdd',
  data () {
    return {
      active: 1
    }
  }
}
</script>
<style scoped>
.el-tabs {
  margin-left: -20px;
  margin-top: 20px;
}
</style>
