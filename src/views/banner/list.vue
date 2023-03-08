<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.originName" placeholder="文件名" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-checkbox v-model="showDesc" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        详细描述
      </el-checkbox>
    </div>
    <el-table :key="tableKey" :data="bannerList" style="width: 100%;margin-top:30px;" stripe>
      <!-- <el-table-column align="right" label="" width="64">
        <template slot-scope="scope">
          <div>
            <div>
              <el-avatar :src="scope.row.avatar" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
              </el-avatar>
            </div>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="文件编号">
        <template slot-scope="scope">
          {{ scope.row.bannerId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="存储编号">
        <template slot-scope="scope">
          {{ scope.row.storageId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件名">
        <template slot-scope="scope">
          {{ scope.row.originName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件类型">
        <template slot-scope="scope">
          {{ scope.row.mediaType }}
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="展示状态">
        <template slot-scope="scope">
          {{ scope.row.showStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件状态">
        <template slot-scope="scope">
          {{ scope.row.fileStatus }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">正常</span>
          <span v-else-if="scope.row.status==1">黑名单</span>
          <span v-else-if="scope.row.status==2">已退群</span>
          <span v-else-if="scope.row.status==3">已注销</span>
          <span v-else>未知</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="small" :disabled="scope.row.status==1?false:true" @click="handleUnForbid(scope)">解禁</el-button>
          <el-button type="danger" size="small" :disabled="scope.row.status==1?true:false" @click="handleForbid(scope)">禁用</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
  </div>
</template>

<script>
import { getBannerList } from '@/api/banner'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultBanner = {
  bannerId: '',
  storageId: '',
  originName: '',
  description: '',
  showStatus: '',
  storageName: '',
  size: '',
  storagePath: '',
  networkUrl: '',
  mediaType: '',
  resourceType: '',
  creator: '',
  fileStatus: '',
  createTime: '',
  updateTime: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      banner: Object.assign({}, defaultBanner),
      bannerList: [],
      tableKey: 0,
      showDesc: false, // 控制v-if="showDesc"列显示或者隐藏
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        resourceType: 0,
        originName: undefined
      }
    }
  },
  computed: {
  },
  created() {
    this.getPageList()
  },
  methods: {
    // errorHandler() {
    //   return true
    // },

    async getPageList() {
      this.listLoading = true
      getBannerList(this.listQuery).then(response => {
        this.bannerList = response.data.list
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
  }
  </style>
