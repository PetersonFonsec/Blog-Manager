<template>
  <div class="item-article card-item-article">

    <div class="image-post">      
      <img :src="src" alt="picture" />
    </div>

    <div class="info">
      <strong>{{ title }}</strong>
      
      <p>
        {{ description }}
      </p>

      <div class="about">
        <div>{{ author }}</div>
        <div>{{ data }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseURL } from '@/global'
import { mapState } from 'vuex'

export default {
    name: 'BoxPost',
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