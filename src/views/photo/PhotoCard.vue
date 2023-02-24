<template>
  <div class="card-container">
    <el-image style="width: 480px; height: 270px; float: left; border-radius: 12px;" :src="networkUrl" :preview-src-list="[networkUrl]" />
    <div class="desc-container">
      <h2>{{ originName }}</h2>
      <h3>{{ storageName }}</h3>
      <p>{{ description }}</p>
      <p>{{ storagePath }}</p>
      <p>{{ networkUrl }}</p>
      <p>![{{ storageName }}]({{ networkUrl }})</p>
    </div>

    <!-- 失败的card用法
    <div>
        <PhotoCard v-for="item in photoList" :id="item.id" :originName="item.originName" :storageName="item.storageName" :description="item.description" :storagePath="item.storagePath" :networkUrl="item.networkUrl"></PhotoCard>
    </div>
    import PhotoCard from './PhotoCard.vue'

    export default {
        components: { PhotoCard },
        ....
    } -->
  </div>
</template>

<script>
export default {
  name: 'PhotoCard',
  props: {
    id: {
      type: String
    },
    originName: {
      type: String
    },
    storageName: {
      type: String
    },
    storagePath: {
      type: String
    },
    networkUrl: {
      type: String,
      default: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    description: {
      type: String
    }
  }
}
</script>

<style scoped>
.div {
    margin: 0;
    padding: 0;
    border: 0;
}

.card-container {
    width: 480px;
    height: 520px;
    border-radius: 15px;
}

.desc-container {
    background-color: grey;
    word-break: break-all;
    white-space: normal;
}
</style>
