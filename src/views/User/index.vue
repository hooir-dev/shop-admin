<template>
  <div>
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
      <el-table-column
        label="切换状态"
        width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            @change="modifyUserStatus(scope.row)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.editFormData.showEditDialog(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="success" icon="el-icon-check" size="mini" @click="$refs.userEditRoleEl.showEditRole(scope.row)">分类角色</el-button>
        </template>
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
        <el-form-item placeholder="请输入邮箱" label="邮箱" prop="email">
          <el-input v-model="addFormData.email"></el-input>
        </el-form-item>
        <el-form-item placeholder="请输入电话" label="电话" prop="mobile">
          <el-input v-model="addFormData.mobile"></el-input>
        </el-form-item>
        <el-button @click="isVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddUser">确认</el-button>
      </el-form>
    </el-dialog>
    <editUser ref="editFormData" @editUserOk="loadUsers"></editUser>
    <edit-role ref="userEditRoleEl"></edit-role>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import * as User from '@/api/user.js'
import editUser from './edit'
import editRole from './edit-role'
export default {
  name: 'UserBody',
  components: {
    editUser,
    editRole
  },
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
        email: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      pagesize: 6
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    async modifyUserStatus (item) {
      let { data: { data, meta } } = await User.changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          message: `${data.mg_state ? '启用' : '禁用'}状态成功`,
          type: 'success'
        })
      }
    },
    async handleDelete (row) {
      let { data } = await User.delUser(row.id)
      if (data.meta.status === 200) {
        this.$message({
          message: `删除用户成功`,
          type: 'success'
        })
        this.loadUsers()
      }
    },
    addUser () {
      this.isVisible = true
    },
    async loadUsers () {
      const { data } = await User.gitUserList({ pagenum: 1, pagesize: this.pagesize })
      this.total = data.data.total
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
      let { data } = await User.addUser(this.addFormData)
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
        this.$refs.addFormData.resetFields()
      }
    },
    showEditRole () {

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }

}
</script>
<style scoped>
.input-with-select {
  width: 245px;
}
.el-row {
  margin: 10px 0;
}
</style>
