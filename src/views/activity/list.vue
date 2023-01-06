<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.activityName" placeholder="活动名称" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.activityType" placeholder="活动类型" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in activityTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="状态" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAddActivity">
        新增
      </el-button>
      <el-checkbox v-model="showDesc" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        详细描述
      </el-checkbox>
    </div>
    <el-table :key="tableKey" :data="activityList" style="width: 100%;margin-top:30px;" stripe>
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
      <el-table-column v-if="showDesc" align="header-center" label="活动描述">
        <template slot-scope="scope">
          {{ scope.row.activityDesc }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="活动类型" width="84px">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.activityType | activityTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="活动时间">
        <template slot-scope="scope">
          {{ scope.row.activityTimeStart }} - {{ scope.row.activityTimeEnd }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="集合时间">
        <template slot-scope="scope">
          {{ scope.row.assembleTime }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="集合地点">
        <template slot-scope="scope">
          {{ scope.row.assemblePlace }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="组织者">
        <template slot-scope="scope">
          {{ scope.row.activityOrganizer }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="等级要求" width="84px">
        <template slot-scope="scope">
          {{ scope.row.minLevel }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="人数限制" width="84px">
        <template slot-scope="scope">
          {{ scope.row.maxPlayer }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="截止时间">
        <template slot-scope="scope">
          {{ scope.row.deadline }}
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="header-center" label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="状态" width="72px">
        <template slot-scope="scope">
          <!-- {{ scope.row.status }} -->
          <el-tag>{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑活动':'新增活动'">
      <el-form :model="activity" label-width="120px" label-position="left">
        <el-form-item label="Activity Name">
          <el-input v-model="activity.activityName" placeholder="活动名称" />
        </el-form-item>
        <el-form-item label="Activity Desc">
          <el-input
            v-model="activity.activityDesc"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="活动描述"
          />
        </el-form-item>
        <el-form-item label="Activity Type">
          <el-select v-model="activity.activityType">
            <el-option v-for="item in activityTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Organizer">
          <el-select
            v-model="activity.activityOrganizer"
            multiple
            collapse-tags
            filterable
            placeholder="组织者"
          >
            <el-option
              v-for="item in playerList"
              :key="item.uid"
              :label="item.nickname"
              :value="item.uid"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Min Level">
          <el-input v-model="activity.minLevel" placeholder="刷街等级" />
        </el-form-item>
        <el-form-item label="Max Player">
          <el-input v-model="activity.maxPlayer" placeholder="人数限制" />
        </el-form-item>
        <el-form-item v-if="dialogType==='edit'" label="Status">
          <el-select v-model="activity.status">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmActivity">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getActivities, updateActivity, addActivity, deleteActivity } from '@/api/activity'
import { getPlayerList } from '@/api/player'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultActivity = {
  activityId: '',
  activityName: '',
  activityDesc: '',
  activityType: '',
  activityTimeStart: '',
  activityTimeEnd: '',
  assembleTime: '',
  assemblePlace: '',
  activityPlace: '',
  activityOrganizer: '',
  minLevel: '',
  maxPlayer: '',
  deadline: '',
  status: '',
  remark: '',
  createTime: '',
  updateTime: ''
}
const activityTypeOptions = [
  { key: '0', display_name: '刷街' },
  { key: '1', display_name: '练习' },
  { key: '2', display_name: '远征' },
  { key: '3', display_name: '特别' }
]
const statusOptions = [
  { key: '0', display_name: '待发布' },
  { key: '1', display_name: '已发布' },
  { key: '2', display_name: '已结束' },
  { key: '3', display_name: '已取消' }
]
const activityTypeKeyValue = activityTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
const statusKeyValue = statusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  components: { Pagination },
  filters: {
    activityTypeFilter(type) {
      return activityTypeKeyValue[type]
    },
    statusFilter(type) {
      return statusKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      activity: Object.assign({}, defaultActivity),
      activityList: [],
      playerList: [],
      total: 0,
      dialogVisible: false, // 控制弹窗显示或者隐藏
      dialogType: 'new', // 弹窗类型，新增或者编辑
      showDesc: false, // 控制activityDesc和remark列显示或者隐藏
      statusOptions,
      activityTypeOptions,
      listQuery: {
        page: 1,
        limit: 10,
        activityName: undefined,
        activityType: undefined,
        status: undefined
      }
    }
  },
  created() {
    this.getPageList()
    this.getPlayerList()
  },
  methods: {
    getPlayerList() {
      this.listLoading = true
      getPlayerList().then(response => {
        this.playerList = response.data
      })
    },
    getPageList() {
      this.listLoading = true
      getActivities(this.listQuery).then(response => {
        this.activityList = response.data.list
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getPageList()
    },

    handleAddActivity() {
      this.activity = Object.assign({}, defaultActivity)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.activity = deepClone(scope.row)
      if (this.activity.activityOrganizer.trim() !== '' && this.activity.activityOrganizer !== undefined) {
        // 将organizer字段字符串转化成字符串数组，从而可以使下拉框对已选中的内容进行初始化
        this.activity.activityOrganizer = this.activity.activityOrganizer.split(',')
      }
    },
    async confirmActivity() {
      const isEdit = this.dialogType === 'edit'

      // 接口organizer字段接收字符串，而前端通过下拉多选框得到的是个字符串数组["aaa","bbb",...]，所以要转化成字符串传递过去
      // 字符串转数组：split  数组转字符串：join
      this.activity.activityOrganizer = this.activity.activityOrganizer.join(',')
      if (isEdit) {
        await updateActivity(this.activity.activityId, this.activity)
      } else {
        await addActivity(this.activity)
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
      this.$confirm('该操作不可撤回！确认删除活动?', '删除活动', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteActivity(row.activityId)
          this.activityList.splice($index, 1)// 这是什么意思
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
  }
  </style>
