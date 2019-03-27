<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-tree
      :data="rights"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultChecked"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getRightsList } from '@/api/rights.js'
export default {
  name: 'editRights',
  created () {

  },
  data () {
    return {
      dialogFormVisible: false,
      rights: [],
      defaultChecked: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    showDialog (role) {
      this.dialogFormVisible = true
      this.loadRightsList()
      this.getRights(role.children)
      console.log(role.children)
    },
    async loadRightsList () {
      let { data } = await getRightsList('tree')
      this.rights = data
    },
    getRights (roleRights) {
      let arr = []
      roleRights.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(thirdly => {
            arr.push(thirdly.id)
          })
        })
      })
      this.defaultChecked = arr
    }
  }
}
</script>
<style scoped>
</style>
