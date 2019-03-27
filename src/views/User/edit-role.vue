<template>
  <el-dialog width="40%" title="编辑用户角色" :visible.sync="editFormVisible">
    <el-form size="mini" label-width='80px' label-position="left" :model="editForm">
      <el-form-item label="用户名" label-width="80px">
        <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px">
        <el-select placeholder="请选择" v-model="editForm.rid">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.roleName"
            :page-sizes="[10, 50, 100, 200]"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="toEditUserRole">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getUserById, getRoleslist, editUserRole } from '@/api/role.js'
export default {
  name: 'userRole',
  data () {
    return {
      editFormVisible: false,
      editForm: {
        username: '用户',
        rid: 0
      },
      roles: []
    }
  },
  methods: {
    async showEditRole (item) {
      this.editFormVisible = true
      let { data } = await getUserById(item.id)
      // console.log(data)
      this.editForm = data
      let roleData = await getRoleslist()
      this.roles = roleData.data
    },
    async toEditUserRole () {
      this.editFormVisible = false
      let { data } = await editUserRole(this.editForm.id, this.editForm.rid)
      console.log(data)
      if (data.meta.status === 200) {
        this.$message({
          message: `${data.meta.msg}`,
          type: 'success'
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
