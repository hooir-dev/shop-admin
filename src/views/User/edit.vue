<template>
  <el-dialog title="编辑用户" :visible.sync="isVisible">
    <el-form label-width="80px" :rules="rules" ref="editFormData" :model="editFormData">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" disabled v-model="editFormData.username"></el-input>
      </el-form-item>
      <el-form-item placeholder="请输入邮箱" label="邮箱" prop="email">
        <el-input v-model="editFormData.email"></el-input>
      </el-form-item>
      <el-form-item placeholder="请输入电话" label="电话" prop="mobile">
        <el-input v-model="editFormData.mobile"></el-input>
      </el-form-item>
      <el-button @click="isVisible = false">取消</el-button>
      <el-button type="primary" @click="handleEditUser">确认</el-button>
    </el-form>
  </el-dialog>
</template>
<script>
import { editUser } from '@/api/user.js'
export default {
  data () {
    return {
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      isVisible: false,
      rules: {
        email: [
          { required: true, message: '不能空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '不能为空哦', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleEditUser () {
      let { id, email, mobile } = this.editFormData
      let data = await editUser(id, { email, mobile })
      if (data.data.meta.status === 200) {
        this.$message({
          message: `修改用户成功`,
          type: 'success'
        })
        this.isVisible = false
        this.$emit('editUserOk')
      }
    },
    showEditDialog (item) {
      this.isVisible = true
      this.editFormData = item
    }
  }
}
</script>
<style scoped>
</style>
