<template>
  <div>
    <el-row>
      <el-col :span="1"><el-button type="primary" class="btn" @click="$refs.AddRoleEl.showDialogFormVisible()"  >添加角色</el-button></el-col>
    </el-row>
    <el-table
      :data="rolesList"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 一级 -->
          <el-row v-for="first in scope.row.children" :key="first.id" class="first">
            <el-col :span="4">
              <el-tag closable @close="delRight(scope.row,first)">
                {{ first.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级 -->
              <el-row v-for="second in first.children" :key="second.id" class="second">
                <el-col :span="4">
                  <el-tag closable type="success" @close="delRight(scope.row,second)">
                    {{ second.authName }}
                  </el-tag>
                </el-col>
                <!-- 三级 -->
                <el-col :span="20">
                  <el-tag v-for="thirdly in second.children" :key="thirdly.id" closable type="warning" class="thirdly" @close="delRight(scope.row,thirdly)">
                    {{ thirdly.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="$refs.EditRoleEl.showDialogFormVisible(scope.row)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelRole(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" circle @click="$refs.EditRightsEl.showDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <addRoles ref="AddRoleEl" @addRole-success="loadRoleslist"></addRoles>
    <editRoles ref="EditRoleEl" @editRole-success="loadRoleslist"></editRoles>
    <editRights ref="EditRightsEl" @edit-rights-success="loadRoleslist"></editRights>
  </div>
</template>
<script>
import { getRoleslist, delRole, delRightsByRoleId } from '@/api/role.js'
import addRoles from './add'
import editRoles from './edit'
import editRights from './edit-rights'
export default {
  name: 'Roles',
  components: {
    addRoles,
    editRoles,
    editRights
  },
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.loadRoleslist()
  },
  methods: {
    async loadRoleslist () {
      let { data } = await getRoleslist()
      if (data[0]) {
        data.sort((x, y) => {
          return y.id - x.id
        })
        this.rolesList = data
      }
    },
    handleDelRole (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { meta } = await delRole(item.id)
        if (meta.status === 200) {
          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
          this.loadRoleslist()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async delRight (role, right) {
      let { data, meta } = await delRightsByRoleId(role.id, right.id)
      if (meta.status === 200) {
        role.children = data
      }
    }
  }
}
</script>
<style scoped>
.btn {
  margin: 10px 0;
}
.first {
  padding: 10px 0;
}
.second {
  margin-bottom: 5px;
}
.thirdly {
  margin-left: 5px;
}
</style>
