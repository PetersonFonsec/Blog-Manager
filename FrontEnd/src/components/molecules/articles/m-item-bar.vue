<template>
  <div class="article-item-bar" >

    <div class="image-post">      
      <img v-if="imagem" :src="imagem" alt="picture" />
      <img v-else src="@/assets/default-post.png" alt="picture default" />
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
    }
}
</script>

<style >
.article-item-bar{
  animation: bornHeder linear .2s;
  padding: 5px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  margin: 10px 0px;
  cursor: pointer;
}
.article-item-bar .image-post {
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px solid #AAA;
}
.article-item-bar .image-post img {
  max-width: 150px;
  border-radius: 5px;
}
.about{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  flex: 1;
}
</style>