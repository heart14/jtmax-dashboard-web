<template>
  <div class="app-container">
    <div class="filter-container">
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
  </div>
</template>

<script>
import { getActivityPlayerInfo } from '@/api/activity'

const defaultActivityPlayer = {
  id: '',
  activityId: '',
  activityName: '',
  nickname: '',
  phoneNumber: '',
  createTime: '',
  status: ''
}

export default {
  data() {
    return {
      total: 0,
      activityPlayer: Object.assign({}, defaultActivityPlayer),
      activityPlayerList: [],
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
    this.getActivityPlayerInfo()
  },
  methods: {
    errorHandler() {
      return true
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getActivityPlayerInfo()
    },

    async getActivityPlayerInfo() {
      this.listLoading = true
      getActivityPlayerInfo(this.listQuery).then(response => {
        this.activityPlayerList = response.data.list
        this.total = response.data.total
      })
    }
  }
}
</script>

  <style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }
  </style>
