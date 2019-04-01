<template>
  <div>
    <el-row class="top">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="search" style="width: 400px;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table
      :data="ordersData"
      stripe
      style="width: 100%">
       <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="下单用户">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款">
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="是否发货">
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="下单时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button type="warning" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-location" @click="showMap" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <baidumap></baidumap>
    </el-dialog>
  </div>
</template>
<script>
import { getOrdersList } from '@/api/orders.js'
import baidumap from './baidumap'
export default {
  data () {
    return {
      search: '',
      ordersData: [],
      pagenum: 1,
      pagesize: 10,
      dialogTableVisible: false
    }
  },
  components: {
    baidumap
  },
  created () {
    this.loadOrdersList()
  },
  methods: {
    async loadOrdersList () {
      let { data, meta } = await getOrdersList({ pagenum: this.pagenum, pagesize: this.pagesize })
      if (meta.status === 200) {
        this.ordersData = data.goods
      }
    },
    showMap () {
      this.dialogTableVisible = true
    }
  }
}
</script>
<style scoped>
.top {
  margin: 20px 0;
  background: #F1F2F7;
}
</style>
