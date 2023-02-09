<template>
  <div class="components-container">
    <el-upload class="upload-demo" drag action="http://127.0.0.1:28080/dashboard/photo/upload" multiple>
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'PhotoUpload'
}
</script>
