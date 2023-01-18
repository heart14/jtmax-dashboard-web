<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.activityId" placeholder="请选择活动" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in activityIdNameList" :key="item.activityId" :label="item.activityName" :value="item.activityId" />
      </el-select>
      <el-input v-model="listQuery.activityName" placeholder="活动名称" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.nickname" placeholder="AKA" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-table :data="activityPlayerList" style="width: 100%;margin-top:30px;" stripe>
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column align="center" label="报名编号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动编号">
        <template slot-scope="scope">
          {{ scope.row.activityId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="活动名称">
        <template slot-scope="scope">
          {{ scope.row.activityName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="AKA">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式">
        <template slot-scope="scope">
          {{ scope.row.phoneNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="报名状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">已取消</span>
          <span v-else-if="scope.row.status==1">已报名</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
  </div>
</template>

<script>
import { getActivityPlayerInfo, getAllActivity } from '@/api/activity'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultActivityPlayer = {
  id: '',
  activityId: '',
  activityName: '',
  nickname: '',
  phoneNumber: '',
  createTime: '',
  status: ''
}

const statusOptions = [
  { key: '0', display_name: '已取消' },
  { key: '1', display_name: '已报名' }
]

export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      statusOptions,
      activityPlayer: Object.assign({}, defaultActivityPlayer),
      activityPlayerList: [],
      activityIdNameList: [],
      listQuery: {
        page: 1,
        limit: 10,
        activityId: undefined,
        activityName: undefined,
        nickname: undefined,
        status: undefined
      }
    }
  },
  computed: {
  },
  created() {
    this.getPageList()
    this.getActivityIdNameList()
  },
  methods: {
    errorHandler() {
      return true
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getPageList()
    },
    async getPageList() {
      this.listLoading = true
      getActivityPlayerInfo(this.listQuery).then(response => {
        this.activityPlayerList = response.data.list
        this.total = response.data.total
      })
    },
    getActivityIdNameList() {
      getAllActivity().then(response => {
        this.activityIdNameList = response.data
      })
    }
  }
}
</script>

  <style lang="scss" scoped>
  .app-container {
    .filter-item {
      margin-left: 8px;
    }
  }
  </style>
