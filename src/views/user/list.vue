<template>
  <div class="app-container">

    <el-table :data="playerList" style="width: 100%;margin-top:30px;">
      <el-table-column align="center" label="头像" width="220">
        <template slot-scope="scope">
          <div>
            <el-avatar :src="scope.row.avatar" />
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="街头编号" width="220">
        <template slot-scope="scope">
          {{ scope.row.jtmaxNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="220">
        <template slot-scope="scope">
          {{ scope.row.phoneNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nickname }}
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="编辑用户">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.nickname" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.introduction"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role introduction"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { getPlayerList, updatePlayer, deletePlayer } from '@/api/player'

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
      role: Object.assign({}, defaultPlayer),
      routes: [],
      playerList: [],
      dialogVisible: false,
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getPlayerList()
  },
  methods: {
    async getPlayerList() {
      const res = await getPlayerList()
      this.playerList = res.data
    },

    handleEdit(scope) {
      this.dialogVisible = true
      this.role = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await deletePlayer(row.key)
        this.playerList.splice($index, 1)
        this.$message({
          type: 'success',
          message: 'Delete succed!'
        })
      })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
      await updatePlayer(this.role.roleId, this.role)
      for (let index = 0; index < this.rolesList.length; index++) {
        if (this.rolesList[index].key === this.role.key) {
          this.rolesList.splice(index, 1, Object.assign({}, this.role))// Object.assign是什么意思
          break
        }
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
              <div>Role Key: ${key}</div>
              <div>Role Name: ${name}</div>
              <div>Description: ${description}</div>
            `,
        type: 'success'
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
