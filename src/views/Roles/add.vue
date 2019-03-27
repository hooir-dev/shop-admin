<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-position="left" :rules="rules" ref="addRoleForm">
      <el-form-item label="角色名称:" label-width="90px" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述:" label-width="90px" prop="roleDesc">
        <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddRole">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addRole } from '@/api/role.js'
export default {
  name: 'addRole',
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
    showDialogFormVisible () {
      this.dialogFormVisible = true
    },
    async handleAddRole () {
      const { roleName, roleDesc } = this.form
      const { data, meta } = await addRole(roleName, roleDesc)
      console.log(meta)
      if (meta.status === 201) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogFormVisible = false
        this.$refs.addRoleForm.resetFields()
        this.$emit('addRole-success')
      }
    }
  }
}
</script>
<style scoped>
</style>