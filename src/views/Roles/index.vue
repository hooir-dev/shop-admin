<template>
  <div>
    <el-row>
      <el-col :span="1"><el-button type="primary" class="btn" @click="$refs.AddRoleEl.showDialogFormVisible()"  >添加角色</el-button></el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 一级 -->
          <el-row v-for="first in scope.row.children" :key="first.id" class="first">
            <el-col :span="4">
              <el-tag closable>
                {{ first.authName }}
              </el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级 -->
              <el-row v-for="second in first.children" :key="second.id" class="second">
                <el-col :span="4">
                  <el-tag closable type="success">
                    {{ second.authName }}
                  </el-tag>
                </el-col>
                <!-- 三级 -->
                <el-col :span="20">
                  <el-tag v-for="thirdly in second.children" :key="thirdly.id" closable type="warning" class="thirdly">
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
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
      </el-table-column>
    </el-table>
    <addRoles ref="AddRoleEl" @addRole-success="loadRoleslist"></addRoles>
  </div>
</template>
<script>
import { getRoleslist } from '@/api/role.js'
import addRoles from './add'
export default {
  name: 'Roles',
  components: {
    addRoles
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadRoleslist()
  },
  methods: {
    async loadRoleslist () {
      let { data, mate } = await getRoleslist()
      this.tableData = data
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
