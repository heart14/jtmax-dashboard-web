<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.originName" placeholder="原始文件名" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-table :data="photoList" style="width: 100%;margin-top:30px;" stripe>
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
              :preview-src-list="srcList"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="left" label="OriginName">
        <template slot-scope="scope">
          {{ scope.row.originName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="StorageName">
        <template slot-scope="scope">
          {{ scope.row.storageName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Size">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="StoragePath">
        <template slot-scope="scope">
          {{ scope.row.storagePath }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="NetworkUrl">
        <template slot-scope="scope">
          {{ scope.row.networkUrl }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="MediaType">
        <template slot-scope="scope">
          {{ scope.row.mediaType }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="ResourceType">
        <template slot-scope="scope">
          {{ scope.row.resourceType }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Creator">
        <template slot-scope="scope">
          {{ scope.row.creator }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Status">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Description">
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
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      photo: Object.assign({}, defaultPhoto),
      photoList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
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
  </style>
