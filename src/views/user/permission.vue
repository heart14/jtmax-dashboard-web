<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.permName" placeholder="权限名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.permType" placeholder="权限类型" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in permTypeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleFilter">
        新增
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleFilter">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
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
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Permission':'New Permission'">
      <el-form :model="permission" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="permission.name" placeholder="Permission Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="permission.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Permission Description"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import path from 'path'
// import { deepClone } from '@/utils'
// import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import { getPermissions } from '@/api/permission'
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
      dialogVisible: false,
      dialogType: 'new',
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
        console.log(response.data)
        this.permissionList = response.data.list
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getPageList()
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
