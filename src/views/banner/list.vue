<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.originName"
        placeholder="文件名"
        clearable
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
    <el-row>
      <el-col v-for="item in bannerList" :key="item.bannerId" :span="8" :offset="0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="item.networkUrl" class="image">
          <div style="padding: 14px;">
            <span>{{ item.originName }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.createTime }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPageList" />
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
    float: right;
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
}
</style>
