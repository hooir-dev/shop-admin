<template>
  <div>
    <el-row class="top">
      <el-col :span="4"><el-button type="primary">添加分类</el-button></el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="cat_id">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        label="是否有效"
        sortable
        width="180">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted? '无效' : '有效'}}
        </template>
      </el-table-column>
      <el-table-column
        label="排序">
        <template slot-scope="scope">
          {{ ['一级', '二级', '三级'][scope.row.cat_level] }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { getGoodsCategoryList } from '@/api/goods-category.js'
export default {
  data () {
    return {
      tableData: [],
      allCategoryList: [],
      total: 0,
      pagesize: 10
    }
  },
  created () {
    this.loadGoodsCategory()
  },
  methods: {
    async loadGoodsCategory () {
      let { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.allCategoryList = data
        this.tableData = data.slice(0, this.pagesize)
        this.total = data.length
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.tableData = this.allCategoryList.slice((val - 1) * this.pagesize, this.pagesize * val)
    }
  }
}
</script>
<style scoped>
.top {
  margin: 20px 0;
}
</style>
