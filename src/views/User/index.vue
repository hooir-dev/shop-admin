<template>
  <div class="main-body">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="sousuo" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="isVisible">
      <el-form label-width="80px" :rules="rules" ref="addFormData" :model="addFormData">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="addFormData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="addFormData.password" show-password></el-input>
        </el-form-item>
        <el-form-item placeholder="请输入邮箱" label="邮箱" prop="emali">
          <el-input v-model="addFormData.email"></el-input>
        </el-form-item>
        <el-form-item placeholder="请输入电话" label="电话" prop="moble">
          <el-input v-model="addFormData.moble"></el-input>
        </el-form-item>
        <el-button @click="isVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddUser">确认</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { gitUserList, addUser } from '@/api/user.js'
export default {
  data () {
    return {
      sousuo: '',
      tableData: [],
      isVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        emali: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        moble: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      addFormData: {
        username: '',
        password: '',
        email: '',
        moble: ''
      }
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    addUser () {
      this.isVisible = true
    },
    async loadUsers () {
      const { data } = await gitUserList({ pagesize: 8 })
      this.tableData = data.data.users
    },
    handleAddUser () {
      this.$refs.addFormData.validate((valid) => {
        if (!valid) {
          return
        }
        this.submitAdd()
      })
    },
    async submitAdd () {
      let { data } = await addUser(this.addFormData)
      if (data.meta.status === 400) {
        this.$alert(data.meta.msg, '亲', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: $ { action }`
            })
          }
        })
      }
      if (data.meta.status === 201) {
        this.isVisible = false
        this.$message({
          message: '恭喜你，创建成功',
          type: 'success'
        })
        this.loadUsers()
      }
    }
  }

}
</script>
<style scoped>
.main-body {
  padding: 20px;
}
.input-with-select {
  width: 245px;
}
.el-row {
  margin: 10px 0;
}
</style>
