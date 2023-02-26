<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.originName" placeholder="原始文件名" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-checkbox v-model="showDesc" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        详细描述
      </el-checkbox>
    </div>
    <el-table :key="tableKey" :data="photoList" style="width: 100%;margin-top:30px;" stripe>
      <!-- <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <div>
            <el-avatar :src="scope.row.avatar" />
          </div>
        </template>
      </el-table-column> -->
      <el-table-column align="right" label="" width="105">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.networkUrl"
              :preview-src-list="[scope.row.networkUrl]"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="left" label="FileName">
        <template slot-scope="scope">
          原始文件名：<b>{{ scope.row.originName }}</b>
          <br>
          存储文件名：<b>{{ scope.row.storageName }}</b>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="showDesc" align="center" label="StorageName">
        <template slot-scope="scope">
          {{ scope.row.storageName }}
        </template>
      </el-table-column> -->
      <el-table-column v-if="showDesc" align="center" label="Size">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="center" label="StoragePath">
        <template slot-scope="scope">
          {{ scope.row.storagePath }}
        </template>
      </el-table-column>
      <el-table-column align="left" label="NetworkUrl">
        <template slot-scope="scope">
          ImageURL: <b>{{ scope.row.networkUrl }}</b>
          <br>
          Markdown: <b>![{{ scope.row.storageName }}]({{ scope.row.networkUrl }})</b>
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="center" label="MediaType">
        <template slot-scope="scope">
          {{ scope.row.mediaType }}
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="center" label="ResourceType">
        <template slot-scope="scope">
          {{ scope.row.resourceType }}
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="center" label="Creator">
        <template slot-scope="scope">
          {{ scope.row.creator }}
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="center" label="Status">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column v-if="showDesc" align="center" label="Description">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
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
import { getPhotoList } from '@/api/photo'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const defaultPhoto = {
  id: '',
  originName: '',
  storageName: '',
  description: '',
  size: '',
  storagePath: '',
  networkUrl: '',
  mediaType: '',
  resourceType: '',
  creator: '',
  status: '',
  createTime: '',
  updateTime: ''
}

export default {
  components: { Pagination },
  data() {
    return {
      photo: Object.assign({}, defaultPhoto),
      photoList: [],
      tableKey: 0,
      showDesc: false, // 控制v-if="showDesc"列显示或者隐藏
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        resourceType: 1,
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
    errorHandler() {
      return true
    },
    getPageList() {
      this.listLoading = true
      getPhotoList(this.listQuery).then(response => {
        this.photoList = response.data.list
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
