<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.permName" placeholder="权限名称" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.permType" placeholder="权限类型" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in permTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <!-- TODO 要再加个筛选条件：父权限，下拉框数据从后台查询到所有父权限 -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAddPermission">
        新增
      </el-button>
    </div>
    <el-table :data="permissionList" style="width: 100%;margin-top:30px;" stripe>
      <el-table-column align="center" label="权限ID">
        <template slot-scope="scope">
          {{ scope.row.permId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限名">
        <template slot-scope="scope">
          {{ scope.row.permName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.permDesc }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.permType }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="权限路由">
        <template slot-scope="scope">
          {{ scope.row.permRoute }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="排序">
        <template slot-scope="scope">
          {{ scope.row.permIndex }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="权限Key">
        <template slot-scope="scope">
          {{ scope.row.permKey }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="父权限">
        <template slot-scope="scope">
          {{ scope.row.parentId }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="状态">
        <template slot-scope="scope">
          <!-- {{ scope.row.status }} -->
          <el-tag>{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑权限':'新增权限'">
      <el-form :model="permission" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="permission.permName" placeholder="Permission Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="permission.permDesc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Permission Description"
          />
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="permission.permType">
            <el-option v-for="item in permTypeOptions" :key="item" :lavel="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Route">
          <el-input v-model="permission.permRoute" placeholder="Permission Route" />
        </el-form-item>
        <el-form-item label="Index">
          <el-input v-model="permission.permIndex" placeholder="Permission Index" />
        </el-form-item>
        <el-form-item label="Key">
          <el-input v-model="permission.permKey" placeholder="Permission Key" />
        </el-form-item>
        <el-form-item label="Parent">
          <el-input v-model="permission.parentId" placeholder="Permission Parent" />
        </el-form-item>
        <el-form-item v-if="dialogType==='edit'" label="Status">
          <el-select v-model="permission.status">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmPermission">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import path from 'path'
// import { deepClone } from '@/utils'
// import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import { deepClone } from '@/utils'
import { getPermissions, updatePermission, addPermission, deletePermission } from '@/api/permission'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultPermission = {
  permId: '',
  permName: '',
  permDesc: '',
  permType: '',
  permRoute: '',
  permIndex: '',
  permKey: '',
  parentId: '',
  status: '',
  createTime: '',
  updateTime: ''
}
const statusOptions = [
  { key: '1', display_name: '有效' },
  { key: '0', display_name: '无效' }
]
const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: { Pagination },
  filters: {
    statusFilter(type) {
      return statusKeyValue[type]
    }
  },
  data() {
    return {
      permission: Object.assign({}, defaultPermission),
      permissionList: [],
      total: 0,
      dialogVisible: false, // 控制弹窗显示或者隐藏
      dialogType: 'new', // 弹窗类型，新增或者编辑
      permTypeOptions: ['MENU', 'BUTTON'],
      statusOptions,
      listQuery: {
        page: 1,
        limit: 10,
        permType: undefined,
        permName: undefined,
        type: undefined,
        status: undefined
      }
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    getPageList() {
      this.listLoading = true
      getPermissions(this.listQuery).then(response => {
        this.permissionList = response.data.list
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getPageList()
    },

    handleAddPermission() {
      this.permission = Object.assign({}, defaultPermission)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.permission = deepClone(scope.row)
    },
    async confirmPermission() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updatePermission(this.permission.permId, this.permission)
      } else {
        await addPermission(this.permission)
      }
      this.getPageList()

      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        type: 'success'
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('该操作不可撤回！确认删除权限?', '删除权限', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deletePermission(row.permId)
          this.permissionList.splice($index, 1)// 这是什么意思
          this.$message({
            type: 'success',
            message: 'Delete succeed!'
          })
        })
        .catch(err => { console.error(err) })
    }
  }
}
</script>

  <style lang="scss" scoped>
  .app-container {
    .filter-item {
      margin-left: 8px;
    }
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }
  </style>
