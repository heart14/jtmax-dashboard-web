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
      <el-date-picker v-model="datePickerResult" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" class="filter-item" />
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
      <el-table-column v-if="showDesc" align="center" label="活动编号">
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
          {{ scope.row.activityTimeStart }} - <br> {{ scope.row.activityTimeEnd }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="集合时间">
        <template slot-scope="scope">
          {{ scope.row.assembleTime }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="活动地点">
        <template slot-scope="scope">
          <el-link :href="getPlaceMapLink(scope.row.activityPlace)" target="_blank" type="primary">{{ scope.row.activityPlace }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="集合地点">
        <template slot-scope="scope">
          <el-link :href="getPlaceMapLink(scope.row.assemblePlace)" target="_blank" type="primary">{{ scope.row.assemblePlace }}</el-link>
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
      <el-table-column align="center" label="操作" width="220px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0" type="primary" size="small" @click="handlePublish(scope)">发布</el-button>
          <el-button :disabled="scope.row.status==2||scope.row.status==3" type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button :disabled="scope.row.status!==0" type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑活动':'新增活动'">
      <el-form ref="activity" :rules="formRules" :model="activity" label-width="140px" label-position="left">
        <el-form-item label="Activity Name" prop="activityName">
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
        <el-form-item label="Activity Type" prop="activityType">
          <el-select v-model="activity.activityType" placeholder="活动类型">
            <el-option v-for="item in activityTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Organizer" prop="activityOrganizer">
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
        <el-form-item label="Activity Place" prop="activityPlace">
          <el-input v-model="activity.activityPlace" placeholder="活动地点" />
        </el-form-item>
        <el-form-item label="Assemble Place" prop="assemblePlace">
          <el-input v-model="activity.assemblePlace" placeholder="集合地点" />
        </el-form-item>
        <el-form-item label="Activity Time" prop="activityTimeStart">
          <el-date-picker v-model="activityTimePickerResult" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item" @change="handleActivityTimePickerResult" />
        </el-form-item>
        <el-form-item label="Assemble Time" prop="assembleTime">
          <el-date-picker v-model="activity.assembleTime" type="datetime" placeholder="集合时间" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item" />
        </el-form-item>
        <el-form-item label="Deadline Time" prop="deadline">
          <el-date-picker v-model="activity.deadline" type="datetime" placeholder="截止时间" value-format="yyyy-MM-dd HH:mm:ss" class="filter-item" />
        </el-form-item>
        <el-form-item label="Min Level" prop="minLevel">
          <el-input v-model="activity.minLevel" placeholder="刷街等级" />
        </el-form-item>
        <el-form-item label="Max Player" prop="maxPlayer">
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
import { getActivities, updateActivity, addActivity, deleteActivity, publishActivity } from '@/api/activity'
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

const formRules = {
  activityName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  activityType: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
  activityPlace: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
  assemblePlace: [{ required: true, message: '请输入集合地点', trigger: 'blur' }],
  activityOrganizer: [{ required: true, message: '请选择活动组织者', trigger: 'change' }],
  activityTimeStart: [{ required: true, message: '请选择活动开始时间', trigger: 'blur' }],
  assembleTime: [{ required: true, message: '请选择集合时间', trigger: 'blur' }],
  deadline: [{ required: true, message: '请选择活动报名截止时间', trigger: 'blur' }],
  minLevel: [{ required: true, message: '请输入刷街等级', trigger: 'blur' }],
  maxPlayer: [{ required: true, message: '请输入最大人数限制', trigger: 'blur' }]
}

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
      formRules,
      activity: Object.assign({}, defaultActivity),
      activityList: [],
      playerList: [],
      total: 0,
      dialogVisible: false, // 控制弹窗显示或者隐藏
      dialogType: 'new', // 弹窗类型，新增或者编辑
      showDesc: false, // 控制activityDesc和remark列显示或者隐藏
      statusOptions,
      activityTypeOptions,
      datePickerResult: '',
      activityTimePickerResult: '',
      listQuery: {
        page: 1,
        limit: 10,
        activityName: undefined,
        activityType: undefined,
        status: undefined,
        assembleDateStart: undefined,
        assembleDateEnd: undefined
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
      if (this.datePickerResult !== null && this.datePickerResult !== undefined) {
        this.listQuery.assembleDateStart = this.datePickerResult[0]
        this.listQuery.assembleDateEnd = this.datePickerResult[1]
      } else {
        this.listQuery.assembleDateStart = undefined
        this.listQuery.assembleDateEnd = undefined
      }
    },

    handleAddActivity() {
      // 加个判断，防止当第一次打开弹窗时，dom中还未渲染，就进行调用，导致报错的问题出现 https://blog.csdn.net/weixin_45393094/article/details/115584032
      if (this.$refs.activity !== undefined) {
        // 打开弹窗时，重置字段值和表单校验状态
        this.$refs.activity.resetFields()
      }
      this.activity = Object.assign({}, defaultActivity)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      if (this.$refs.activity !== undefined) {
        // 打开弹窗时，重置字段值和表单校验状态
        this.$refs.activity.resetFields()
      }
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.activity = deepClone(scope.row)
      if (this.activity.activityOrganizer.trim() !== '' && this.activity.activityOrganizer !== undefined) {
        // 将organizer字段字符串转化成字符串数组，从而可以使下拉框对已选中的内容进行初始化
        this.activity.activityOrganizer = this.activity.activityOrganizer.split(',')
      }
      // 将活动开始结束时间转化成字符串数组，从而使活动时间选择器初始化
      this.activityTimePickerResult = (this.activity.activityTimeStart + ',' + this.activity.activityTimeEnd).split(',')
    },
    async confirmActivity() {
      // 定义变量保存表单验证结果
      let validateResult = false
      // 进行表单验证
      this.$refs.activity.validate((valid) => {
        if (valid) {
          validateResult = true
        } else {
          alert('未完成')
        }
      })
      if (!validateResult) {
        // 如果表单校验不通过，返回表格填写界面
        return
      }

      const isEdit = this.dialogType === 'edit'

      // 接口organizer字段接收字符串，而前端通过下拉多选框得到的是个字符串数组["aaa","bbb",...]，所以要转化成字符串传递过去
      // 字符串转数组：split  数组转字符串：join
      this.activity.activityOrganizer = this.activity.activityOrganizer.join(',')

      this.activityTimePickerResult = '' // 用完进行初始化，防止下次打开弹窗时还留着上次选择的时间
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
    },
    handlePublish({ row }) {
      this.$confirm('确认发布该活动?', '发布活动', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await publishActivity(row.activityId)
        this.getPageList()
        this.$message({
          type: 'success',
          message: '发布成功!'
        })
      }).catch(err => { console.error(err) })
    },
    getPlaceMapLink(p) {
      return 'https://gaode.com/search?query=' + p
    },
    handleActivityTimePickerResult(val) {
      // 将活动时间选择器结果设置到活动开始时间、结束时间字段
      this.activity.activityTimeStart = this.activityTimePickerResult[0]
      this.activity.activityTimeEnd = this.activityTimePickerResult[1]
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
