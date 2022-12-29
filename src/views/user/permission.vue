<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.permName" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.permType" placeholder="Imp" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in permTypeOptions" :key="item" :label="item" :value="item" />
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
      <el-table-column align="center" label="Permission ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.permId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Permission Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.permName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template slot-scope="scope">
          {{ scope.row.permDesc }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Permission Type">
        <template slot-scope="scope">
          {{ scope.row.permType }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column> -->
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

export default {
  components: { Pagination },
  data() {
    return {
      permission: Object.assign({}, defaultPermission),
      permissionList: [],
      total: 0,
      dialogVisible: false,
      dialogType: 'new',
      permTypeOptions: ['MENU', 'BUTTON'],
      listQuery: {
        page: 1,
        limit: 10,
        permType: undefined,
        permName: undefined,
        type: undefined
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
