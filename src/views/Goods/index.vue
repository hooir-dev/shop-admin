<template>
  <div>
    <el-row class="top">
      <el-col :span="4">
        <el-input
          placeholder="请输入内容"
          @keyup.native.enter="loadGoodsList"
          v-model="searchText">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain @click="$router.push('/toadd')">添加商品</el-button>
      </el-col>
    </el-row>
     <el-table
      :data="goodsList"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
        :index="indexMethod"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
      <el-table-column
        prop="upd_time"
        label="创建时间">
        <template slot-scope="scope">{{ scope.row.add_time | dateFormat }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelGood(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[5, 15, 20, 25]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { getGoodsList, delGoodsById } from '@/api/goods.js'
export default {
  name: 'GoodsList',
  data () {
    return {
      searchText: '',
      goodsList: [],
      total: 0,
      pagesize: 10,
      page: 1
    }
  },
  created () {
    this.loadGoodsList(1)
  },
  methods: {
    async loadGoodsList (page) {
      let { data } = await getGoodsList({ query: this.searchText, pagenum: page, pagesize: this.pagesize })
      this.goodsList = data.goods
      this.total = data.total
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadGoodsList()
    },
    handleCurrentChange (val) {
      this.loadGoodsList(val)
    },
    handleDelGood (item) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { meta } = await delGoodsById(item.goods_id)
        if (meta.status === 200) {
          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
          this.loadGoodsList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    indexMethod (index) {
      return (this.page - 1) * this.pagesize + 1 + index
    }
  }
}
</script>
<style scoped>
.top {
  margin: 10px 0;
}
</style>
