<template>
  <div class="item-article card-item-article">

    <div class="image-post">      
      <img :src="srcCoverArticle" alt="picture" />
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
import ImageMixins from '@/mixins/image'

export default {
    name: 'BoxPost',
    mixins: [ ImageMixins ],
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
    }
}
</script>

<style lang="scss" scoped>
  @import 'm-article';
</style>