<template>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        label="层级">
        <template slot-scope="scope">
          {{ ['一级', '二级', '三级'][scope.row.level] }}
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
import { getRightsList } from '@/api/rights.js'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadRightsList()
  },
  methods: {
    async loadRightsList () {
      const { data } = await getRightsList('list')
      // console.log(data)
      // 根据id 降序排列
      if (!data[0]) {
        return
      }
      data.sort((x, y) => {
        return y.id - x.id
      })
      this.tableData = data
    }
  }
}
</script>
<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
