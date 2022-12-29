<template>
  <div class="app-container">

    <el-table :data="playerList" style="width: 100%;margin-top:30px;" stripe>
      <!-- <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <div>
            <el-avatar :src="scope.row.avatar" />
          </div>
        </template>
      </el-table-column> -->
      <el-table-column align="right" label="" width="64">
        <template slot-scope="scope">
          <div>
            <div>
              <el-avatar :src="scope.row.avatar" @error="errorHandler">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
              </el-avatar>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="left" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="街头编号">
        <template slot-scope="scope">
          {{ scope.row.jtmaxNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          {{ scope.row.phoneNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          {{ scope.row.gender }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="群组">
        <template slot-scope="scope">
          {{ scope.row.chatGroup }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="介绍">
        <template slot-scope="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">正常</span>
          <span v-else-if="scope.row.status==1">黑名单</span>
          <span v-else-if="scope.row.status==2">已退群</span>
          <span v-else-if="scope.row.status==3">已注销</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="small" :disabled="scope.row.status==1?false:true" @click="handleUnForbid(scope)">解禁</el-button>
          <el-button type="danger" size="small" :disabled="scope.row.status==1?true:false" @click="handleForbid(scope)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPlayerList, forbidPlayer, unForbidPlayer } from '@/api/player'

const defaultPlayer = {
  uid: '',
  jtmaxNumber: '',
  phoneNumber: '',
  nickname: '',
  avatar: '',
  gender: '',
  sportId: '',
  levelId: '',
  playTime: '',
  joinTime: '',
  regTime: '',
  titleId: '',
  chatGroup: '',
  introduction: '',
  status: '',
  roles: [],
  perms: []
}

export default {
  data() {
    return {
      player: Object.assign({}, defaultPlayer),
      playerList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
  },
  created() {
    this.getPlayerList()
  },
  methods: {
    errorHandler() {
      return true
    },

    async getPlayerList() {
      const res = await getPlayerList()
      this.playerList = res.data
    },

    handleForbid({ $index, row }) {
      this.$confirm('确认禁用该用户?', '禁用用户', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await forbidPlayer(row.uid)
        // this.playerList.splice($index, 1)
        this.getPlayerList()
        this.$message({
          type: 'success',
          message: 'Forbid success!'
        })
      }).catch(err => { console.error(err) })
    },
    handleUnForbid({ $index, row }) {
      this.$confirm('确认解禁该用户?', '解除禁用', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await unForbidPlayer(row.uid)
        // this.playerList.splice($index, 1)
        this.getPlayerList()
        this.$message({
          type: 'success',
          message: 'UnForbid success!'
        })
      }).catch(err => { console.error(err) })
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
