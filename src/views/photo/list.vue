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
      <el-col v-for="item in photoList" :key="item.id" :span="4" :offset="0">
        <el-card class="el-card" :body-style="{ padding: '0px' }" shadow="hover">
          <el-image class="el-image" :src="item.networkUrl" :preview-src-list="[item.networkUrl]" />
          <div style="padding: 9px;background-color: #F5F5DC;">
            <span>{{ item.originName }}</span>
            <div class="bottom clearfix">
              <time class="time">@ {{ item.creator }}</time><br>
              <time class="time">{{ item.createTime }}</time>
            </div>
            <div>
              <el-button type="primary" size="mini" round class="button-cp" @click="handleCopyNet(item.networkUrl,$event)"> Net </el-button>
              <el-button type="primary" size="mini" round class="button-cp" @click="handleCopyMD(item.originName,item.networkUrl,$event)"> MD </el-button>
              <el-button type="danger" size="mini" round class="button-del" icon="el-icon-delete" @click="handleDelete(item.id)" />
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
import clip from '@/utils/clipboard' // use clipboard directly

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
        limit: 12,
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
    handleCopyNet(text, event) {
      clip(text, event)
    },
    handleCopyMD(name, text, event) {
      const mdUrl = '![' + name + '](' + text + ')'
      clip(mdUrl, event)
    },
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
    },
    handleDelete(id) {

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
    margin-top: 10px;
    margin-bottom: 3px;
    line-height: 11px;
  }

  .button-cp {
    padding: 2px;
    // float: right;
  }

  .button-del {
    padding: 2px;
    float: right;
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

  .el-image {
    width: 100%;
    height: 200px;
  }
}
</style>
