<template>
  <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-position="left" :rules="rules" ref="editRoleForm">
      <el-form-item label="角色名称:" label-width="90px" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述:" label-width="90px" prop="roleDesc">
        <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEditRole">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { editRole } from '@/api/role.js'
export default {
  name: 'editRole',
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      form: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    showDialogFormVisible (item) {
      this.dialogFormVisible = true
      this.form = item
    },
    async handleEditRole () {
      let { roleName, roleDesc } = this.form
      let { meta } = await editRole(this.form.id, roleName, roleDesc)
      if (meta.status === 200) {
        this.dialogFormVisible = false
        this.$message({
          message: `${meta.msg}`,
          type: 'success'
        })
        this.$emit('editRole-success')
      } else {
        this.$message({
          message: `修改失败`,
          type: 'error'
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
