<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-tree
      :data="rights"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultChecked"
      :props="defaultProps"
      ref="tree">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getRightsList } from '@/api/rights.js'
import { updataRightsByRoleId } from '@/api/role.js'
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
      },
      role: {}
    }
  },
  methods: {
    showDialog (role) {
      this.dialogFormVisible = true
      this.loadRightsList()
      this.getRights(role.children)
      this.role = role
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
    },
    async handleSubmit () {
      this.dialogFormVisible = false
      const tree = this.$refs.tree
      let rids = [...tree.getHalfCheckedKeys(), ...tree.getCheckedKeys()].join(',')
      let { meta } = await updataRightsByRoleId(this.role.id, rids)
      if (meta.status === 200) {
        this.$emit('edit-rights-success')
        this.$message({
          type: 'success',
          message: '修改权限成功'
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
