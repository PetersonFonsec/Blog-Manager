<template>
  <div class="item-article article-item-bar" >

    <div class="image-post">      
      <img :src="src" alt="picture" />
    </div>

    <div class="info">

      <strong>{{ title }}</strong>
      
      <p>
        {{ description }}
      </p>

      <div class="about">
        <div>Author: {{ author }}</div>
        <div>{{ data }}</div>
      </div>

    </div>

  </div>
</template>

<script>
import '@/css/keyFrames.css'
import { baseURL } from '@/global'
import { mapState } from 'vuex'
export default {
    name: 'totalBlog',
    props:{      
      title: {
        type: String,
        require: true
      },
      author:{
        type: String,
        require: true
      },
      data:{
        type: String,
        require: true
      },
      description:{
        type: String,
        require: true
      },
      imagem:{
        type: String,
        require: true,
      }
    },
    computed: {
      ...mapState(['defaultImage']),
      src(){
        return `${baseURL}/${this.imagem}` || this.defaultImage
      }
    }
}
</script>

<style lang="scss" scoped>
  @import 'm-article';
</style>