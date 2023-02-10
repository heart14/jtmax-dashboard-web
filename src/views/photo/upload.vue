<template>
  <div class="components-container">
    <el-upload
      class="photo-upload"
      action="http://127.0.0.1:28080/dashboard/photo/upload"
      drag
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      list-type="picture"
      :headers="headers"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过50mb</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'PhotoUpload',
  data() {
    return {
      headers: {},
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  created() {
    this.initToken()
  },
  methods: {
    initToken() {
      this.headers = { Authorization: getToken() }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res, file, fileList) {
      if (res.state === 'SUCCESS') {
        console.log('success')
      }
    }
  }
}
</script>
