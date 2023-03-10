<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.originName"
        placeholder="原始文件名"
        clearable
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-row class="row-box">
      <el-col v-for="item in photoList" :key="item.id" :span="6" :offset="0">
        <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="item.networkUrl" class="image">
          <div style="padding: 14px;">
            <span>{{ item.originName }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.createTime }}</time>
            </div>
            <div>
              <el-button type="text" class="button">Net</el-button>
              <el-button type="text" class="button">MD</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
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

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    // float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .row-box {
    display: flex;
    flex-wrap: wrap;
  }
  .row-box .el-card {
    min-width: 100%;
    height: 100%;
  }
}
</style>
